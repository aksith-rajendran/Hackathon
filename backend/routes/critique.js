import express from 'express';
import { evaluateIdea } from '../services/critics.js';
import { validateIdea } from '../../shared/types.js';

const router = express.Router();

/**
 * POST /api/critique
 * 
 * Request body:
 * {
 *   "idea": "string"
 * }
 * 
 * Response body:
 * {
 *   "critics": [ ...5 critics... ]
 * }
 */
router.post('/', async (req, res, next) => {
  try {
    const { idea } = req.body || {};

    const validation = validateIdea ? validateIdea(idea) : {
      valid: Boolean(idea && typeof idea === 'string' && idea.trim().length >= 5),
      error: 'Idea is required and must be at least 5 characters.'
    };

    if (!validation.valid) {
      return res.status(400).json({
        error: 'Validation failed',
        message: validation.error
      });
    }

    const critics = await evaluateIdea(idea.trim());

    if (!critics || !Array.isArray(critics)) {
      return res.status(500).json({
        error: 'Service error',
        message: 'Failed to generate critics evaluation.'
      });
    }

    return res.status(200).json({ critics });
  } catch (error) {
    console.error('Route error (/api/critique):', error);
    next(error);
  }
});

export default router;
