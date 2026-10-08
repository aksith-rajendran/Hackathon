import React from 'react';
import {
  LayoutDashboard,
  BarChart3,
  Flame,
  Users2,
  DollarSign,
  MessageSquare,
  FileText,
  Settings,
  Sparkles,
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function Sidebar({ activeTab, onSelectTab, isDemoMode, onToggleDemo }) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'stresstest', label: 'Stress Test', icon: Flame },
    { id: 'personas', label: 'AI Personas', icon: Users2 },
    { id: 'vulnerabilities', label: 'Vulnerabilities', icon: BarChart3 },
    { id: 'strategy', label: 'Pivot Strategy', icon: Sparkles },
    { id: 'reports', label: 'Audit Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="dashboard-sidebar">
      {/* Brand Logo */}
      <div className="sidebar-logo">
        <div className="logo-badge">
          <Zap size={22} fill="white" />
        </div>
        <span className="logo-text">IdeaGuard</span>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onSelectTab(item.id)}
            >
              <Icon size={19} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Pro Plan Card at Bottom */}
      <div className="sidebar-pro-box">
        <div className="pro-header">
          <ShieldCheck size={18} style={{ color: '#a855f7' }} />
          <span>Pro Defense</span>
        </div>
        <p className="pro-desc">
          Unlock unlimited adversarial AI personas and automated pitch redlines.
        </p>
        <button
          type="button"
          className="btn-upgrade"
          onClick={onToggleDemo}
        >
          {isDemoMode ? 'Live Mode' : 'Demo Fallback'}
        </button>
      </div>
    </aside>
  );
}
