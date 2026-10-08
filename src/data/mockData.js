/**
 * MOCK DATA STORE — GROWW GEN-Z CONTEXTUAL PROTOTYPE
 * Note: All figures, names, and allocations are realistic mock models
 * designed for iterative product validation, not real financial recommendations.
 */

export const MOCK_PERSONAS = [
  {
    id: "intern_aarav",
    name: "Aarav",
    age: 21,
    role: "Design Intern",
    tagline: "Stipend earner · First financial steps",
    monthlyInflow: 22000,
    fixedObligations: 15500, // rent/PG, commute, food
    emergencyReserve: 4000,  // accessible bank buffer
    emergencyReserveTarget: 10000, // starter cushion benchmark for this persona
    unallocatedCash: 2500,   // ready to decide today
    currency: "₹",
    avatarInitials: "A",

    // Payday scenario: the specific incoming amount in this flow
    paydayScenario: "stipend_oct",

    // Centralized Goals for Aarav
    goals: [
      {
        id: "g_laptop",
        title: "New Laptop",
        targetAmount: 45000,
        currentSaved: 12000,
        monthlyContribution: 2500,
        targetMonths: 15, // remaining 33,000 / 2,500 = 14 months <= 15 months target timeline
        category: "Work & Productivity",
        iconName: "Laptop",
        lastAction: "₹2,500 marked toward New Laptop",
      },
      {
        id: "g_trip",
        title: "Goa Trip",
        targetAmount: 20000,
        currentSaved: 8500,
        monthlyContribution: 2000,
        targetMonths: 6, // remaining 11,500 / 2,000 = 6 months <= 6 months target timeline
        category: "Travel & Experiences",
        iconName: "Palmtree",
        lastAction: "₹2,000 marked toward Goa Trip",
      },
      {
        id: "g_emergency",
        title: "Rainy Day Fund",
        targetAmount: 30000,
        currentSaved: 4000,
        monthlyContribution: 1500,
        targetMonths: 18,
        category: "Peace of Mind",
        iconName: "Shield",
        lastAction: "₹1,500 marked toward Rainy Day Fund",
      },
    ],

    // Phase 3 & 4: Primary Goal Context (points to default goal)
    primaryGoal: {
      id: "g_laptop",
      title: "New Laptop",
      targetAmount: 45000,
      currentSaved: 12000,
      monthlyContribution: 2500,
      targetMonths: 15,
      category: "Work & Productivity",
      iconName: "Laptop",
      lastAction: "₹2,500 marked toward New Laptop",
    },

    // Phase 4A & 4B: Recalibrated Contextual Market Event (Mock Product State)
    portfolioEvent: {
      id: "evt_aarav_dip",
      title: "Your investments moved today",
      portfolioValue: 7880,
      investedAmount: 8000,
      portfolioChange: -120, // 7880 - 8000 = -120
      portfolioChangePercent: -1.5, // (-120 / 8000) * 100 = -1.5%
      eventSummary: "In this example, your investments are worth about ₹120 less than they were at the start of the day.",
      personalMeaning: "Your portfolio is down ₹120, but your goal hasn't changed.",
      goalImpactNote: "Today's portfolio movement is a change in your investments; it doesn't by itself change the progress you've recorded toward this goal.",
      nextStepAdvice: "A short-term portfolio movement doesn't automatically mean your existing goal or plan needs to change.",
    },

    // Phase 5: Contextual Reassessment Event (Unexpected Additional Income)
    reassessmentEvent: {
      id: "evt_extra_income",
      type: "unexpected_income",
      amount: 1500,
      source: "Freelance project payout",
      title: "You received an extra ₹1,500 this month",
      subtitle: "Freelance payout · See how this changes your plan",
      receivedLabel: "Extra income received · October 2026",
      eventSummary: "You received an extra ₹1,500 this month, taking your available unallocated cash from ₹2,500 to ₹4,000.",
      beforeContext: {
        unallocatedCash: 2500,
        emergencyReserve: 4000,
        emergencyReserveTarget: 10000,
        goalTitle: "New Laptop",
        goalCurrent: 12000,
        goalTarget: 45000,
        goalPace: 2500,
      },
      afterContext: {
        unallocatedCash: 4000,
        emergencyReserve: 4000,
        emergencyReserveTarget: 10000,
        goalTitle: "New Laptop",
        goalCurrent: 12000,
        goalTarget: 45000,
        goalPace: 2500,
      },
      reasoning: {
        headline: "Why your situation changes the decision",
        explanation: "Your buffer is still below its target (₹4,000 of ₹10,000). Because of that, the additional ₹1,500 gives you more room to strengthen your financial foundation before putting more toward longer-term growth.",
        bufferImpact: "Moving this to your safety cushion immediately brings your buffer to ₹5,500 (over 50% of your target), significantly reducing vulnerability to sudden emergencies.",
        goalImpact: "Putting this toward your New Laptop accelerates your timeline by nearly 3 weeks without increasing your monthly commitment.",
        growthCaution: "While you could invest this amount, doing so with a thin safety buffer carries extra risk — an unexpected expense could force you to withdraw invested funds early."
      }
    },

    // Future Phase Schema: Investments & SIPs
    mockInvestments: {
      totalInvested: 8000,
      currentValue: 7880,
      activeSipCount: 1,
      sips: [
        {
          id: "sip_1",
          schemeName: "Nifty 50 Index Fund",
          monthlyAmount: 1000,
          nextDate: "2026-10-15",
          frequency: "Monthly",
          type: "Index Fund"
        }
      ],
      recentMarketContext: {
        headline: "Markets dipped slightly today",
        plainExplanation: "In this mock scenario, your portfolio fluctuated by -₹120 (-1.5%).",
        actionAdvice: "No action needed. Regular investing balances market swings over time."
      }
    }
  },
  {
    id: "first_job_riya",
    name: "Riya",
    age: 23,
    role: "Junior Associate",
    tagline: "First full-time salary · Building habits",
    monthlyInflow: 68000,
    fixedObligations: 42000,
    emergencyReserve: 28000,
    emergencyReserveTarget: 30000, // ~3 months of fixed costs for Riya's lifestyle
    unallocatedCash: 10000,
    currency: "₹",
    avatarInitials: "R",

    paydayScenario: "salary_oct",

    // Centralized Goals for Riya
    goals: [
      {
        id: "g_trip",
        title: "Goa Trip",
        targetAmount: 25000,
        currentSaved: 16000,
        monthlyContribution: 3000,
        targetMonths: 4, // remaining 9,000 / 3,000 = 3 months <= 4 months target timeline
        category: "Travel & Experiences",
        iconName: "Palmtree",
        lastAction: "₹3,000 marked toward Goa Trip",
      },
      {
        id: "g_laptop",
        title: "New Laptop",
        targetAmount: 50000,
        currentSaved: 22000,
        monthlyContribution: 4000,
        targetMonths: 7,
        category: "Work & Productivity",
        iconName: "Laptop",
        lastAction: "₹4,000 marked toward New Laptop",
      },
      {
        id: "g_emergency",
        title: "Rainy Day Fund",
        targetAmount: 35000,
        currentSaved: 10000,
        monthlyContribution: 2500,
        targetMonths: 10,
        category: "Peace of Mind",
        iconName: "Shield",
        lastAction: "₹2,500 marked toward Rainy Day Fund",
      },
    ],

    // Phase 3 & 4: Primary Goal Context
    primaryGoal: {
      id: "g_trip",
      title: "Goa Trip",
      targetAmount: 25000,
      currentSaved: 16000,
      monthlyContribution: 3000,
      targetMonths: 4,
      category: "Travel & Experiences",
      iconName: "Palmtree",
      lastAction: "₹3,000 marked toward Goa Trip",
    },

    // Phase 4A: Contextual Market Event (Mock Product State)
    portfolioEvent: {
      id: "evt_riya_dip",
      title: "Your investments changed today",
      portfolioValue: 49350,
      investedAmount: 50000,
      portfolioChange: -650, // 49350 - 50000 = -650
      portfolioChangePercent: -1.3, // (-650 / 50000) * 100 = -1.3%
      eventSummary: "In this example, your investments are worth about ₹650 less than they were at the start of the day.",
      personalMeaning: "Your portfolio is down ₹650, but your goal hasn't changed.",
      goalImpactNote: "Today's portfolio movement is a change in your investments; it doesn't by itself change the progress you've recorded toward this goal.",
      nextStepAdvice: "A short-term portfolio movement doesn't automatically mean your existing goal or plan needs to change.",
    },

    // Phase 5: No active reassessment event for Riya (demonstrates persona isolation)
    reassessmentEvent: null,

    mockInvestments: {
      totalInvested: 50000,
      currentValue: 49350,
      activeSipCount: 2,
      sips: [
        {
          id: "sip_2",
          schemeName: "Nifty 50 Index Fund",
          monthlyAmount: 2500,
          nextDate: "2026-10-10",
          frequency: "Monthly",
          type: "Index Fund"
        }
      ],
      recentMarketContext: {
        headline: "Markets steady",
        plainExplanation: "In this mock scenario, your portfolio fluctuated by -₹650 (-1.3%).",
        actionAdvice: "Keep your scheduled SIP active."
      }
    }
  }
];

