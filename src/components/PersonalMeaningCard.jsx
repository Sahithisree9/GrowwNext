import React from 'react';
import { formatCurrency } from '../data/mockData';
import { Compass, Sparkles } from 'lucide-react';

/**
 * PersonalMeaningCard — Phase 4A
 *
 * Question 2: WHAT DOES THIS MEAN FOR YOU?
 *
 * Answers: "Why should I care about this number?"
 * Headline: "Your portfolio is down ₹X, but your goal hasn't changed."
 */
export function PersonalMeaningCard({ event }) {
  if (!event) return null;

  const changeAbs = Math.abs(event.portfolioChange);

  return (
    <div className="understand-card personal-meaning-card">
      <div className="understand-card-header">
        <span className="understand-step-tag">2. WHAT DOES THIS MEAN FOR YOU?</span>
        <Compass size={15} className="step-tag-icon" />
      </div>

      <h3 className="understand-card-title">
        Your portfolio is down {formatCurrency(changeAbs)}, but your goal hasn't changed.
      </h3>

      <div className="understand-card-body">
        <p className="understand-body-text">
          Day-to-day fluctuations can feel alarming in isolation. But short-term pricing only matters if you need to liquidate right now. If your timeline is longer, today's drop is just normal fluctuation along the way.
        </p>

        <div className="meaning-takeaway-box">
          <Sparkles size={14} className="takeaway-icon" />
          <p className="takeaway-text">
            <strong>Key takeaway:</strong> A daily fluctuation is not a signal that your financial direction is broken.
          </p>
        </div>
      </div>
    </div>
  );
}
