import React from 'react';
import { formatCurrency } from '../data/mockData';
import { CheckCircle2, TrendingUp, Clock } from 'lucide-react';

/**
 * ProgressHero — Phase 3
 *
 * Visual hero section for the primary goal progress.
 *
 * Evaluates:
 * - Current saved vs Target
 * - Percentage complete
 * - Meaningful timeline check:
 *   If current pace supports targetMonths -> "You're on track"
 *   Otherwise -> "You're making steady progress"
 */
export function ProgressHero({ goal }) {
  if (!goal) return null;

  const {
    title,
    category,
    targetAmount,
    currentSaved,
    monthlyContribution = 0,
    targetMonths,
  } = goal;

  const remaining = Math.max(0, targetAmount - currentSaved);
  const progressPct = Math.min(100, Math.round((currentSaved / targetAmount) * 100));
  const hasPace = monthlyContribution > 0;
  const monthsRemaining = hasPace ? Math.ceil(remaining / monthlyContribution) : null;

  // Evaluate on-track based on actual timeline constraint in mock data
  const hasTimeline = typeof targetMonths === 'number' && targetMonths > 0;
  const isOnTrack = hasPace && hasTimeline && monthsRemaining <= targetMonths;

  let statusBadgeText = "You're making steady progress";
  let statusBadgeClass = "badge-steady";
  let explanationText = "";

  if (isOnTrack) {
    statusBadgeText = "You're on track";
    statusBadgeClass = "badge-ontrack";
    explanationText = `At your current pace of ${formatCurrency(
      monthlyContribution
    )}/month, you're roughly ${monthsRemaining} months away from your goal.`;
  } else if (hasPace) {
    statusBadgeText = "You're making steady progress";
    statusBadgeClass = "badge-steady";
    explanationText = `At ${formatCurrency(
      monthlyContribution
    )}/month, you're roughly ${monthsRemaining} months away from your target.`;
  } else {
    statusBadgeText = "You're making progress";
    statusBadgeClass = "badge-neutral";
    explanationText = "You're putting money toward this goal. Contributing regularly helps lock in a completion timeline.";
  }

  return (
    <div className="progress-hero-card">
      <div className="progress-hero-top">
        <div className="hero-goal-meta">
          <span className="hero-goal-category">{category || 'Personal Goal'}</span>
          <h3 className="hero-goal-title">{title}</h3>
        </div>

        <div className={`hero-status-pill ${statusBadgeClass}`}>
          {isOnTrack ? (
            <CheckCircle2 size={13} strokeWidth={2.4} />
          ) : (
            <TrendingUp size={13} strokeWidth={2.4} />
          )}
          <span>{statusBadgeText}</span>
        </div>
      </div>

      {/* Progress Numbers */}
      <div className="hero-numbers-strip">
        <div className="hero-amount-group">
          <span className="hero-current-val">{formatCurrency(currentSaved)}</span>
          <span className="hero-target-val">of {formatCurrency(targetAmount)}</span>
        </div>
        <div className="hero-pct-badge">{progressPct}% complete</div>
      </div>

      {/* Progress Bar Track */}
      <div className="hero-progress-track">
        <div
          className="hero-progress-fill"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* On-Track Explanation Box */}
      <div className="hero-explanation-box">
        <div className="explanation-header">
          <Clock size={13} className="explanation-icon" />
          <span className="explanation-tag">PACE & TIMELINE</span>
        </div>
        <p className="explanation-text">{explanationText}</p>
      </div>
    </div>
  );
}
