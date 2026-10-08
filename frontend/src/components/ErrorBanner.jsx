import React from 'react';
import { AlertTriangle, RotateCcw, Zap } from 'lucide-react';

export default function ErrorBanner({
  error,
  onRetry,
  onSwitchToDemo
}) {
  if (!error) return null;

  return (
    <div className="theme-error-box">
      <AlertTriangle size={24} style={{ color: '#f43f5e', flexShrink: 0, marginTop: '2px' }} />

      <div style={{ flexGrow: 1 }}>
        <h4 style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.98rem', marginBottom: '4px' }}>
          Simulation Interrupted
        </h4>
        <p style={{ color: '#d1d5db', fontSize: '0.86rem', marginBottom: '12px' }}>
          {error.message || 'Unable to connect to the AI assessment service. You can retry or switch to offline Demo Mode.'}
        </p>

        <div style={{ display: 'flex', gap: '10px' }}>
          {onRetry && (
            <button
              type="button"
              className="btn-primary-purple"
              style={{ padding: '8px 18px', fontSize: '0.82rem', marginBottom: 0 }}
              onClick={onRetry}
            >
              <RotateCcw size={13} />
              Retry Connection
            </button>
          )}

          {onSwitchToDemo && (
            <button
              type="button"
              className="sample-chip"
              style={{ background: '#222230', borderColor: '#a855f7' }}
              onClick={onSwitchToDemo}
            >
              <Zap size={13} style={{ color: '#f59e0b' }} />
              Switch to Demo Mode
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
