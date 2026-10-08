import React, { useState } from 'react';
import { ArrowLeft, HelpCircle, ArrowRight, CheckCircle2, Shield, Target, TrendingUp, Sparkles } from 'lucide-react';
import { formatCurrency } from '../data/mockData';

const QUESTIONS = [
  {
    id: 'q1',
    title: 'What best describes your money right now?',
    options: [
      { id: 'leftover', label: 'I have money left over', category: 'flex' },
      { id: 'protect', label: 'I need to protect my savings', category: 'safety' },
      { id: 'saving', label: "I'm saving for something", category: 'goal' },
      { id: 'grow', label: 'I want to grow it', category: 'growth' },
    ],
  },
  {
    id: 'q2',
    title: "What's coming up in your near future?",
    options: [
      { id: 'nothing', label: 'Nothing major', category: 'growth' },
      { id: 'purchase', label: 'A planned purchase', category: 'goal' },
      { id: 'trip', label: 'A trip or travel', category: 'goal' },
      { id: 'unexpected', label: 'An unexpected expense', category: 'safety' },
      { id: 'not_sure', label: 'Not sure yet', category: 'flex' },
    ],
  },
  {
    id: 'q3',
    title: 'What matters most to you today?',
    options: [
      { id: 'safety', label: 'More safety & peace of mind', category: 'safety' },
      { id: 'goal', label: 'Reaching a specific goal', category: 'goal' },
      { id: 'growth', label: 'Long-term growth', category: 'growth' },
      { id: 'flexible', label: 'Keeping money flexible', category: 'flex' },
    ],
  },
];

export function GuidedCheckView({
  currentPersona,
  onBackToDecide,
  onRouteToSafety,
  onRouteToGoal,
  onRouteToInvesting,
}) {
  const [answers, setAnswers] = useState({
    q1: 'leftover',
    q2: 'nothing',
    q3: 'safety',
  });

  const availableCash = currentPersona.unallocatedCash || 2500;

  const handleSelectOption = (qId, optId) => {
    setAnswers((prev) => ({ ...prev, [qId]: optId }));
  };

  // Determine recommendation based on answers
  const computeRecommendation = () => {
    const q1Obj = QUESTIONS[0].options.find((o) => o.id === answers.q1);
    const q2Obj = QUESTIONS[1].options.find((o) => o.id === answers.q2);
    const q3Obj = QUESTIONS[2].options.find((o) => o.id === answers.q3);

    const categories = [q1Obj?.category, q2Obj?.category, q3Obj?.category];

    const safetyCount = categories.filter((c) => c === 'safety').length;
    const goalCount = categories.filter((c) => c === 'goal').length;
    const growthCount = categories.filter((c) => c === 'growth').length;

    // Buffer check
    const isBufferThin = (currentPersona.emergencyReserve || 0) < (currentPersona.emergencyReserveTarget || 10000) * 0.5;

    if (safetyCount >= 2 || (isBufferThin && growthCount < 2)) {
      return {
        type: 'safety',
        title: 'Strengthen your safety cushion',
        reason:
          'Given your current emergency buffer and focus on peace of mind, starting with a protected cushion gives you the foundation you need.',
        ctaText: 'See safety allocation →',
        icon: Shield,
        action: onRouteToSafety,
      };
    }

    if (goalCount >= 2 || answers.q2 === 'purchase' || answers.q2 === 'trip') {
      return {
        type: 'goal',
        title: 'Save toward a specific target',
        reason:
          'You have near-term purchases or goals coming up. Assigning this money directly toward a milestone prevents accidental spending.',
        ctaText: 'Choose your goal →',
        icon: Target,
        action: onRouteToGoal,
      };
    }

    if (growthCount >= 2) {
      return {
        type: 'growth',
        title: 'Explore long-term growth',
        reason:
          'With no urgent expenses coming up, exploring disciplined long-term investing while keeping your basic cushion safe makes sense.',
        ctaText: 'Review investing guidance →',
        icon: TrendingUp,
        action: onRouteToInvesting,
      };
    }

    // Default / flexible
    return {
      type: 'safety',
      title: 'A balanced, flexible allocation',
      reason:
        'Keeping things balanced gives you room to breathe while building starter safety.',
      ctaText: 'See balanced allocation →',
      icon: Sparkles,
      action: onRouteToSafety,
    };
  };

  const recommendation = computeRecommendation();
  const RecIcon = recommendation.icon;

  return (
    <div className="view-container guided-check-view">
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
          <span>GUIDED MODE</span>
        </div>
      </div>

      {/* Header */}
      <div className="guided-hero">
        <div className="hero-icon-pill">
          <HelpCircle size={14} />
          <span>I'm not sure yet</span>
        </div>
        <h2 className="guided-title">Let's figure out what matters most right now</h2>
        <p className="guided-subtitle">
          Answer 3 quick questions to decide what to do with your <strong className="highlight-val">{formatCurrency(availableCash)}</strong>. No wrong answers, no financial pressure.
        </p>
      </div>

      {/* 3 Questions */}
      <div className="guided-questions-container">
        {QUESTIONS.map((q, idx) => (
          <div key={q.id} className="guided-question-card">
            <div className="question-header">
              <span className="question-num">{idx + 1}</span>
              <h4 className="question-title">{q.title}</h4>
            </div>

            <div className="question-options-list" role="radiogroup" aria-label={q.title}>
              {q.options.map((opt) => {
                const isSelected = answers[q.id] === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    className={`question-opt-chip ${isSelected ? 'opt-chip-selected' : ''}`}
                    onClick={() => handleSelectOption(q.id, opt.id)}
                    aria-checked={isSelected}
                    role="radio"
                  >
                    <span>{opt.label}</span>
                    {isSelected && <CheckCircle2 size={13} className="chip-check" />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Sensible Next Step Outcome */}
      <div className="guided-recommendation-card">
        <div className="rec-header">
          <div className="rec-icon-wrapper">
            <RecIcon size={18} />
          </div>
          <div className="rec-title-group">
            <span className="rec-tag">BASED ON YOUR ANSWERS</span>
            <h3 className="rec-title">{recommendation.title}</h3>
          </div>
        </div>

        <p className="rec-reason">{recommendation.reason}</p>

        <div className="rec-action-box">
          <button
            className="btn-primary-action"
            onClick={recommendation.action}
            type="button"
          >
            <span>{recommendation.ctaText}</span>
            <ArrowRight size={15} strokeWidth={2.4} />
          </button>
        </div>
      </div>
    </div>
  );
}
