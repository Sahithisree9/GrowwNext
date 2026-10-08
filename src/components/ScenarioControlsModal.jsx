import React, { useState, useEffect } from 'react';
import { X, Sliders, RotateCcw, Check, ShieldAlert, ShieldCheck } from 'lucide-react';

/**
 * ScenarioControlsModal — Phase 5C
 *
 * Lightweight demo control panel to adjust financial assumptions in real time
 * during evaluations and interviews.
 */
export function ScenarioControlsModal({
  isOpen,
  onClose,
  currentPersona,
  onApplyScenario,
  onResetDefaults,
}) {
  const [formData, setFormData] = useState({
    monthlyInflow: 22000,
    fixedObligations: 15500,
    emergencyReserve: 4000,
    emergencyReserveTarget: 10000,
    unallocatedCash: 2500,
  });

  // Sync state whenever persona changes or modal opens
  useEffect(() => {
    if (currentPersona) {
      setFormData({
        monthlyInflow: currentPersona.monthlyInflow || 22000,
        fixedObligations: currentPersona.fixedObligations || 15500,
        emergencyReserve: currentPersona.emergencyReserve || 4000,
        emergencyReserveTarget: currentPersona.emergencyReserveTarget || 10000,
        unallocatedCash: currentPersona.unallocatedCash || 2500,
      });
    }
  }, [currentPersona, isOpen]);

  if (!isOpen) return null;

  const handleChange = (field, val) => {
    const num = Math.max(0, parseInt(val, 10) || 0);
    setFormData((prev) => ({ ...prev, [field]: num }));
  };

  const handleApply = (e) => {
    e.preventDefault();
    onApplyScenario(formData);
    onClose();
  };

  // Quick preset helper for buffer sensitivity demo (Test F)
  const setBufferPreset = (bufferAmt) => {
    setFormData((prev) => ({ ...prev, emergencyReserve: bufferAmt }));
  };

  const bufferRatio = formData.emergencyReserve / (formData.emergencyReserveTarget || 10000);
  const bufferHealthState = bufferRatio < 0.5 ? 'thin' : bufferRatio < 0.85 ? 'moderate' : 'healthy';

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal-card scenario-controls-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="controls-modal-title"
      >
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-badge">
              <Sliders size={12} />
              <span>PROTOTYPE CONTROLS</span>
            </div>
            <h3 id="controls-modal-title" className="modal-title">
              Demo Scenario Inputs ({currentPersona.name})
            </h3>
            <p className="modal-subtitle">
              Prototype controls — these are simulated assumptions for demonstrating how the product responds to changing financial context.
            </p>
          </div>

          <button
            className="modal-close-btn"
            onClick={onClose}
            type="button"
            aria-label="Close prototype controls"
          >
            <X size={16} />
          </button>
        </div>

        {/* Quick Buffer Presets (Test F) */}
        <div className="preset-strip">
          <span className="preset-label">Test Buffer Sensitivity:</span>
          <div className="preset-buttons">
            <button
              type="button"
              className={`preset-chip ${formData.emergencyReserve === 2000 ? 'active' : ''}`}
              onClick={() => setBufferPreset(2000)}
            >
              <ShieldAlert size={12} />
              <span>Thin Buffer (₹2,000)</span>
            </button>
            <button
              type="button"
              className={`preset-chip ${formData.emergencyReserve === 9000 ? 'active' : ''}`}
              onClick={() => setBufferPreset(9000)}
            >
              <ShieldCheck size={12} />
              <span>Healthy Buffer (₹9,000)</span>
            </button>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleApply} className="scenario-form">
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="input-inflow" className="form-label">
                Monthly Inflow (₹)
              </label>
              <input
                id="input-inflow"
                type="number"
                step="500"
                className="form-input"
                value={formData.monthlyInflow}
                onChange={(e) => handleChange('monthlyInflow', e.target.value)}
              />
              <span className="field-hint">e.g. ₹22,000 or ₹30,000</span>
            </div>

            <div className="form-field">
              <label htmlFor="input-fixed" className="form-label">
                Fixed Living Costs (₹)
              </label>
              <input
                id="input-fixed"
                type="number"
                step="500"
                className="form-input"
                value={formData.fixedObligations}
                onChange={(e) => handleChange('fixedObligations', e.target.value)}
              />
              <span className="field-hint">Living essentials & rent</span>
            </div>

            <div className="form-field">
              <label htmlFor="input-buffer" className="form-label">
                Emergency Buffer (₹)
              </label>
              <input
                id="input-buffer"
                type="number"
                step="500"
                className="form-input"
                value={formData.emergencyReserve}
                onChange={(e) => handleChange('emergencyReserve', e.target.value)}
              />
              <span className={`field-hint buffer-status-${bufferHealthState}`}>
                Status: {bufferHealthState.toUpperCase()} ({Math.round(bufferRatio * 100)}%)
              </span>
            </div>

            <div className="form-field">
              <label htmlFor="input-target" className="form-label">
                Buffer Target (₹)
              </label>
              <input
                id="input-target"
                type="number"
                step="500"
                className="form-input"
                value={formData.emergencyReserveTarget}
                onChange={(e) => handleChange('emergencyReserveTarget', e.target.value)}
              />
              <span className="field-hint">Starter benchmark</span>
            </div>

            <div className="form-field form-field-full">
              <label htmlFor="input-available" className="form-label">
                Available / unallocated cash — simulated assumption
              </label>
              <input
                id="input-available"
                type="number"
                step="500"
                className="form-input"
                value={formData.unallocatedCash}
                onChange={(e) => handleChange('unallocatedCash', e.target.value)}
              />
              <span className="field-hint">Simulated cash pool ready to allocate in journeys</span>
            </div>
          </div>

          <div className="scenario-disclaimer-note">
            Simulated demo assumptions · Not connected to real bank accounts or external APIs.
          </div>

          {/* Form Actions */}
          <div className="modal-actions-row">
            <button
              type="button"
              className="btn-ghost-reset"
              onClick={() => {
                onResetDefaults();
                onClose();
              }}
            >
              <RotateCcw size={13} />
              <span>Reset Defaults</span>
            </button>

            <button type="submit" className="btn-apply-scenario">
              <Check size={14} strokeWidth={2.4} />
              <span>Apply Scenario</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
