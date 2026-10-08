/**
 * ALLOCATION ENGINE — Phase 2B
 *
 * Translates: user context + intent → explainable allocation slices.
 *
 * This is a MOCK PROTOTYPE model — not financial advice.
 * Amounts are derived from simple contextual rules, not arbitrary formulas.
 * The purpose is to demonstrate CONTEXT + INTENT → GUIDANCE.
 */

import { formatCurrency } from './mockData.js';

// ─────────────────────────────────────────────
// CONTEXT ASSESSMENT
// ─────────────────────────────────────────────

/**
 * Assess emergency buffer health relative to the user's target.
 * 'thin'     → below 50% of target (protection is the first priority)
 * 'moderate' → 50–85% of target (building, but not an emergency)
 * 'healthy'  → above 85% of target (foundation is stable)
 */
function assessBufferHealth(emergencyReserve, target) {
  const ratio = emergencyReserve / target;
  if (ratio < 0.50) return 'thin';
  if (ratio < 0.85) return 'moderate';
  return 'healthy';
}

/**
 * Build a plain-language context note explaining what the buffer state means.
 * Referenced in the allocation view so users understand WHY the guidance is shaped as it is.
 */
function buildContextNote(persona, bufferHealth) {
  const { emergencyReserve, emergencyReserveTarget } = persona;

  if (bufferHealth === 'thin') {
    return `Your emergency buffer is at ${formatCurrency(emergencyReserve)}, which is well below a comfortable starting target of ${formatCurrency(emergencyReserveTarget)}. The guidance below reflects this — building that cushion is a meaningful priority right now.`;
  }
  if (bufferHealth === 'moderate') {
    return `Your emergency buffer is at ${formatCurrency(emergencyReserve)} — reasonable progress toward your ${formatCurrency(emergencyReserveTarget)} target, but not fully there yet. The guidance keeps some safety weight while following your intent.`;
  }
  return `Your emergency buffer is at ${formatCurrency(emergencyReserve)}, which is healthy relative to your target. That gives you more room to follow your intent without compromising your foundation.`;
}

// ─────────────────────────────────────────────
// DISTRIBUTION UTILITIES
// ─────────────────────────────────────────────

/**
 * Round to the nearest ₹500.
 * Makes allocations feel like human decisions, not algorithmic outputs.
 */
function roundTo500(n) {
  return Math.round(n / 500) * 500;
}

/**
 * Distribute a total amount into slices using proportional ratios,
 * rounding each to the nearest ₹500. Adjusts the first (highest-priority)
 * slice to absorb any rounding difference, ensuring the total is exact.
 */
function distribute(total, ratios) {
  const raw = ratios.map(r => r * total);
  const rounded = raw.map(r => roundTo500(r));
  const roundedSum = rounded.reduce((a, b) => a + b, 0);
  const diff = total - roundedSum;
  // Absorb rounding error in the priority slice (index 0)
  rounded[0] += diff;
  return rounded;
}

// ─────────────────────────────────────────────
// INTENT ALLOCATION MODELS
// ─────────────────────────────────────────────

function buildSafetyAllocation(incomingAmount, bufferHealth, persona) {
  // Safety intent: always the highest priority on the safety slice.
  // Buffer health determines how much goes there vs. flexibility vs. growth.
  const ratios =
    bufferHealth === 'thin'     ? [0.65, 0.25, 0.10] :
    bufferHealth === 'moderate' ? [0.50, 0.30, 0.20] :
                                  [0.40, 0.35, 0.25];

  const [safetyAmt, flexAmt, growthAmt] = distribute(incomingAmount, ratios);
  const { emergencyReserveTarget } = persona;

  return [
    {
      id: 'safety',
      label: 'Safety cushion',
      amount: safetyAmt,
      pct: safetyAmt / incomingAmount,
      colorKey: 'emerald',
      explanation:
        bufferHealth === 'thin'
          ? `Your buffer is well below ${formatCurrency(emergencyReserveTarget)} — the primary allocation goes here so you have real protection if something unexpected happens.`
          : bufferHealth === 'moderate'
          ? `Still building toward your target — this keeps the momentum going without overstretching.`
          : `Your buffer is in good shape. This top-up keeps it that way as your expenses grow.`,
    },
    {
      id: 'flex',
      label: 'Short-term flexibility',
      amount: flexAmt,
      pct: flexAmt / incomingAmount,
      colorKey: 'amber',
      explanation: `Kept accessible for near-term spending so you don't need to touch your safety cushion for everyday needs.`,
    },
    {
      id: 'growth',
      label: 'Start growing',
      amount: growthAmt,
      pct: growthAmt / incomingAmount,
      colorKey: 'indigo',
      explanation:
        bufferHealth === 'thin'
          ? `A smaller amount directed toward growth — modest here because building your cushion takes precedence right now.`
          : `With your foundation strengthening, even this portion begins compounding in your favour.`,
    },
  ];
}

