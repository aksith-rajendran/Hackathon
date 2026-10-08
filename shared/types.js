/**
 * Shared types, constants, and validation helpers
 * for AI Idea Stress Tester.
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
 * Validates an idea string.
 * @param {any} idea 
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateIdea(idea) {
  if (idea === undefined || idea === null) {
    return { valid: false, error: 'Idea is required.' };
  }
  if (typeof idea !== 'string') {
    return { valid: false, error: 'Idea must be a string.' };
  }
  const trimmed = idea.trim();
  if (trimmed.length === 0) {
    return { valid: false, error: 'Idea cannot be empty.' };
  }
  if (trimmed.length < 5) {
    return { valid: false, error: 'Idea is too short. Please provide at least 5 characters.' };
  }
  return { valid: true };
}

/**
 * Validates critics array for analyze endpoint.
 * @param {any} critics 
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateCritics(critics) {
  if (!critics) {
    return { valid: false, error: 'Critics array is required.' };
  }
  if (!Array.isArray(critics)) {
    return { valid: false, error: 'Critics must be an array.' };
  }
  if (critics.length === 0) {
    return { valid: false, error: 'Critics array must contain at least one critic review.' };
  }

  for (let i = 0; i < critics.length; i++) {
    const c = critics[i];
    if (!c || typeof c !== 'object') {
      return { valid: false, error: `Critic at index ${i} must be an object.` };
    }
    const role = c.role || c.name;
    if (!role || typeof role !== 'string') {
      return { valid: false, error: `Critic at index ${i} is missing a valid role or name.` };
    }
  }

  return { valid: true };
}

// Default export
export default {
  PERSONA_ROLES,
  SEVERITY_LEVELS,
  validateIdea,
  validateCritics
};
