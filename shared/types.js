/**
 * Shared types and constants for AI Idea Stress Tester
 */

export const PERSONA_ROLES = [
  'Investor',
  'Customer',
  'Regulator',
  'Security Expert',
  'Competitor'
];

export const SEVERITY_LEVELS = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High'
};

/**
 * @typedef {Object} Critic
 * @property {'Investor' | 'Customer' | 'Regulator' | 'Security Expert' | 'Competitor'} role
 * @property {string} criticism
 * @property {string} concern
 * @property {'Low' | 'Medium' | 'High'} severity
 */

/**
 * @typedef {Object} CritiqueResponse
 * @property {Critic[]} critics
 */

/**
 * @typedef {Object} AnalyzeResponse
 * @property {string[]} biggestWeaknesses
 * @property {string[]} improvements
 * @property {string} improvedIdea
 */