/**
 * Payday Scenarios: configurable mock incoming-money events
 * These are separate from the persona's base cashflow — they represent
 * a specific new payment received this period.
 */
export const PAYDAY_SCENARIOS = {
  stipend_oct: {
    id: "stipend_oct",
    amount: 5000,
    source: "Design Internship Stipend",
    period: "October 2026",
    type: "stipend",
    receivedLabel: "Stipend received · October 2026",
    // Context note for this period (does NOT make financial judgments)
    contextNote: "Your essentials are covered this month. Now let's decide what this ₹5,000 should help you do."
  },
  salary_oct: {
    id: "salary_oct",
    amount: 16000,
    source: "Monthly Salary",
    period: "October 2026",
    type: "salary",
    receivedLabel: "Salary received · October 2026",
    contextNote: "Your essentials are covered this month. Now let's decide what this ₹16,000 should help you do."
  }
};

/**
 * Money Intents — plain-language framing of what the user wants
 * their incoming money to accomplish. These are NOT investment products.
 * Phase 2B will wire each intent to a relevant next step.
 */
export const MONEY_INTENTS = [
  {
    id: "safety",
    icon: "Shield",
    label: "Build my safety cushion",
    desc: "Strengthen my emergency fund before anything else",
    tag: "Low priority for anxiety"
  },
  {
    id: "goal",
    icon: "Target",
    label: "Save toward something",
    desc: "I have a specific target or timeline in mind",
    tag: "Goal-first approach"
  },
  {
    id: "invest",
    icon: "TrendingUp",
    label: "Start growing it",
    desc: "Invest a portion with a simple, clear plan",
    tag: "Long-term thinking"
  }
];

