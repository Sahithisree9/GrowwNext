import React from 'react';
import { UnderstandHero } from '../components/UnderstandHero';
import { EventSummaryCard } from '../components/EventSummaryCard';
import { PersonalMeaningCard } from '../components/PersonalMeaningCard';
import { GoalImpactCard } from '../components/GoalImpactCard';
import { UnderstandNextStep } from '../components/UnderstandNextStep';
import { ArrowLeft } from 'lucide-react';

/**
 * UnderstandView — Phase 4A
 *
 * "WHAT DOES THIS MEAN FOR ME?"
 *
 * Translates a financial event into personal meaning across 4 key questions:
 * 1. What happened?
 * 2. What does it mean for me?
 * 3. Does it change my progress?
 * 4. Should I do anything?
 */
export function UnderstandView({
  currentPersona,
  activeGoal,
  lastSessionAction,
  onGoToProgress,
  onGoToDecide,
}) {
  const event = currentPersona?.portfolioEvent;
  const isGoalAction = lastSessionAction?.type === 'goal';
  const goal = (isGoalAction && activeGoal)
    ? activeGoal
    : (currentPersona?.primaryGoal || currentPersona?.goals?.[0]);

  return (
    <div className="understand-view">
      {/* ── Top Bar ────────────────────────────── */}
      <div className="understand-top-bar">
        <button
          className="understand-back-btn"
          onClick={onGoToDecide}
          type="button"
          aria-label="Back to Decide"
        >
          <ArrowLeft size={18} strokeWidth={2.4} />
          <span>Decide</span>
        </button>

        <div className="understand-top-center">
          <span className="understand-top-step">PHASE 4A · UNDERSTAND</span>
        </div>

        <div className="understand-persona-tag">
          <span>{currentPersona?.name}</span>
        </div>
      </div>

      <div className="understand-scroll-content app-content">
        {/* ── Hero Delta Display ─────────────────── */}
        <UnderstandHero event={event} />

        {/* ── 1. What Happened? ──────────────────── */}
        <EventSummaryCard event={event} />

        {/* ── 2. What Does This Mean For You? ───── */}
        <PersonalMeaningCard event={event} />

        {/* ── 3. Does It Change My Progress? ────── */}
        <GoalImpactCard goal={goal} />

        {/* ── 4. Should I Do Anything? ───────────── */}
        <UnderstandNextStep
          onGoToProgress={onGoToProgress}
          onGoToDecide={onGoToDecide}
        />
      </div>
    </div>
  );
}
