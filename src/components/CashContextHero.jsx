import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { formatCurrency } from '../data/mockData';

export const CashContextHero = ({ persona }) => {
  return (
    <section className="context-hero" aria-label="Available Cash Context">
      {/* Primary: Amount Display — the most important piece of info */}
      <div className="context-hero-amount">
        <span className="currency-sym">₹</span>
        <span className="amount-digits">{persona.unallocatedCash.toLocaleString('en-IN')}</span>
      </div>

      <div className="context-hero-subrow">
        <span className="context-label">Ready to Allocate</span>
        <span className="badge badge-positive">
          <ShieldCheck size={11} strokeWidth={2.5} />
          <span>Buffer Protected</span>
        </span>
      </div>

      <p className="context-hero-note">
        After your monthly living costs and safety reserve — this is yours to grow or save, without anxiety.
      </p>

      <div className="context-breakdown-row">
        <div className="breakdown-item">
          <span className="breakdown-label">Monthly Inflow</span>
          <span className="breakdown-val">{formatCurrency(persona.monthlyInflow)}</span>
        </div>
        <div className="breakdown-divider" />
        <div className="breakdown-item">
          <span className="breakdown-label">Fixed Costs</span>
          <span className="breakdown-val">{formatCurrency(persona.fixedObligations)}</span>
        </div>
        <div className="breakdown-divider" />
        <div className="breakdown-item">
          <span className="breakdown-label">Emergency Buffer</span>
          <span className="breakdown-val">{formatCurrency(persona.emergencyReserve)}</span>
        </div>
      </div>
    </section>
  );
};
