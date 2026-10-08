import React from 'react';
import {
  Flame,
  Sparkles,
  Lightbulb,
  ShieldAlert,
  Users,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const SAMPLE_IDEAS = [
  {
    title: '🎓 College Internship App',
    idea: 'We want to create an app that helps college students find internships.',
    problem: 'College students struggle to get their resumes noticed, and companies get flooded with generic applications.'
  },
  {
    title: '⚖️ Freelancer Contract Helper',
    idea: 'An AI tool that reads client contracts for freelancers and highlights bad terms before they sign.',
    problem: 'Freelancers sign risky contracts because hiring a lawyer costs too much.'
  },
  {
    title: '🥗 Home Chef Meal Prep',
    idea: 'An app connecting local home chefs with busy families to cook healthy dinners at home.',
    problem: 'Ordering takeout every day is unhealthy and expensive, while private chefs are usually only for the rich.'
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
        STEP 1 • ENTER YOUR IDEA
      </div>

      <h2 className="featured-title">Test Your Startup Idea</h2>
      <p className="featured-role-subtitle">
        Tell us what you want to build. 5 AI critics will find the biggest flaws and show you how to fix them.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Main Idea Input */}
        <div className="input-block-dark">
          <div className="input-block-label">
            <span>Your Idea *</span>
            <span style={{ color: '#a855f7' }}>Required</span>
          </div>
          <textarea
            id="idea-input"
            className="dark-textarea"
            rows={3}
            placeholder="e.g. We want to create an app that helps college students find internships."
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        {/* Optional Problem Statement */}
        <div className="input-block-dark">
          <div className="input-block-label">
            <span>What problem does it solve?</span>
            <span style={{ color: 'var(--text-dim)' }}>Optional</span>
          </div>
          <textarea
            id="problem-input"
            className="dark-textarea"
            rows={2}
            placeholder="Explain why people need this or what is broken today..."
            value={problemStatement}
            onChange={(e) => setProblemStatement(e.target.value)}
            disabled={isLoading}
          />
        </div>

        {/* Quick Sample Prompts */}
        <div style={{ marginBottom: '14px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px', display: 'block' }}>
            Click an example to test quickly:
          </span>
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
        </div>

        {/* Primary Purple Action Button */}
        <button
          type="submit"
          id="stress-test-btn"
          className="btn-primary-purple"
          disabled={!idea.trim() || isLoading}
        >
          <Flame size={17} />
          {isLoading ? 'Testing Your Idea Across 5 Critics...' : 'Start Stress Test'}
        </button>
      </form>

      {/* Simple Information Badges */}
      <div className="featured-stats-row">
        <div className="stat-item">
          <div className="stat-label">
            <Users size={13} style={{ color: '#c026d3' }} />
            <span>5 Critics</span>
          </div>
          <div className="stat-value">Active</div>
          <div className="stat-trend">
            <span>5 viewpoints</span>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-label">
            <ShieldAlert size={13} style={{ color: '#f43f5e' }} />
            <span>Risk Check</span>
          </div>
          <div className="stat-value">
            {critics.length > 0 ? (highSeverityCount > 0 ? `${highSeverityCount} High` : 'Clear') : 'Ready'}
          </div>
          <div className="stat-trend">
            <span>Finds weak spots</span>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-label">
            <CheckCircle size={13} style={{ color: '#22c55e' }} />
            <span>Action Plan</span>
          </div>
          <div className="stat-value">Included</div>
          <div className="stat-trend">
            <span>Fixes & tips</span>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-label">
            <Sparkles size={13} style={{ color: '#38bdf8' }} />
            <span>New Pitch</span>
          </div>
          <div className="stat-value">Rewritten</div>
          <div className="stat-trend">
            <span>Better version</span>
          </div>
        </div>
      </div>
    </div>
  );
}
