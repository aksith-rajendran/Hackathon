/**
 * API Service for AI Idea Stress Tester
 * Communicates with backend endpoints:
 * - POST /api/critique
 * - POST /api/analyze
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * Custom error wrapper for structured reporting
 */
export class ApiError extends Error {
  constructor(message, status = null, details = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

/**
 * Calls POST /api/critique with the startup idea
 * @param {string} idea - The user's idea text
 * @returns {Promise<{ critics: Array<{ role: string, criticism: string, concern: string, severity: 'Low' | 'Medium' | 'High' }> }>}
 */
export async function getCritiques(idea) {
  if (!idea || !idea.trim()) {
    throw new ApiError('Please provide an idea to stress test.');
  }

  const endpoint = `${API_BASE_URL}/api/critique`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idea: idea.trim() }),
    });

    if (!response.ok) {
      let errorMsg = `Server error (${response.status})`;
      try {
        const errorData = await response.json();
        if (errorData?.error) errorMsg = errorData.error;
      } catch {
        // Fallback to HTTP text status
      }
      throw new ApiError(errorMsg, response.status);
    }

    const data = await response.json();

    if (!data || !Array.isArray(data.critics)) {
      throw new ApiError('Invalid response format received from critique service.');
    }

    return data;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw new ApiError(
      err.message === 'Failed to fetch'
        ? 'Unable to connect to the backend server. Please make sure the backend is running on port 5000, or switch to Demo Mode.'
        : err.message,
      0
    );
  }
}

/**
 * Calls POST /api/analyze with the idea and collected critic responses
 * @param {string} idea - The user's idea text
 * @param {Array} critics - The 5 critic feedback items
 * @returns {Promise<{ biggestWeaknesses: string[], improvements: string[], improvedIdea: string }>}
 */
export async function getAnalysis(idea, critics) {
  if (!idea || !idea.trim()) {
    throw new ApiError('Idea is required for synthesis.');
  }

  const endpoint = `${API_BASE_URL}/api/analyze`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idea: idea.trim(),
        critics: critics || [],
      }),
    });

    if (!response.ok) {
      let errorMsg = `Server error (${response.status})`;
      try {
        const errorData = await response.json();
        if (errorData?.error) errorMsg = errorData.error;
      } catch {
        // Fallback to HTTP text status
      }
      throw new ApiError(errorMsg, response.status);
    }

    const data = await response.json();

    if (
      !data ||
      !Array.isArray(data.biggestWeaknesses) ||
      !Array.isArray(data.improvements) ||
      typeof data.improvedIdea !== 'string'
    ) {
      throw new ApiError('Invalid response format received from synthesis service.');
    }

    return data;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw new ApiError(
      err.message === 'Failed to fetch'
        ? 'Unable to connect to analysis server. Check your connection or enable Demo Mode.'
        : err.message,
      0
    );
  }
}

/**
 * Realistic Mock Service for Hackathon Live Demos
 * Guarantees zero-downtime presentations if backend is booting or disconnected
 */
export async function getMockCritiques(idea) {
  // Simulate network delay for natural feel
  await new Promise((resolve) => setTimeout(resolve, 800));

  const lower = idea.toLowerCase();
  const isHealth = lower.includes('health') || lower.includes('medical') || lower.includes('doctor');
  const isFinance = lower.includes('crypto') || lower.includes('finance') || lower.includes('money') || lower.includes('bank');

  return {
    critics: [
      {
        role: 'Investor',
        criticism: 'Customer Acquisition Cost (CAC) will likely outstrip Lifetime Value (LTV) early on. You are competing for attention in a saturated market without clear defensible IP.',
        concern: 'Unclear path to $10M ARR within 24 months due to long sales cycles and high churn risk.',
        severity: 'High'
      },
      {
        role: 'Customer',
        criticism: 'It sounds exciting on paper, but the workflow disruption is huge. If it takes more than 5 minutes to set up or requires switching tools, I will abandon it.',
        concern: 'Steep onboarding curve and skepticism about whether it reliably solves my daily bottleneck.',
        severity: 'Medium'
      },
      {
        role: 'Regulator',
        criticism: isHealth
          ? 'Severe exposure to HIPAA, FDA software regulations, and strict biometric privacy compliance.'
          : isFinance
          ? 'FinCEN, SEC, KYC/AML compliance violations could trigger immediate cease-and-desist orders.'
          : 'High risk of GDPR / CCPA non-compliance regarding automated profiling and biometric/user data retention.',
        concern: 'Potential catastrophic fines if automated AI processes handle protected user personal data without audit logs.',
        severity: 'High'
      },
      {
        role: 'Security Expert',
        criticism: 'Prompt injection, training data leakage, and insecure API orchestration create an easy target for adversarial exfiltration.',
        concern: 'Lack of end-to-end encryption and multi-tenant data isolation vulnerable to unauthorized privilege escalation.',
        severity: 'High'
      },
      {
        role: 'Competitor',
        criticism: 'Big tech and venture-backed category leaders can replicate your core feature set in a 2-week sprint and distribute it for free.',
        concern: 'Low defensibility; this is currently a thin wrapper/feature rather than a resilient platform.',
        severity: 'Medium'
      }
    ]
  };
}

export async function getMockAnalysis(idea, critics) {
  await new Promise((resolve) => setTimeout(resolve, 900));

  return {
    biggestWeaknesses: [
      'Incumbent Replicability: High probability that established players will copy the headline feature into their existing suites.',
      'Regulatory & Compliance Overhead: Heavy legal hurdles and data liabilities that could drain early runway.',
      'User Adoption Friction: Complex onboarding and high initial inertia hindering viral expansion.'
    ],
    improvements: [
      'Build a Proprietary Data Flywheel: Integrate deep proprietary workflows so user actions create a compound data moat that incumbents cannot mimic.',
      'Implement Privacy-by-Design & Zero-Knowledge Architecture: Guarantee provable compliance out of the box to turn regulatory fears into a killer sales asset.',
      'Frictionless "Time-to-Aha" PLG Funnel: Offer a 60-second browser demo with instant value before requiring setup or account creation.',
      'Strategic Distribution Partnerships: Co-market with non-competing ecosystem tools rather than relying on paid ad channels.'
    ],
    improvedIdea: `Re-engineered Strategy:\nInstead of a generic offering, pivot to an enterprise-grade, privacy-first platform that embeds directly into existing user workflows with zero setup. By leveraging local-first processing and a proprietary data flywheel, you eliminate regulatory liability while creating an defensible moat against copycats.`
  };
}
