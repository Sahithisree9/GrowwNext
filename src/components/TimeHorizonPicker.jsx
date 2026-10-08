import { Clock, Info, CheckCircle2 } from 'lucide-react';
import { TIME_HORIZONS } from '../data/mockData';

/**
 * TimeHorizonPicker — Phase 2C
 *
 * Demonstrates: USER CONTEXT + INTENT + TIME HORIZON → UNDERSTANDING
 *
 * Provides neutral contextual education, explicitly avoiding prescriptive
 * product category recommendations.
 */
export function TimeHorizonPicker({ selectedHorizonId, onSelectHorizon }) {
  const activeHorizon = TIME_HORIZONS.find((h) => h.id === selectedHorizonId) || TIME_HORIZONS[2];

  return (
    <div className="horizon-picker-container">
      <div className="horizon-picker-header">
        <div className="horizon-header-badge">
          <Clock size={14} strokeWidth={2.4} />
          <span>Before we talk investments</span>
        </div>
        <h4 className="horizon-picker-title">
          How long can you leave this money untouched?
        </h4>
        <p className="horizon-picker-subtext">
          Understanding your time frame helps clarify how market fluctuations might affect your plans.
        </p>
      </div>

      <div className="horizon-options-list" role="radiogroup" aria-label="Select investment time horizon">
        {TIME_HORIZONS.map((h) => {
          const isSelected = h.id === selectedHorizonId;

          return (
            <div
              key={h.id}
              className={`horizon-option-card ${isSelected ? 'horizon-option-selected' : ''}`}
              onClick={() => onSelectHorizon(h.id)}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectHorizon(h.id);
                }
              }}
            >
              <div className="horizon-option-left">
                <span className="horizon-option-label">{h.label}</span>
                <span className="horizon-option-subtext">{h.subtext}</span>
              </div>

              <div className="horizon-option-right">
                <CheckCircle2
                  size={18}
                  className={isSelected ? 'indicator-active' : 'indicator-inactive'}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Neutral Contextual Education Box */}
      <div className="horizon-education-box">
        <div className="horizon-education-header">
          <Info size={14} className="horizon-education-icon" />
          <span className="horizon-education-title">
            Understanding this time frame ({activeHorizon.label})
          </span>
        </div>
        <p className="horizon-education-body">{activeHorizon.education}</p>
      </div>
    </div>
  );
}
