import React from 'react';
import { Wallet, Target, TrendingUp, HelpCircle, Check } from 'lucide-react';

const iconMap = {
  Wallet: Wallet,
  Target: Target,
  TrendingUp: TrendingUp,
  HelpCircle: HelpCircle
};

export const SituationalCard = ({ scenario, isSelected, onSelect }) => {
  const IconComponent = iconMap[scenario.icon] || HelpCircle;

  return (
    <div 
      className={`situation-card ${isSelected ? 'active' : ''}`}
      onClick={() => onSelect(scenario)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(scenario);
        }
      }}
      aria-pressed={isSelected}
    >
      <div className="card-icon-container">
        <IconComponent size={19} strokeWidth={2} />
      </div>

      <div className="card-content">
        <div className="card-header-line">
          <span className="situation-title">{scenario.title}</span>
          <span className="situation-tag">{scenario.badge}</span>
        </div>
        <p className="situation-desc">{scenario.description}</p>
      </div>

      <div className={`card-select-indicator ${isSelected ? 'selected' : ''}`} aria-hidden="true">
        {isSelected && <Check size={12} strokeWidth={2.8} className="select-check-icon" />}
      </div>
    </div>
  );
};
