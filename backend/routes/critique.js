import express from 'express';
import { evaluateIdea } from '../services/critics.js';

const router = express.Router();

// POST /api/critique
router.post('/', async (req, res) => {
  try {
    const { idea } = req.body;
    
    if (!idea) {
      return res.status(400).json({ error: "Idea is required in the request body." });
    }

    const critics = await evaluateIdea(idea);
    
    // Respond exactly with { critics: [...] }
    res.json({ critics });
  } catch (error) {
    console.error("Route error (/api/critique):", error.message);
    res.status(500).json({ error: "Failed to evaluate idea.", details: error.message });
  }
});

export default router;
