import React, { useState } from 'react';
import { ArrowLeft, Target, ArrowRight, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '../data/mockData';
import { GoalPicker } from '../components/GoalPicker';

/**
 * GoalDecisionView — Phase 5C
 *
 * Situation 2: "I'm saving for something"
 * Asks "What's the money for?", shows persona's centralized goals,
 * calculates contextual fit and impact, and proceeds to the existing Action flow.
 */
export function GoalDecisionView({
  currentPersona,
  onBackToDecide,
  onProceedToAction,
}) {
  const goals = currentPersona.goals || [];
  const primaryGoal = currentPersona.primaryGoal
    ? goals.find((g) => g.id === currentPersona.primaryGoal) || goals[0]
    : goals[0];

  const [selectedGoalId, setSelectedGoalId] = useState(primaryGoal ? primaryGoal.id : null);
  const selectedGoal = goals.find((g) => g.id === selectedGoalId) || primaryGoal;

  const availableCash = currentPersona.unallocatedCash || 2500;
  const currentSaved = selectedGoal?.currentSaved || 0;
  const targetAmount = selectedGoal?.targetAmount || 10000;
  const projectedSaved = currentSaved + availableCash;
  const currentPct = Math.min(100, Math.round((currentSaved / targetAmount) * 100));
  const projectedPct = Math.min(100, Math.round((projectedSaved / targetAmount) * 100));

  const isBufferThin = (currentPersona.emergencyReserve || 0) < (currentPersona.emergencyReserveTarget || 10000) * 0.5;

  return (
    <div className="view-container goal-decision-view">
      {/* Top Navigation */}
      <div className="view-nav-header">
        <button
          className="back-btn"
          onClick={onBackToDecide}
          type="button"
          aria-label="Back to Decide"
        >
          <ArrowLeft size={16} />
          <span>Decide</span>
        </button>
        <div className="view-phase-badge">
          <span>GOAL DECISION</span>
        </div>
      </div>

      {/* Header */}
      <div className="goal-decide-hero">
        <div className="hero-icon-pill">
          <Target size={14} />
          <span>Save toward something</span>
        </div>
        <h2 className="goal-decide-title">What's the money for?</h2>
        <p className="goal-decide-subtitle">
          You have <strong className="highlight-val">{formatCurrency(availableCash)}</strong> ready to decide today.
          Choose a goal to see how this money accelerates your target.
        </p>
      </div>

      {/* Goal Selector */}
      <div className="goal-selection-section">
        <GoalPicker
          goals={goals}
          allocatedAmount={availableCash}
          selectedGoalId={selectedGoalId}
          onSelectGoal={(goalId) => setSelectedGoalId(goalId)}
        />
      </div>

      {/* Contextual Meaning Card */}
      {selectedGoal && (
        <div className="goal-fit-card">
          <div className="goal-fit-header">
            <CheckCircle2 size={16} className="fit-icon" />
            <span className="fit-header-title">How this fits your situation</span>
          </div>

          <p className="goal-fit-text">
            Putting {formatCurrency(availableCash)} toward <strong>{selectedGoal.title}</strong> increases your savings
            from {formatCurrency(currentSaved)} ({currentPct}%) to {formatCurrency(projectedSaved)} ({projectedPct}%).
          </p>

          {isBufferThin ? (
            <div className="buffer-reminder-note">
              <ShieldCheck size={13} className="reminder-icon" />
              <span>
                Your safety buffer is at {formatCurrency(currentPersona.emergencyReserve || 0)} (below {formatCurrency(currentPersona.emergencyReserveTarget || 10000)}).
                Saving for {selectedGoal.title} is a great milestone, while keeping your living essentials untouched.
              </span>
            </div>
          ) : (
            <div className="buffer-reminder-note buffer-healthy-note">
              <ShieldCheck size={13} className="reminder-icon" />
              <span>
                Your emergency buffer is in stable shape ({formatCurrency(currentPersona.emergencyReserve || 0)}), so allocating this surplus toward {selectedGoal.title} carries minimal risk.
              </span>
            </div>
          )}

          {selectedGoal.targetMonths && (
            <div className="goal-timeline-pill">
              <Clock size={12} />
              <span>Target timeline: ~{selectedGoal.targetMonths} months</span>
            </div>
          )}
        </div>
      )}

      {/* Primary CTA */}
      <div className="goal-decide-actions">
        <button
          className="btn-primary-action"
          onClick={() => onProceedToAction(selectedGoal, availableCash)}
          type="button"
        >
          <span>Put {formatCurrency(availableCash)} toward {selectedGoal?.title || 'goal'}</span>
          <ArrowRight size={15} strokeWidth={2.4} />
        </button>
        <p className="disclaimer-note">
          Prototype interaction · Captures your decision in your progress timeline.
        </p>
      </div>
    </div>
  );
}
