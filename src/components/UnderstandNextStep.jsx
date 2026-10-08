import React from 'react';
import { Target, ArrowRight, Compass, ShieldCheck } from 'lucide-react';

/**
 * UnderstandNextStep — Phase 4A
 *
 * Question 4: SHOULD I DO ANYTHING?
 *
 * Calm, neutral, non-prescriptive next step:
 * - "Do you need to change anything? Not necessarily."
 * - No buy/sell/hold/SIP advice.
 * - Primary CTA: "View my progress" (navigates to Progress)
 * - Secondary button: "Back to Decide" (returns to Decide)
 */
export function UnderstandNextStep({ onGoToProgress, onGoToDecide }) {
  return (
    <div className="understand-card understand-next-card">
      <div className="understand-card-header">
        <span className="understand-step-tag">4. SHOULD I DO ANYTHING?</span>
        <ShieldCheck size={15} className="step-tag-icon" />
      </div>

      <h3 className="understand-card-title">Do you need to change anything?</h3>

      <div className="understand-card-body">
        <p className="understand-body-text">
          Not necessarily. A short-term portfolio movement doesn't automatically mean your existing goal or plan needs to change. Sticking with your plan usually serves you better than reacting to daily market noise.
        </p>

        <div className="understand-actions-group">
          <button
            className="understand-primary-cta"
            onClick={onGoToProgress}
            type="button"
          >
            <Target size={16} strokeWidth={2.2} />
            <span>View my progress</span>
            <ArrowRight size={16} strokeWidth={2.2} />
          </button>

          <button
            className="understand-secondary-btn"
            onClick={onGoToDecide}
            type="button"
          >
            <Compass size={15} strokeWidth={2.2} />
            <span>Back to Decide</span>
          </button>
        </div>
      </div>
    </div>
  );
}
