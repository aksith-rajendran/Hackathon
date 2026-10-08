import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function ThreatMetrics({ critics = [] }) {
  // Dynamic stats based on critics if present, or initial baseline
  const hasResults = critics.length > 0;
  const highCount = critics.filter((c) => (c.severity || '').toLowerCase() === 'high').length;

  return (
    <div className="metrics-stack">
      {/* 1. Attack Exposure Curve Card (matches "Audience Growth") */}
      <div className="theme-card">
        <div className="metric-card-header">
          <h3 className="metric-card-title">Threat Intensity</h3>
          <span className="metric-select-pill">Live Session ▾</span>
        </div>

        <div className="metric-main-stat">
          <span>{hasResults ? `+${(highCount * 7.4 + 10).toFixed(1)}K` : '+24.8K'}</span>
          <div className="stat-percentage-pill">
            <ArrowUpRight size={15} />
            <span>18.6%</span>
          </div>
        </div>

        {/* Purple Curved Chart matching screenshot */}
        <div className="curve-chart-box">
          <svg viewBox="0 0 320 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="purpleAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9333ea" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#9333ea" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Area fill */}
            <path
              d="M 0 85 C 50 80, 80 20, 160 18 C 240 16, 270 25, 320 75 L 320 100 L 0 100 Z"
              fill="url(#purpleAreaGrad)"
            />

            {/* Glowing stroke curve */}
            <path
              d="M 0 85 C 50 80, 80 20, 160 18 C 240 16, 270 25, 320 75"
              fill="none"
              stroke="#c026d3"
              strokeWidth="3.2"
              strokeLinecap="round"
            />

            {/* End point dot */}
            <circle cx="320" cy="75" r="4.5" fill="#f43f5e" />
          </svg>
        </div>
      </div>

      {/* 2. Vulnerability Sources Donut Card (matches "Traffic Sources") */}
      <div className="theme-card">
        <div className="metric-card-header">
          <h3 className="metric-card-title">Attack Vectors</h3>
        </div>

        <div className="donut-layout">
          {/* SVG Donut Chart */}
          <div className="donut-svg-wrapper">
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              {/* Outer stroke segments for 60%, 20%, 12%, 8% */}
              {/* Circumference = 2 * PI * 36 = ~226.2 */}
              <circle
                cx="50"
                cy="50"
                r="36"
                fill="transparent"
                stroke="#9333ea"
                strokeWidth="16"
                strokeDasharray="135.7 226.2"
                strokeDashoffset="0"
                transform="rotate(-90 50 50)"
              />
              <circle
                cx="50"
                cy="50"
                r="36"
                fill="transparent"
                stroke="#c026d3"
                strokeWidth="16"
                strokeDasharray="45.2 226.2"
                strokeDashoffset="-135.7"
                transform="rotate(-90 50 50)"
              />
              <circle
                cx="50"
                cy="50"
                r="36"
                fill="transparent"
                stroke="#ec4899"
                strokeWidth="16"
                strokeDasharray="27.1 226.2"
                strokeDashoffset="-180.9"
                transform="rotate(-90 50 50)"
              />
              <circle
                cx="50"
                cy="50"
                r="36"
                fill="transparent"
                stroke="#f43f5e"
                strokeWidth="16"
                strokeDasharray="18.2 226.2"
                strokeDashoffset="-208"
                transform="rotate(-90 50 50)"
              />
            </svg>
          </div>

          {/* Legend matching screenshot */}
          <div className="donut-legend">
            <div className="legend-item">
              <div className="legend-info">
                <span className="legend-dot" style={{ background: '#9333ea' }} />
                <span>Investor</span>
              </div>
              <span className="legend-value">60%</span>
            </div>

            <div className="legend-item">
              <div className="legend-info">
                <span className="legend-dot" style={{ background: '#c026d3' }} />
                <span>Competitor</span>
              </div>
              <span className="legend-value">20%</span>
            </div>

            <div className="legend-item">
              <div className="legend-info">
                <span className="legend-dot" style={{ background: '#ec4899' }} />
                <span>Regulator</span>
              </div>
              <span className="legend-value">12%</span>
            </div>

            <div className="legend-item">
              <div className="legend-info">
                <span className="legend-dot" style={{ background: '#f43f5e' }} />
                <span>Security</span>
              </div>
              <span className="legend-value">8%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
