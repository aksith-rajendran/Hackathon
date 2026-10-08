import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight
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
    <div>
      {/* Bottom Grid matching "Top Performing Content" & "Engagement Overview" */}
      <div className="bottom-dashboard-grid">
        {/* Left: Top Vulnerabilities Identified (matches "Top Performing Content") */}
        <div className="theme-card weakness-list-card">
          <div className="metric-card-header">
            <h3 className="metric-card-title">Top Vulnerabilities Identified</h3>
            <span className="metric-select-pill">Ranked by Impact</span>
          </div>

          <div className="table-header-row">
            <span>Critical Failure Point</span>
            <span style={{ textAlign: 'right' }}>Severity</span>
          </div>

          {biggestWeaknesses.map((weakness, idx) => (
            <div key={idx} className="table-row-item">
              <div className="weakness-title-col">
                <div className="weakness-rank-badge">
                  {idx + 1}
                </div>
                <div className="weakness-text-main">
                  {weakness}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span className={`theme-severity-pill ${idx === 0 ? 'high' : 'medium'}`}>
                  {idx === 0 ? 'Critical' : 'Elevated'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Countermeasures & Roadmap (matches "Engagement Overview") */}
        <div className="theme-card roadmap-card">
          <div className="metric-card-header">
            <h3 className="metric-card-title">Defense Fortification</h3>
            <span className="metric-select-pill">Roadmap ▾</span>
          </div>

          <div className="metric-main-stat">
            <span>+94.2%</span>
            <div className="stat-percentage-pill">
              <ArrowUpRight size={15} />
              <span>14.3% Moat Expansion</span>
            </div>
          </div>

          {/* Mini Bar Chart SVG matching "Engagement Overview" in screenshot */}
          <div style={{ height: '70px', marginBottom: '14px' }}>
            <svg viewBox="0 0 280 70" width="100%" height="100%">
              {/* Vertical purple / magenta bars */}
              {[
                { x: 10, h: 45, color: '#9333ea' },
                { x: 30, h: 60, color: '#a855f7' },
                { x: 50, h: 30, color: '#9333ea' },
                { x: 70, h: 65, color: '#c026d3' },
                { x: 90, h: 25, color: '#9333ea' },
                { x: 110, h: 50, color: '#a855f7' },
                { x: 130, h: 55, color: '#c026d3' },
                { x: 150, h: 40, color: '#ec4899' },
                { x: 170, h: 35, color: '#9333ea' },
                { x: 190, h: 65, color: '#c026d3' },
                { x: 210, h: 48, color: '#a855f7' },
                { x: 230, h: 60, color: '#ec4899' },
                { x: 250, h: 68, color: '#a855f7' },
              ].map((bar, i) => (
                <rect
                  key={i}
                  x={bar.x}
                  y={70 - bar.h}
                  width="10"
                  height={bar.h}
                  rx="3"
                  fill={bar.color}
                />
              ))}
            </svg>
          </div>

          {/* Actionable Steps */}
          <div className="fixes-container">
            {improvements.slice(0, 3).map((item, idx) => (
              <div key={idx} className="fix-row-item">
                <CheckCircle2 size={16} className="fix-check-icon" />
                <span className="fix-text-content">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full-width Hardened & Improved Idea Card */}
      <div className="hardened-idea-card">
        <div className="hardened-top">
          <div className="hardened-tag">
            <Sparkles size={14} />
            Hardened & Improved Idea Strategy
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
                  Copy Improved Idea
                </>
              )}
            </button>

            <button
              type="button"
              className="btn-copy-purple"
              onClick={onReset}
            >
              <RefreshCw size={13} />
              Reset
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
