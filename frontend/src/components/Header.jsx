import React from 'react';
import { Calendar, Bell } from 'lucide-react';

export default function Header({ isDemoMode, onToggleDemoMode }) {
  const currentDateStr = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date());

  return (
    <header className="dashboard-topbar">
      <div className="topbar-titles">
        <h1>Idea Stress Tester</h1>
        <p>Attack. Analyze. Fortify.</p>
      </div>

      <div className="topbar-actions">
        <button
          type="button"
          className="date-pill"
          onClick={onToggleDemoMode}
          title="Toggle Live / Demo mode"
        >
          <Calendar size={15} style={{ color: '#a855f7' }} />
          <span>{isDemoMode ? 'Demo Mode (Offline Safe)' : `${currentDateStr} • Live Engine`}</span>
        </button>

        <button type="button" className="icon-btn-pill" aria-label="Notifications">
          <Bell size={17} />
          <span className="notification-dot" />
        </button>

        <div className="user-avatar-pill" title="AI Team Lead">
          <span style={{ color: '#c084fc' }}>IG</span>
        </div>
      </div>
    </header>
  );
}
