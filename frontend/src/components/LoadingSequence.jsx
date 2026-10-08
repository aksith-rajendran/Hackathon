import React from 'react';
import {
  DollarSign,
  Users,
  Scale,
  ShieldAlert,
  Swords,
  Brain,
  Sparkles,
  Check,
  Loader2
} from 'lucide-react';

export const LOADING_STEPS = [
  { text: 'Calling Investor...', icon: DollarSign, color: '#22c55e' },
  { text: 'Calling Customer...', icon: Users, color: '#38bdf8' },
  { text: 'Calling Regulator...', icon: Scale, color: '#f59e0b' },
  { text: 'Calling Security Expert...', icon: ShieldAlert, color: '#f43f5e' },
  { text: 'Calling Competitor...', icon: Swords, color: '#a855f7' },
  { text: 'AI is analyzing the attacks...', icon: Brain, color: '#c026d3' },
  { text: 'Building improved idea...', icon: Sparkles, color: '#ec4899' },
];

export default function LoadingSequence({ currentStepIndex = 0 }) {
  const progressPercent = Math.min(
    100,
    Math.round(((currentStepIndex + 1) / LOADING_STEPS.length) * 100)
  );

  return (
    <div className="loading-banner-box">
      <div className="loading-banner-title">
        <Loader2 size={22} style={{ animation: 'spin 1.2s linear infinite', color: '#a855f7' }} />
        Simulating Adversarial Attack Room
      </div>
      <p className="loading-banner-sub">
        Querying 5 adversarial personas and compiling tactical countermeasures...
      </p>

      <div className="loading-stepper-row">
        {LOADING_STEPS.map((step, idx) => {
          const isCompleted = idx < currentStepIndex;
          const isActive = idx === currentStepIndex;
          const isPending = idx > currentStepIndex;
          const Icon = step.icon;

          return (
            <div
              key={idx}
              className={`step-row-item ${
                isCompleted ? 'completed' : isActive ? 'active' : 'pending'
              }`}
            >
              <div
                className="step-row-circle"
                style={isActive ? { background: step.color } : {}}
              >
                {isCompleted ? (
                  <Check size={14} />
                ) : isActive ? (
                  <Icon size={13} />
                ) : (
                  <span>{idx + 1}</span>
                )}
              </div>

              <span className="step-row-name">{step.text}</span>

              {isActive && (
                <span style={{ color: step.color, fontSize: '0.76rem', fontWeight: 700 }}>
                  Active
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="loading-progress-track">
        <div
          className="loading-progress-bar"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
