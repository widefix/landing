'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import LinkIndicator from '@/components/LinkIndicator';
import {
  dailyTeamCost, defaultTeam, fieldError, teamFragment, teamFromFragment,
  teamRoles, validTeam, workingPeriods,
  type RoleId, type TeamConfiguration, type TeamMember,
} from '@/lib/teamCostCalculator';
import styles from './TeamCostCalculator.module.scss';

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

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

export default function TeamCostCalculator() {
  const [team, setTeam] = useState<TeamConfiguration>(defaultTeam);
  const [baseUrl, setBaseUrl] = useState('');
  const [linkError, setLinkError] = useState('');
  const [copyStatus, setCopyStatus] = useState('');
  const [copyFailed, setCopyFailed] = useState(false);

  useEffect(() => {
    setBaseUrl(`${window.location.origin}${window.location.pathname}`);
    function loadSharedTeam() {
      setCopyStatus('');
      setCopyFailed(false);
      if (!window.location.hash) {
        setTeam(defaultTeam());
        setLinkError('');
        return;
      }
      try {
        setTeam(teamFromFragment(window.location.hash));
        setLinkError('');
      } catch (error) {
        if (!(error instanceof Error)) throw error;
        setTeam(defaultTeam());
        setLinkError('This shared link contains an invalid or unsupported team configuration. Default values are shown instead. Adjust them below to create a new link.');
      }
    }
    loadSharedTeam();
    window.addEventListener('hashchange', loadSharedTeam);
    return () => window.removeEventListener('hashchange', loadSharedTeam);
  }, []);

  const valid = validTeam(team);
  const dailyCost = valid ? dailyTeamCost(team) : null;
  const shareUrl = valid && baseUrl ? `${baseUrl}#${teamFragment(team)}` : '';

  function updateMember(id: RoleId, changes: Partial<TeamMember>) {
    setTeam(current => ({ ...current, [id]: { ...current[id], ...changes } }));
    setCopyStatus('');
    setCopyFailed(false);
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopyFailed(false);
      setCopyStatus('Link copied. Anyone with it can open this team estimate.');
    } catch (error) {
      if (!(error instanceof Error)) throw error;
      setCopyFailed(true);
      setCopyStatus('Could not copy the link. Select the link below and copy it manually.');
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={`${styles.inner} ${styles.heroGrid}`}>
          <div>
            <p className={styles.eyebrow}>Plan your team budget</p>
            <h1>The right team, with the costs in view</h1>
            <p className={styles.lead}>Combine a solution architect with as many developers and QA specialists as you need. Set the headcount, daily hours per person and hourly rate for each role to see your total team budget.</p>
            <a className={styles.textLink} href="#build-team">Build your estimate <LinkIndicator /></a>
          </div>
          <aside className={styles.heroCard} aria-label="How your estimate works">
            <p className={styles.eyebrow}>One team, a clear budget</p>
            <ol>
              <li><span>01</span><div><strong>Start with technical ownership</strong><p>A solution architect is always part of the team.</p></div></li>
              <li><span>02</span><div><strong>Add the support you need</strong><p>Choose how many developers and QA specialists you need, with daily hours per person for each role.</p></div></li>
              <li><span>03</span><div><strong>Share the same numbers</strong><p>Your link preserves the team, rates and commitment for your client.</p></div></li>
            </ol>
          </aside>
        </div>
      </section>

      <section className={styles.calculator} id="build-team" aria-labelledby="team-title">
        <div className={styles.inner}>
          {linkError && <p className={styles.errorBanner} role="alert">{linkError}</p>}
          <div className={styles.sectionHeading}>
            <div><p className={styles.eyebrow}>Your team configuration</p><h2 id="team-title">Choose your daily commitment</h2></div>
            <p>Hourly rates are in USD. All fields are editable.</p>
          </div>
          <div className={styles.calculatorGrid}>
            <div className={styles.roles}>
              {teamRoles.map(role => {
                const member = team[role.id];
                const rateError = fieldError(member.rate, 'rate');
                const hoursError = fieldError(member.hours, 'hours');
                const countError = fieldError(member.count, 'count');
                const roleCost = !countError && !rateError && !hoursError
                  ? currency.format(Number(member.count) * Number(member.rate) * Number(member.hours)) : null;
                return (
                  <fieldset key={role.id} className={styles.role}>
                    <legend>{role.name}</legend>
                    <div className={styles.roleHeading}>
                      <RoleIcon role={role.id} />
                      <span className={styles.required}>{role.required ? '1 architect always included' : 'Optional role'}</span>
                    </div>
                    <div className={styles.fields}>
                      {!role.required && (
                        <label className={styles.countField} htmlFor={`${role.id}-count`}>
                          <span>{role.id === 'developer' ? 'Number of developers' : 'Number of QA specialists'}</span>
                          <input id={`${role.id}-count`} type="number" inputMode="numeric" min="0" step="1" value={member.count}
                            aria-invalid={Boolean(countError)} aria-describedby={`${role.id}-count-hint${countError ? ` ${role.id}-count-error` : ''}`}
                            onChange={event => updateMember(role.id, { count: event.target.value })} />
                          <small id={`${role.id}-count-hint`}>Set to 0 to leave this role out.</small>
                          {countError && <small className={styles.error} id={`${role.id}-count-error`}>{countError}</small>}
                        </label>
                      )}
                      <label htmlFor={`${role.id}-rate`}>
                        <span>Hourly rate per person (USD)</span>
                        <input id={`${role.id}-rate`} type="number" inputMode="decimal" min="0" max="1000000" step="any" value={member.rate}
                          aria-invalid={Boolean(rateError)} aria-describedby={rateError ? `${role.id}-rate-error` : undefined}
                          onChange={event => updateMember(role.id, { rate: event.target.value })} />
                        {rateError && <small className={styles.error} id={`${role.id}-rate-error`}>{rateError}</small>}
                      </label>
                      <label htmlFor={`${role.id}-hours`}>
                        <span>Hours per person per working day</span>
                        <input id={`${role.id}-hours`} type="number" inputMode="decimal" min="0" max="24" step="any" value={member.hours}
                          aria-invalid={Boolean(hoursError)} aria-describedby={hoursError ? `${role.id}-hours-error` : undefined}
                          onChange={event => updateMember(role.id, { hours: event.target.value })} />
                        {hoursError && <small className={styles.error} id={`${role.id}-hours-error`}>{hoursError}</small>}
                      </label>
                    </div>
                    <p className={styles.roleTotal}>{roleCost === null ? 'Enter valid headcounts, rates and hours to calculate this role.' : Number(member.count) === 0 ? 'Not included in your total. Increase the headcount to add this role.' : <><strong>{roleCost}</strong> per working day for {Number(member.count)} {Number(member.count) === 1 ? 'person' : 'people'}</>}</p>
                  </fieldset>
                );
              })}
            </div>

            <aside className={styles.summary} aria-labelledby="cost-title">
              <p className={styles.eyebrow}>Team estimate</p>
              <h2 id="cost-title">Your total budget</h2>
              <div aria-live="polite" aria-atomic="true">
                <p className={styles.daily}><strong>{dailyCost === null ? '--' : currency.format(dailyCost)}</strong><span>per working day</span></p>
                <dl className={styles.periods}>
                  {workingPeriods.map(period => (
                    <div key={period.id}><dt>{period.name}<small>{period.label}</small></dt><dd>{dailyCost === null ? '--' : currency.format(dailyCost * period.days)}</dd></div>
                  ))}
                </dl>
                {!valid && <p className={styles.error}>Correct the highlighted fields to see totals and generate a shareable link.</p>}
              </div>
              <p className={styles.assumptions}>Based on 5 working days per week and 52 weeks per year. Months average 260 / 12 working days; quarters use 65. Assumes the same hours each working day, without holidays or time off. Totals are rounded to cents after calculation.</p>
              <p className={styles.disclaimer}>Planning estimate in USD, not a binding quote. Taxes and any additional costs are not included.</p>
            </aside>
          </div>

          <section className={styles.share} aria-labelledby="share-title">
            <div>
              <p className={styles.eyebrow}>Keep everyone on the same page</p>
              <h2 id="share-title">Share this team estimate</h2>
              <p>The link updates as you edit. It includes all rates, hours and selected roles, with no account needed. Anyone with the link can view and change their own copy; your saved link stays the same.</p>
            </div>
            <div className={styles.shareControls}>
              <button type="button" className={styles.button} onClick={copyLink} disabled={!shareUrl}>Copy share link</button>
              <label htmlFor="team-share-link">Your shareable link</label>
              <input id="team-share-link" type="text" readOnly value={shareUrl} placeholder="Enter valid values to generate a link" onFocus={event => event.currentTarget.select()} />
              <p role={copyFailed ? 'alert' : 'status'} className={copyFailed ? styles.error : styles.copyStatus}>{copyStatus}</p>
            </div>
          </section>
          <p className={styles.nextStep}>Need help planning technical ownership of your Rails application? <Link href="/contact" className={styles.textLink}>Discuss your team with WideFix <LinkIndicator /></Link></p>
          <noscript><p className={styles.errorBanner}>Enable JavaScript to calculate team costs and load shared configurations.</p></noscript>
        </div>
      </section>
    </main>
  );
}
