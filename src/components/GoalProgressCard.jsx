import React from 'react';
import { formatCurrency } from '../data/mockData';
import { History } from 'lucide-react';

/**
 * GoalProgressCard — Phase 3
 *
 * Metric breakdown of the primary goal:
 * - Current saved
 * - Remaining to go
 * - Current monthly pace
 * - Last recorded action (mock continuity state)
 */
export function GoalProgressCard({ goal, lastSessionAction }) {
  if (!goal) return null;

  const {
    currentSaved = 0,
    targetAmount = 0,
    monthlyContribution = 0,
    lastAction,
  } = goal;

  const remaining = Math.max(0, targetAmount - currentSaved);
  const progressPct = Math.min(100, Math.round((currentSaved / targetAmount) * 100));

  let displayLastAction = lastAction;
  if (lastSessionAction) {
    if (lastSessionAction.type === 'goal') {
      displayLastAction = lastSessionAction.label;
    } else if (lastSessionAction.type === 'safety') {
      displayLastAction = `${lastSessionAction.label} · Goal progress untouched`;
    } else if (lastSessionAction.type === 'growth') {
      displayLastAction = `${lastSessionAction.label} · Goal progress untouched`;
    } else if (lastSessionAction.type === 'flex') {
      displayLastAction = `${lastSessionAction.label} · Goal progress untouched`;
    }
  }

  return (
    <div className="goal-breakdown-card">
      <div className="breakdown-header">
        <h4 className="breakdown-title">Goal Breakdown</h4>
        <span className="breakdown-pct-tag">{progressPct}% saved</span>
      </div>

      <div className="breakdown-grid">
        <div className="breakdown-tile">
          <span className="tile-label">Saved so far</span>
          <span className="tile-val tile-val-primary">{formatCurrency(currentSaved)}</span>
        </div>

        <div className="breakdown-tile">
          <span className="tile-label">Remaining to go</span>
          <span className="tile-val">{formatCurrency(remaining)}</span>
        </div>

        <div className="breakdown-tile">
          <span className="tile-label">Target amount</span>
          <span className="tile-val">{formatCurrency(targetAmount)}</span>
        </div>

        <div className="breakdown-tile">
          <span className="tile-label">Monthly pace</span>
          <span className="tile-val tile-val-emerald">
            {monthlyContribution > 0 ? `${formatCurrency(monthlyContribution)}/mo` : 'Flexible'}
          </span>
        </div>
      </div>

      {/* Continuity element: Last recorded action */}
      {displayLastAction && (
        <div className="last-action-strip">
          <div className="last-action-icon">
            <History size={13} />
          </div>
          <div className="last-action-content">
            <span className="last-action-label">Last action</span>
            <span className="last-action-text">{displayLastAction}</span>
          </div>
        </div>
      )}
    </div>
  );
}
