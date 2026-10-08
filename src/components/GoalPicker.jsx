import React from 'react';
import { formatCurrency } from '../data/mockData';
import { Laptop, Palmtree, Shield, Target, CheckCircle2 } from 'lucide-react';

const ICON_MAP = {
  Laptop: Laptop,
  Palmtree: Palmtree,
  Shield: Shield,
  Target: Target,
};

// Fallback mock goals if no persona goals provided
const MOCK_GOALS = [
  {
    id: 'g_laptop',
    title: 'New Laptop',
    targetAmount: 45000,
    currentSaved: 12000,
    iconName: 'Laptop',
    category: 'Work & Productivity',
  },
  {
    id: 'g_trip',
    title: 'Goa Trip',
    targetAmount: 20000,
    currentSaved: 8500,
    iconName: 'Palmtree',
    category: 'Travel & Experiences',
  },
  {
    id: 'g_emergency',
    title: 'Rainy Day Fund',
    targetAmount: 30000,
    currentSaved: 4000,
    iconName: 'Shield',
    category: 'Peace of Mind',
  },
];

/**
 * GoalPicker — Phase 2C & 4B
 *
 * Demonstrates: Allocation → Goal → Projected Progress
 *
 * Receives persona goals dynamically. Calculates projected progress:
 * currentSaved + allocatedAmount
 */
export function GoalPicker({
  goals = MOCK_GOALS,
  allocatedAmount = 0,
  selectedGoalId,
  onSelectGoal,
}) {
  const activeGoals = goals && goals.length > 0 ? goals : MOCK_GOALS;

  return (
    <div className="goal-picker-container">
      <div className="goal-picker-header">
        <h4 className="goal-picker-title">Choose which goal to put this toward</h4>
        <span className="goal-picker-disclaimer">Mock goals for demonstration</span>
      </div>

      <div className="goal-cards-list" role="radiogroup" aria-label="Select a savings goal">
        {activeGoals.map((goal) => {
          const isSelected = goal.id === selectedGoalId;
          const Icon = ICON_MAP[goal.iconName] || goal.icon || Target;
          const title = goal.title || goal.name;
          const target = goal.targetAmount || goal.target;
          const current = goal.currentSaved ?? goal.current ?? 0;

          const currentPct = Math.min(100, Math.round((current / target) * 100));
          const projectedTotal = current + allocatedAmount;
          const projectedPct = Math.min(100, Math.round((projectedTotal / target) * 100));
          const gainPct = projectedPct - currentPct;

          return (
            <div
              key={goal.id}
              className={`goal-card ${isSelected ? 'goal-card-selected' : ''}`}
              onClick={() => onSelectGoal(goal.id)}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectGoal(goal.id);
                }
              }}
            >
              <div className="goal-card-top">
                <div className="goal-icon-wrapper">
                  <Icon size={18} strokeWidth={2.2} />
                </div>
                <div className="goal-meta">
                  <div className="goal-name-row">
                    <span className="goal-name">{title}</span>
                    <span className="goal-category">{goal.category}</span>
                  </div>
                  <div className="goal-target-strip">
                    Target: <span className="goal-target-val">{formatCurrency(target)}</span>
                  </div>
                </div>

                <div className="goal-select-indicator">
                  <CheckCircle2
                    size={18}
                    className={isSelected ? 'indicator-active' : 'indicator-inactive'}
                  />
                </div>
              </div>

              {/* Progress bar with projected increment */}
              <div className="goal-progress-section">
                <div className="goal-progress-bar-track">
                  <div
                    className="goal-progress-fill-current"
                    style={{ width: `${currentPct}%` }}
                  />
                  {isSelected && (
                    <div
                      className="goal-progress-fill-projected"
                      style={{
                        left: `${currentPct}%`,
                        width: `${gainPct}%`,
                      }}
                    />
                  )}
                </div>

                <div className="goal-progress-stats">
                  <span className="goal-stat-current">
                    Current: <strong>{formatCurrency(current)}</strong> ({currentPct}%)
                  </span>
                  {isSelected ? (
                    <span className="goal-stat-projected">
                      After action: <strong>{formatCurrency(projectedTotal)}</strong> ({projectedPct}%)
                    </span>
                  ) : (
                    <span className="goal-stat-remaining">
                      {formatCurrency(Math.max(0, target - current))} remaining
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
