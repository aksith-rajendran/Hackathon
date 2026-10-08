import express from 'express';
import { analyzeIdea } from '../services/analyzer.js';
import { validateIdea, validateCritics } from '../../shared/types.js';

const router = express.Router();

/**
 * POST /api/analyze
 * 
 * Request body:
 * {
 *   "idea": "string",
 *   "critics": [...]
 * }
 * 
 * Response body:
 * {
 *   "biggestWeaknesses": string[],
 *   "improvements": string[],
 *   "improvedIdea": string
 * }
 */
router.post('/', async (req, res, next) => {
  try {
    const { idea, critics } = req.body || {};

    const ideaValidation = validateIdea ? validateIdea(idea) : {
      valid: Boolean(idea && typeof idea === 'string' && idea.trim().length >= 5),
      error: 'Idea is required.'
    };

    if (!ideaValidation.valid) {
      return res.status(400).json({
        error: 'Validation failed',
        message: ideaValidation.error
      });
    }

    const criticsValidation = validateCritics ? validateCritics(critics) : {
      valid: Boolean(critics && Array.isArray(critics) && critics.length > 0),
      error: 'Critics must be a non-empty array.'
    };

    if (!criticsValidation.valid) {
      return res.status(400).json({
        error: 'Validation failed',
        message: criticsValidation.error
      });
    }

    const analysis = await analyzeIdea({ idea: idea.trim(), critics });

    if (!analysis || typeof analysis !== 'object') {
      return res.status(500).json({
        error: 'Service error',
        message: 'Failed to generate strategic analysis.'
      });
    }

    return res.status(200).json({
      biggestWeaknesses: analysis.biggestWeaknesses || [],
      improvements: analysis.improvements || [],
      improvedIdea: analysis.improvedIdea || ''
    });
  } catch (error) {
    console.error('Route error (/api/analyze):', error);
    next(error);
  }
});

export default router;
