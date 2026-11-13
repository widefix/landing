'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import LinkIndicator from '@/components/LinkIndicator';
import { RailsCall } from '@/components/rails/RailsOwnership';
import {
  defaultState, estimate, estimateContactPath, examples, limits, periodTotals, periods, pricesAsOf, roleIds, roleNames,
  stateFragment, stateFromFragment, validate,
  type CalculatorState, type FieldName, type RoleId,
} from '@/lib/teamCostCalculator';
import styles from './TeamCostCalculator.module.scss';

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const hoursFormat = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 });
const monthWeeks = periods[1].weeks;

function RoleIcon({ role }: { role: RoleId }) {
  return (
    <span className={styles.icon}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        {role === 'architect' ? <><rect x="8" y="3" width="8" height="5" rx="1" /><path d="M12 8v5M5 17v-4h14v4" /><rect x="2" y="17" width="6" height="4" rx="1" /><rect x="16" y="17" width="6" height="4" rx="1" /></>
          : role === 'developer' ? <><path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 16" /></>
            : <><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z" /><path d="m8 12 3 3 5-6" /></>}
      </svg>
    </span>
  );
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  error?: string;
  hint?: string;
  step?: string;
  min?: string;
  max?: string;
  inputMode?: 'numeric' | 'decimal';
  onChange: (value: string) => void;
};

function Field({ id, label, value, error, hint, step = 'any', min, max, inputMode = 'decimal', onChange }: FieldProps) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined;
  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="number" inputMode={inputMode} min={min} max={max} step={step} value={value}
        aria-invalid={Boolean(error)} aria-describedby={describedBy} onChange={event => onChange(event.target.value)} />
      {hint && <small id={`${id}-hint`}>{hint}</small>}
      {error && <small className={styles.error} id={`${id}-error`}>{error}</small>}
    </div>
  );
}

