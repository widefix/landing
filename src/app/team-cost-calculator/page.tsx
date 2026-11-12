import type { Metadata } from 'next';
import TeamCostCalculator from '@/components/TeamCostCalculator';
import { socialPreview, socialTwitter } from '@/lib/socialPreview';

const title = 'Team Cost Calculator - WideFix';
const description = 'See how many team hours a monthly budget buys, or what a solution architect, developers and QA cost. Adjust hourly rates and hours, compare week to year, and share your estimate.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: 'https://widefix.com/team-cost-calculator' },
  twitter: socialTwitter(undefined, 'WideFix team cost calculator'),
  openGraph: {
    title,
    description,
    url: 'https://widefix.com/team-cost-calculator',
    siteName: 'WideFix',
    type: 'website',
    images: [socialPreview(undefined, 'WideFix team cost calculator')],
  },
};

export default function TeamCostCalculatorPage() {
  return <TeamCostCalculator />;
}
