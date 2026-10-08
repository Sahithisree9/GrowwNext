# Groww Next — In-Context Financial Decisioning for Gen-Z Investors

> **A situational decision engine designed for first-time earners (ages 20–26) in India.**  
> Moving from *"Which financial product should I buy?"* to *"What should I do with my money given my current situation?"*

[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple.svg)](https://vitejs.dev/)
[![ESLint](https://img.shields.io/badge/ESLint-Passing-brightgreen.svg)](https://eslint.org/)
[![Status](https://img.shields.io/badge/Status-Complete-emerald.svg)]()

---

## 📌 Executive Summary & Product Thesis

A large share of new investors in India today are between 20 and 26 years old—opening their first demat account after receiving their first salary or freelance stipend. 

Traditional fintech broker applications present an immediate catalog of thousands of stocks, mutual funds, and market tickers. For first-time earners with modest starter balances (₹2,500 – ₹10,000) and low liquid reserves, this creates **severe decision paralysis and risk anxiety**. Pushing market risk onto an unprotected income often leads to panic-selling during ordinary drawdowns and early platform churn.

### The Central Thesis
> **First-time investors do not lack investment choices; they lack situational financial safety.**  
> By anchoring decisions to real-world cash-flow reality—prioritizing liquid emergency cushions first, earmarking near-term goals second, and opening the door to market compounding only when the foundation is secure—platforms can convert anxiety into sustainable, recurring investment confidence.

---

## 🚀 Key Product Architecture

### 1. Cash-Flow Context Layer (`Decide`)
Before presenting any financial instrument, the user is grounded in their immediate cash-flow reality:
* **Monthly Inflow**: Verified salary or monthly earnings.
* **Fixed Living Costs**: Rent, food, bills, and debt commitments.
* **Emergency Buffer Health**: Liquid cushion tracked against a starter target benchmark.
* **Available Cash**: Unallocated discretionary cash ready for decisioning.

### 2. Four Real-World Situational Journeys
Instead of search bars or ticker terminals, the home feed provides 4 situational entry points:
* 💵 **I just got paid**: Intent-based payday allocation (Safety vs. Goal vs. Growth).
* 🎯 **I'm saving for something**: Dedicated goal earmarking with multi-goal isolation (e.g., New Laptop vs. Goa Trip).
* 📈 **I want to start investing**: Foundational context with educational time-horizon trade-offs (`< 1 year`, `1–3 years`, `3+ years`).
* 🧭 **I'm not sure yet**: A 3-question diagnostic checkup routing users to the appropriate allocation path.

### 3. Buffer-Health Gated Dynamic Allocation Engine
The core rules engine (`allocationEngine.js`) dynamically balances money across 4 buckets:
1. **Safety Cushion** (Liquid Emergency Reserve)
2. **Short-Term Goal Progress** (Earmarked Targets)
3. **Long-Term Growth** (Market Compounding)
4. **Flexible Spending** (Near-Term Buffer)

```
Ratio = Current Buffer / Target Buffer

• Thin Buffer (< 50% target): Automatically directs up to 60% of new funds 
  into liquidity reinforcement, protecting users from forced liquidation.
• Healthy Buffer (>= 50% target): Unlocks higher growth allocations (up to 60-65%),
  accelerating compounding.
• Mathematical Invariant: Total slices strictly equal the incoming amount with
  zero rounding drift.
```

### 4. Goal Progress & Timeline Pacing (`Progress`)
Tracks milestones through explicit mathematical pacing:
* **Metrics**: Saved so far, Remaining to go, Target amount, Current monthly pace.
* **Timeline Projection**: $\text{Months Remaining} = \lceil \frac{\text{Remaining}}{\text{Monthly Pace}} \rceil$.
* **Status Feedback**: `"You're on track"` displayed when pace satisfies the target timeline.
* **Semantic Action Isolation**: Non-goal contributions (Safety/Growth) are verified to leave goal balances completely untouched.

### 5. Market Volatility Translation (`Understand`)
Replaces anxiety-inducing red ticker alerts with a calming, contextual de-escalation layer:
* **Scenario**: Demonstrates an intraday portfolio dip ($-₹120 / -1.5\%$ on ₹8,000 invested).
* **Behavioral Decoupling**: Explicitly verifies that daily market movements do not reduce personal goal savings.
* **Guidance**: Encourages holding discipline rather than panic-selling or speculative trading.

### 6. Contextual Reassessment (Mid-Month Windfalls)
Addresses the 29-day retention gap between paydays:
* Handles unexpected financial events (e.g., Aarav receiving a +₹1,500 freelance payout).
* Updates available cash and dynamically adapts reasoning without requiring users to reset their financial plan.

### 7. Dual Personas & Demo Controls
Includes two distinct personas to test edge cases:
* **Aarav (23, Junior Developer)**: Thin buffer (₹4,000 / ₹10,000), ₹2,500 available cash, Laptop goal.
* **Riya (26, Product Designer)**: Healthy buffer (₹28,000 / ₹30,000), ₹10,000 available cash, Goa Trip goal.
* **Scenario Controls Modal**: Interactive controls allowing evaluators to adjust inflow, fixed costs, buffer balances, and available cash with one-tap presets.

---

## 🛡️ Financial Safety & Product Boundaries

* **No Real Transactions**: Pure simulated session states; zero bank debits or order execution.
* **Neutral Educational Guidance**: Zero individual stocks, mutual funds, or brokers recommended.
* **No Return Guarantees**: Educational risk/time-horizon trade-offs replace speculative CAGR projections.
* **Strict State Integrity**: Every action produces a logically consistent downstream state across all views.

---

## 🧪 Evaluation & Quality Verification

The prototype is verified by an automated regression test suite:
* **Math Engine Suite (`test_engine_math.mjs`)**: 88 / 88 tests passed (total-sum guarantees, edge cases, pacing math).
* **Scenario Suite (`test_phase5c_scenarios.mjs`)**: 26 / 26 tests passed (buffer sensitivity, persona baselines).
* **Cross-Journey State Integrity Suite (`test_state_integrity_audit.mjs`)**: 37 / 37 tests passed (growth action isolation, multi-goal isolation, time-horizon preservation).
* **Responsive Layouts**: Validated across **360×800**, **390×844**, **430×932**, and desktop viewports with zero horizontal overflow and full bottom-nav clearance.
* **Lint & Build**: `npm run lint` (0 errors), `npm run build` (production bundle passing).

---

## 📂 Project Structure

```
groww-next/
├── src/
│   ├── components/         # Reusable UI cards, heros, pickers, and modals
│   │   ├── CashContextHero.jsx       # Financial context hero (Inflow/Outflow/Buffer)
│   │   ├── SituationalCard.jsx       # 4 Situation cards for Decide Home
│   │   ├── ActionCard.jsx            # Primary action recommendation
│   │   ├── TimeHorizonPicker.jsx     # Educational horizon trade-offs (<1y, 1-3y, 3y+)
│   │   ├── GoalProgressCard.jsx      # Goal metric breakdown & last action state
│   │   ├── UnderstandHero.jsx        # Calming market delta header
│   │   └── ScenarioControlsModal.jsx # Live tester scenario controls modal
│   ├── data/
│   │   ├── mockData.js               # Persona baselines, horizons, mock events
│   │   └── allocationEngine.js       # Buffer-aware allocation calculation engine
│   ├── views/              # View layer for journeys
│   │   ├── PaydayView.jsx            # Payday intent elicitation
│   │   ├── AllocationView.jsx        # Visual allocation breakdown
│   │   ├── GoalDecisionView.jsx      # Dedicated goal earmarking journey
│   │   ├── InvestingDecisionView.jsx # Foundational context & horizon selection
│   │   ├── GuidedCheckView.jsx       # 3-question diagnostic checkup
│   │   ├── ActionView.jsx            # Action commitment & confirmation
│   │   ├── ProgressView.jsx          # Progress tracking & pacing
│   │   ├── UnderstandView.jsx        # Market dip translation & goal decoupling
│   │   └── ReassessmentView.jsx      # Mid-month windfall recalculation
│   ├── styles/             # Modular CSS design system (tokens, dark theme)
│   ├── App.jsx             # Top-level state coordinator & session continuity
│   └── main.jsx            # Vite entry point
├── public/                 # Static assets
├── index.html              # HTML template
├── package.json            # Project dependencies & scripts
└── vite.config.js          # Vite build configuration
```

---

## 💻 Quick Start & Local Setup

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher

### Installation
```bash
# Clone the repository
git clone https://github.com/Sahithisree9/GrowwNext.git

# Navigate into project directory
cd GrowwNext

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173/`.

### Available Scripts
```bash
npm run dev     # Starts local Vite development server with HMR
npm run build   # Compiles production bundle into /dist
npm run lint    # Runs ESLint code quality checks
npm run preview # Previews the production build locally
```

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
