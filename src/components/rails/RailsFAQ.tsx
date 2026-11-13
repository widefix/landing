import Link from 'next/link';
import LinkIndicator from '@/components/LinkIndicator';
import { defaultRates, exampleArchitectShare, pricesAsOf, pricingPlans } from '@/lib/teamCostCalculator';

type Question = { question: string; answer: string; detail: string; href?: string; linkLabel?: string };

const lowerFirst = (text: string) => text.charAt(0).toLowerCase() + text.slice(1);
const [smallPlan, mediumPlan, weeklyPlan] = pricingPlans();
const pricingHref = '/ruby-on-rails-maintenance#pricing';

const costQuestion: Question = {
  question: 'How much does Rails maintenance cost?',
  answer: `Plans start at ${smallPlan.title}. That buys ${lowerFirst(smallPlan.hours)}. Senior developers start from $${defaultRates.developer} per hour and a solutions architect is $${defaultRates.architect} per hour. Larger products run 25 to 40 team hours a week, ${lowerFirst(weeklyPlan.hours)}. Prices are current as of ${pricesAsOf}.`,
  detail: 'The final scope depends on the condition of the application, the support you need and whether you also want new development. We agree it with you before work begins.',
  href: pricingHref,
  linkLabel: 'See pricing and plan terms',
};

const pricingQuestions: Question[] = [
  {
    question: `What can I get for ${smallPlan.title}?`,
    answer: `${smallPlan.hours}, at a ${exampleArchitectShare}% architect share. ${smallPlan.coverage} Heavy feature development or a redesign needs a larger budget or a staged plan.`,
    detail: 'Architect time comes out of the same budget. If your Rails version no longer receives security fixes, we can stage the upgrade in small steps.',
    href: smallPlan.href,
    linkLabel: `See ${smallPlan.title} in the calculator`,
  },
  {
    question: 'Can I see what my budget buys before we talk?',
    answer: 'Yes. The team cost calculator turns a monthly budget into team hours, or a team into a weekly, monthly, quarterly and yearly cost. You can change every rate and the architect share, share the result with a partner, or send it to us.',
    detail: `The calculator starts from the published rates: $${defaultRates.developer} for a senior developer and $${defaultRates.architect} for a solutions architect.`,
    href: '/team-cost-calculator',
    linkLabel: 'Open the team cost calculator',
  },
  {
    question: 'What if I need more hours, or use fewer?',
    answer: 'Work beyond the agreed capacity needs your approval before we go over, and capacity can be adjusted as your needs change. Unused hours are credited as a proportional discount on your next invoice.',
    detail: 'Planning, investigation, testing and deployment count toward the hours.',
    href: pricingHref,
    linkLabel: 'Read the plan terms',
  },
  {
    question: 'Is the initial assessment included in the price?',
    answer: `On monthly plans up to ${mediumPlan.title.replace(' a month', '')}, it is included in the first month's hours. For engagements of 25 to 40 hours a week it is priced case by case, because it depends on access, documentation and the state of the code.`,
    detail: 'The assessment covers access, documentation, deployment and the first priorities, so the recurring scope can be agreed on facts.',
    href: pricingHref,
    linkLabel: 'Read the plan terms',
  },
];

