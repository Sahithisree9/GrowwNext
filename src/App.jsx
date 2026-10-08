import React, { useState, useEffect, useMemo } from 'react';
import './styles/app.css';
import './styles/decideJourneys.css';
import './styles/scenarioControls.css';
import { MOCK_PERSONAS, SITUATIONAL_SCENARIOS, formatCurrency } from './data/mockData';
import { AppHeader } from './components/AppHeader';
import { CashContextHero } from './components/CashContextHero';
import { SituationalCard } from './components/SituationalCard';
import { DecisionPreview } from './components/DecisionPreview';
import { BottomNav } from './components/BottomNav';
import { PaydayView } from './views/PaydayView';
import { AllocationView } from './views/AllocationView';
import { ActionView } from './views/ActionView';
import { ProgressView } from './views/ProgressView';
import { UnderstandView } from './views/UnderstandView';
import { ReassessmentView } from './views/ReassessmentView';
import { GoalDecisionView } from './views/GoalDecisionView';
import { InvestingDecisionView } from './views/InvestingDecisionView';
import { GuidedCheckView } from './views/GuidedCheckView';
import { ScenarioControlsModal } from './components/ScenarioControlsModal';
import { ContextualEventCard } from './components/ContextualEventCard';
import { ReassessmentEventCard } from './components/ReassessmentEventCard';
import { Info } from 'lucide-react';

// ── View identifiers ────────────────────────────────
const VIEWS = {
  DECIDE:           'decide',
  PAYDAY:           'payday',
  ALLOCATION:       'allocation',
  ACTION:           'action',
  PROGRESS:         'progress',
  UNDERSTAND:       'understand',
  REASSESSMENT:     'reassessment',
  GOAL_DECIDE:      'goal_decide',
  INVESTING_DECIDE: 'investing_decide',
  GUIDED_DECIDE:    'guided_decide',
};

