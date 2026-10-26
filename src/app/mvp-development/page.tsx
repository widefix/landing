import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import LinkIndicator from '@/components/LinkIndicator';
import SituationIcon from '@/components/rails/SituationIcon';
import { RailsCall } from '@/components/rails/RailsOwnership';
import { socialPreview, socialTwitter } from '@/lib/socialPreview';

const title = 'MVP Development with Ruby on Rails - WideFix';
const description = 'Build a focused first version with WideFix: practical scope, technical leadership, Rails implementation and ongoing development. Explore Mezuka, Lokkaroom and our open-source BudgetingKid app.';
const image = '/img/showcases/lokkaroom-financial-report.svg';

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: 'https://widefix.com/mvp-development' },
  openGraph: {
    title, description, url: 'https://widefix.com/mvp-development',
    siteName: 'WideFix', type: 'website',
    images: [socialPreview(image, 'Lokkaroom financial reporting MVP connecting three data sources')],
  },
  twitter: socialTwitter(image, 'Lokkaroom financial reporting MVP connecting three data sources'),
};

const benefits = [
  ['priorities', 'Put your budget behind the core workflow', 'We help turn your idea into a focused scope: who needs the product, what they must be able to do, and what can wait. We agree priorities around your budget and revisit scope when requirements change, so spending stays focused on the first useful version.'],
  ['expertise', 'Get technical direction alongside implementation', 'Architecture decisions stay connected to the work. We compare tools and integrations, explain the tradeoffs and implement the agreed approach, so founders can make decisions without coordinating separate advisers and developers.'],
  ['ownership', 'Keep frontend, backend and integrations moving together', 'We handle Rails backends, web interfaces and the connections your first version needs. One engineering partner can follow a workflow across those boundaries instead of leaving your team to resolve the gaps.'],
  ['communication', 'Make progress and decisions visible', 'We share what is ready, what is blocked and what needs your input. Reviewing working features gives your team something concrete to discuss and helps keep implementation aligned with the product goal.'],
  ['review', 'Build a first version that is easier to extend', 'Maintaining existing Rails applications teaches us where early shortcuts become expensive. We use clear code structure, familiar Rails conventions and tests for critical workflows so your team can add features and onboard developers with less time spent untangling the first version.'],
  ['production', 'Plan for performance and growth within your budget', 'We consider database queries, indexes, background work and expected usage while building. We choose infrastructure for the initial workload and identify where it may need to grow, keeping quality and operating costs part of the scope discussion.'],
  ['upgrades', 'Have a partner for the next iteration', 'Our work also covers maintenance, upgrades and ongoing development. After the first version, we can continue improving the application as you learn from users, with responsibilities and support agreed around your needs.'],
] as const;

const steps = [
  ['review', 'Define the first useful outcome', 'Discuss your users, business goal, constraints and existing tools. Agree the workflow the MVP needs to demonstrate and the features to leave for later.'],
  ['priorities', 'Agree scope and technical choices', 'Break that workflow into deliverable steps, identify integration risks and compare implementation options. Agree priorities and review points before building.'],
  ['production', 'Build and verify the workflow', 'Implement the application and required integrations, review working features with you and test the critical paths. Plan deployment around the intended use.'],
  ['momentum', 'Use feedback to choose what comes next', 'Review what the first version teaches you, then decide whether to refine the workflow, expand the scope or change direction. Engineering delivery alone does not establish market fit.'],
] as const;

