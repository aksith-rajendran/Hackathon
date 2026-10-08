import React from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle,
  Users,
  Lightbulb,
  CheckCircle2
} from 'lucide-react';

export default function ThreatMetrics({ critics = [] }) {
  const hasResults = critics.length > 0;
  const highCount = critics.filter((c) => (c.severity || '').toLowerCase() === 'high').length;
  const mediumCount = critics.filter((c) => (c.severity || '').toLowerCase() === 'medium').length;
  const lowCount = critics.filter((c) => (c.severity || '').toLowerCase() === 'low').length;

  if (!hasResults) {
    return (
      <div className="metrics-stack">
        {/* Welcome / How It Works Card */}
        <div className="theme-card">
          <div className="metric-card-header">
            <h3 className="metric-card-title">How It Works</h3>
          </div>
          <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span className="step-badge-mini">1</span>
              <div>
                <strong style={{ fontSize: '0.9rem' }}>Type Your Idea</strong>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  Enter what you want to build and who it is for.
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span className="step-badge-mini">2</span>
              <div>
                <strong style={{ fontSize: '0.9rem' }}>5 AI Critics Review It</strong>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  Investor, Customer, Legal, Security, and Competitor point out flaws.
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span className="step-badge-mini">3</span>
              <div>
                <strong style={{ fontSize: '0.9rem' }}>Get A Better Version</strong>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  See key fixes and a stronger, rewritten version of your idea.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* The 5 Critics List */}
        <div className="theme-card">
          <div className="metric-card-header">
            <h3 className="metric-card-title">The 5 Reviewers</h3>
          </div>
          <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div className="critic-mini-row">
              <span style={{ color: '#22c55e', fontWeight: 600 }}>• Investor</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Checks money & market</span>
            </div>
            <div className="critic-mini-row">
              <span style={{ color: '#38bdf8', fontWeight: 600 }}>• Customer</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Checks ease of use</span>
            </div>
            <div className="critic-mini-row">
              <span style={{ color: '#f59e0b', fontWeight: 600 }}>• Regulator</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Checks laws & privacy</span>
            </div>
            <div className="critic-mini-row">
              <span style={{ color: '#f43f5e', fontWeight: 600 }}>• Security</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Checks safety & scams</span>
            </div>
            <div className="critic-mini-row">
              <span style={{ color: '#a855f7', fontWeight: 600 }}>• Competitor</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Checks if others do it</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="metrics-stack">
      {/* Risk Summary Card */}
      <div className="theme-card">
        <div className="metric-card-header">
          <h3 className="metric-card-title">Risk Overview</h3>
          <span className="metric-select-pill">5 Critics Finished</span>
        </div>

        <div className="metric-main-stat">
          <span>{highCount > 0 ? `${highCount} High Risks` : 'Moderate'}</span>
          <div className="stat-percentage-pill" style={{ color: highCount > 0 ? '#f43f5e' : '#22c55e' }}>
            <span>{highCount > 2 ? 'Needs Changes' : 'Manageable'}</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginTop: '12px' }}>
          <div style={{ background: 'rgba(239, 68, 68, 0.12)', padding: '8px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f43f5e' }}>{highCount}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>High Risk</div>
          </div>
          <div style={{ background: 'rgba(245, 158, 11, 0.12)', padding: '8px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f59e0b' }}>{mediumCount}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Medium</div>
          </div>
          <div style={{ background: 'rgba(34, 197, 94, 0.12)', padding: '8px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#22c55e' }}>{lowCount}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Low</div>
          </div>
        </div>
      </div>

      {/* Critic Breakdown Card */}
      <div className="theme-card">
        <div className="metric-card-header">
          <h3 className="metric-card-title">Reviewer Breakdown</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
          {critics.map((c, i) => {
            const sev = (c.severity || 'Medium').toLowerCase();
            const color = sev === 'high' ? '#f43f5e' : sev === 'medium' ? '#f59e0b' : '#22c55e';
            return (
              <div key={i} className="critic-mini-row">
                <span style={{ fontWeight: 600 }}>{c.role}</span>
                <span style={{
                  color,
                  background: `${color}18`,
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 700
                }}>
                  {c.severity || 'Medium'} Risk
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
