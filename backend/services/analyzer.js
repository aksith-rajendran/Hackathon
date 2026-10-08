/**
 * Service: Final AI Analyzer
 * Synthesizes criticisms from 5 critics in simple, plain English.
 */

function generateFallbackAnalysis(idea, critics) {
  const lower = idea.toLowerCase();
  const isStudentOrCollege = lower.includes('college') || lower.includes('student') || lower.includes('university') || lower.includes('campus');
  const isInternshipOrJobs = lower.includes('intern') || lower.includes('job') || lower.includes('career') || lower.includes('hire');

  if (isStudentOrCollege && isInternshipOrJobs) {
    return {
      biggestWeaknesses: [
        'The Chicken-and-Egg Trap: Students will not join if there are no jobs, and companies will not post jobs if there are no students.',
        'Giant Competitors: Famous apps like LinkedIn and Handshake already dominate the college job market.',
        'Ghosting Frustration: If students apply and never hear back from employers, they will feel ignored and delete the app.',
        'Fake Job Scams: Online scammers love targeting young students with fake job offers and bad checks.'
      ],
      improvements: [
        'Do not be a regular job board. Instead, let students complete simple 2-day sample projects to show off real skills to startups.',
        'Never charge students money. Charge startups only after they find a great student they actually want to hire.',
        'Target young tech startups that campus career centers ignore. Small startups reply much faster and love energetic students.',
        'Verify every single company before they can message students, so students never have to worry about scams.'
      ],
      improvedIdea: 'An app where college students do 48-hour mini-projects for real startups instead of sending blank resumes into black-hole job boards. Startups post small challenges (like writing a short blog post or fixing a bug), students prove their skills in 2 days, and startups hire the top performers on the spot.'
    };
  }

  // General simple English synthesis
  const extractedWeaknesses = [];
  if (Array.isArray(critics)) {
    critics.forEach((c) => {
      if (c.concern && !extractedWeaknesses.includes(c.concern)) {
        extractedWeaknesses.push(`${c.role || 'Critic'}: ${c.concern}`);
      }
    });
  }

  return {
    biggestWeaknesses: extractedWeaknesses.length >= 3
      ? extractedWeaknesses.slice(0, 4)
      : [
          'Hard to Make Profit: Finding customers might cost more money than what customers pay you.',
          'Big Competitors: Existing famous companies can quickly copy your idea and offer it for free.',
          'User Drop-Off: If the setup takes too long, users will lose patience and leave.'
        ],
    improvements: [
      'Focus on a very specific group of people first before trying to build everything for everyone.',
      'Make the app work in under 60 seconds so people see the benefit right away.',
      'Add strong safety checks and verified accounts so users completely trust your platform.'
    ],
    improvedIdea: `A focused, high-speed version of "${idea.trim()}": Instead of trying to do everything, solve one painful daily problem 10x faster than existing tools. Make it work in under 60 seconds with verified safety and a clear way to make money from business clients.`
  };
}

function normalizeWeaknesses(weaknesses) {
  if (!Array.isArray(weaknesses)) return [];
  return weaknesses.map((w) => {
    if (typeof w === 'string') return w;
    if (typeof w === 'object' && w !== null) {
      if (w.problem && w.whyItMatters) {
        return `${w.problem}: ${w.whyItMatters}`;
      }
      return w.problem || w.concern || JSON.stringify(w);
    }
    return String(w);
  });
}

export async function analyzeIdea(inputOrIdea, maybeCritics) {
  let idea;
  let critics;

  if (typeof inputOrIdea === 'object' && inputOrIdea !== null && !Array.isArray(inputOrIdea)) {
    idea = inputOrIdea.idea;
    critics = inputOrIdea.critics;
  } else {
    idea = inputOrIdea;
    critics = maybeCritics;
  }

  if (!idea || typeof idea !== 'string' || idea.trim().length === 0) {
    throw new Error('Invalid input: "idea" must be a non-empty string.');
  }

  if (!critics || !Array.isArray(critics)) {
    throw new Error('Invalid input: "critics" must be an array.');
  }

  const apiKey = process.env.AI_API_KEY || process.env.NVIDIA_API_KEY || process.env.GEMINI_API_KEY;

  if (apiKey && apiKey.startsWith('nvapi-')) {
    try {
      const prompt = `Review this startup idea: "${idea}"
And these 5 criticisms: ${JSON.stringify(critics)}

Write in VERY SIMPLE, EVERYDAY ENGLISH so anyone can easily understand. No complicated business jargon.
Return ONLY valid JSON matching:
{
  "biggestWeaknesses": ["Simple weakness 1", "Simple weakness 2", "Simple weakness 3", "Simple weakness 4"],
  "improvements": ["Simple fix 1", "Simple fix 2", "Simple fix 3", "Simple fix 4"],
  "improvedIdea": "2 simple sentences explaining the better version of the idea."
}`;

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4000);

      const res = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: process.env.AI_MODEL || 'meta/llama-3.1-8b-instruct',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7
        }),
        signal: controller.signal
      });
      clearTimeout(timeout);

      if (res.ok) {
        const data = await res.json();
        const content = data.choices?.[0]?.message?.content;
        const parsed = JSON.parse(content);
        if (parsed && Array.isArray(parsed.biggestWeaknesses)) {
          return {
            biggestWeaknesses: normalizeWeaknesses(parsed.biggestWeaknesses),
            improvements: Array.isArray(parsed.improvements) ? parsed.improvements : [],
            improvedIdea: typeof parsed.improvedIdea === 'string' ? parsed.improvedIdea : ''
          };
        }
      }
    } catch {
      // Fall through to friendly simple English engine
    }
  }

  return generateFallbackAnalysis(idea, critics);
}

export default analyzeIdea;
