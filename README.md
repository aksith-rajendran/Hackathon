# AI Idea Stress Tester ⚡

A high-impact hackathon tool that ruthlessly stress-tests startup concepts using 5 adversarial AI personas, synthesizes their attacks, and outputs a battle-hardened improved version of your idea.

---

## 🏗️ Project Architecture

```
idea-stress-tester/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── IdeaInput.jsx
│   │   │   ├── LoadingSequence.jsx
│   │   │   ├── CriticCard.jsx
│   │   │   ├── CriticGrid.jsx
│   │   │   ├── FinalAnalysis.jsx
│   │   │   └── ErrorBanner.jsx
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── backend/
│   ├── routes/
│   ├── services/
│   ├── server.js
│   └── package.json
├── shared/
│   └── types.js
├── .env.example
├── .gitignore
└── README.md
```

---

## 🎯 The 5 AI Personas
1. **Investor** — Scrutinizes unit economics, CAC vs LTV, churn risk, and market size.
2. **Customer** — Attacks usability friction, switching costs, and whether it truly solves an urgent daily pain.
3. **Regulator** — Identifies compliance minefields (GDPR, HIPAA, SEC, algorithmic liability, data sovereignty).
4. **Security Expert** — Targets attack vectors, prompt injections, data isolation, and credential leaks.
5. **Competitor** — Evaluates defensibility, moat strength, and how easily incumbent giants can clone the product.

---

## 🚀 Quick Start

### 1. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend will start at: `http://localhost:5173`

### 2. Backend Setup
```bash
cd backend
npm install
npm run start
```
The backend will start at: `http://localhost:5000`

---

## 🔌 API Contract

### 1. Critique Endpoint
`POST /api/critique`
```json
// Request
{
  "idea": "An AI legal assistant for freelance contractors..."
}

// Response
{
  "critics": [
    {
      "role": "Investor",
      "criticism": "CAC will likely outpace LTV early on...",
      "concern": "Low defensibility and long sales cycle",
      "severity": "High"
    },
    ...
  ]
}
```

### 2. Analysis Endpoint
`POST /api/analyze`
```json
// Request
{
  "idea": "An AI legal assistant for freelance contractors...",
  "critics": [...]
}

// Response
{
  "biggestWeaknesses": [
    "Incumbent replication risk...",
    "Regulatory exposure under legal practice laws..."
  ],
  "improvements": [
    "Establish proprietary data flywheel...",
    "Implement zero-knowledge privacy architecture..."
  ],
  "improvedIdea": "Re-engineered strategy:..."
}
```

---

## 💡 Live Demo Features
- **Interactive Multi-Agent Loading Sequence**: Visualizes each persona being called sequentially.
- **Fail-Safe Demo Mode**: Built-in interactive fallback so live demos never fail even if backend servers are down or offline.
- **Modern UI**: Dark glassmorphism, responsive grid, severity color badges, and one-click copy.
