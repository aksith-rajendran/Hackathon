# ⚡ AI Idea Stress Tester

A full-stack AI system built for hackathons that subjects startup and product concepts to rigorous multi-perspective stress testing. Instead of superficial praise, it subjects concepts to **5 Ruthless AI Critics**, then feeds the critiques into a **Final AI Analyzer** to pinpoint structural weaknesses, actionable strategic pivots, and an improved pitch.

---

## 🔄 End-to-End Flow

```
USER IDEA
   ↓
FRONTEND (Dashboard UI)
   ↓
POST /api/critique
   ↓
5 AI CRITICS
   (Investor • Competitor • User • Engineer • Risk Officer)
   ↓
CRITIC RESULTS
   ↓
POST /api/analyze
   ↓
FINAL AI ANALYZER
   ↓
BIGGEST WEAKNESSES
   ↓
ACTIONABLE IMPROVEMENTS
   ↓
HARDENED IMPROVED IDEA
   ↓
FRONTEND (Synthesis View)
```

---

## 👥 4-Person Hackathon Team Architecture

| Teammate | Responsibility | Core Files |
| :--- | :--- | :--- |
| **Teammate 1** | Frontend Architecture & Dashboard UI | `frontend/src/components/*`, `frontend/src/pages/*`, `frontend/src/App.jsx` |
| **Teammate 2** | AI Critics Module (5 Personas) | `backend/services/critics.js` |
| **Teammate 3** | Final AI Analyzer Module (Synthesis & Pivots) | `backend/services/analyzer.js` |
| **Teammate 4** | Backend Architecture & System Integration | `backend/server.js`, `backend/routes/*`, `shared/types.js`, CORS, Validation, Env |

---

## 📁 Repository Structure

```
idea-stress-tester/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CriticCard.jsx
│   │   │   └── AnalysisResult.jsx
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/
│   ├── routes/
│   │   ├── critique.js
│   │   └── analyze.js
│   ├── services/
│   │   ├── critics.js
│   │   └── analyzer.js
│   ├── server.js
│   ├── test-api.js
│   ├── .env.example
│   ├── .env
│   └── package.json
│
├── shared/
│   └── types.js
│
├── .env.example
├── .gitignore
└── README.md
```

---

## 📡 API Contract Specification

### 1. `POST /api/critique`
Evaluates the submitted startup idea across 5 ruthless critic personas.

- **Request Body**:
```json
{
  "idea": "We want to create an app that helps college students find internships."
}
```

- **Validation**:
  - `idea` is required, must be a string, and must have at least 5 characters.
  - Returns HTTP `400 Bad Request` if invalid.

- **Response Body**:
```json
{
  "critics": [
    {
      "id": "investor",
      "name": "The Skeptical Investor",
      "role": "Venture Capital & Unit Economics",
      "score": 4.5,
      "verdict": "High acquisition cost with low willingness to pay.",
      "critique": "College students have virtually zero budget to pay...",
      "keyConcerns": [
        "Unclear pricing power and high customer churn",
        "Cold-start two-sided marketplace trap"
      ]
    },
    ...
  ]
}
```

---

### 2. `POST /api/analyze`
Synthesizes the critiques and produces actionable pivots and an upgraded value proposition.

- **Request Body**:
```json
{
  "idea": "We want to create an app that helps college students find internships.",
  "critics": [ ...array of 5 critic objects... ]
}
```

- **Validation**:
  - `idea` is required (string).
  - `critics` is required (non-empty array of valid critic objects).
  - Returns HTTP `400 Bad Request` if invalid.

- **Response Body**:
```json
{
  "biggestWeaknesses": [
    "Two-sided marketplace cold-start problem...",
    "Zero defensible moat against Handshake and LinkedIn...",
    "High application friction and resume ghosting..."
  ],
  "improvements": [
    "Pivot from generic job board to an AI-vetted Proof-of-Work apprenticeship marketplace...",
    "Monetize hiring companies on successful hires rather than broke students...",
    "Solve cold-start by targeting seed-stage startups neglected by campus career centers..."
  ],
  "improvedIdea": "An AI-powered 'Proof-of-Work' Internship Arena for college students. Instead of uploading static resumes..."
}
```

---

### 3. `GET /api/health`
Health check and uptime status.

- **Response Body**:
```json
{
  "status": "ok",
  "timestamp": "2026-10-08T07:00:00.000Z",
  "uptime": 12.34
}
```

---

## 🚀 Quickstart Guide

### Step 1: Clone & Configure Environment
```bash
# From idea-stress-tester directory
cp .env.example .env
```

Optional: If using Google Gemini or external AI keys, add:
```env
AI_API_KEY=your_gemini_api_key_here
PORT=5000
FRONTEND_URL=http://localhost:5173
```
*(Note: If no API key is provided, the backend automatically uses intelligent built-in domain critic and analyzer engines, ensuring the app always works during presentations with zero rate limits!)*

### Step 2: Start Backend Server
```bash
cd backend
npm install
npm start
```
Server runs at `http://localhost:5000`.

To run automated backend validation tests:
```bash
node test-api.js
```

### Step 3: Start Frontend Client
```bash
cd ../frontend
npm install
npm run dev
```
Client runs at `http://localhost:5173`.

---

## 🧪 Testing the Benchmark Pipeline

1. Open `http://localhost:5173` in your browser.
2. Click **"⚡ Load Benchmark Idea"** or enter:
   > *"We want to create an app that helps college students find internships."*
3. Click **"🚀 Run Complete Stress Test Pipeline"**.
4. Observe the sequence:
   - Step 1: Concept validated
   - Step 2: `POST /api/critique` returns 5 distinct critic cards with scores & concerns
   - Step 3: `POST /api/analyze` returns the Final AI Analyzer report with top weaknesses, actionable pivots, and the hardened proposal.
