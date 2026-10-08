import React from 'react';
import { formatCurrency } from '../data/mockData';
import { Target, CheckCircle2 } from 'lucide-react';

/**
 * GoalImpactCard — Phase 4A
 *
 * Question 3: DOES IT CHANGE MY PROGRESS?
 *
 * Checks impact against currentPersona.primaryGoal:
 * - "Your goal progress is still ₹X of ₹Y."
 * - "Today's portfolio movement is a change in your investments;
 *    it doesn't by itself change the progress you've recorded toward this goal."
 */
export function GoalImpactCard({ goal }) {
  if (!goal) return null;

  const { title, currentSaved, targetAmount, category } = goal;
  const pct = Math.min(100, Math.round((currentSaved / targetAmount) * 100));

  return (
    <div className="understand-card goal-impact-card">
      <div className="understand-card-header">
        <span className="understand-step-tag">3. DOES IT CHANGE MY PROGRESS?</span>
        <Target size={15} className="step-tag-icon" />
      </div>

      <h3 className="understand-card-title">
        Your goal progress is still {formatCurrency(currentSaved)} of {formatCurrency(targetAmount)}.
      </h3>

      {/* Goal Preview Box */}
      <div className="goal-status-box">
        <div className="goal-status-top">
          <div className="goal-status-info">
            <span className="goal-status-name">{title}</span>
            <span className="goal-status-cat">{category}</span>
          </div>
          <span className="goal-status-pct">{pct}% recorded</span>
        </div>

        <div className="goal-status-track">
          <div className="goal-status-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="understand-card-body">
        <div className="goal-impact-statement">
          <CheckCircle2 size={16} className="impact-check-icon" />
          <p className="impact-statement-text">
            Today's portfolio movement is a change in your investments; it doesn't by itself change the progress you've recorded toward this goal.
          </p>
        </div>
      </div>
    </div>
  );
}
