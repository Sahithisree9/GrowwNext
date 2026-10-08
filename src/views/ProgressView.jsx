import React from 'react';
import { ProgressHero } from '../components/ProgressHero';
import { GoalProgressCard } from '../components/GoalProgressCard';
import { NextStepCard } from '../components/NextStepCard';
import { Target, Users } from 'lucide-react';

/**
 * ProgressView — Phase 3
 *
 * Dedicated "Am I on Track?" progress experience:
 * 1. Where am I now?
 * 2. What am I trying to achieve?
 * 3. Am I on track?
 * 4. What's my next sensible step?
 */
export function ProgressView({
  currentPersona,
  activeGoal,
  lastSessionAction,
  onGoToDecide,
  onSwitchPersona,
}) {
  // Only use activeGoal if the last recorded session action was explicitly a goal action.
  // For safety or growth actions, goal balances remain at baseline!
  const isGoalAction = lastSessionAction?.type === 'goal';
  const goal = (isGoalAction && activeGoal)
    ? activeGoal
    : (currentPersona?.primaryGoal || currentPersona?.goals?.[0]);

  return (
    <div className="progress-view">
      {/* ── Top Bar ────────────────────────────── */}
      <div className="progress-top-bar">
        <div className="progress-top-title-group">
          <div className="progress-badge-icon">
            <Target size={14} strokeWidth={2.4} />
          </div>
          <span className="progress-top-step">PHASE 3 · PROGRESS</span>
        </div>

        {onSwitchPersona && (
          <button
            className="progress-persona-switch-btn"
            onClick={onSwitchPersona}
            type="button"
            title="Switch persona"
          >
            <Users size={12} />
            <span>{currentPersona?.name}</span>
          </button>
        )}
      </div>

      <div className="progress-scroll-content app-content">
        {/* ── Screen Header ──────────────────────── */}
        <div className="progress-screen-header">
          <h2 className="progress-page-title">Your progress</h2>
          <p className="progress-page-subtext">
            Here's how your money is moving you toward what matters.
          </p>
        </div>

        {/* ── 0. Session Action Confirmation Banner (Semantic Cross-Journey Integrity) ── */}
        {lastSessionAction && (
          <div className={`session-action-status-card status-${lastSessionAction.type}`}>
            <div className="status-header">
              <span className="status-badge">SESSION ACTION RECORDED</span>
              <span className="status-type-label">
                {lastSessionAction.type === 'goal' ? '🎯 Goal Allocation' :
                 lastSessionAction.type === 'safety' ? '🛡️ Safety Buffer' :
                 lastSessionAction.type === 'growth' ? '📈 Growth Preference' : '✨ Flexible Cash'}
              </span>
            </div>
            <p className="status-label">{lastSessionAction.label}</p>
            <p className="status-detail">{lastSessionAction.detail}</p>
          </div>
        )}

        {/* ── 1. Progress Hero (Primary Goal) ───── */}
        <ProgressHero goal={goal} />

        {/* ── 2. Detailed Goal Breakdown & Continuity ── */}
        <GoalProgressCard goal={goal} lastSessionAction={lastSessionAction} />

        {/* ── 3. Next Sensible Step ──────────────── */}
        <NextStepCard
          unallocatedCash={currentPersona?.unallocatedCash || 0}
          onGoToDecide={onGoToDecide}
        />
      </div>
    </div>
  );
}
