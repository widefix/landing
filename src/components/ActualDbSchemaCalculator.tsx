'use client';

import { useState } from 'react';

const numberFormat = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 });
const currencyFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export default function ActualDbSchemaCalculator() {
  const [developers, setDevelopers] = useState('6');
  const [minutesPerDeveloper, setMinutesPerDeveloper] = useState('30');
  const [hourlyCost, setHourlyCost] = useState('90');

  const developerCount = Number(developers);
  const weeklyMinutes = Number(minutesPerDeveloper);
  const hourlyRate = Number(hourlyCost);
  const hasEstimateInputs = developers !== ''
    && minutesPerDeveloper !== ''
    && Number.isInteger(developerCount)
    && developerCount > 0
    && Number.isFinite(weeklyMinutes)
    && weeklyMinutes >= 0;
  const recoveredHoursPerWeek = hasEstimateInputs
    ? developerCount * weeklyMinutes / 60
    : 0;
  const recoveredHoursPerYear = recoveredHoursPerWeek * 52;
  const annualCapacityValue = recoveredHoursPerYear * hourlyRate;

  return (
    <section className="schema-estimator" id="actual-db-schema-estimator" aria-labelledby="schema-estimator-title">
      <div className="schema-inner schema-estimator-grid">
        <div className="schema-estimator-copy">
          <p className="schema-eyebrow">Illustrative savings calculation</p>
          <h2 id="schema-estimator-title">Small weekly savings add up across a team.</h2>
          <p>For example, if six developers each save 30 minutes a week on branch-related database cleanup, that returns three hours of engineering time every week.</p>
          <p className="schema-estimator-caveat">These are sample assumptions, not measured results or guaranteed savings. The dollar amount represents engineering capacity at an assumed hourly cost, rather than a reduction in payroll.</p>
        </div>

        <div className="schema-estimator-panel">
          <p className="schema-eyebrow">Sample scenario - editable below</p>
          <div className="schema-estimator-results" aria-live="polite" aria-atomic="true">
            <div>
              <span>Engineering time returned</span>
              <strong>{hasEstimateInputs ? `${numberFormat.format(recoveredHoursPerWeek)} hrs / week` : 'Enter team inputs'}</strong>
            </div>
            <div>
              <span>Annual engineering time</span>
              <strong>{hasEstimateInputs ? `${numberFormat.format(recoveredHoursPerYear)} hours` : '-'}</strong>
            </div>
            <div className="schema-estimator-value">
              <span>Annual capacity value (USD)</span>
              <strong>{hasEstimateInputs && hourlyCost !== '' && Number.isFinite(hourlyRate) && hourlyRate >= 0 ? currencyFormat.format(annualCapacityValue) : 'Add an hourly cost'}</strong>
            </div>
          </div>
          <p className="schema-estimator-formula">Team size × minutes saved per developer ÷ 60. Annualized over 52 weeks.</p>

          <details className="schema-estimator-controls">
            <summary>Adjust the sample numbers</summary>
            <div className="schema-estimator-fields">
              <label>
                <span>Rails developers affected</span>
                <input type="number" min="1" step="1" inputMode="numeric" value={developers} onChange={event => setDevelopers(event.target.value)} />
              </label>
              <label>
                <span>Minutes saved per developer each week</span>
                <input type="number" min="0" step="5" inputMode="numeric" value={minutesPerDeveloper} onChange={event => setMinutesPerDeveloper(event.target.value)} />
              </label>
              <label>
                <span>Engineering cost per hour (USD) <small>Optional</small></span>
                <div className="schema-input-suffix">
                  <span>$</span>
                  <input type="number" min="0" step="5" inputMode="decimal" value={hourlyCost} onChange={event => setHourlyCost(event.target.value)} />
                </div>
              </label>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
