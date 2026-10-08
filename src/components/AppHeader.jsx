import React from 'react';
import { RefreshCw, SlidersHorizontal } from 'lucide-react';

export const AppHeader = ({ currentPersona, onSwitchPersona, onOpenScenarioControls }) => {
  return (
    <header className="app-header">
      <div className="brand-section">
        <div className="brand-mark" aria-hidden="true">
          <span>G</span>
        </div>
        <div className="brand-text">
          <h1>Groww Next</h1>
          <span className="brand-subtext">Context Layer</span>
        </div>
      </div>

      <div className="header-actions">
        <button
          className="scenario-control-btn"
          onClick={onOpenScenarioControls}
          title="Prototype Controls (Demo-only scenario inputs)"
          type="button"
          aria-label="Open prototype scenario controls"
        >
          <SlidersHorizontal size={14} />
        </button>

        <button 
          className="user-badge" 
          onClick={onSwitchPersona}
          title="Toggle mock Gen-Z persona"
          type="button"
          aria-label={`Current mock persona: ${currentPersona.name}. Click to switch.`}
        >
          <span className="user-avatar">{currentPersona.avatarInitials}</span>
          <div className="user-badge-text">
            <span className="user-name">{currentPersona.name}</span>
            <span className="user-role-snippet">{currentPersona.role.split(' ')[0]}</span>
          </div>
          <RefreshCw size={11} className="switch-icon" />
        </button>
      </div>
    </header>
  );
};
