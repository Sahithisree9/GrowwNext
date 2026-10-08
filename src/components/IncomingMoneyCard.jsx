import React from 'react';
import { ArrowUpRight, Banknote } from 'lucide-react';

export const IncomingMoneyCard = ({ paydayScenario }) => {
  const { amount, receivedLabel, contextNote } = paydayScenario;

  return (
    <div className="incoming-money-card">
      {/* Received label — source & period */}
      <div className="incoming-received-label">
        <Banknote size={13} strokeWidth={2} className="incoming-label-icon" />
        <span>{receivedLabel}</span>
      </div>

      {/* Primary: the amount received */}
      <div className="incoming-amount-display">
        <span className="incoming-currency">₹</span>
        <span className="incoming-digits">{amount.toLocaleString('en-IN')}</span>
        <div className="incoming-amount-badge">
          <ArrowUpRight size={14} strokeWidth={2.5} />
          <span>Received</span>
        </div>
      </div>

      {/* Contextual note — no financial recommendation */}
      <p className="incoming-context-note">{contextNote}</p>
    </div>
  );
};
