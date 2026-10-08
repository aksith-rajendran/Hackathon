import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// POST /api/critique
app.post('/api/critique', (req, res) => {
  const { idea } = req.body;
  if (!idea || typeof idea !== 'string') {
    return res.status(400).json({ error: 'idea is required' });
  }

  // Simulated AI personas evaluation (can be plugged into Gemini/OpenAI by backend teammates)
  const critics = [
    {
      role: 'Investor',
      criticism: 'Unit economics look perilous early on and customer acquisition costs could outpace lifetime value before reaching critical scale.',
      concern: 'No clear defensible moat against well-funded incumbents with existing distribution.',
      severity: 'High'
    },
    {
      role: 'Customer',
      criticism: 'The value proposition sounds intriguing, but switching friction and onboarding complexity might prevent daily habit adoption.',
      concern: 'Too many steps required before experiencing the core "aha" moment.',
      severity: 'Medium'
    },
    {
      role: 'Regulator',
      criticism: 'Data retention policies, user privacy, and algorithmic accountability will trigger severe scrutiny under regional privacy and consumer protection laws.',
      concern: 'Potential liability under automated decision-making and cross-border data transfer laws.',
      severity: 'High'
    },
    {
      role: 'Security Expert',
      criticism: 'Exposing multi-tenant user prompts and proprietary logic without zero-trust boundaries opens significant attack surfaces for prompt injection and credential leaks.',
      concern: 'Insufficient isolation between sensitive user workflows and public endpoints.',
      severity: 'Medium'
    },
    {
      role: 'Competitor',
      criticism: 'We can ship this as a weekend feature in our existing suite and cross-sell it for free to our 200k daily active users.',
      concern: 'Feature vs platform dilemma; high replication risk by established platforms.',
      severity: 'High'
    }
  ];

  res.json({ critics });
});

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
