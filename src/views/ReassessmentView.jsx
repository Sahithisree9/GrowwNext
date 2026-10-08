import React, { useState, useMemo, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Shield,
  Target,
  TrendingUp,
  Info,
  AlertCircle,
} from 'lucide-react';
import { formatCurrency, MONEY_INTENTS } from '../data/mockData';
import { computeAllocation } from '../data/allocationEngine';
import { AllocationRow } from '../components/AllocationRow';

/**
 * ReassessmentView — Phase 5
 *
 * Demonstrates: "Context changes → reasoning changes."
 *
 * 1. Shows what changed: Before vs. After context (₹2,500 → ₹4,000 available).
 * 2. Explains what that means in Aarav's personal context (thin buffer of ₹4,000 / ₹10,000).
 * 3. Shows why the sensible decision changes — strengthening buffer takes priority before growth.
 * 4. Reuses the existing allocation engine to provide decision-supportive guidance.
 * 5. Passes the selected intent to the next step (Allocation or Action).
 */
export function ReassessmentView({
  currentPersona,
  onBackToDecide,
  onProceedToAllocation,
  onProceedToAction,
}) {
  const event = currentPersona?.reassessmentEvent;
  const eventAmount = event?.amount || 1500;

  // Reset scroll to top upon mounting
  useEffect(() => {
    window.scrollTo(0, 0);
    const scrollEl = document.querySelector('.reassessment-scroll-content');
    if (scrollEl) scrollEl.scrollTop = 0;
  }, []);

  // Local intent selection (defaults to 'safety' because Aarav's buffer is thin)
  const [selectedIntent, setSelectedIntent] = useState('safety');

  // Compute live allocation for the extra income using the existing engine
  const allocation = useMemo(
    () => computeAllocation(eventAmount, currentPersona, selectedIntent),
    [eventAmount, currentPersona, selectedIntent]
  );

  const { slices, contextNote } = allocation;

  // Context figures
  const beforeCash = event?.beforeContext?.unallocatedCash ?? currentPersona.unallocatedCash;
  const afterCash = event?.afterContext?.unallocatedCash ?? (beforeCash + eventAmount);
  const emergencyReserve = currentPersona.emergencyReserve;
  const emergencyTarget = currentPersona.emergencyReserveTarget || 10000;
  const primaryGoal = currentPersona.primaryGoal || currentPersona.goals?.[0];

  const handleContinue = () => {
    if (onProceedToAllocation) {
      onProceedToAllocation(selectedIntent, eventAmount);
    } else if (onProceedToAction) {
      onProceedToAction(selectedIntent, eventAmount);
    }
  };

  return (
    <div className="reassessment-view">
      {/* ── Top Bar ────────────────────────────── */}
      <div className="reassessment-top-bar">
        <button
          className="reassessment-back-btn"
          onClick={onBackToDecide}
          type="button"
          aria-label="Back to Decide"
        >
          <ArrowLeft size={18} strokeWidth={2.4} />
          <span>Decide</span>
        </button>

        <div className="reassessment-top-center">
          <span className="reassessment-top-step">PHASE 5 · REASSESSMENT</span>
        </div>

        <div className="reassessment-persona-tag">
          <span>{currentPersona?.name}</span>
        </div>
      </div>

      <div className="reassessment-scroll-content app-content">
        {/* ── Event Header ───────────────────────── */}
        <section className="reassessment-hero-card" aria-label="Event summary">
          <div className="reassessment-hero-badge">
            <Sparkles size={13} strokeWidth={2.4} />
            <span>SOMETHING CHANGED</span>
          </div>

          <div className="reassessment-hero-body">
            <span className="reassessment-hero-eyebrow">Extra money received</span>
            <div className="reassessment-hero-amount-row">
              <h1 className="reassessment-hero-amount">+{formatCurrency(eventAmount)}</h1>
              <span className="reassessment-hero-source-pill">
                {event?.source || 'Freelance project payout'}
              </span>
            </div>
            <p className="reassessment-hero-subtext">
              You have {formatCurrency(eventAmount)} more available than expected this month.
            </p>
          </div>
        </section>

        {/* ── 1. What Changed? (Before → After Context) ── */}
        <section className="reassessment-card" aria-label="Financial context comparison">
          <div className="reassessment-card-header">
            <span className="reassessment-section-num">1</span>
            <h2 className="reassessment-card-title">What changed in your situation?</h2>
          </div>

          <div className="context-comparison-grid">
            {/* Before Context */}
            <div className="context-state-card context-before">
              <span className="context-state-label">Before this event</span>
              <div className="context-metric">
                <span className="metric-title">Available to allocate</span>
                <span className="metric-val">{formatCurrency(beforeCash)}</span>
              </div>
              <div className="context-submetric">
                <span>Emergency buffer:</span>
                <strong>{formatCurrency(emergencyReserve)} / {formatCurrency(emergencyTarget)}</strong>
              </div>
              <div className="context-submetric">
                <span>Goal ({primaryGoal?.title}):</span>
                <strong>{formatCurrency(primaryGoal?.currentSaved)} / {formatCurrency(primaryGoal?.targetAmount)}</strong>
              </div>
            </div>

            {/* Event Transition */}
            <div className="context-transition-indicator">
              <span className="transition-badge">+{formatCurrency(eventAmount)} received</span>
            </div>

            {/* Reassessed Context */}
            <div className="context-state-card context-after">
              <span className="context-state-label context-after-label">Reassessed situation</span>
              <div className="context-metric">
                <span className="metric-title">Available to allocate</span>
                <span className="metric-val metric-val-highlight">{formatCurrency(afterCash)}</span>
              </div>
              <div className="context-submetric">
                <span>Emergency buffer:</span>
                <span className="buffer-status-tag">
                  {formatCurrency(emergencyReserve)} / {formatCurrency(emergencyTarget)} (Thin)
                </span>
              </div>
              <div className="context-submetric">
                <span>Goal ({primaryGoal?.title}):</span>
                <strong>{formatCurrency(primaryGoal?.currentSaved)} / {formatCurrency(primaryGoal?.targetAmount)}</strong>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. What Does This Mean For You? (Reasoning Changed) ── */}
        <section className="reassessment-card" aria-label="Contextual Reasoning">
          <div className="reassessment-card-header">
            <span className="reassessment-section-num">2</span>
            <div>
              <h2 className="reassessment-card-title">What does this mean for you?</h2>
              <p className="reassessment-card-sub">Context changes → reasoning changes</p>
            </div>
          </div>

          <div className="reasoning-explanation-box">
            <div className="reasoning-lead-callout">
              <AlertCircle size={18} strokeWidth={2.2} className="reasoning-lead-icon" />
              <p className="reasoning-lead-text">
                <strong>Your buffer is still below its target.</strong> At {formatCurrency(emergencyReserve)} of {formatCurrency(emergencyTarget)}, you have limited cushion for unexpected surprises.
              </p>
            </div>

            <p className="reasoning-body-text">
              Because of that, the additional {formatCurrency(eventAmount)} gives you more room to strengthen your financial foundation before putting more toward longer-term growth.
            </p>
          </div>

          {/* Contextual Trade-Off Breakdown */}
          <div className="tradeoffs-list">
            <div className="tradeoff-item">
              <div className="tradeoff-icon-col emerald">
                <Shield size={16} strokeWidth={2.4} />
              </div>
              <div className="tradeoff-text-col">
                <span className="tradeoff-title">Strengthen safety cushion (Sensible priority)</span>
                <p className="tradeoff-desc">
                  Adding to your buffer moves you to {formatCurrency(emergencyReserve + 1000)}+, crossing 50% of your target and taking you out of the high-vulnerability zone.
                </p>
              </div>
            </div>

            <div className="tradeoff-item">
              <div className="tradeoff-icon-col amber">
                <Target size={16} strokeWidth={2.4} />
              </div>
              <div className="tradeoff-text-col">
                <span className="tradeoff-title">Advance your {primaryGoal?.title} goal</span>
                <p className="tradeoff-desc">
                  Putting a share here brings savings to {formatCurrency(primaryGoal?.currentSaved + 500)} and shaves ~3 weeks off your timeline without raising your regular monthly pace.
                </p>
              </div>
            </div>

            <div className="tradeoff-item">
              <div className="tradeoff-icon-col indigo">
                <TrendingUp size={16} strokeWidth={2.4} />
              </div>
              <div className="tradeoff-text-col">
                <span className="tradeoff-title">Why not invest all in growth right now?</span>
                <p className="tradeoff-desc">
                  With a thin emergency cushion, locking this unexpected cash into market volatility adds risk — a single surprise expense could force you to withdraw before compounding works.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. What Could You Do? (Interactive Engine Guidance) ── */}
        <section className="reassessment-card" aria-label="Next Sensible Decision">
          <div className="reassessment-card-header">
            <span className="reassessment-section-num">3</span>
            <div>
              <h2 className="reassessment-card-title">What would you like this ₹1,500 to do?</h2>
              <p className="reassessment-card-sub">Select your intent to see how the guidance shapes</p>
            </div>
          </div>

          {/* Intent Selector Buttons */}
          <div className="reassessment-intent-selector" role="group" aria-label="Select money intent">
            {MONEY_INTENTS.map((intent) => {
              const isSelected = selectedIntent === intent.id;
              const IconComp =
                intent.id === 'safety' ? Shield :
                intent.id === 'goal' ? Target : TrendingUp;

              return (
                <button
                  key={intent.id}
                  className={`reassessment-intent-btn ${isSelected ? 'reassessment-intent-btn-active' : ''}`}
                  onClick={() => setSelectedIntent(intent.id)}
                  type="button"
                  aria-pressed={isSelected}
                >
                  <div className="intent-btn-top">
                    <IconComp size={16} strokeWidth={2.4} />
                    <span className="intent-btn-label">{intent.label}</span>
                    {intent.id === 'safety' && (
                      <span className="intent-recommended-pill">Recommended</span>
                    )}
                  </div>
                  <p className="intent-btn-desc">{intent.desc}</p>
                </button>
              );
            })}
          </div>

          {/* Allocation Preview via allocationEngine.js */}
          <div className="reassessment-preview-card">
            <div className="reassessment-preview-header">
              <span className="preview-header-eyebrow">ALLOCATION ENGINE GUIDANCE</span>
              <h3 className="preview-header-title">
                Sensible split for this {formatCurrency(eventAmount)}
              </h3>
            </div>

            <div className="reassessment-alloc-rows">
              {slices.map((slice, i) => (
                <AllocationRow
                  key={`reassess-${selectedIntent}-${slice.id}`}
                  slice={slice}
                  totalAmount={eventAmount}
                  isLast={i === slices.length - 1}
                />
              ))}
            </div>

            <div className="reassessment-engine-note">
              <Info size={13} strokeWidth={2} style={{ flexShrink: 0, marginTop: 1 }} />
              <span>{contextNote}</span>
            </div>
          </div>
        </section>

        {/* ── 4. Next Action CTA ─────────────────── */}
        <div className="reassessment-cta-area">
          <button
            className="reassessment-cta-btn"
            onClick={handleContinue}
            type="button"
          >
            <span>Decide what to do with this {formatCurrency(eventAmount)}</span>
            <ArrowRight size={16} strokeWidth={2.4} />
          </button>
          <p className="reassessment-cta-footnote">
            Simulated prototype event · You remain in control of your plan.
          </p>
        </div>
      </div>
    </div>
  );
}
