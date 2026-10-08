import React from 'react';
import {
  DollarSign,
  Users,
  Scale,
  ShieldAlert,
  Swords,
  AlertCircle
} from 'lucide-react';

const PERSONA_CONFIG = {
  'investor': {
    slug: 'investor',
    icon: DollarSign,
    role: 'Venture Capitalist',
    accentColor: '#22c55e',
  },
  'customer': {
    slug: 'customer',
    icon: Users,
    role: 'End Consumer',
    accentColor: '#38bdf8',
  },
  'regulator': {
    slug: 'regulator',
    icon: Scale,
    role: 'Compliance & Legal',
    accentColor: '#f59e0b',
  },
  'security expert': {
    slug: 'security-expert',
    icon: ShieldAlert,
    role: 'Cybersecurity Analyst',
    accentColor: '#f43f5e',
  },
  'competitor': {
    slug: 'competitor',
    icon: Swords,
    role: 'Incumbent Category Leader',
    accentColor: '#a855f7',
  },
};

export default function CriticCard({ critic }) {
  const roleKey = (critic.role || '').toLowerCase().trim();
  const config = PERSONA_CONFIG[roleKey] || {
    slug: 'generic',
    icon: AlertCircle,
    role: 'Adversary',
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
            <h4 className="critic-persona-title">{critic.role}</h4>
            <span className="critic-persona-role">{config.role}</span>
          </div>
        </div>

        {critic.severity && (
          <span className={`theme-severity-pill ${severity}`}>
            {critic.severity} Risk
          </span>
        )}
      </div>

      <div className="critic-statement">
        "{critic.criticism}"
      </div>

      {critic.concern && (
        <div className="critic-concern-panel">
          <div className="concern-panel-title">
            <AlertCircle size={12} style={{ color: config.accentColor }} />
            Primary Vulnerability
          </div>
          <div className="concern-panel-text">
            {critic.concern}
          </div>
        </div>
      )}
    </div>
  );
}
