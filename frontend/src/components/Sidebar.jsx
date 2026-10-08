import React from 'react';
import {
  Lightbulb,
  Users,
  Sparkles,
  RotateCcw,
  Zap,
  CheckCircle2
} from 'lucide-react';

export default function Sidebar({
  activeTab,
  onSelectTab,
  hasCritics,
  hasAnalysis,
  onReset,
  isDemoMode,
  onToggleDemo
}) {
  return (
    <aside className="dashboard-sidebar">
      {/* Brand Logo */}
      <div className="sidebar-logo">
        <div className="logo-badge">
          <Zap size={22} fill="white" />
        </div>
        <span className="logo-text">Idea Tester</span>
      </div>

      {/* Working Navigation Buttons */}
      <nav className="sidebar-nav">
        {/* 1. Input Idea Button */}
        <button
          type="button"
          className={`nav-item ${activeTab === 'input' ? 'active' : ''}`}
          onClick={() => onSelectTab('input')}
        >
          <Lightbulb size={19} />
          <span>Input Idea</span>
        </button>

        {/* 2. 5 Critics Button */}
        <button
          type="button"
          className={`nav-item ${activeTab === 'critics' ? 'active' : ''}`}
          onClick={() => onSelectTab('critics')}
        >
          <Users size={19} />
          <span>5 Critics</span>
          {hasCritics && (
            <span className="sidebar-pill-badge">5</span>
          )}
        </button>

        {/* 3. Final Analysis Button */}
        <button
          type="button"
          className={`nav-item ${activeTab === 'analysis' ? 'active' : ''}`}
          onClick={() => onSelectTab('analysis')}
        >
          <Sparkles size={19} />
          <span>Final Analysis</span>
          {hasAnalysis && (
            <CheckCircle2 size={15} style={{ color: '#22c55e', marginLeft: 'auto' }} />
          )}
        </button>

        {/* 4. Reset Button */}
        <button
          type="button"
          className="nav-item"
          onClick={onReset}
          title="Clear form and test a new idea"
        >
          <RotateCcw size={19} />
          <span>Reset Form</span>
        </button>
      </nav>

      {/* Simple Status & Engine Mode */}
      <div className="sidebar-pro-box">
        <div className="pro-header">
          <Zap size={17} style={{ color: '#a855f7' }} />
          <span>Engine Status</span>
        </div>
        <p className="pro-desc">
          {isDemoMode
            ? 'Running in safe offline demo mode.'
            : 'Connected to live backend engine on port 5000.'}
        </p>
        <button
          type="button"
          className="btn-upgrade"
          onClick={onToggleDemo}
        >
          {isDemoMode ? 'Switch to Live Engine' : 'Switch to Demo Mode'}
        </button>
      </div>
    </aside>
  );
}
