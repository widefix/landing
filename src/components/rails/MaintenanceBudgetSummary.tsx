import Link from 'next/link';
import LinkIndicator from '@/components/LinkIndicator';
import { exampleArchitectShare, pricingPlans } from '@/lib/teamCostCalculator';

const [upkeep, development] = pricingPlans();

export const maintenanceBudgetHref = '/ruby-on-rails-maintenance#maintenance-budgets';

export const maintenanceBudgetSummary = `WideFix Rails maintenance starts at ${upkeep.title} in USD for routine upkeep, with ${upkeep.hours.toLowerCase()}. At ${development.title}, maintenance and scoped feature work draw from one allocation of ${development.hours.toLowerCase()}. Both estimates use published starting rates and include ${exampleArchitectShare}% architect time. A named lead and second engineer can share the larger allocation by agreement. Support windows, absence cover and response targets are agreed separately.`;

export default function MaintenanceBudgetSummary({ href = maintenanceBudgetHref }: { href?: string }) {
  return (
    <p className="rails-intro">
      {maintenanceBudgetSummary}{' '}
      <Link className="rails-text-link" href={href}>Compare Rails maintenance budgets <LinkIndicator /></Link>
    </p>
  );
}
