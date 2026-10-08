import React from 'react';
import { formatCurrency } from '../data/mockData';

const SnapshotRow = ({ label, value, note, emphasis }) => (
  <div className={`snapshot-row ${emphasis ? 'snapshot-row-emphasis' : ''}`}>
    <div className="snapshot-row-left">
      <span className="snapshot-row-label">{label}</span>
      {note && <span className="snapshot-row-note">{note}</span>}
    </div>
    <span className={`snapshot-row-value ${emphasis ? 'snapshot-val-emphasis' : ''}`}>
      {value}
    </span>
  </div>
);

export const FinancialSnapshot = ({ persona }) => {
  return (
    <div className="financial-snapshot">
      <div className="snapshot-header">
        <span className="snapshot-title">Your Money Picture</span>
        <span className="snapshot-subtitle">This month, at a glance</span>
      </div>

      <div className="snapshot-rows">
        <SnapshotRow
          label="Monthly Inflow"
          value={formatCurrency(persona.monthlyInflow)}
          note="What came in"
        />
        <SnapshotRow
          label="Fixed Living Costs"
          value={formatCurrency(persona.fixedObligations)}
          note="Rent, food, travel"
        />
        <SnapshotRow
          label="Emergency Buffer"
          value={formatCurrency(persona.emergencyReserve)}
          note="Kept untouched"
        />
        <div className="snapshot-divider" />
        <SnapshotRow
          label="Already Available"
          value={formatCurrency(persona.unallocatedCash)}
          note="From earlier surplus"
          emphasis
        />
      </div>
    </div>
  );
};
