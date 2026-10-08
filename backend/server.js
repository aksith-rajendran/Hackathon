import express from 'express';
import cors from 'cors';
import critiqueRoute from './routes/critique.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Mount the real critique API route
app.use('/api/critique', critiqueRoute);

// POST /api/analyze
app.post('/api/analyze', (req, res) => {
  const { idea, critics } = req.body;
  if (!idea) {
    return res.status(400).json({ error: 'idea is required' });
  }

  const biggestWeaknesses = [
    'Incumbent replication risk: Established platforms can clone the core offering within weeks.',
    'Regulatory & data privacy exposure under strict AI governance frameworks.',
    'High onboarding friction diminishing initial retention rates and unit economics.'
  ];

  const improvements = [
    'Establish proprietary data network effects that make your models specifically trained on private workflows.',
    'Implement a zero-knowledge privacy architecture with local cryptographic guarantees.',
    'Design a frictionless 30-second time-to-value onboarding funnel with generous self-serve trials.'
  ];

  const improvedIdea = `${idea.trim()} - Enhanced with an enterprise-grade zero-trust privacy layer, proprietary workflow integrations that create an uncopyable data moat, and a self-serve PLG onboarding engine to outpace incumbent copycats.`;

  res.json({
    biggestWeaknesses,
    improvements,
    improvedIdea
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