const questions: Question[] = [
  {
    question: 'Can you take over an application if our previous developer has left?',
    answer: 'Yes. We specialize in taking over existing Rails applications, including projects where the original developer or agency is no longer available. We start by understanding the codebase, infrastructure, and business priorities.',
    detail: 'We work with the repository, documentation, and access you have, identify missing information, and agree on how to recover it. If the outgoing developer is available, we coordinate the handover with them.',
  },
  {
    question: 'Do I need to know exactly what needs to be fixed?',
    answer: 'No. Bring us the problem and what it means for your business. We investigate the application, identify the technical causes, and agree on priorities with you. You do not need to turn every concern into a developer ticket or manage the technical solution yourself.',
    detail: 'Whether the issue is recurring production failures, slow development, or an integration that no longer works reliably, we turn the findings into a practical plan with clear responsibilities and next steps.',
  },
  {
    question: 'Will you rewrite my existing application?',
    answer: 'We start with what already works and favor targeted fixes, gradual upgrades, and incremental improvements. A takeover does not require a rewrite. If a larger change is justified, we explain the tradeoffs and agree on the approach with you first.',
    detail: 'Our work can include local refactoring, staged migrations, and interface improvements that preserve the application your customers already use.',
  },
  {
    question: 'What does ongoing Rails maintenance include?',
    answer: 'It can include Ruby and Rails upgrades, dependency updates, production fixes, performance improvements, background jobs, monitoring, security, infrastructure, and integrations. We also build new features, prioritizing the work around your application’s condition and business goals.',
    detail: 'We agree on the scope, priorities, and communication rhythm so maintenance and product development move forward together.',
  },
  {
    question: 'Do I need a full-time Rails team or a long-term contract?',
    answer: 'Not necessarily. We discuss the application, priorities and expected workload before recommending a focused takeover, ongoing maintenance or maintenance with development.',
    detail: 'We will explain the proposed scope and engagement terms before work begins. The first conversation does not commit you to a full development contract.',
  },
  costQuestion,
  {
    question: 'What happens if production breaks?',
    answer: 'We start by understanding the impact, available monitoring and recovery options. As part of the handover we agree on incident contacts, responsibilities and response expectations.',
    detail: 'Monitoring and around-the-clock engineer availability are different services. Any required coverage and response hours should be explicitly agreed rather than assumed.',
  },
  {
    question: 'What will happen on the first call?',
    answer: 'We discuss what the product does, what is worrying you, who currently maintains it and what needs attention first. We then suggest a sensible next step, such as a focused technical review or a handover plan.',
    detail: 'You do not need to grant access or prepare a full technical audit before the introductory conversation.',
  },
  {
    question: 'Can you work alongside our existing development team?',
    answer: 'Yes. We can bring Rails expertise and technical ownership to support your existing team. We agree on responsibilities, coordinate changes, and help with difficult parts of the application while your team continues its work.',
    detail: 'This can include upgrades, performance work, integrations, architecture decisions, and coordination with teams building other parts of the product.',
  },
  {
    question: 'How do you start working with an unfamiliar Rails application?',
    answer: 'We begin with your business priorities, then review the codebase, infrastructure, deployments, tests, and integrations. We map the risks, agree on a handover and the first priorities, and add test coverage where needed before making changes.',
    detail: 'The first plan addresses urgent production issues and identifies the maintenance, upgrade, and feature work needed to keep the product moving.',
  },
];

export default function RailsFAQ({ detailed = false, pricing = false }: { detailed?: boolean; pricing?: boolean }) {
  const items = pricing ? questions.flatMap(item => (item === costQuestion ? [item, ...pricingQuestions] : [item])) : questions;
  return (
    <section className="rails-section rails-tinted rails-faq-section" id="faq" aria-labelledby="rails-faq-title">
      <div className="inner rails-faq-grid">
        <div className="rails-faq-heading">
          <p className="rails-eyebrow">Before we take over</p>
          <h2 id="rails-faq-title">Questions about your existing Rails application</h2>
          <p className="rails-intro">You can bring us the problem. We&apos;ll help you understand what the application needs and take responsibility for the next steps.</p>
        </div>
        <div className="rails-faq">
          {items.map(({ question, answer, detail, href, linkLabel }) => (
            <details key={question}>
              <summary>{question}</summary>
              <div className="rails-faq-answer"><p>{answer}</p>{detailed && <p>{detail}</p>}{href && <Link href={href}>{linkLabel} <LinkIndicator /></Link>}</div>
            </details>
          ))}
          {detailed && <details><summary>What should I bring to the first call?</summary><div className="rails-faq-answer"><p>Tell us what the application does, who currently maintains it, and what is most urgent. Share the repository, documentation, and infrastructure information you have when we agree on the review. You do not need to prepare a technical audit before talking to us.</p></div></details>}
        </div>
      </div>
    </section>
  );
}
