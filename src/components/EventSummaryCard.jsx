import React from 'react';
import { formatCurrency } from '../data/mockData';
import { Eye, Info } from 'lucide-react';

/**
 * EventSummaryCard — Phase 4A
 *
 * Question 1: WHAT HAPPENED?
 *
 * Plain-language explanation:
 * "In this example, your investments are worth about ₹X less than they were at the start of the day."
 *
 * Avoids technical jargon and does not imply live verified market feeds.
 */
export function EventSummaryCard({ event }) {
  if (!event) return null;

  const changeAbs = Math.abs(event.portfolioChange);

  return (
    <div className="understand-card event-summary-card">
      <div className="understand-card-header">
        <span className="understand-step-tag">1. WHAT HAPPENED</span>
        <Eye size={15} className="step-tag-icon" />
      </div>

      <h3 className="understand-card-title">
        In this example, your investments are worth about {formatCurrency(changeAbs)} less than at the start of the day.
      </h3>

      <div className="understand-card-body">
        <p className="understand-body-text">
          Daily price movements are normal when holding investments. This number reflects how the market priced your holdings today — it is a temporary valuation change, not a permanent loss.
        </p>

        <div className="understand-micro-note">
          <Info size={12} className="micro-note-icon" />
          <span>Mock scenario for demonstration · Not connected to live feeds.</span>
        </div>
      </div>
    </div>
  );
}
