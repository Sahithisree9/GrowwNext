import React from 'react';
import { formatCurrency } from '../data/mockData';
import { TrendingDown } from 'lucide-react';

/**
 * UnderstandHero — Phase 4A
 *
 * Calm, readable header answering:
 * "Your investments changed today"
 *
 * Shows:
 * - Delta: −₹120 (−1.5% of invested amount) for Aarav / −₹650 (−1.3%) for Riya
 * - Subtext: "Here's what that means for you."
 *
 * Avoids alarmist styling (no bright reds, warning triangles, or panic phrasing).
 */
export function UnderstandHero({ event }) {
  if (!event) return null;

  const { portfolioChange, portfolioChangePercent, investedAmount } = event;
  const changeFormatted = `${portfolioChange < 0 ? '−' : '+'}${formatCurrency(Math.abs(portfolioChange))}`;
  const pctFormatted = `${portfolioChangePercent < 0 ? '−' : '+'}${Math.abs(portfolioChangePercent)}%`;

  return (
    <div className="understand-hero-card">
      <div className="understand-hero-top">
        <span className="understand-hero-eyebrow">MOCK FINANCIAL EVENT</span>
        <div className="understand-badge-soft">
          <TrendingDown size={13} strokeWidth={2.4} />
          <span>Temporary Movement</span>
        </div>
      </div>

      <h2 className="understand-hero-title">Your investments changed today</h2>

      <div className="understand-delta-strip">
        <div className="understand-delta-value">{changeFormatted}</div>
        <div className="understand-delta-pct">
          {pctFormatted} of invested amount ({formatCurrency(investedAmount)})
        </div>
      </div>

      <p className="understand-hero-subtext">
        Here's what that means for you and whether it affects your plans.
      </p>
    </div>
  );
}