function buildGoalAllocation(incomingAmount, bufferHealth, persona) {
  // Goal intent: the goal contribution leads, but the safety level constrains how much can go there.
  // Thin buffer → can't ignore safety even when a goal is the priority.
  const ratios =
    bufferHealth === 'thin'     ? [0.45, 0.30, 0.25] :
    bufferHealth === 'moderate' ? [0.55, 0.25, 0.20] :
                                  [0.60, 0.20, 0.20];

  const [goalAmt, safetyAmt, flexAmt] = distribute(incomingAmount, ratios);
  const { emergencyReserve } = persona;

  return [
    {
      id: 'goal',
      label: 'Goal contribution',
      amount: goalAmt,
      pct: goalAmt / incomingAmount,
      colorKey: 'amber',
      explanation:
        bufferHealth === 'thin'
          ? `Your goal gets the leading share — though a thinner buffer means we've kept it from taking everything.`
          : `With your basics covered, the larger portion goes directly toward what you're working toward.`,
    },
    {
      id: 'safety',
      label: 'Safety top-up',
      amount: safetyAmt,
      pct: safetyAmt / incomingAmount,
      colorKey: 'emerald',
      explanation:
        bufferHealth === 'thin'
          ? `Your buffer is at ${formatCurrency(emergencyReserve)} — still building. Keeping some here prevents a small emergency from derailing your goal.`
          : `Your buffer is in reasonable shape. A smaller allocation here maintains it without slowing your goal progress.`,
    },
    {
      id: 'flex',
      label: 'Short-term flexibility',
      amount: flexAmt,
      pct: flexAmt / incomingAmount,
      colorKey: 'slate',
      explanation: `Stays accessible for expected near-term needs so your goal savings remain untouched when everyday costs come up.`,
    },
  ];
}

function buildInvestAllocation(incomingAmount, bufferHealth, persona) {
  // Invest intent: growth leads when the buffer is healthy.
  // Critically: if the buffer is thin, safety still takes a significant share —
  // investing without a safety net adds unnecessary risk.
  const ratios =
    bufferHealth === 'thin'     ? [0.25, 0.50, 0.25] :
    bufferHealth === 'moderate' ? [0.40, 0.35, 0.25] :
                                  [0.55, 0.25, 0.20];

  const [growthAmt, safetyAmt, flexAmt] = distribute(incomingAmount, ratios);
  const { emergencyReserve } = persona;

  return [
    {
      id: 'growth',
      label: 'Long-term growth',
      amount: growthAmt,
      pct: growthAmt / incomingAmount,
      colorKey: 'indigo',
      explanation:
        bufferHealth === 'thin'
          ? `A meaningful start toward long-term growth — kept smaller because investing without a safety cushion in place increases your risk unnecessarily.`
          : bufferHealth === 'moderate'
          ? `With a reasonable foundation, a good portion can start working toward long-term growth.`
          : `With a solid cushion in place, this can grow over time without you needing to worry about short-term access.`,
    },
    {
      id: 'safety',
      label: 'Safety cushion',
      amount: safetyAmt,
      pct: safetyAmt / incomingAmount,
      colorKey: 'emerald',
      explanation:
        bufferHealth === 'thin'
          ? `Your buffer is at ${formatCurrency(emergencyReserve)} — below a comfortable level. Keeping this allocation here means a tough month won't force you to withdraw your investments early.`
          : `Maintaining your cushion means market fluctuations won't affect your near-term financial stability.`,
    },
    {
      id: 'flex',
      label: 'Short-term flexibility',
      amount: flexAmt,
      pct: flexAmt / incomingAmount,
      colorKey: 'slate',
      explanation: `Kept accessible so you're not pressured to make investment decisions based on immediate cash needs.`,
    },
  ];
}

// ─────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────

const CTA_LABELS = {
  safety: 'Build my safety cushion',
  goal:   'Add toward my goal',
  invest: 'Continue to investing',
};

/**
 * computeAllocation(incomingAmount, persona, intentId)
 *
 * Returns:
 *   slices[]      — array of { id, label, amount, pct, colorKey, explanation }
 *   bufferHealth  — 'thin' | 'moderate' | 'healthy'
 *   contextNote   — plain-language explanation of the user's current context
 *   ctaLabel      — intent-specific action label for the CTA
 */
export function computeAllocation(incomingAmount, persona, intentId) {
  const target = persona.emergencyReserveTarget || 10000;
  const bufferHealth = assessBufferHealth(persona.emergencyReserve, target);
  const contextNote = buildContextNote(persona, bufferHealth);

  let slices;
  if (intentId === 'safety') {
    slices = buildSafetyAllocation(incomingAmount, bufferHealth, persona);
  } else if (intentId === 'goal') {
    slices = buildGoalAllocation(incomingAmount, bufferHealth, persona);
  } else {
    slices = buildInvestAllocation(incomingAmount, bufferHealth, persona);
  }

  // Sanity check: guarantee slices sum to incomingAmount exactly
  const actualTotal = slices.reduce((sum, s) => sum + s.amount, 0);
  if (actualTotal !== incomingAmount) {
    const delta = incomingAmount - actualTotal;
    slices[0] = { ...slices[0], amount: slices[0].amount + delta, pct: (slices[0].amount + delta) / incomingAmount };
  }

  // Filter out slices with amount 0 for smaller contextual allocations
  const activeSlices = slices.filter((s) => s.amount > 0);

  return {
    slices: activeSlices,
    bufferHealth,
    contextNote,
    ctaLabel: CTA_LABELS[intentId] || 'Continue',
  };
}
