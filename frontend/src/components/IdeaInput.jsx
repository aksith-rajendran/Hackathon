import React from 'react';
import {
  Flame,
  Sparkles,
  Lightbulb,
  ShieldAlert,
  Eye,
  TrendingUp,
  DollarSign,
  ArrowUpRight
} from 'lucide-react';

const SAMPLE_IDEAS = [
  {
    title: 'AI Contract Copilot for Freelancers',
    idea: 'An AI-powered legal copilot for independent contractors that redlines client contracts, highlights predatory non-compete clauses, and automatically negotiates fair payment terms via email.',
    problem: 'Freelancers lose thousands every year signing one-sided contracts because hiring lawyers is too expensive ($300+/hr).'
  },
  {
    title: 'Uber for Private Gourmet Chefs',
    idea: 'On-demand marketplace connecting certified local gourmet chefs with busy households for in-home restaurant-quality dinner meal prep.',
    problem: 'Eating healthy takeout every night is bland and expensive, while private chefs have traditionally been reserved only for ultra-wealthy elites.'
  },
  {
    title: 'Decentralized Encrypted Patient Vault',
    idea: 'A zero-knowledge medical records vault where patients own their encrypted EHR data on a secure distributed ledger and grant temporary cryptographic access to visiting doctors.',
    problem: 'Medical history is fragmented across dozens of disconnected hospital portals, leading to fatal diagnostic errors.'
  }
];

export default function IdeaInput({
  idea,
  setIdea,
  problemStatement,
  setProblemStatement,
  onSubmit,
  isLoading,
  critics = []
}) {
  const handleSelectSample = (sample) => {
    setIdea(sample.idea);
    setProblemStatement(sample.problem);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!idea.trim() || isLoading) return;
    onSubmit();
  };

  const highSeverityCount = critics.filter(
    (c) => (c.severity || '').toLowerCase() === 'high'
  ).length;

  return (
    <div className="theme-card featured-session-card">
      <div className="featured-header-badge">
        <Sparkles size={14} />
        FEATURED ADVERSARIAL SESSION
      </div>

      <h2 className="featured-title">AI Attack Chamber</h2>
      <p className="featured-role-subtitle">
        Simulate hostile critique across 5 opposing industry perspectives.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Main Idea Input */}
        <div className="input-block-dark">
          <div className="input-block-label">
            <span>Startup / Project Idea *</span>
            <span style={{ color: '#a855f7' }}>Core Proposition</span>
          </div>
          <textarea
            id="idea-input"
            className="dark-textarea"
            rows={3}
            placeholder="Describe your startup concept, target audience, and business model in 2-3 sentences..."
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        {/* Optional Problem Statement */}
        <div className="input-block-dark">
          <div className="input-block-label">
            <span>Problem Statement</span>
            <span style={{ color: 'var(--text-dim)' }}>Optional</span>
          </div>
          <textarea
            id="problem-input"
            className="dark-textarea"
            rows={2}
            placeholder="What core problem or inefficiency are you solving? Why now?"
            value={problemStatement}
            onChange={(e) => setProblemStatement(e.target.value)}
            disabled={isLoading}
          />
        </div>

        {/* Quick Sample Prompts */}
        <div className="sample-chips-row">
          {SAMPLE_IDEAS.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              className="sample-chip"
              onClick={() => handleSelectSample(sample)}
              disabled={isLoading}
            >
              <Lightbulb size={12} style={{ color: '#ec4899' }} />
              {sample.title}
            </button>
          ))}
        </div>

        {/* Primary Purple Action Button */}
        <button
          type="submit"
          id="stress-test-btn"
          className="btn-primary-purple"
          disabled={!idea.trim() || isLoading}
        >
          <Flame size={17} />
          {isLoading ? 'Running Attacks...' : 'Stress Test My Idea'}
        </button>
      </form>

      {/* Stats Row at bottom of card (matches "Total Followers | Profile Views | Engagement Rate | Est. Earnings") */}
      <div className="featured-stats-row">
        <div className="stat-item">
          <div className="stat-label">
            <Flame size={13} style={{ color: '#c026d3' }} />
            <span>AI Personas</span>
          </div>
          <div className="stat-value">5.0</div>
          <div className="stat-trend">
            <ArrowUpRight size={13} />
            <span>100% active</span>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-label">
            <Eye size={13} style={{ color: '#38bdf8' }} />
            <span>Attack Vectors</span>
          </div>
          <div className="stat-value">15+</div>
          <div className="stat-trend">
            <ArrowUpRight size={13} />
            <span>Live scrutiny</span>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-label">
            <ShieldAlert size={13} style={{ color: '#f43f5e' }} />
            <span>Threat Severity</span>
          </div>
          <div className="stat-value">
            {critics.length > 0 ? (highSeverityCount >= 2 ? 'HIGH' : 'MED') : 'ELEVATED'}
          </div>
          <div className={`stat-trend ${highSeverityCount >= 2 ? 'high-risk' : 'medium-risk'}`}>
            <ArrowUpRight size={13} />
            <span>{critics.length > 0 ? `${highSeverityCount} Critical` : 'Hostile Audit'}</span>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-label">
            <DollarSign size={13} style={{ color: '#22c55e' }} />
            <span>Moat Strength</span>
          </div>
          <div className="stat-value">
            {critics.length > 0 ? 'FORTIFY' : 'TESTING'}
          </div>
          <div className="stat-trend">
            <ArrowUpRight size={13} />
            <span>Unit Economics</span>
          </div>
        </div>
      </div>
    </div>
  );
}
