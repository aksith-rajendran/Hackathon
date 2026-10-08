import React, { useState } from 'react';
import CriticCard from './CriticCard.jsx';
import { Users, Filter } from 'lucide-react';

export default function CriticGrid({ critics = [] }) {
  const [selectedRole, setSelectedRole] = useState('all');

  if (!critics || critics.length === 0) return null;

  const filteredCritics = selectedRole === 'all'
    ? critics
    : critics.filter((c) => (c.role || '').toLowerCase().includes(selectedRole.toLowerCase()));

  const rolePills = [
    { id: 'all', label: `All Critics (${critics.length})` },
    { id: 'investor', label: '💼 Investor' },
    { id: 'customer', label: '👤 Customer' },
    { id: 'regulator', label: '⚖️ Legal' },
    { id: 'security', label: '🔒 Security' },
    { id: 'competitor', label: '⚔️ Competitor' },
  ];

  return (
    <div id="critics-section" className="organized-section" style={{ marginBottom: '32px', scrollMarginTop: '80px' }}>
      {/* Section Header */}
      <div className="section-title-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="section-number-pill">STEP 2</div>
          <h3 className="critics-section-title" style={{ margin: 0 }}>
            What the 5 Critics Said
          </h3>
        </div>
        <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
          Click any reviewer below to focus:
        </span>
      </div>

      {/* Role Filter Tabs */}
      <div className="critic-filter-tabs">
        {rolePills.map((pill) => (
          <button
            key={pill.id}
            type="button"
            className={`filter-pill-btn ${selectedRole === pill.id ? 'active' : ''}`}
            onClick={() => setSelectedRole(pill.id)}
          >
            {pill.label}
          </button>
        ))}
      </div>

      {/* Grid of Critic Cards */}
      <div className="critics-cards-grid">
        {filteredCritics.map((critic, index) => (
          <CriticCard key={`${critic.role}-${index}`} critic={critic} />
        ))}
      </div>
    </div>
  );
}
