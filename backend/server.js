import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from backend/.env or root .env
dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import express from 'express';
import cors from 'cors';
import critiqueRoute from './routes/critique.js';
import analyzeRoute from './routes/analyze.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend integration
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Body parsing
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static frontend assets if public folder exists
app.use(express.static(path.join(__dirname, 'public')));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Health check endpoints
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    project: 'AI Idea Stress Tester Backend',
    endpoints: {
      critique: 'POST /api/critique',
      analyze: 'POST /api/analyze',
      health: 'GET /api/health'
    }
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Mount Routes
app.use('/api/critique', critiqueRoute);
app.use('/api/analyze', analyzeRoute);

// 404 Handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.originalUrl}. Supported endpoints: POST /api/critique, POST /api/analyze, GET /api/health`
  });
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error('[Unhandled Server Error]:', err);
  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    error: err.name || 'Internal Server Error',
    message: err.message || 'An unexpected error occurred while processing your request.',
    ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {})
  });
});

// Start server
if (process.env.NODE_ENV !== 'test') {
  const server = app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`🚀 AI Idea Stress Tester Backend running!`);
    console.log(`📡 URL: http://localhost:${PORT}`);
    console.log(`🔗 Critique endpoint: http://localhost:${PORT}/api/critique`);
    console.log(`🔗 Analyze endpoint:  http://localhost:${PORT}/api/analyze`);
    console.log(`===============================================`);
  });

  process.on('SIGTERM', () => {
    server.close(() => console.log('HTTP server closed'));
  });

  process.on('SIGINT', () => {
    server.close(() => console.log('HTTP server closed'));
  });
}

export default app;
