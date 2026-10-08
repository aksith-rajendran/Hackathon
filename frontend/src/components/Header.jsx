import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function Header({ isDemoMode, onToggleDemoMode }) {
  return (
    <header className="dashboard-topbar">
      <div className="topbar-titles">
        <h1>AI Idea Stress Tester</h1>
        <p>Find the flaws in your startup idea before you build it.</p>
      </div>

      <div className="topbar-actions">
        <button
          type="button"
          className="date-pill"
          onClick={onToggleDemoMode}
          title="Click to toggle between live backend and demo mode"
        >
          <Sparkles size={15} style={{ color: '#a855f7' }} />
          <span>{isDemoMode ? 'Demo Mode (Offline Safe)' : 'Live Engine (Port 5000)'}</span>
        </button>

        <div className="header-status-badge">
          <CheckCircle2 size={15} style={{ color: '#22c55e' }} />
          <span>Connected</span>
        </div>
      </div>
    </header>
  );
}
