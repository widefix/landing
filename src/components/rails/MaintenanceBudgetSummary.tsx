import Link from 'next/link';
import LinkIndicator from '@/components/LinkIndicator';
import { exampleArchitectShare, pricingPlans } from '@/lib/teamCostCalculator';

const [upkeep, development] = pricingPlans();

export const maintenanceBudgetHref = '/ruby-on-rails-maintenance#maintenance-budgets';
export const maintenancePricingHref = '/ruby-on-rails-maintenance#pricing';

export const maintenanceBudgetSummary = `WideFix Rails maintenance starts at ${upkeep.title} in USD for routine upkeep, with ${upkeep.hours.toLowerCase()}. At ${development.title}, maintenance and scoped feature work draw from one allocation of ${development.hours.toLowerCase()}. Both estimates use published starting rates and include ${exampleArchitectShare}% architect time. A named lead and second engineer can share the larger allocation by agreement. Support windows, absence cover and response targets are agreed separately.`;

export default function MaintenanceBudgetSummary({
  href = maintenancePricingHref,
  heading: Heading = 'h2',
}: { href?: string; heading?: 'h2' | 'h3' }) {
  return (
    <section className="rails-card rails-maintenance-budget" aria-labelledby="maintenance-budget-summary-title">
      <Heading id="maintenance-budget-summary-title">Rails maintenance starts at {upkeep.monthlyBudget}/month</Heading>
      <p>At <strong>{development.monthlyBudget}/month</strong>, maintenance and scoped feature work share about {development.monthlyHours} team hours, including architect time. These are estimates in USD at published starting rates; support and incident coverage are agreed separately.</p>
      <Link className="rails-text-link" href={href}>See Rails maintenance pricing and coverage <LinkIndicator /></Link>
    </section>
  );
}