export default function MVPDevelopmentPage() {
  return (
    <main className="actual-db-schema-page">
      <section className="schema-section schema-hero">
        <div className="schema-inner schema-hero-grid">
          <div className="schema-hero-copy">
            <p className="schema-eyebrow">MVP development with WideFix</p>
            <h1>Turn your product idea into a working first version</h1>
            <p className="schema-lead">Build a minimum viable product around the problem your users need to solve. We help define the scope, make technical decisions and implement the Rails application, interfaces and integrations that make the first version useful.</p>
            <div className="schema-actions"><RailsCall>Discuss your MVP</RailsCall><a className="schema-text-link" href="#mvp-examples">Explore our MVP work <LinkIndicator /></a></div>
          </div>
          <figure className="schema-workflow" style={{ margin: 0 }}>
            <Image src={image} alt="Lokkaroom MVP workflow bringing EventCube, Shopify and Stripe transactions into one Rails and ActiveAdmin financial report" width={687} height={377} sizes="(max-width: 900px) 100vw, 40vw" priority style={{ width: '100%', height: 'auto' }} />
            <figcaption className="schema-workflow-note">A focused MVP: one financial reporting workflow across three platforms for TMA Sport</figcaption>
          </figure>
        </div>
      </section>

      <section className="schema-section schema-capabilities" aria-labelledby="mvp-benefits-title">
        <div className="schema-inner">
          <p className="schema-eyebrow">Why work with us</p>
          <h2 id="mvp-benefits-title">An engineering partner from scope to implementation</h2>
          <p className="schema-section-intro">Your team brings the business context. We bring hands-on development and technical judgment to help turn it into a product you can review, use and improve.</p>
          <div className="schema-capability-list">{benefits.map(([icon, heading, text]) => (
            <article key={heading}><div className="schema-capability-heading"><SituationIcon kind={icon} /><h3>{heading}</h3></div><p>{text}</p></article>
          ))}</div>
        </div>
      </section>

      <section className="schema-section schema-install" aria-labelledby="mvp-rails-title">
        <div className="schema-inner">
          <p className="schema-eyebrow">Why Ruby on Rails</p>
          <h2 id="mvp-rails-title">A productive framework for small teams building an MVP</h2>
          <p className="schema-section-intro">Developer productivity has been central to Rails since its early days. Its conventions and integrated tools help a small team build a complete application with fewer setup decisions, leaving more time for the workflows that make your product useful.</p>
          <div className="schema-capability-list">
            <article>
              <div className="schema-capability-heading"><SituationIcon kind="expertise" /><h3>Expressive Ruby with less boilerplate</h3></div>
              <p>Ruby expresses business rules concisely, giving developers less repetitive code to write and review. In AI-assisted development, that compact code can also mean fewer tokens to read and generate for a change. Token savings vary with the implementation, model and workflow.</p>
            </article>
            <article>
              <div className="schema-capability-heading"><SituationIcon kind="momentum" /><h3>More of the application in one framework</h3></div>
              <p>Rails brings database access, migrations, server-rendered interfaces, background jobs and testing support into a consistent framework. A small team can deliver a useful first version without assembling a separate tool for every common application need.</p>
            </article>
            <article>
              <div className="schema-capability-heading"><SituationIcon kind="handover" /><h3>Conventions that help the next developer</h3></div>
              <p>Familiar project structure and naming make it easier for Rails developers to find relevant code and understand how features fit together. That helps your team share ownership and extend the MVP as requirements evolve.</p>
            </article>
          </div>
          <p className="schema-workflow-note">Read about <a className="schema-text-link" href="https://www.ruby-lang.org/en/">Ruby’s expressive syntax <LinkIndicator /></a> and <a className="schema-text-link" href="https://rubyonrails.org/doctrine">Rails’ productivity principles <LinkIndicator /></a>.</p>
        </div>
      </section>

      <section className="schema-section schema-install" id="mvp-examples" aria-labelledby="mvp-examples-title">
        <div className="schema-inner">
          <p className="schema-eyebrow">Examples from our work</p>
          <h2 id="mvp-examples-title">Focused MVPs for different product needs</h2>
          <div className="schema-capability-list">
            <article>
              <div className="schema-capability-heading"><SituationIcon kind="ownership" /><h3>Mezuka food delivery platform</h3></div>
              <div><p>WideFix founder Andrei Kaleshka built a food-ordering MVP from scratch and led its technical development. The work included customizable orders, payments, restaurant integrations and building a team of 10 developers. The MVP was built, but the product did not commercially launch because of a market-fit mismatch.</p><Link className="schema-text-link" href="/showcases/mezuka-food-delivery-platform">Read the Mezuka showcase <LinkIndicator /></Link></div>
            </article>
            <article>
              <div className="schema-capability-heading"><SituationIcon kind="payments" /><h3>Lokkaroom financial reporting for TMA Sport</h3></div>
              <div><p>We built a financial reporting MVP using Ruby on Rails and ActiveAdmin to consolidate transactions and charges from EventCube, Shopify and Stripe. Comparing Zapier with a custom solution across 17 criteria helped make the implementation tradeoffs explicit before building.</p><Link className="schema-text-link" href="/showcases/tma-sport-lokkaroom-financial-report">Read the Lokkaroom showcase <LinkIndicator /></Link></div>
            </article>
            <article>
              <div className="schema-capability-heading"><SituationIcon kind="expertise" /><h3>BudgetingKid open-source allowance tracker</h3></div>
              <div>
                <p>BudgetingKid is our open-source Rails application for helping families manage children&apos;s allowances and budgets. Explore the working product and its source code to see a concrete example of our MVP development approach.</p>
                <div className="schema-actions">
                  <Link className="schema-text-link" href="/showcases/budgetingkid">Read the BudgetingKid showcase <LinkIndicator /></Link>
                  <Link className="schema-text-link" href="https://github.com/widefix/pocketmoney/" target="_blank" rel="noopener noreferrer">Explore the source code <LinkIndicator /></Link>
                  <Link className="schema-text-link" href="https://get.budgetingkid.com/" target="_blank" rel="noopener noreferrer">Visit the BudgetingKid website <LinkIndicator /></Link>
                  <Link className="schema-text-link" href="https://budgetingkid.com" target="_blank" rel="noopener noreferrer">Try the live app <LinkIndicator /></Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="schema-section schema-capabilities" aria-labelledby="mvp-process-title">
        <div className="schema-inner">
          <p className="schema-eyebrow">How we work</p>
          <h2 id="mvp-process-title">A clear path from idea to feedback</h2>
          <div className="schema-capability-list">{steps.map(([icon, heading, text], index) => (
            <article key={heading}><div className="schema-capability-heading"><SituationIcon kind={icon} /><h3>{index + 1}. {heading}</h3></div><p>{text}</p></article>
          ))}</div>
        </div>
      </section>

      <section className="schema-section schema-services">
        <div className="schema-inner">
          <p className="schema-eyebrow">Start with the problem you want to solve</p>
          <h2>Let&apos;s define your first useful version</h2>
          <p>Tell us who the product is for, what they need to accomplish and what constraints you have. We can discuss a practical starting scope and the technical questions to resolve first.</p>
          <div className="schema-actions"><RailsCall>Discuss your MVP</RailsCall><Link className="schema-text-link" href="/contact">Send us your idea <LinkIndicator /></Link><Link className="schema-text-link" href="/ruby-on-rails-maintenance">Explore support after release <LinkIndicator /></Link></div>
        </div>
      </section>
    </main>
  );
}