export function App() {

  // ── Global State ──────────────────────────────────
  const [personaIndex, setPersonaIndex] = useState(0);
  const [personaOverrides, setPersonaOverrides] = useState({});
  const [isScenarioControlsOpen, setIsScenarioControlsOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search).get('openControls') === '1';
    }
    return false;
  });

  const basePersona = MOCK_PERSONAS[personaIndex];
  const currentPersona = useMemo(() => {
    const overrides = personaOverrides[basePersona.id] || {};
    return { ...basePersona, ...overrides };
  }, [basePersona, personaOverrides]);

  // ── Session State (Phase 4B & Phase 5) ─────────────
  const [activeSessionGoal, setActiveSessionGoal] = useState(null);
  const [lastSessionAction, setLastSessionAction] = useState(null);

  // ── Navigation State ──────────────────────────────
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined') {
      const paramView = new URLSearchParams(window.location.search).get('view');
      if (paramView && Object.values(VIEWS).includes(paramView)) {
        return paramView;
      }
    }
    return VIEWS.DECIDE;
  });

  // ── Journey State ─────────────────────────────────
  const [selectedScenarioId, setSelectedScenarioId] = useState(SITUATIONAL_SCENARIOS[0].id);
  const [selectedIntent, setSelectedIntent]         = useState(null);
  const [flowSource, setFlowSource]                 = useState('payday'); // 'payday' | 'reassessment' | 'goal_decide' | 'investing_decide'
  const [allocationAmount, setAllocationAmount]     = useState(5000);
  const [selectedHorizon, setSelectedHorizon]       = useState('long');

  const selectedScenario = SITUATIONAL_SCENARIOS.find(s => s.id === selectedScenarioId);

  // ── Scroll Reset on Navigation ────────────────────
  useEffect(() => {
    window.scrollTo(0, 0);
    const scrollable = document.querySelector('.app-content') || document.querySelector('.view-container');
    if (scrollable) {
      const scrollParam = new URLSearchParams(window.location.search).get('scroll');
      scrollable.scrollTop = scrollParam ? parseInt(scrollParam, 10) : 0;
    }
  }, [currentView, personaIndex]);

  // ── Handlers ──────────────────────────────────────
  const handleSwitchPersona = () => {
    setPersonaIndex((prev) => (prev + 1) % MOCK_PERSONAS.length);
    setActiveSessionGoal(null);
    setLastSessionAction(null);
    setSelectedIntent(null);
    setSelectedHorizon('long');
    setFlowSource('payday');
    setAllocationAmount(5000);
    setCurrentView(VIEWS.DECIDE);
  };

  const handleApplyScenario = (updatedFields) => {
    setPersonaOverrides((prev) => ({
      ...prev,
      [basePersona.id]: {
        ...(prev[basePersona.id] || {}),
        ...updatedFields,
      },
    }));
  };

  const handleResetScenario = () => {
    setPersonaOverrides((prev) => {
      const next = { ...prev };
      delete next[basePersona.id];
      return next;
    });
    setActiveSessionGoal(null);
    setLastSessionAction(null);
    setSelectedHorizon('long');
  };

  const handleRecordGoalAction = (updatedGoal) => {
    setActiveSessionGoal(updatedGoal);
  };

  const handleRecordAction = ({ type, amount, goal, horizon }) => {
    if (type === 'goal' && goal) {
      setActiveSessionGoal(goal);
      setLastSessionAction({
        type: 'goal',
        amount,
        goalId: goal.id,
        goalTitle: goal.title,
        label: `${formatCurrency(amount)} added to your ${goal.title} goal (recorded for this session)`,
        detail: `Progress updated: ${formatCurrency(goal.currentSaved)} of ${formatCurrency(goal.targetAmount)} (${Math.round((goal.currentSaved / goal.targetAmount) * 100)}% complete).`,
      });
    } else if (type === 'safety') {
      // Do not mutate goal!
      setLastSessionAction({
        type: 'safety',
        amount,
        label: `${formatCurrency(amount)} prioritized for safety cushion (recorded for this session)`,
        detail: `Kept in liquid savings to strengthen your emergency buffer to ${formatCurrency((currentPersona.emergencyReserve || 0) + amount)}. No goal progress was changed.`,
      });
    } else if (type === 'growth' || type === 'invest') {
      // Do not mutate goal!
      const horizonLabel = horizon?.label || '3+ years';
      setLastSessionAction({
        type: 'growth',
        amount,
        horizonLabel,
        label: `Growth preference recorded: ${formatCurrency(amount)} (${horizonLabel})`,
        detail: `Educational preference recorded for disciplined investing. No money was allocated to goals or transferred.`,
      });
    } else if (type === 'flex') {
      setLastSessionAction({
        type: 'flex',
        amount,
        label: `${formatCurrency(amount)} kept flexible for near-term spending`,
        detail: `Kept accessible for near-term needs. No goal or investment changes made.`,
      });
    }
  };

  const handleSelectScenario = (scenario) => {
    setSelectedScenarioId(scenario.id);
  };

  const handleBeginJourneyForScenario = (scenarioId) => {
    const targetId = scenarioId || selectedScenarioId;
    if (targetId === 'just_paid') {
      handleBeginPaydayJourney();
    } else if (targetId === 'saving_for_something') {
      setCurrentView(VIEWS.GOAL_DECIDE);
    } else if (targetId === 'start_investing') {
      setCurrentView(VIEWS.INVESTING_DECIDE);
    } else if (targetId === 'not_sure_yet') {
      setCurrentView(VIEWS.GUIDED_DECIDE);
    }
  };

  const handleBeginPaydayJourney = () => {
    setFlowSource('payday');
    setAllocationAmount(currentPersona.paydayScenario === 'salary_oct' ? 16000 : 5000);
    setCurrentView(VIEWS.PAYDAY);
  };

  const handleOpenReassessment = () => {
    setFlowSource('reassessment');
    setAllocationAmount(1500);
    setCurrentView(VIEWS.REASSESSMENT);
  };

  const handleProceedFromReassessment = (intentId, amount = 1500) => {
    setSelectedIntent(intentId);
    setAllocationAmount(amount);
    setFlowSource('reassessment');
    setCurrentView(VIEWS.ALLOCATION);
  };

  const handleProceedToAllocation = (intentId) => {
    setSelectedIntent(intentId);
    setFlowSource('payday');
    setAllocationAmount(currentPersona.paydayScenario === 'salary_oct' ? 16000 : 5000);
    setCurrentView(VIEWS.ALLOCATION);
  };

  const handleProceedToAction = (intentId, amount, horizonId) => {
    if (intentId) setSelectedIntent(intentId);
    if (amount) setAllocationAmount(amount);
    if (horizonId) setSelectedHorizon(horizonId);
    setCurrentView(VIEWS.ACTION);
  };

  const handleBackToAllocation = () => {
    if (flowSource === 'goal_decide') {
      setCurrentView(VIEWS.GOAL_DECIDE);
    } else if (flowSource === 'investing_decide') {
      setCurrentView(VIEWS.INVESTING_DECIDE);
    } else {
      setCurrentView(VIEWS.ALLOCATION);
    }
  };

  const handleBackToAllocationSource = () => {
    if (flowSource === 'reassessment') {
      setCurrentView(VIEWS.REASSESSMENT);
    } else {
      setCurrentView(VIEWS.PAYDAY);
    }
  };

  const handleBackToDecide = () => {
    setCurrentView(VIEWS.DECIDE);
    setSelectedIntent(null);
  };

  const handleViewProgress = () => {
    setCurrentView(VIEWS.PROGRESS);
  };

  const handleOpenUnderstand = () => {
    setCurrentView(VIEWS.UNDERSTAND);
  };

  const handleSelectNavTab = (tab) => {
    if (tab === 'decide') {
      setCurrentView(VIEWS.DECIDE);
    } else if (tab === 'progress') {
      setCurrentView(VIEWS.PROGRESS);
    }
  };

  // ── Shared Scenario Controls Modal ────────────────
  const controlsModal = (
    <ScenarioControlsModal
      isOpen={isScenarioControlsOpen}
      onClose={() => setIsScenarioControlsOpen(false)}
      currentPersona={currentPersona}
      onApplyScenario={handleApplyScenario}
      onResetDefaults={handleResetScenario}
    />
  );

  // ── Render: Goal Decision View (Phase 5C - Situation 2) ──
  if (currentView === VIEWS.GOAL_DECIDE) {
    return (
      <div className="app-container">
        <GoalDecisionView
          currentPersona={currentPersona}
          onBackToDecide={handleBackToDecide}
          onProceedToAction={(goal, amount) => {
            setActiveSessionGoal(goal);
            setSelectedIntent('goal');
            setAllocationAmount(amount);
            setFlowSource('goal_decide');
            setCurrentView(VIEWS.ACTION);
          }}
        />
        <BottomNav activeTab="decide" onSelectTab={handleSelectNavTab} />
        {controlsModal}
      </div>
    );
  }

  // ── Render: Investing Decision View (Phase 5C - Situation 3) ──
  if (currentView === VIEWS.INVESTING_DECIDE) {
    return (
      <div className="app-container">
        <InvestingDecisionView
          currentPersona={currentPersona}
          onBackToDecide={handleBackToDecide}
          onProceedToAction={(intentId, amount, horizonId) => {
            setSelectedIntent(intentId || 'invest');
            setAllocationAmount(amount || currentPersona.unallocatedCash);
            if (horizonId) setSelectedHorizon(horizonId);
            setFlowSource('investing_decide');
            setCurrentView(VIEWS.ACTION);
          }}
        />
        <BottomNav activeTab="decide" onSelectTab={handleSelectNavTab} />
        {controlsModal}
      </div>
    );
  }

  // ── Render: Guided Check View (Phase 5C - Situation 4) ──
  if (currentView === VIEWS.GUIDED_DECIDE) {
    return (
      <div className="app-container">
        <GuidedCheckView
          currentPersona={currentPersona}
          onBackToDecide={handleBackToDecide}
          onRouteToSafety={() => {
            setSelectedIntent('safety');
            setAllocationAmount(currentPersona.unallocatedCash);
            setFlowSource('payday');
            setCurrentView(VIEWS.ALLOCATION);
          }}
          onRouteToGoal={() => {
            setCurrentView(VIEWS.GOAL_DECIDE);
          }}
          onRouteToInvesting={() => {
            setCurrentView(VIEWS.INVESTING_DECIDE);
          }}
        />
        <BottomNav activeTab="decide" onSelectTab={handleSelectNavTab} />
        {controlsModal}
      </div>
    );
  }

  // ── Render: Reassessment View (Phase 5) ───────────
  if (currentView === VIEWS.REASSESSMENT) {
    return (
      <div className="app-container">
        <ReassessmentView
          currentPersona={currentPersona}
          onBackToDecide={handleBackToDecide}
          onProceedToAllocation={handleProceedFromReassessment}
          onProceedToAction={(intentId, amount) => {
            setSelectedIntent(intentId);
            setAllocationAmount(amount);
            setFlowSource('reassessment');
            setCurrentView(VIEWS.ACTION);
          }}
        />
        <BottomNav activeTab="decide" onSelectTab={handleSelectNavTab} />
        {controlsModal}
      </div>
    );
  }

  // ── Render: Understand View (Phase 4A) ────────────
  if (currentView === VIEWS.UNDERSTAND) {
    return (
      <div className="app-container">
        <UnderstandView
          currentPersona={currentPersona}
          activeGoal={activeSessionGoal}
          lastSessionAction={lastSessionAction}
          onGoToProgress={handleViewProgress}
          onGoToDecide={handleBackToDecide}
        />
        <BottomNav activeTab="decide" onSelectTab={handleSelectNavTab} />
        {controlsModal}
      </div>
    );
  }

  // ── Render: Progress View (Phase 3) ────────────────
  if (currentView === VIEWS.PROGRESS) {
    return (
      <div className="app-container">
        <ProgressView
          currentPersona={currentPersona}
          activeGoal={activeSessionGoal}
          lastSessionAction={lastSessionAction}
          onGoToDecide={handleBackToDecide}
          onSwitchPersona={handleSwitchPersona}
        />
        <BottomNav activeTab="progress" onSelectTab={handleSelectNavTab} />
        {controlsModal}
      </div>
    );
  }

  // ── Render: Action View (Phase 2C, 4B & Phase 5) ──
  if (currentView === VIEWS.ACTION) {
    const effectiveAmount =
      allocationAmount ||
      (currentPersona.paydayScenario === 'salary_oct' ? 16000 : 5000);

    return (
      <div className="app-container">
        <ActionView
          currentPersona={currentPersona}
          activeGoal={activeSessionGoal}
          selectedIntent={selectedIntent || 'safety'}
          incomingAmount={effectiveAmount}
          initialHorizonId={selectedHorizon}
          flowSource={flowSource}
          onBack={handleBackToAllocation}
          onReset={handleBackToDecide}
          onViewProgress={handleViewProgress}
          onRecordAction={handleRecordAction}
          onRecordGoalAction={handleRecordGoalAction}
        />
        <BottomNav activeTab="decide" onSelectTab={handleSelectNavTab} />
        {controlsModal}
      </div>
    );
  }

  // ── Render: Allocation View (Phase 2B & Phase 5) ──
  if (currentView === VIEWS.ALLOCATION) {
    const effectiveAmount =
      allocationAmount ||
      (currentPersona.paydayScenario === 'salary_oct' ? 16000 : 5000);

    return (
      <div className="app-container">
        <AllocationView
          persona={currentPersona}
          initialIntent={selectedIntent}
          customIncomingAmount={effectiveAmount}
          customTitle={flowSource === 'reassessment' ? "Reassessed Allocation" : "Allocation"}
          customSubtitle={
            flowSource === 'reassessment'
              ? "How to think about your extra ₹1,500"
              : undefined
          }
          onBack={handleBackToAllocationSource}
          onProceedToAction={handleProceedToAction}
        />
        <BottomNav activeTab="decide" onSelectTab={handleSelectNavTab} />
        {controlsModal}
      </div>
    );
  }

  // ── Render: Payday View ───────────────────────────
  if (currentView === VIEWS.PAYDAY) {
    return (
      <div className="app-container">
        <PaydayView
          persona={currentPersona}
          onBack={handleBackToDecide}
          onProceedToAllocation={handleProceedToAllocation}
        />
        <BottomNav activeTab="decide" onSelectTab={handleSelectNavTab} />
        {controlsModal}
      </div>
    );
  }

  // ── Render: Decide View (Phase 1 home screen) ─────
  return (
    <div className="app-container">
      <AppHeader
        currentPersona={currentPersona}
        onSwitchPersona={handleSwitchPersona}
        onOpenScenarioControls={() => setIsScenarioControlsOpen(true)}
      />

      <main className="app-content">
        <CashContextHero persona={currentPersona} />

        <section className="decision-prompt-section" aria-labelledby="decision-heading">
          <span className="section-eyebrow">Financial Context</span>
          <h2 id="decision-heading" className="section-heading">
            What are you trying to do with your money?
          </h2>
          <p className="section-subheading">
            Start from your situation, not complicated financial products. Pick a card below to see your contextual guidance.
          </p>
        </section>

        <section className="situational-list" aria-label="Situations">
          {SITUATIONAL_SCENARIOS.map((scenario) => (
            <SituationalCard
              key={scenario.id}
              scenario={scenario}
              isSelected={selectedScenarioId === scenario.id}
              onSelect={(s) => {
                handleSelectScenario(s);
                handleBeginJourneyForScenario(s.id);
              }}
            />
          ))}
        </section>

        <DecisionPreview
          scenario={selectedScenario}
          availableCash={currentPersona.unallocatedCash}
          onBeginJourney={() => handleBeginJourneyForScenario(selectedScenario?.id)}
        />

        {/* Phase 5 Contextual Reassessment Entry Point (Aarav unexpected income) */}
        {currentPersona.reassessmentEvent && (
          <ReassessmentEventCard
            event={currentPersona.reassessmentEvent}
            onSeeReassessment={handleOpenReassessment}
          />
        )}

        {/* Phase 4A Contextual Intelligence Entry Point */}
        <ContextualEventCard
          event={currentPersona.portfolioEvent}
          onSeeMeaning={handleOpenUnderstand}
        />

        <div className="prototype-meta-banner">
          <Info size={15} style={{ flexShrink: 0, marginTop: '1px', color: 'var(--text-secondary)' }} />
          <span>
            <strong>Phase 5C active.</strong> All 4 Decide situations functional. Tap top-right controls to test scenario inputs.
          </span>
        </div>
      </main>

      <BottomNav activeTab="decide" onSelectTab={handleSelectNavTab} />
      {controlsModal}
    </div>
  );
}

export default App;
