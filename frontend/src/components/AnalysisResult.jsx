import React, { useState } from 'react';

export default function AnalysisResult({ analysis, originalIdea }) {
  const [copied, setCopied] = useState(false);

  const copyImprovedIdea = () => {
    if (analysis?.improvedIdea) {
      navigator.clipboard.writeText(analysis.improvedIdea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!analysis) return null;

  return (
    <div className="analysis-result-container">
      <div className="analysis-banner">
        <div className="analysis-banner-badge">
          <span>🛡️ STRESS TEST SYNTHESIS COMPLETE</span>
        </div>
        <h2 className="analysis-title">Strategic Vulnerability & Pivot Report</h2>
        <p className="analysis-subtitle">
          The Final AI Analyzer synthesized the insights across all 5 critics to isolate fatal flaws and engineer a hardened value proposition.
        </p>
      </div>

      <div className="analysis-grid">
        {/* Biggest Weaknesses */}
        <div className="analysis-column weaknesses-col">
          <div className="column-header">
            <span className="col-icon">⚠️</span>
            <h3>Biggest Weaknesses Identified</h3>
          </div>
          <div className="weakness-list">
            {analysis.biggestWeaknesses?.map((w, index) => (
              <div key={index} className="weakness-item">
                <span className="item-number">0{index + 1}</span>
                <p>{w}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actionable Improvements */}
        <div className="analysis-column improvements-col">
          <div className="column-header">
            <span className="col-icon">💡</span>
            <h3>Actionable Pivots & Fixes</h3>
          </div>
          <div className="improvement-list">
            {analysis.improvements?.map((imp, index) => (
              <div key={index} className="improvement-item">
                <span className="item-check">✓</span>
                <p>{imp}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Improved Idea Pitch */}
      <div className="improved-idea-card">
        <div className="improved-idea-header">
          <div>
            <span className="badge-improved">✨ HARDENED PROPOSAL</span>
            <h3>The Improved Idea</h3>
          </div>
          <button
            type="button"
            className="copy-btn"
            onClick={copyImprovedIdea}
          >
            {copied ? '✓ Copied!' : '📋 Copy Pitch'}
          </button>
        </div>

        <div className="improved-idea-body">
          <p>{analysis.improvedIdea}</p>
        </div>

        <div className="idea-comparison">
          <div className="comparison-row">
            <span className="comp-tag original">Original Idea:</span>
            <span className="comp-text">"{originalIdea}"</span>
          </div>
        </div>
      </div>
    </div>
  );
}
