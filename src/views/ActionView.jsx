import React, { useState } from 'react';
import { computeAllocation } from '../data/allocationEngine';
import { formatCurrency, TIME_HORIZONS } from '../data/mockData';
import { ActionCard } from '../components/ActionCard';
import { GoalPicker } from '../components/GoalPicker';
import { TimeHorizonPicker } from '../components/TimeHorizonPicker';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  RotateCcw,
} from 'lucide-react';

/**
 * ActionView — Phase 2C & 4B
 *
 * Turns the Phase 2B allocation into a concrete, explainable next step.
 *
 * Product principles:
 * 1. Intent determines the primary action.
 * 2. Action amounts come directly from the Phase 2B allocation engine.
 * 3. Session continuity: completing an action updates activeSessionGoal.
 * 4. Lightweight confirmation states only — no real financial transactions.
 */
export function ActionView({
  currentPersona,
  activeGoal,
  selectedIntent = 'safety',
  incomingAmount = 5000,
  initialHorizonId = 'long',
  flowSource = 'payday',
  onBack,
  onReset,
  onViewProgress,
  onRecordAction,
  onRecordGoalAction,
}) {
  // Compute allocation dynamically from Phase 2B engine
  const allocation = computeAllocation(incomingAmount, currentPersona, selectedIntent);
  const { slices } = allocation;

  // Extract the specific slice that matches the selected intent
  const primarySlice =
    slices.find((s) => {
      if (selectedIntent === 'safety') return s.id === 'safety';
      if (selectedIntent === 'goal') return s.id === 'goal';
      return s.id === 'growth';
    }) || slices[0];

  // If entering directly from Goal Decision ("I'm saving for something"), the user committed incomingAmount directly to this goal.
  // Otherwise, use the allocation engine's primary slice amount.
  const actionAmount = flowSource === 'goal_decide' ? incomingAmount : primarySlice.amount;

  // Goals list from persona
  const personaGoals = currentPersona?.goals || [currentPersona?.primaryGoal];
  const initialGoalId = activeGoal?.id || personaGoals[0]?.id;

  // Interaction states
  const [selectedGoalId, setSelectedGoalId] = useState(initialGoalId);
  const [selectedHorizonId, setSelectedHorizonId] = useState(initialHorizonId || TIME_HORIZONS[2].id);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const selectedGoal =
    personaGoals.find((g) => g.id === selectedGoalId) || personaGoals[0];
  const selectedHorizon =
    TIME_HORIZONS.find((h) => h.id === selectedHorizonId) || TIME_HORIZONS[2];

  const goalTitle = selectedGoal.title || selectedGoal.name;
  const currentSaved = selectedGoal.currentSaved ?? selectedGoal.current ?? 0;
  const targetAmount = selectedGoal.targetAmount ?? selectedGoal.target;
  const projectedTotal = currentSaved + actionAmount;
  const projectedPct = Math.min(100, Math.round((projectedTotal / targetAmount) * 100));

  // Handle action confirmation with session state update
  const handleConfirmAction = () => {
    if (onRecordAction) {
      if (selectedIntent === 'goal') {
        const updatedGoal = {
          ...selectedGoal,
          title: goalTitle,
          targetAmount: targetAmount,
          currentSaved: projectedTotal,
          lastAction: `${formatCurrency(actionAmount)} added to your ${goalTitle} goal (recorded for this session)`,
          sessionAllocatedAmount: actionAmount,
        };
        onRecordAction({
          type: 'goal',
          amount: actionAmount,
          goal: updatedGoal,
        });
      } else if (selectedIntent === 'safety') {
        onRecordAction({
          type: 'safety',
          amount: actionAmount,
        });
      } else if (selectedIntent === 'invest') {
        onRecordAction({
          type: 'growth',
          amount: actionAmount,
          horizon: selectedHorizon,
        });
      }
    } else if (onRecordGoalAction && selectedIntent === 'goal') {
      const updatedGoal = {
        ...selectedGoal,
        title: goalTitle,
        targetAmount: targetAmount,
        currentSaved: projectedTotal,
        lastAction: `${formatCurrency(actionAmount)} added to your ${goalTitle} goal (recorded for this session)`,
        sessionAllocatedAmount: actionAmount,
      };
      onRecordGoalAction(updatedGoal);
    }
    setIsConfirmed(true);
  };

  // Derive intent-specific copy and CTA labels
  const getActionConfig = () => {
    switch (selectedIntent) {
      case 'safety':
        return {
          headline: `Move ${formatCurrency(actionAmount)} toward your safety cushion`,
          subtitle: 'Keep this portion liquid to strengthen your emergency buffer.',
          rationale:
            primarySlice.explanation ||
            'Your emergency buffer is still below your target. This keeps more of your money accessible while you build that cushion.',
          ctaLabel: `Mark ${formatCurrency(actionAmount)} for safety cushion`,
          confirmTitle: `${formatCurrency(actionAmount)} marked for your safety cushion`,
          confirmDetail: `Your starter safety cushion is now prioritized at ${formatCurrency(
            currentPersona.emergencyReserve + actionAmount
          )}. This remains accessible in your liquid savings.`,
          confirmNote: 'Recorded for this session · No money was transferred from your bank.',
        };

      case 'goal':
        return {
          headline: `Put ${formatCurrency(actionAmount)} toward a goal`,
          subtitle: 'Earmarking this keeps it distinct from daily discretionary spending.',
          rationale:
            primarySlice.explanation ||
            'Setting money aside for a specific target keeps it separate from everyday expenses, making progress visible.',
          ctaLabel: `Put ${formatCurrency(actionAmount)} toward ${goalTitle}`,
          confirmTitle: 'Added to your plan',
          confirmDetail: `${formatCurrency(actionAmount)} is now reflected in your ${goalTitle} progress.`,
          confirmSubdetail: `Progress updated: ${formatCurrency(projectedTotal)} of ${formatCurrency(targetAmount)} (${projectedPct}% complete).`,
          confirmNote: 'Recorded for this session · Simulated prototype progress.',
        };

      case 'invest':
      default:
        return {
          headline: `Set your investing horizon for ${formatCurrency(actionAmount)}`,
          subtitle: 'Before we discuss any investments, define how long you can leave this money untouched.',
          rationale:
            selectedHorizon?.education ||
            primarySlice.explanation ||
            'Giving your investments time to grow helps you navigate market fluctuations with clarity.',
          ctaLabel: 'Explore options',
          confirmTitle: 'Your investing preference is set',
          confirmDetail: `Preference recorded for ${currentPersona.name} · ${selectedHorizon.label} (${selectedHorizon.subtext}). When you are ready, Groww will help you explore options suited to this time frame.`,
          confirmNote: 'Educational preview · No real financial orders or investments placed.',
        };
    }
  };

  const config = getActionConfig();

  return (
    <div className="action-view">
      {/* ── Top Bar ────────────────────────────── */}
      <div className="action-top-bar">
        <button
          className="action-back-btn"
          onClick={isConfirmed ? () => setIsConfirmed(false) : onBack}
          type="button"
          aria-label="Go back to allocation"
        >
          <ArrowLeft size={18} strokeWidth={2.4} />
          <span>{isConfirmed ? 'Edit Action' : 'Allocation'}</span>
        </button>

        <div className="action-top-center">
          <span className="action-top-step">PHASE 2C · ACTION</span>
        </div>

        <div className="action-persona-tag">
          <span>{currentPersona.name}</span>
        </div>
      </div>

      <div className="action-scroll-content app-content">
        {/* ── Context Strip ──────────────────────── */}
        <div className="action-context-strip">
          <div className="context-strip-pill">
            <Sparkles size={13} className="strip-sparkle" />
            <span>Based on your {formatCurrency(incomingAmount)} allocation</span>
          </div>
          <h2 className="action-main-title">
            {isConfirmed ? 'Action Plan Confirmed' : "Let's put that plan into action"}
          </h2>
          <p className="action-main-desc">
            {isConfirmed
              ? 'Here is how your decision has been recorded in your prototype journey.'
              : 'Translating your chosen direction into a clear, sensible next step.'}
          </p>
        </div>

        {/* ── Main Action Flow / Confirmation ────── */}
        {!isConfirmed ? (
          <div className="action-flow-body">
            {/* 1. Primary Action Card */}
            <ActionCard
              intentId={selectedIntent}
              amount={actionAmount}
              headline={config.headline}
              subtitle={config.subtitle}
              rationale={config.rationale}
            />

            {/* 2. Supporting Interaction Layer */}
            {selectedIntent === 'goal' && (
              <GoalPicker
                goals={personaGoals}
                allocatedAmount={actionAmount}
                selectedGoalId={selectedGoalId}
                onSelectGoal={setSelectedGoalId}
              />
            )}

            {selectedIntent === 'invest' && (
              <TimeHorizonPicker
                selectedHorizonId={selectedHorizonId}
                onSelectHorizon={setSelectedHorizonId}
              />
            )}

            {selectedIntent === 'safety' && (
              <div className="safety-action-support-box">
                <div className="safety-support-header">
                  <ShieldCheck size={16} className="safety-support-icon" />
                  <span className="safety-support-title">Emergency Buffer Top-Up</span>
                </div>
                <p className="safety-support-desc">
                  Adding {formatCurrency(actionAmount)} brings your accessible safety cushion closer to your starter benchmark of {formatCurrency(currentPersona.emergencyReserveTarget || 10000)}.
                </p>
              </div>
            )}

            {/* 3. Primary Action CTA */}
            <div className="action-cta-area">
              <button
                className="action-primary-cta-btn"
                onClick={handleConfirmAction}
                type="button"
              >
                <span>{config.ctaLabel}</span>
                <ArrowRight size={16} strokeWidth={2.4} />
              </button>
              <p className="action-cta-footnote">
                Prototype interaction · No actual bank debits or payments made.
              </p>
            </div>
          </div>
        ) : (
          /* ── Lightweight Confirmation State ──────── */
          <div className="action-confirmation-card">
            <div className="confirmation-badge-circle">
              <CheckCircle2 size={32} className="confirm-check-icon" />
            </div>

            <div className="confirmation-content">
              <span className="confirmation-status-eyebrow">STEP RECORDED</span>
              <h3 className="confirmation-title">{config.confirmTitle}</h3>
              <p className="confirmation-detail">{config.confirmDetail}</p>
              {config.confirmSubdetail && (
                <p className="confirmation-subdetail">{config.confirmSubdetail}</p>
              )}

              <div className="confirmation-meta-box">
                <span className="meta-box-label">Prototype Notice</span>
                <p className="meta-box-text">{config.confirmNote}</p>
              </div>
            </div>

            <div className="confirmation-actions">
              {onViewProgress && (
                <button
                  className="confirm-progress-btn"
                  onClick={onViewProgress}
                  type="button"
                >
                  <TrendingUp size={16} strokeWidth={2.2} />
                  <span>See my progress</span>
                </button>
              )}

              <button
                className="confirm-back-decide-btn"
                onClick={onReset}
                type="button"
              >
                <span>Back to Decide</span>
              </button>

              <button
                className="confirm-revisit-btn"
                onClick={() => setIsConfirmed(false)}
                type="button"
              >
                <RotateCcw size={14} />
                <span>Adjust this action</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
