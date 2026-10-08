import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, ShieldCheck, Info } from 'lucide-react';
import { formatCurrency } from '../data/mockData';
import { TimeHorizonPicker } from '../components/TimeHorizonPicker';
import { computeAllocation } from '../data/allocationEngine';

/**
 * InvestingDecisionView — Phase 5C
 *
 * Situation 3: "I want to start investing"
 * Neutral educational decision flow:
 * Context (Available cash + Emergency buffer status) + Time Horizon → Allocation Guidance.
 * Zero stock/fund recommendations.
 */
export function InvestingDecisionView({
  currentPersona,
  onBackToDecide,
  onProceedToAction,
}) {
  const [selectedHorizonId, setSelectedHorizonId] = useState('long');
  const availableCash = currentPersona.unallocatedCash || 2500;

  // Use the existing allocation engine with growth/invest intent
  const allocationResult = computeAllocation(availableCash, currentPersona, 'invest');
  const { slices, bufferHealth } = allocationResult;

  const isBufferThin = bufferHealth === 'thin';

  return (
    <div className="view-container investing-decision-view">
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
          <span>INVESTING CONTEXT</span>
        </div>
      </div>

      {/* Header */}
      <div className="invest-decide-hero">
        <div className="hero-icon-pill">
          <TrendingUp size={14} />
          <span>Start investing</span>
        </div>
        <h2 className="invest-decide-title">First, let's look at your foundation</h2>
        <p className="invest-decide-subtitle">
          Before thinking about an investment product, let's understand how much you're comfortable setting aside.
        </p>
      </div>

      {/* Context Snapshot */}
      <div className="invest-context-card">
        <div className="invest-context-row">
          <div className="context-item">
            <span className="context-label">Ready to allocate</span>
            <span className="context-val highlight-emerald">{formatCurrency(availableCash)}</span>
          </div>
          <div className="context-divider" />
          <div className="context-item">
            <span className="context-label">Emergency cushion</span>
            <span className="context-val">
              {formatCurrency(currentPersona.emergencyReserve || 0)}
              <span className="context-subval"> / {formatCurrency(currentPersona.emergencyReserveTarget || 10000)}</span>
            </span>
          </div>
        </div>

        <div className={`buffer-assessment-box ${isBufferThin ? 'buffer-thin-box' : 'buffer-healthy-box'}`}>
          <ShieldCheck size={14} />
          <span>
            {isBufferThin
              ? 'Your emergency buffer is still building, so the decision should balance accessibility with longer-term growth.'
              : 'Your emergency buffer is in healthy shape, giving you solid room to focus on longer-term compounding.'}
          </span>
        </div>
      </div>

      {/* Time Horizon Picker */}
      <div className="invest-horizon-section">
        <TimeHorizonPicker
          selectedHorizonId={selectedHorizonId}
          onSelectHorizon={(horizonId) => setSelectedHorizonId(horizonId)}
        />
      </div>

      {/* Contextual Guidance Slices Preview */}
      <div className="invest-guidance-card">
        <div className="guidance-header">
          <Info size={14} />
          <span className="guidance-title">Sensible allocation for your situation</span>
        </div>
        <p className="guidance-intro">
          Rather than committing all {formatCurrency(availableCash)} into market risk, here's how a balanced approach protects you:
        </p>

        <div className="guidance-slices-list">
          {slices.map((slice) => (
            <div key={slice.id} className="guidance-slice-item">
              <div className="slice-item-left">
                <span className={`slice-dot dot-${slice.colorKey || 'emerald'}`} />
                <div className="slice-text-group">
                  <span className="slice-label">{slice.label}</span>
                  <span className="slice-expl">{slice.explanation}</span>
                </div>
              </div>
              <span className="slice-amount">{formatCurrency(slice.amount)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Primary CTA */}
      <div className="invest-decide-actions">
        <button
          className="btn-primary-action"
          onClick={() => onProceedToAction('invest', availableCash, selectedHorizonId)}
          type="button"
        >
          <span>Review my options →</span>
        </button>
        <p className="disclaimer-note">
          Neutral educational guidance · No individual stocks, mutual funds, or brokers recommended.
        </p>
      </div>
    </div>
  );
}
