import React, { useState } from 'react';
import {
  DollarSign,
  Users,
  Scale,
  ShieldAlert,
  Swords,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const PERSONA_CONFIG = {
  'investor': {
    slug: 'investor',
    icon: DollarSign,
    simpleTitle: 'The Investor',
    focusArea: 'Money & Profits',
    accentColor: '#22c55e',
  },
  'customer': {
    slug: 'customer',
    icon: Users,
    simpleTitle: 'The Customer',
    focusArea: 'Ease of Use & Value',
    accentColor: '#38bdf8',
  },
  'regulator': {
    slug: 'regulator',
    icon: Scale,
    simpleTitle: 'The Legal Reviewer',
    focusArea: 'Rules & Privacy Laws',
    accentColor: '#f59e0b',
  },
  'security expert': {
    slug: 'security-expert',
    icon: ShieldAlert,
    simpleTitle: 'The Security Expert',
    focusArea: 'Safety & Scams',
    accentColor: '#f43f5e',
  },
  'competitor': {
    slug: 'competitor',
    icon: Swords,
    simpleTitle: 'The Competitor',
    focusArea: 'Big Rivals & Copycats',
    accentColor: '#a855f7',
  },
};

export default function CriticCard({ critic }) {
  const [showQuestions, setShowQuestions] = useState(false);
  const roleKey = (critic.role || '').toLowerCase().trim();
  const config = PERSONA_CONFIG[roleKey] || {
    slug: 'generic',
    icon: AlertCircle,
    simpleTitle: critic.role || 'Reviewer',
    focusArea: 'Expert Opinion',
    accentColor: '#a855f7',
  };

  const Icon = config.icon;
  const severity = (critic.severity || 'Medium').toLowerCase();

  return (
    <div className={`theme-card critic-theme-card ${config.slug}`}>
      <div className="critic-card-top">
        <div className="critic-avatar-group">
          <div className="critic-icon-badge" style={{ borderColor: `${config.accentColor}40` }}>
            <Icon size={20} style={{ color: config.accentColor }} />
          </div>
          <div>
            <h4 className="critic-persona-title">{config.simpleTitle}</h4>
            <span className="critic-persona-role">{config.focusArea}</span>
          </div>
        </div>

        {critic.severity && (
          <span className={`theme-severity-pill ${severity}`}>
            {critic.severity} Risk
          </span>
        )}
      </div>

      {/* Main Criticism in Simple English */}
      <div className="critic-statement">
        "{critic.criticism}"
      </div>

      {/* What they are worried about */}
      {critic.concern && (
        <div className="critic-concern-panel">
          <div className="concern-panel-title">
            <AlertCircle size={13} style={{ color: config.accentColor }} />
            Their Biggest Worry:
          </div>
          <div className="concern-panel-text">
            {critic.concern}
          </div>
        </div>
      )}

      {/* Tough questions they would ask */}
      {critic.questions && critic.questions.length > 0 && (
        <div style={{ marginTop: '12px' }}>
          <button
            type="button"
            className="btn-toggle-questions"
            onClick={() => setShowQuestions(!showQuestions)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <HelpCircle size={13} style={{ color: config.accentColor }} />
              <span>{showQuestions ? 'Hide Questions' : `See 3 Questions They Would Ask`}</span>
            </div>
            {showQuestions ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>

          {showQuestions && (
            <ul className="critic-questions-list">
              {critic.questions.map((q, idx) => (
                <li key={idx}>• {q}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
