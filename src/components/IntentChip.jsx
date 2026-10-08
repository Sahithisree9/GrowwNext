import React from 'react';
import { Shield, Target, TrendingUp, Check } from 'lucide-react';

const intentIconMap = {
  Shield: Shield,
  Target: Target,
  TrendingUp: TrendingUp,
};

export const IntentChip = ({ intent, isSelected, onSelect }) => {
  const IconComponent = intentIconMap[intent.icon] || Shield;

  return (
    <div
      className={`intent-chip ${isSelected ? 'intent-chip-active' : ''}`}
      onClick={() => onSelect(intent.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(intent.id);
        }
      }}
      aria-pressed={isSelected}
    >
      <div className="intent-chip-icon">
        <IconComponent size={18} strokeWidth={2} />
      </div>

      <div className="intent-chip-content">
        <span className="intent-chip-label">{intent.label}</span>
        <span className="intent-chip-desc">{intent.desc}</span>
      </div>

      <div className={`intent-chip-selector ${isSelected ? 'intent-chip-selector-active' : ''}`} aria-hidden="true">
        {isSelected && <Check size={11} strokeWidth={3} />}
      </div>
    </div>
  );
};
