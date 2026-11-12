import type { Metadata } from 'next';
import TeamCostCalculator from '@/components/TeamCostCalculator';
import { socialPreview, socialTwitter } from '@/lib/socialPreview';

const title = 'Team Cost Calculator - WideFix';
const description = 'Build a team with a solution architect, developer and QA. Adjust daily hours and hourly rates, compare weekly to yearly costs, and share your estimate.';

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
