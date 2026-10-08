import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

/**
 * ReassessmentEventCard — Phase 5
 *
 * Subtle contextual entry card on the Decide screen.
 * Appears when unexpected money or an outside financial event occurs between paydays.
 * Positioned below primary situational choices so it does not visually dominate.
 */
export function ReassessmentEventCard({ event, onSeeReassessment }) {
  if (!event) return null;

  return (
    <section className="contextual-event-card reassessment-card-theme" aria-label="Contextual Reassessment Event">
      <div className="event-card-left">
        <div className="event-card-badge reassessment-badge-theme">
          <Sparkles size={11} strokeWidth={2.4} />
          <span>SOMETHING CHANGED</span>
        </div>
        <h3 className="event-card-title">{event.title}</h3>
        <p className="event-card-subtitle">
          {event.subtitle || 'Freelance payout · See how this changes your plan'}
        </p>
      </div>

      <button
        className="event-card-action-btn reassessment-btn-theme"
        onClick={onSeeReassessment}
        type="button"
      >
        <span>See what this changes</span>
        <ArrowRight size={14} strokeWidth={2.2} />
      </button>
    </section>
  );
}
