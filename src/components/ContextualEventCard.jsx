import { ArrowRight, Sparkles } from 'lucide-react';
import { formatCurrency } from '../data/mockData';

/**
 * ContextualEventCard — Phase 4A
 *
 * Subtle entry card on the Decide screen.
 * Feels like contextual intelligence, NOT a trading alert.
 * Positioned below primary situational choices so it does not dominate the screen.
 */
export function ContextualEventCard({ event, onSeeMeaning }) {
  if (!event) return null;

  const changeAbs = Math.abs(event.portfolioChange);

  return (
    <section className="contextual-event-card" aria-label="Contextual Portfolio Update">
      <div className="event-card-left">
        <div className="event-card-badge">
          <Sparkles size={11} strokeWidth={2.4} />
          <span>CONTEXTUAL UPDATE</span>
        </div>
        <h3 className="event-card-title">Your investments moved today</h3>
        <p className="event-card-subtitle">
          In this example, your portfolio is down {formatCurrency(changeAbs)} today.
        </p>
      </div>

      <button
        className="event-card-action-btn"
        onClick={onSeeMeaning}
        type="button"
      >
        <span>See what this means</span>
        <ArrowRight size={14} strokeWidth={2.2} />
      </button>
    </section>
  );
}
