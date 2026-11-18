import Link from 'next/link';
import LinkIndicator from '@/components/LinkIndicator';
import SituationIcon from './SituationIcon';
import { defaultRates, exampleArchitectShare, pricesAsOf, pricingPlans, type PricingPlan } from '@/lib/teamCostCalculator';

const icons: Record<PricingPlan['id'], 'priorities' | 'momentum' | 'ownership'> = {
  'budget-1500': 'priorities',
  'budget-3000': 'momentum',
  weekly: 'ownership',
};

export default function MaintenancePricing() {
  const plans = pricingPlans();
  const monthlyPlans = plans.filter(plan => plan.id !== 'weekly');
  return (
    <section className="rails-section rails-tinted" id="pricing" aria-labelledby="maintenance-pricing-title">
      <div className="inner">
        <p className="rails-eyebrow">Pricing</p>
        <h2 id="maintenance-pricing-title">Starting prices for Rails maintenance</h2>
        <p className="rails-intro">
          WideFix prices team capacity in hours, in USD. Senior developers start from ${defaultRates.developer} per hour and a solutions architect is ${defaultRates.architect} per hour.
          The monthly plans include a {exampleArchitectShare}% architect share; the weekly examples use 12% at 25 hours and 10% at 40 hours. Architect time is included in the stated hours and costs.
        </p>
        <div id="maintenance-budgets" className="rails-pricing-table-wrap" role="region" aria-labelledby="maintenance-budgets-caption" tabIndex={0}>
          <table className="rails-pricing-table">
            <caption id="maintenance-budgets-caption">Monthly Rails maintenance budgets in USD</caption>
            <thead><tr><th scope="col">Monthly budget</th><th scope="col">Shared team capacity</th><th scope="col">Work that can fit</th><th scope="col">Team and incident coverage</th></tr></thead>
            <tbody>{monthlyPlans.map(plan => <tr key={plan.id}>
              <th scope="row">{plan.title}<br /><Link href={plan.href}>{plan.linkLabel} <LinkIndicator /></Link></th>
              <td>{plan.hours}, including architect time. These are total team hours, not hours per person.</td>
              <td>{plan.id === 'budget-1500' ? plan.coverage : 'Maintenance and scoped feature work share the allocation. Each change is estimated against your application before we agree priorities.'} Large upgrades or redesigns may need a separate milestone or larger budget.</td>
              <td>{plan.id === 'budget-3000' ? 'A named lead and second engineer arrangement is available by agreement, including allocation and absence cover. ' : 'Agree the engineer allocation and responsibilities before work begins. '}Support windows, incident coverage and response targets are agreed separately; continuous out-of-hours coverage is not included by default.</td>
            </tr>)}</tbody>
          </table>
        </div>
        <p>Planning, investigation, reviews, coordination, testing, releases and keeping a second engineer familiar all use the same allocation. These budgets buy part-time capacity, not two dedicated engineers.</p>
        <div className="rails-card-grid">
          {plans.filter(plan => plan.id === 'weekly').map(plan => (
            <article className="rails-card" key={plan.id}>
              <div className="rails-situation-heading"><SituationIcon kind={icons[plan.id]} /><h3>{plan.title}</h3></div>
              <p><strong>{plan.hours}</strong></p><p>{plan.coverage}</p>
              <Link href={plan.href}>{plan.linkLabel} <LinkIndicator /></Link>
            </article>
          ))}
        </div>
        <div className="rails-card rails-pricing-terms">
          <h3>Terms that apply to every plan</h3>
          <ul className="rails-service-list">
            <li>Extra hours need your approval before we go over the agreed capacity.</li>
            <li>Unused hours are credited as a proportional discount on your next invoice.</li>
            <li>On monthly plans up to $3,000, the initial assessment is included in the first month&apos;s hours. For 25 to 40 hours a week, it is priced case by case.</li>
            <li>Support hours, incident coverage and notice are set out in your agreement before work begins. Continuous out-of-hours coverage is not implied.</li>
            <li>If your Rails version no longer receives security fixes, we can stage the upgrade in small steps. A step that does not fit the monthly hours gets its own estimate.</li>
            <li>Planning, investigation, testing and deployment count toward the hours.</li>
          </ul>
        </div>
        <p className="rails-intro">These are planning figures, not quotes. Prices are current as of {pricesAsOf} and may change; rates are agreed before work begins. The final scope depends on your application&apos;s condition, support needs and development priorities.</p>
        <div className="rails-actions">
          <Link href="/team-cost-calculator">Open the team cost calculator <LinkIndicator /></Link>
          <Link href="/blog/ruby-on-rails-maintenance-cost/">Read how to scope a Rails maintenance budget <LinkIndicator /></Link>
        </div>
      </div>
    </section>
  );
}
