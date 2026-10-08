import React from 'react';
import { formatCurrency } from '../data/mockData';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';

/**
 * NextStepCard — Phase 3
 *
 * Connects progress back to the contextual decision loop:
 * PROGRESS → NEXT SENSIBLE DECISION
 *
 * Pulls amount dynamically from persona.unallocatedCash.
 * Non-directive copy: "You have ₹X that hasn't been assigned yet. Decide what makes sense for you."
 */
export function NextStepCard({ unallocatedCash = 0, onGoToDecide }) {
  return (
    <div className="next-step-card">
      <div className="next-step-header">
        <div className="next-step-badge">
          <Sparkles size={12} strokeWidth={2.4} />
          <span>YOUR NEXT STEP</span>
        </div>
      </div>

      <div className="next-step-body">
        <h4 className="next-step-headline">
          You have {formatCurrency(unallocatedCash)} that hasn't been assigned yet.
        </h4>
        <p className="next-step-subtext">
          Decide what makes sense for you — add toward your goal, build your buffer, or keep it liquid.
        </p>
      </div>

      <button
        className="next-step-cta-btn"
        onClick={onGoToDecide}
        type="button"
      >
        <Compass size={16} strokeWidth={2.2} />
        <span>Decide what to do</span>
        <ArrowRight size={16} strokeWidth={2.2} />
      </button>
    </div>
  );
}
