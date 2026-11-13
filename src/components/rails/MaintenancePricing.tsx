import Link from 'next/link';
import LinkIndicator from '@/components/LinkIndicator';
import SituationIcon from './SituationIcon';
import { defaultRates, exampleArchitectShare, pricingPlans, type PricingPlan } from '@/lib/teamCostCalculator';

const icons: Record<PricingPlan['id'], 'priorities' | 'momentum' | 'ownership'> = {
  'budget-1500': 'priorities',
  'budget-3000': 'momentum',
  weekly: 'ownership',
};

export default function MaintenancePricing() {
  const plans = pricingPlans();
  return (
    <section className="rails-section rails-tinted" id="pricing" aria-labelledby="maintenance-pricing-title">
      <div className="inner">
        <p className="rails-eyebrow">Pricing</p>
        <h2 id="maintenance-pricing-title">Starting prices for Rails maintenance</h2>
        <p className="rails-intro">
          WideFix prices team capacity in hours, in USD. Senior developers start from ${defaultRates.developer} per hour and a solutions architect is ${defaultRates.architect} per hour.
          The monthly plans include a {exampleArchitectShare}% architect share; the weekly examples use 12% at 25 hours and 10% at 40 hours. Architect time is included in the stated hours and costs.
        </p>
        <div className="rails-card-grid">
          {plans.map(plan => (
            <article className="rails-card" key={plan.id}>
              <div className="rails-situation-heading"><SituationIcon kind={icons[plan.id]} /><h3>{plan.title}</h3></div>
              <p><strong>{plan.hours}</strong></p>
              <p>{plan.coverage}</p>
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
        <p className="rails-intro">These are planning figures, not quotes. The final scope depends on your application&apos;s condition, support needs and development priorities.</p>
        <div className="rails-actions">
          <Link href="/team-cost-calculator">Open the team cost calculator <LinkIndicator /></Link>
          <Link href="/blog/ruby-on-rails-maintenance-cost/">Read how to scope a Rails maintenance budget <LinkIndicator /></Link>
        </div>
      </div>
    </section>
  );
}
