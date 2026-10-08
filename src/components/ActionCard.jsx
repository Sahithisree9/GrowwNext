import React from 'react';
import { formatCurrency } from '../data/mockData';
import { ShieldCheck, Target, TrendingUp, Sparkles } from 'lucide-react';

const INTENT_ICONS = {
  safety: ShieldCheck,
  goal: Target,
  invest: TrendingUp,
};

const INTENT_THEMES = {
  safety: {
    accent: 'emerald',
    badgeText: 'Safety Cushion',
    eyebrow: 'FOUNDATION FIRST',
  },
  goal: {
    accent: 'amber',
    badgeText: 'Goal Progress',
    eyebrow: 'SAVING WITH PURPOSE',
  },
  invest: {
    accent: 'indigo',
    badgeText: 'Investing Step',
    eyebrow: 'LONG-TERM THINKING',
  },
};

/**
 * ActionCard — Phase 2C
 *
 * Displays the primary allocated action card:
 * - Allocated amount (derived from Phase 2B allocation engine)
 * - Clear action headline
 * - Why this makes sense contextual explanation
 */
export function ActionCard({ intentId, amount, headline, rationale, subtitle }) {
  const Icon = INTENT_ICONS[intentId] || Sparkles;
  const theme = INTENT_THEMES[intentId] || INTENT_THEMES.safety;

  return (
    <div className={`action-card action-card-${theme.accent}`}>
      <div className="action-card-header">
        <div className="action-card-badge-row">
          <span className="action-card-eyebrow">{theme.eyebrow}</span>
          <span className={`action-card-pill pill-${theme.accent}`}>
            <Icon size={12} strokeWidth={2.4} />
            <span>{theme.badgeText}</span>
          </span>
        </div>

        <div className="action-amount-strip">
          <span className="action-amount-label">Allocated action amount</span>
          <span className="action-amount-value">{formatCurrency(amount)}</span>
        </div>
      </div>

      <div className="action-card-body">
        <h3 className="action-headline">{headline}</h3>
        {subtitle && <p className="action-subtitle">{subtitle}</p>}

        <div className="action-rationale-box">
          <span className="action-rationale-tag">WHY THIS MAKES SENSE</span>
          <p className="action-rationale-text">{rationale}</p>
        </div>
      </div>
    </div>
  );
}
