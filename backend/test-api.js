/**
 * Automated test suite for AI Idea Stress Tester Backend (ES Module)
 */

import http from 'http';
process.env.NODE_ENV = 'test';
import app from './server.js';

let server;
const TEST_PORT = 5098;

function request(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const req = http.request(
      {
        hostname: 'localhost',
        port: TEST_PORT,
        path,
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {})
        }
      },
      (res) => {
        let resData = '';
        res.on('data', (chunk) => {
          resData += chunk;
        });
        res.on('end', () => {
          let parsed;
          try {
            parsed = JSON.parse(resData);
          } catch {
            parsed = resData;
          }
          resolve({ status: res.statusCode, data: parsed, headers: res.headers });
        });
      }
    );

    req.on('error', (err) => reject(err));
    if (data) {
      req.write(data);
    }
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Starting AI Idea Stress Tester Backend Integration Tests...\n');
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      failed++;
    }
  }

  // Start test server
  await new Promise((resolve) => {
    server = app.listen(TEST_PORT, () => {
      console.log(`Test server running on port ${TEST_PORT}\n`);
      resolve();
    });
  });

  try {
    // 1. Health Check
    console.log('[TEST GROUP 1] Health Check & Root Endpoints');
    const healthRes = await request('GET', '/api/health');
    assert(healthRes.status === 200 && healthRes.data.status === 'ok', 'GET /api/health returns 200 ok');

    const rootRes = await request('GET', '/');
    assert(rootRes.status === 200 && rootRes.data.endpoints, 'GET / returns API metadata');

    // 2. Validation tests for POST /api/critique
    console.log('\n[TEST GROUP 2] POST /api/critique Validation');
    const emptyCritiqueRes = await request('POST', '/api/critique', {});
    assert(emptyCritiqueRes.status === 400, 'POST /api/critique with empty body returns 400 Bad Request');

    const emptyStrCritiqueRes = await request('POST', '/api/critique', { idea: '   ' });
    assert(emptyStrCritiqueRes.status === 400, 'POST /api/critique with whitespace returns 400');

    const nonStrCritiqueRes = await request('POST', '/api/critique', { idea: 12345 });
    assert(nonStrCritiqueRes.status === 400, 'POST /api/critique with number returns 400');

    const shortCritiqueRes = await request('POST', '/api/critique', { idea: 'hi' });
    assert(shortCritiqueRes.status === 400, 'POST /api/critique with < 5 chars returns 400');

    // 3. Valid POST /api/critique
    console.log('\n[TEST GROUP 3] POST /api/critique Valid Execution');
    const benchmarkIdea = 'We want to create an app that helps college students find internships.';
    const validCritiqueRes = await request('POST', '/api/critique', { idea: benchmarkIdea });
    assert(validCritiqueRes.status === 200, 'POST /api/critique returns 200 for benchmark idea');
    assert(Array.isArray(validCritiqueRes.data.critics), 'Response contains critics array');
    assert(validCritiqueRes.data.critics.length === 5, 'Response contains exactly 5 critics');

    const critics = validCritiqueRes.data.critics;
    const hasRequiredFields = critics.every(
      (c) => (c.role || c.name) && c.criticism && c.concern
    );
    assert(hasRequiredFields, 'Every critic contains role/name, criticism, and concern');

    // 4. Validation tests for POST /api/analyze
    console.log('\n[TEST GROUP 4] POST /api/analyze Validation');
    const noIdeaAnalyzeRes = await request('POST', '/api/analyze', { critics });
    assert(noIdeaAnalyzeRes.status === 400, 'POST /api/analyze without idea returns 400');

    const noCriticsAnalyzeRes = await request('POST', '/api/analyze', { idea: benchmarkIdea });
    assert(noCriticsAnalyzeRes.status === 400, 'POST /api/analyze without critics returns 400');

    const emptyCriticsAnalyzeRes = await request('POST', '/api/analyze', { idea: benchmarkIdea, critics: [] });
    assert(emptyCriticsAnalyzeRes.status === 400, 'POST /api/analyze with empty critics array returns 400');

    // 5. Valid POST /api/analyze
    console.log('\n[TEST GROUP 5] POST /api/analyze Valid Execution');
    const validAnalyzeRes = await request('POST', '/api/analyze', {
      idea: benchmarkIdea,
      critics
    });
    assert(validAnalyzeRes.status === 200, 'POST /api/analyze returns 200 for benchmark idea + critics');
    assert(Array.isArray(validAnalyzeRes.data.biggestWeaknesses), 'Response contains biggestWeaknesses array');
    assert(validAnalyzeRes.data.biggestWeaknesses.length > 0, 'biggestWeaknesses has entries');
    assert(Array.isArray(validAnalyzeRes.data.improvements), 'Response contains improvements array');
    assert(validAnalyzeRes.data.improvements.length > 0, 'improvements has entries');
    assert(
      typeof validAnalyzeRes.data.improvedIdea === 'string' && validAnalyzeRes.data.improvedIdea.length > 20,
      'Response contains improvedIdea string'
    );

    // 6. 404 Route handling
    console.log('\n[TEST GROUP 6] 404 Route Handling');
    const notFoundRes = await request('GET', '/api/nonexistent');
    assert(notFoundRes.status === 404 && notFoundRes.data.error === 'Not Found', 'Unknown routes return 404 JSON');

    console.log(`\n========================================`);
    console.log(`Summary: ${passed} passed, ${failed} failed`);
    console.log(`========================================\n`);

  } finally {
    server.close();
  }

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTests().catch((err) => {
  console.error('Fatal test error:', err);
  if (server) server.close();
  process.exit(1);
});