/**
 * Situational Entry Points: The core starting situations for Gen-Z decision making
 * "What are you trying to do with your money today?"
 */
export const SITUATIONAL_SCENARIOS = [
  {
    id: "just_paid",
    title: "I just got paid",
    badge: "Payday flow",
    icon: "Wallet",
    description: "Allocate your earnings smartly between spending, safety cushion, and future growth.",
    contextualHint: "You have unallocated funds from this month's inflow. Deciding now prevents accidental impulsive spending.",
    sampleActionLabel: "Begin payday flow",
    hasJourney: true,
    recommendedSplit: {
      safeToSpend: "40%",
      starterGoal: "35%",
      firstInvest: "25%"
    }
  },
  {
    id: "saving_for_something",
    title: "I'm saving for something",
    badge: "Goal focused",
    icon: "Target",
    description: "Park money toward a specific target (laptop, travel, or an emergency buffer) without market risk.",
    contextualHint: "Short-term goals need high safety and liquidity, not volatile equity trading.",
    sampleActionLabel: "Review goal options",
    hasJourney: true,
    recommendedSplit: {
      suggestedInstrument: "Liquid / Ultra-Short Term Fund or High-yield Savings",
      lockIn: "Zero lock-in, withdraw anytime"
    }
  },
  {
    id: "start_investing",
    title: "I want to start investing",
    badge: "First-time investor",
    icon: "TrendingUp",
    description: "Before thinking about an investment product, let's understand how much you're comfortable setting aside.",
    contextualHint: "Start from your cash context and time frame. You don't need to pick individual stocks to build real long-term wealth.",
    sampleActionLabel: "Review investing options",
    hasJourney: true,
    recommendedSplit: {
      startingPace: "Comfortable monthly surplus",
      philosophy: "Disciplined index investing over stock-picking"
    }
  },
  {
    id: "not_sure_yet",
    title: "I'm not sure yet",
    badge: "Guided mode",
    icon: "HelpCircle",
    description: "Answer 3 quick questions about your money situation to see what makes sense right now.",
    contextualHint: "No pressure or complex jargon. We'll help you figure out your immediate next step.",
    sampleActionLabel: "Find what makes sense",
    hasJourney: true,
    recommendedSplit: {
      approach: "Step-by-step plain language walkthrough"
    }
  }
];

/**
 * Format Indian Rupee currency with commas: e.g. 2500 -> ₹2,500
 */
export const formatCurrency = (amount) => {
  if (typeof amount !== 'number') return '₹0';
  return `₹${amount.toLocaleString('en-IN')}`;
};

export const TIME_HORIZONS = [
  {
    id: 'short',
    label: 'Less than 1 year',
    subtext: 'Short horizon',
    education:
      'For a short horizon, keeping money accessible and limiting exposure to short-term market fluctuations becomes more important.',
  },
  {
    id: 'medium',
    label: '1–3 years',
    subtext: 'Medium horizon',
    education:
      'With a medium horizon, the trade-off between growth, liquidity and volatility becomes important.',
  },
  {
    id: 'long',
    label: '3+ years',
    subtext: 'Longer horizon',
    education:
      'A longer horizon gives you more time to ride out short-term market fluctuations and consider long-term growth.',
  },
];
