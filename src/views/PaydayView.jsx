import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { IncomingMoneyCard } from '../components/IncomingMoneyCard';
import { FinancialSnapshot } from '../components/FinancialSnapshot';
import { IntentChip } from '../components/IntentChip';
import { PAYDAY_SCENARIOS, MONEY_INTENTS, formatCurrency } from '../data/mockData';

export const PaydayView = ({ persona, onBack, onProceedToAllocation }) => {
  const [selectedIntent, setSelectedIntent] = useState(null);

  const paydayScenario = PAYDAY_SCENARIOS[persona.paydayScenario];

  const handleContinue = () => {
    if (!selectedIntent) return;
    // Promote intent to App and navigate to allocation view
    onProceedToAllocation(selectedIntent);
  };

  return (
    <div className="payday-view">
      {/* View Header */}
      <header className="payday-header">
        <button
          className="payday-back-btn"
          onClick={onBack}
          type="button"
          aria-label="Back to Decide"
        >
          <ArrowLeft size={18} strokeWidth={2.2} />
        </button>
        <div className="payday-header-text">
          <span className="payday-header-title">Payday</span>
          <span className="payday-header-sub">Let's figure out what this money should do</span>
        </div>
      </header>

      {/* Scrollable Content */}
      <main className="app-content payday-content">

        {/* 1. Incoming Money Card */}
        <IncomingMoneyCard paydayScenario={paydayScenario} />

        {/* 2. Financial Snapshot */}
        <FinancialSnapshot persona={persona} />

        {/* 3. Intent Selection Prompt */}
        <section className="intent-section" aria-labelledby="intent-heading">
          <div className="intent-prompt">
            <span className="section-eyebrow">Before we suggest anything</span>
            <h2 id="intent-heading" className="section-heading">
              What do you want this {formatCurrency(paydayScenario.amount)} to help you do?
            </h2>
            <p className="section-subheading">
              Pick what feels most important right now. No wrong answers.
            </p>
          </div>

          <div className="intent-chip-list">
            {MONEY_INTENTS.map((intent) => (
              <IntentChip
                key={intent.id}
                intent={intent}
                isSelected={selectedIntent === intent.id}
                onSelect={setSelectedIntent}
              />
            ))}
          </div>
        </section>

        {/* 4. Primary CTA */}
        <div className="payday-cta-area">
          <button
            className={`payday-cta-btn ${selectedIntent ? 'payday-cta-active' : 'payday-cta-disabled'}`}
            onClick={handleContinue}
            disabled={!selectedIntent}
            type="button"
            aria-label={selectedIntent ? 'Continue to allocation' : 'Select an intent first'}
          >
            <span>Let's figure this out</span>
            <ArrowRight size={16} strokeWidth={2.4} />
          </button>
          {!selectedIntent && (
            <p className="payday-cta-hint">Select one of the options above to continue</p>
          )}
        </div>

      </main>
    </div>
  );
};
