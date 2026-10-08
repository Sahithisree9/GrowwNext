import React from 'react';
import { Compass, Target, PieChart } from 'lucide-react';

/**
 * BottomNav — Phase 3
 *
 * Navigation tabs:
 * - Decide: Contextual decision-making home screen
 * - Progress: "Am I on track?" personal goal progress
 * - Portfolio: Future phase placeholder (Phase 4)
 */
export const BottomNav = ({ activeTab = 'decide', onSelectTab }) => {
  return (
    <nav className="bottom-nav" aria-label="Main Navigation">
      <button
        className={`nav-item ${activeTab === 'decide' ? 'active' : ''}`}
        type="button"
        aria-current={activeTab === 'decide' ? 'page' : undefined}
        onClick={() => onSelectTab && onSelectTab('decide')}
      >
        <div className="nav-icon-wrapper">
          <Compass size={20} strokeWidth={2.4} />
          {activeTab === 'decide' && <span className="active-dot" />}
        </div>
        <span className="nav-label">Decide</span>
      </button>

      <button
        className={`nav-item ${activeTab === 'progress' ? 'active' : ''}`}
        type="button"
        aria-current={activeTab === 'progress' ? 'page' : undefined}
        onClick={() => onSelectTab && onSelectTab('progress')}
      >
        <div className="nav-icon-wrapper">
          <Target size={19} strokeWidth={2.2} />
          {activeTab === 'progress' && <span className="active-dot" />}
        </div>
        <span className="nav-label">Progress</span>
      </button>

      <button
        className="nav-item disabled"
        type="button"
        disabled
        title="Portfolio Context will be unlocked in Phase 4"
      >
        <div className="nav-icon-wrapper">
          <PieChart size={19} strokeWidth={1.8} />
          <span className="future-badge">Phase 4</span>
        </div>
        <span className="nav-label">Portfolio</span>
      </button>
    </nav>
  );
};
