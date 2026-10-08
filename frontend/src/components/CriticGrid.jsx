import React from 'react';
import CriticCard from './CriticCard.jsx';
import { Users2 } from 'lucide-react';

export default function CriticGrid({ critics = [] }) {
  if (!critics || critics.length === 0) return null;

  return (
    <div style={{ marginBottom: '24px' }}>
      <h3 className="critics-section-title">
        <Users2 size={22} style={{ color: '#c026d3' }} />
        Persona Attack Findings
      </h3>

      <div className="critics-cards-grid">
        {critics.map((critic, index) => (
          <CriticCard key={`${critic.role}-${index}`} critic={critic} />
        ))}
      </div>
    </div>
  );
}