export default function TeamCostCalculator() {
  const [state, setState] = useState<CalculatorState>(defaultState);
  const [baseUrl, setBaseUrl] = useState('');
  const [linkError, setLinkError] = useState('');
  const [copyStatus, setCopyStatus] = useState('');
  const [copyFailed, setCopyFailed] = useState(false);

  useEffect(() => {
    setBaseUrl(`${window.location.origin}${window.location.pathname}`);
    function loadSharedState() {
      setCopyStatus('');
      setCopyFailed(false);
      if (!window.location.hash) {
        setState(defaultState());
        setLinkError('');
        return;
      }
      try {
        setState(stateFromFragment(window.location.hash));
        setLinkError('');
      } catch (error) {
        if (!(error instanceof Error)) throw error;
        setState(defaultState());
        setLinkError('This shared link contains an invalid or unsupported configuration. Default values are shown instead. Adjust them below to create a new link.');
      }
    }
    loadSharedState();
    window.addEventListener('hashchange', loadSharedState);
    return () => window.removeEventListener('hashchange', loadSharedState);
  }, []);

  const errors = validate(state);
  const valid = Object.keys(errors).length === 0;
  const result = valid ? estimate(state) : null;
  const totals = result ? periodTotals(result) : null;
  const shareUrl = valid && baseUrl ? `${baseUrl}#${stateFragment(state)}` : '';
  const budgetMode = state.mode === 'budget';

  function resetCopy() {
    setCopyStatus('');
    setCopyFailed(false);
  }

  function update(changes: Partial<CalculatorState>) {
    setState(current => ({ ...current, ...changes }));
    resetCopy();
  }

  function updateRate(id: RoleId, value: string) {
    setState(current => ({ ...current, rates: { ...current.rates, [id]: value } }));
    resetCopy();
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopyFailed(false);
      setCopyStatus('Link copied. Anyone with it can open this estimate.');
    } catch (error) {
      if (!(error instanceof Error)) throw error;
      setCopyFailed(true);
      setCopyStatus('Could not copy the link. Select the link below and copy it manually.');
    }
  }

  const error = (field: FieldName) => errors[field];
  const developerShare = Math.max(0, 100 - Number(state.architectShare) - Number(state.qaShare));

  function roleSummary(id: RoleId) {
    if (!result) return 'Enter valid values to calculate this role.';
    const hours = result.weeklyHours[id];
    if (hours === 0) return 'Not included in your total. Increase the headcount to add this role.';
    return <><strong>{hoursFormat.format(hours)} hours</strong> a week, {currency.format(hours * Number(state.rates[id]))} a week</>;
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={`${styles.inner} ${styles.heroGrid}`}>
          <div>
            <p className={styles.eyebrow}>Plan your team budget</p>
            <h1>The right team, with the costs in view</h1>
            <p className={styles.lead}>Start from a monthly budget to see how many team hours it buys, or build a team to see what it costs. Every hourly rate and the architect&apos;s share of the hours are yours to adjust.</p>
            <a className={styles.textLink} href="#build-team">Build your estimate <LinkIndicator /></a>
          </div>
          <aside className={styles.heroCard} aria-label="How your estimate works">
            <p className={styles.eyebrow}>One team, a clear budget</p>
            <ol>
              <li><span>01</span><div><strong>Start with what you know</strong><p>Enter a monthly budget, or the developers and QA you have in mind.</p></div></li>
              <li><span>02</span><div><strong>Keep technical ownership in the team</strong><p>A solution architect is always included, as a share of the team&apos;s hours.</p></div></li>
              <li><span>03</span><div><strong>Share the same numbers</strong><p>Your link preserves the budget or team, rates and shares for a partner or client.</p></div></li>
            </ol>
          </aside>
        </div>
      </section>

      <section className={styles.calculator} id="build-team" aria-labelledby="team-title">
        <div className={styles.inner}>
          {linkError && <p className={styles.errorBanner} role="alert">{linkError}</p>}
          <div className={styles.sectionHeading}>
            <div><p className={styles.eyebrow}>Your estimate</p><h2 id="team-title">Set your budget or build your team</h2></div>
            <p>Prices are in USD. Hours are per week unless stated.</p>
          </div>

          <fieldset className={styles.modes}>
            <legend>What do you know?</legend>
            <label className={`${styles.modeOption} ${budgetMode ? styles.modeActive : ''}`}>
              <input type="radio" name="calculator-mode" value="budget" checked={budgetMode} onChange={() => update({ mode: 'budget' })} />
              <span><strong>I have a monthly budget</strong><small>See how many team hours it buys</small></span>
            </label>
            <label className={`${styles.modeOption} ${!budgetMode ? styles.modeActive : ''}`}>
              <input type="radio" name="calculator-mode" value="team" checked={!budgetMode} onChange={() => update({ mode: 'team' })} />
              <span><strong>I have a team in mind</strong><small>See what it costs for a week, month, quarter and year</small></span>
            </label>
          </fieldset>

          <div className={styles.examples} role="group" aria-label="Start from an example">
            <span>Start from an example</span>
            {examples.map(item => (
              <button type="button" key={item.id} className={styles.example} onClick={() => { setState(item.build()); resetCopy(); }}>{item.label}</button>
            ))}
          </div>

          <div className={styles.calculatorGrid}>
            <div className={styles.roles}>
              {budgetMode ? (
                <fieldset className={styles.role}>
                  <legend>Budget and hours split</legend>
                  <div className={styles.fields}>
                    <Field id="budget" label="Monthly budget (USD)" value={state.budget} error={state.budget === '' ? undefined : error('budget')}
                      hint="What you can spend each month, for example 1500." min="0" step="any" onChange={value => update({ budget: value })} />
                    <Field id="architect-share" label="Architect share of team hours (%)" value={state.architectShare} error={error('architectShare')}
                      hint="For example, 10% means 1 in every 10 team hours is architect time." min="1" max="50" onChange={value => update({ architectShare: value })} />
                    <Field id="qa-share" label="QA share of team hours (%)" value={state.qaShare} error={error('qaShare')}
                      hint="Leave at 0% for a team without QA." min="0" max="100" onChange={value => update({ qaShare: value })} />
                    <p className={styles.roleTotal}>Developers cover the remaining {hoursFormat.format(developerShare)}% of team hours.</p>
                  </div>
                </fieldset>
              ) : (
                <>
                  <fieldset className={styles.role}>
                    <legend>{roleNames.architect}</legend>
                    <div className={styles.roleHeading}>
                      <RoleIcon role="architect" />
                      <span className={styles.required}>1 architect always included</span>
                    </div>
                    <div className={styles.fields}>
                      <Field id="architect-share" label="Architect share of team hours (%)" value={state.architectShare} error={error('architectShare')}
                        hint="For example, 10% means 1 in every 10 team hours is architect time." min="1" max="50" onChange={value => update({ architectShare: value })} />
                    </div>
                    <p className={styles.roleTotal}>{roleSummary('architect')}</p>
                  </fieldset>
                  {([
                    ['developer', 'developerCount', 'developerHours', 'Number of developers'],
                    ['qa', 'qaCount', 'qaHours', 'Number of QA specialists'],
                  ] as const).map(([id, countField, hoursField, countLabel]) => (
                    <fieldset key={id} className={styles.role}>
                      <legend>{roleNames[id]}</legend>
                      <div className={styles.roleHeading}>
                        <RoleIcon role={id} />
                        <span className={styles.required}>Optional role</span>
                      </div>
                      <div className={styles.fields}>
                        <Field id={`${id}-count`} label={countLabel} value={state[countField]} error={error(countField)} inputMode="numeric" step="1" min="0"
                          hint="Set to 0 to leave this role out." onChange={value => update({ [countField]: value })} />
                        <Field id={`${id}-hours`} label="Hours per person per week" value={state[hoursField]} error={error(hoursField)} min="0" max={String(limits.hoursPerWeek)}
                          onChange={value => update({ [hoursField]: value })} />
                      </div>
                      <p className={styles.roleTotal}>{roleSummary(id)}</p>
                    </fieldset>
                  ))}
                  {error('team') && <p className={styles.error} role="alert">{error('team')}</p>}
                </>
              )}

              <fieldset className={styles.role}>
                <legend>Hourly rates (USD)</legend>
                <div className={styles.rates}>
                  {roleIds.map(id => (
                    <Field key={id} id={`rate-${id}`} label={roleNames[id]} value={state.rates[id]} error={error(`rate-${id}` as FieldName)} min="0" max={String(limits.rate)}
                      onChange={value => updateRate(id, value)} />
                  ))}
                </div>
                {error('rates') && <p className={styles.error} role="alert">{error('rates')}</p>}
              </fieldset>
            </div>

            <aside className={styles.summary} aria-labelledby="estimate-title">
              <p className={styles.eyebrow}>{budgetMode ? 'What your budget buys' : 'Team estimate'}</p>
              <h2 id="estimate-title">{budgetMode ? 'Your team hours' : 'Your total budget'}</h2>
              <div aria-live="polite" aria-atomic="true">
                {result && totals ? (
                  <>
                    <p className={styles.headline}>
                      {budgetMode
                        ? <><strong>{hoursFormat.format(totals[1].hours)}</strong><span>team hours a month, about {hoursFormat.format(totals[0].hours)} a week</span></>
                        : <><strong>{currency.format(result.weeklyCost)}</strong><span>per week</span></>}
                    </p>
                    <dl className={styles.periods}>
                      {totals.map(period => (
                        <div key={period.id}>
                          <dt>{period.name}<small>{period.label}</small></dt>
                          <dd>{currency.format(period.cost)}<small>{hoursFormat.format(period.hours)} team hours</small></dd>
                        </div>
                      ))}
                    </dl>
                    <table className={styles.breakdown}>
                      <caption>Hours by role</caption>
                      <thead><tr><th scope="col">Role</th><th scope="col">A week</th><th scope="col">A month</th></tr></thead>
                      <tbody>
                        {roleIds.map(id => (
                          <tr key={id}>
                            <th scope="row">{roleNames[id]}</th>
                            <td>{hoursFormat.format(result.weeklyHours[id])}</td>
                            <td>{hoursFormat.format(result.weeklyHours[id] * monthWeeks)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                ) : (
                  <p className={styles.placeholder}>
                    {budgetMode && errors.budget && Object.keys(errors).length === 1
                      ? 'Enter a monthly budget, or start from an example above, to see how many hours it buys.'
                      : 'Correct the highlighted fields to see your estimate and generate a shareable link.'}
                  </p>
                )}
              </div>
              <div className={styles.cta}>
                <RailsCall>Discuss this plan with WideFix</RailsCall>
                <Link href={valid ? estimateContactPath(state) : '/contact'} className={styles.textLink}>{valid ? 'Send this estimate to WideFix' : 'Prefer to write? Get in touch'} <LinkIndicator /></Link>
              </div>
              <p className={styles.assumptions}>Months average 52 ÷ 12 weeks; quarters use 13 weeks and years 52. Assumes the same hours every week, without holidays or time off. Architect time is counted as a share of total team hours.</p>
              <p className={styles.disclaimer}>Planning estimate in USD, not a quote. Starting rates are current as of {pricesAsOf} and may change. Taxes and any additional costs are not included.</p>
              <Link href="/blog/ruby-on-rails-maintenance-cost/" className={styles.textLink}>Read how to scope a Rails maintenance budget <LinkIndicator /></Link>
            </aside>
          </div>

          <section className={styles.share} aria-labelledby="share-title">
            <div>
              <p className={styles.eyebrow}>Keep everyone on the same page</p>
              <h2 id="share-title">Share this estimate</h2>
              <p>The link updates as you edit. It includes your mode, budget or team, rates and shares, with no account needed. Anyone with the link can view and change their own copy; your saved link stays the same.</p>
            </div>
            <div className={styles.shareControls}>
              <button type="button" className={styles.button} onClick={copyLink} disabled={!shareUrl}>Copy share link</button>
              <label htmlFor="team-share-link">Your shareable link</label>
              <input id="team-share-link" type="text" readOnly value={shareUrl} placeholder="Enter valid values to generate a link" onFocus={event => event.currentTarget.select()} />
              <p role={copyFailed ? 'alert' : 'status'} className={copyFailed ? styles.error : styles.copyStatus}>{copyStatus}</p>
            </div>
          </section>
          <p className={styles.nextStep}>Need help planning technical ownership of your Rails application? <Link href="/contact" className={styles.textLink}>Discuss your team with WideFix <LinkIndicator /></Link></p>
          <noscript><p className={styles.errorBanner}>Enable JavaScript to calculate estimates and load shared configurations.</p></noscript>
        </div>
      </section>
    </main>
  );
}
