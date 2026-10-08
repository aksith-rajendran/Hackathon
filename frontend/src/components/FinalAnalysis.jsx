import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function FinalAnalysis({
  analysis,
  critics = [],
  onReset
}) {
  const [copied, setCopied] = useState(false);

  if (!analysis) return null;

  const { biggestWeaknesses = [], improvements = [], improvedIdea = '' } = analysis;

  const handleCopy = () => {
    if (!improvedIdea) return;
    navigator.clipboard.writeText(improvedIdea);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="analysis-section" className="organized-section" style={{ scrollMarginTop: '80px', marginTop: '16px' }}>
      {/* Step 3 Header */}
      <div className="section-title-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="section-number-pill">STEP 3</div>
          <h3 className="critics-section-title" style={{ margin: 0 }}>
            Weaknesses, Fixes & The Better Pitch
          </h3>
        </div>
        <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
          Synthesized from all 5 reviewers
        </span>
      </div>

      {/* 2-Column Grid: Weaknesses + Fixes */}
      <div className="bottom-dashboard-grid">
        {/* Left Column: Weaknesses */}
        <div className="theme-card weakness-list-card">
          <div className="metric-card-header">
            <h3 className="metric-card-title">Main Weaknesses Found</h3>
            <span className="metric-select-pill">The 4 Big Traps</span>
          </div>

          <div className="table-header-row">
            <span>What Could Go Wrong</span>
            <span style={{ textAlign: 'right' }}>Risk Level</span>
          </div>

          {biggestWeaknesses.map((weakness, idx) => {
            const displayText = typeof weakness === 'object' && weakness !== null
              ? (weakness.problem ? `${weakness.problem}${weakness.whyItMatters ? `: ${weakness.whyItMatters}` : ''}` : JSON.stringify(weakness))
              : String(weakness);

            return (
              <div key={idx} className="table-row-item">
                <div className="weakness-title-col">
                  <div className="weakness-rank-badge">
                    {idx + 1}
                  </div>
                  <div className="weakness-text-main">
                    {displayText}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span className={`theme-severity-pill ${idx === 0 ? 'high' : 'medium'}`}>
                    {idx === 0 ? 'High Risk' : 'Medium Risk'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Practical Fixes */}
        <div className="theme-card roadmap-card">
          <div className="metric-card-header">
            <h3 className="metric-card-title">How to Fix Them</h3>
            <span className="metric-select-pill">{improvements.length} Practical Fixes</span>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px', marginBottom: '14px' }}>
            Follow these concrete steps to turn the critics' objections into advantages:
          </p>

          <div className="fixes-container">
            {improvements.map((item, idx) => (
              <div key={idx} className="fix-row-item">
                <CheckCircle2 size={18} className="fix-check-icon" style={{ flexShrink: 0 }} />
                <span className="fix-text-content">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full-width Better Version Card */}
      <div className="hardened-idea-card">
        <div className="hardened-top">
          <div className="hardened-tag">
            <Sparkles size={16} />
            A Better, Hardened Version of Your Idea
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              className="btn-copy-purple"
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <Check size={14} style={{ color: '#22c55e' }} />
                  Copied to Clipboard!
                </>
              ) : (
                <>
                  <Copy size={14} />
                  Copy Better Pitch
                </>
              )}
            </button>

            <button
              type="button"
              className="btn-copy-purple"
              onClick={onReset}
            >
              <RotateCcw size={14} />
              Test Another Idea
            </button>
          </div>
        </div>

        <div className="hardened-idea-text">
          {improvedIdea}
        </div>
      </div>
    </div>
  );
}
