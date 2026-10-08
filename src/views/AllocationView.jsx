import React, { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, Info } from 'lucide-react';
import { AllocationRow } from '../components/AllocationRow';
import { computeAllocation } from '../data/allocationEngine';
import { PAYDAY_SCENARIOS, MONEY_INTENTS, formatCurrency } from '../data/mockData';

// Short labels for the intent switcher pills (compact, scannable)
const SWITCHER_LABELS = {
  safety: 'Safety first',
  goal:   'Save for goal',
  invest: 'Start growing',
};

const BUFFER_HEALTH_LABEL = {
  thin:     { text: 'Buffer: Building',  color: '#F5A623' },
  moderate: { text: 'Buffer: Progressing', color: '#7C83FD' },
  healthy:  { text: 'Buffer: Healthy',   color: 'var(--groww-primary)' },
};

export const AllocationView = ({
  persona,
  initialIntent,
  customIncomingAmount,
  customTitle,
  customSubtitle,
  onBack,
  onProceedToAction,
}) => {
  // localIntent can be changed via the intent switcher
  const [localIntent, setLocalIntent] = useState(initialIntent || 'safety');
  const [confirmed, setConfirmed]     = useState(false);

  const paydayScenario  = PAYDAY_SCENARIOS[persona.paydayScenario];
  const incomingAmount  = customIncomingAmount || paydayScenario?.amount || 5000;

  // Recompute whenever intent or persona changes
  const result = useMemo(
    () => computeAllocation(incomingAmount, persona, localIntent),
    [incomingAmount, persona, localIntent]
  );

  const { slices, bufferHealth, contextNote, ctaLabel } = result;
  const healthMeta = BUFFER_HEALTH_LABEL[bufferHealth];
  const intentLabel = MONEY_INTENTS.find(i => i.id === localIntent)?.label || localIntent;

  const handleSwitchIntent = (id) => {
    setLocalIntent(id);
    setConfirmed(false); // reset confirmation when intent changes
  };

  return (
    <div className="allocation-view">

      {/* ── View Header ── */}
      <header className="payday-header">
        <button
          className="payday-back-btn"
          onClick={onBack}
          type="button"
          aria-label="Back"
        >
          <ArrowLeft size={18} strokeWidth={2.2} />
        </button>
        <div className="payday-header-text">
          <span className="payday-header-title">{customTitle || "Allocation"}</span>
          <span className="payday-header-sub">
            {customSubtitle || `How to think about your ${formatCurrency(incomingAmount)}`}
          </span>
        </div>
        {/* Buffer health badge */}
        <span className="alloc-buffer-badge" style={{ color: healthMeta.color }}>
          {healthMeta.text}
        </span>
      </header>

      {/* ── Scrollable Content ── */}
      <main className="app-content allocation-content">

        {/* 1. Context strip */}
        <div className="alloc-context-strip">
          <div className="alloc-context-top">
            <Info size={13} strokeWidth={2} style={{ flexShrink: 0, marginTop: 1 }} />
            <span>{contextNote}</span>
          </div>
        </div>

        {/* 2. Allocation card */}
        <div className="alloc-card">
          <div className="alloc-card-header">
            <h2 className="alloc-card-title">
              Here's a sensible way to think about your {formatCurrency(incomingAmount)}
            </h2>
            <span className="alloc-intent-chip">
              {intentLabel}
            </span>
          </div>

          <div className="alloc-rows">
            {slices.map((slice, i) => (
              <AllocationRow
                key={`${localIntent}-${slice.id}`}
                slice={slice}
                totalAmount={incomingAmount}
                isLast={i === slices.length - 1}
              />
            ))}
          </div>

          {/* Sum confirmation */}
          <div className="alloc-total-row">
            <span className="alloc-total-label">Total accounted for</span>
            <span className="alloc-total-val">
              {formatCurrency(slices.reduce((s, r) => s + r.amount, 0))}
            </span>
          </div>
        </div>

        {/* 3. Intent switcher — the interactive proof */}
        <div className="intent-switcher-section">
          <span className="intent-switcher-eyebrow">Change priority — see how the guidance shifts</span>
          <div className="intent-switcher-pills" role="group" aria-label="Switch intent">
            {MONEY_INTENTS.map((intent) => (
              <button
                key={intent.id}
                className={`switcher-pill ${localIntent === intent.id ? 'switcher-pill-active' : ''}`}
                onClick={() => handleSwitchIntent(intent.id)}
                type="button"
                aria-pressed={localIntent === intent.id}
              >
                {SWITCHER_LABELS[intent.id]}
              </button>
            ))}
          </div>
        </div>

        {/* 4. CTA or Confirmation */}
        {!confirmed ? (
          <div className="alloc-cta-area">
            <button
              className="alloc-cta-btn"
              onClick={() => {
                if (onProceedToAction) {
                  onProceedToAction(localIntent, incomingAmount);
                } else {
                  setConfirmed(true);
                }
              }}
              type="button"
            >
              <span>{ctaLabel}</span>
              <ArrowRight size={16} strokeWidth={2.4} />
            </button>
            <p className="alloc-cta-footnote">
              No money is moved. This captures your plan for the next step.
            </p>
          </div>
        ) : (
          <div className="alloc-confirmation">
            <div className="alloc-confirm-icon">
              <CheckCircle2 size={22} strokeWidth={2} />
            </div>
            <p className="alloc-confirm-title">Plan captured</p>
            <p className="alloc-confirm-body">
              <strong>{formatCurrency(incomingAmount)}</strong> — {intentLabel.toLowerCase()} priority.
              The next step (fund setup, goal creation, or SIP) will be built in Phase 2C.
            </p>
            <div className="alloc-confirm-actions">
              <button
                className="alloc-confirm-reset"
                onClick={() => { setConfirmed(false); setLocalIntent(initialIntent || 'safety'); }}
                type="button"
              >
                <RotateCcw size={13} strokeWidth={2.2} />
                <span>Start over</span>
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
