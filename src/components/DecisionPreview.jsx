import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const DecisionPreview = ({ scenario, availableCash, onBeginJourney }) => {
  if (!scenario) return null;

  const isJourneyCard = scenario.hasJourney === true;

  return (
    <div className="decision-preview-box">
      <div className="preview-header">
        <div className="preview-title-badge">
          <Sparkles size={13} className="sparkle-icon" />
          <span>Context Preview</span>
        </div>
        <span className="preview-scenario-label">{scenario.title}</span>
      </div>

      <p className="preview-body">
        {scenario.contextualHint}
      </p>

      {!isJourneyCard && scenario.recommendedSplit && (
        <div className="preview-split-chips">
          {Object.entries(scenario.recommendedSplit).map(([key, val]) => (
            <div key={key} className="preview-chip">
              <span className="chip-key">
                {key.replace(/([A-Z])/g, ' $1')}:
              </span>
              <span className="chip-val">{val}</span>
            </div>
          ))}
        </div>
      )}

      <div className="preview-action-row">
        <div className="preview-amount-caption">
          <span className="caption-label">Context Allocation</span>
          <span className="caption-amount">₹{availableCash.toLocaleString('en-IN')} available</span>
        </div>

        <button
          className="preview-btn-mock"
          onClick={isJourneyCard ? onBeginJourney : undefined}
          type="button"
        >
          <span>{scenario.sampleActionLabel}</span>
          <ArrowRight size={13} strokeWidth={2.4} />
        </button>
      </div>

      {isJourneyCard && (
        <div className="preview-journey-hint">
          <CheckCircle2 size={13} />
          <span>Tap above to begin the payday decision flow</span>
        </div>
      )}
    </div>
  );
};
