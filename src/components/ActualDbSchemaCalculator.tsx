'use client';

import { useState } from 'react';

const numberFormat = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 });
const currencyFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export default function ActualDbSchemaCalculator() {
  const [developers, setDevelopers] = useState('');
  const [minutesPerDeveloper, setMinutesPerDeveloper] = useState('');
  const [recoverablePercent, setRecoverablePercent] = useState('');
  const [hourlyCost, setHourlyCost] = useState('');

  const developerCount = Number(developers);
  const weeklyMinutes = Number(minutesPerDeveloper);
  const recoveryShare = Number(recoverablePercent);
  const hourlyRate = Number(hourlyCost);
  const hasEstimateInputs = developers !== ''
    && minutesPerDeveloper !== ''
    && recoverablePercent !== ''
    && developerCount > 0
    && weeklyMinutes >= 0
    && recoveryShare >= 0
    && recoveryShare <= 100;
  const recoveredHoursPerWeek = hasEstimateInputs
    ? developerCount * weeklyMinutes / 60 * recoveryShare / 100
    : 0;
  const recoveredHoursPerYear = recoveredHoursPerWeek * 52;
  const annualCapacityValue = recoveredHoursPerYear * (hourlyCost === '' ? 0 : hourlyRate);

  return (
    <section className="schema-estimator" id="actual-db-schema-estimator" aria-labelledby="schema-estimator-title">
      <div className="schema-inner schema-estimator-grid">
        <div className="schema-estimator-copy">
          <p className="schema-eyebrow">Make the case with your own numbers</p>
          <h2 id="schema-estimator-title">What is branch-related database cleanup costing your team?</h2>
          <p>Estimate the engineering capacity that could be returned to product work. Use time your team actually spends on stale schema and phantom migration issues, not a generic industry average.</p>
          <p className="schema-estimator-caveat">This is a planning estimate, not a guaranteed saving. The recoverable share is your assumption; validate it against your team&apos;s experience.</p>
        </div>

        <div className="schema-estimator-panel">
          <div className="schema-estimator-fields">
            <label>
              <span>Rails developers affected</span>
              <input
                type="number"
                min="1"
                step="1"
                inputMode="numeric"
                value={developers}
                onChange={event => setDevelopers(event.target.value)}
                placeholder="e.g. 6"
              />
            </label>
            <label>
              <span>Minutes spent per developer each week</span>
              <input
                type="number"
                min="0"
                step="5"
                inputMode="numeric"
                value={minutesPerDeveloper}
                onChange={event => setMinutesPerDeveloper(event.target.value)}
                placeholder="e.g. 30"
              />
            </label>
            <label>
              <span>Share you estimate the tool can remove</span>
              <div className="schema-input-suffix">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="5"
                  inputMode="numeric"
                  value={recoverablePercent}
                  onChange={event => setRecoverablePercent(event.target.value)}
                  placeholder="e.g. 50"
                />
                <span>%</span>
              </div>
            </label>
            <label>
              <span>Fully loaded engineering cost per hour <small>Optional</small></span>
              <div className="schema-input-suffix">
                <span>$</span>
                <input
                  type="number"
                  min="0"
                  step="5"
                  inputMode="decimal"
                  value={hourlyCost}
                  onChange={event => setHourlyCost(event.target.value)}
                  placeholder="e.g. 90"
                />
              </div>
            </label>
          </div>

          <div className="schema-estimator-results" aria-live="polite" aria-atomic="true">
            <div>
              <span>Potential capacity returned</span>
              <strong>{hasEstimateInputs ? `${numberFormat.format(recoveredHoursPerWeek)} hrs / week` : 'Enter team inputs'}</strong>
            </div>
            <div>
              <span>Annual engineering time</span>
              <strong>{hasEstimateInputs ? `${numberFormat.format(recoveredHoursPerYear)} hours` : '-'}</strong>
            </div>
            <div className="schema-estimator-value">
              <span>Estimated annual capacity value</span>
              <strong>{hasEstimateInputs && hourlyCost !== '' && hourlyRate >= 0 ? currencyFormat.format(annualCapacityValue) : 'Add an hourly cost'}</strong>
            </div>
          </div>
          <p className="schema-estimator-formula">Team size × weekly cleanup time × estimated recoverable share. Annualized over 52 weeks.</p>
        </div>
      </div>
    </section>
  );
}
