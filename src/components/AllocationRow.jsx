import React from 'react';
import { formatCurrency } from '../data/mockData';

// Color map — extends existing design tokens
const COLOR_MAP = {
  emerald: {
    bar: 'var(--groww-primary)',
    label: 'var(--groww-primary)',
    bg: 'rgba(0, 208, 156, 0.08)',
    border: 'rgba(0, 208, 156, 0.18)',
  },
  amber: {
    bar: '#F5A623',
    label: '#F5A623',
    bg: 'rgba(245, 166, 35, 0.08)',
    border: 'rgba(245, 166, 35, 0.18)',
  },
  indigo: {
    bar: '#7C83FD',
    label: '#7C83FD',
    bg: 'rgba(124, 131, 253, 0.08)',
    border: 'rgba(124, 131, 253, 0.18)',
  },
  slate: {
    bar: 'rgba(255,255,255,0.20)',
    label: 'var(--text-secondary)',
    bg: 'rgba(255, 255, 255, 0.04)',
    border: 'rgba(255, 255, 255, 0.08)',
  },
};

export const AllocationRow = ({ slice, _totalAmount, isLast }) => {
  const colors = COLOR_MAP[slice.colorKey] || COLOR_MAP.slate;
  const pctDisplay = Math.round(slice.pct * 100);

  return (
    <div className={`alloc-row ${isLast ? 'alloc-row-last' : ''}`}>
      {/* Proportional bar — visual weight communicates priority */}
      <div className="alloc-bar-track">
        <div
          className="alloc-bar-fill"
          style={{
            width: `${pctDisplay}%`,
            background: colors.bar,
          }}
          role="presentation"
          aria-label={`${pctDisplay}% of total`}
        />
      </div>

      {/* Row body */}
      <div
        className="alloc-row-body"
        style={{ background: colors.bg, borderColor: colors.border }}
      >
        <div className="alloc-row-main">
          <span className="alloc-amount">{formatCurrency(slice.amount)}</span>
          <span className="alloc-label" style={{ color: colors.label }}>
            {slice.label}
          </span>
          <span className="alloc-pct">{pctDisplay}%</span>
        </div>
        <p className="alloc-explanation">{slice.explanation}</p>
      </div>
    </div>
  );
};
