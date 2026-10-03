
import LinkIndicator from '@/components/LinkIndicator';
import Link from 'next/link';

export const railsCallUrl = 'https://calendly.com/andrei-kaleshka/30min';

export function RailsCall({ children = 'Discuss your Rails application' }: { children?: React.ReactNode }) {
  return <Link className="button primary" href={railsCallUrl} target="_blank" rel="noopener noreferrer nofollow">{children}</Link>;
}

export function OwnershipProcess() {
  const steps = [
    ['Take over', 'Understand your codebase, infrastructure and business priorities. Map the risks and agree on a practical handover so you know who owns what.'],
    ['Stabilize', 'Resolve production issues, slow queries, unreliable background jobs and fragile deployments. Give your team a dependable foundation.'],
    ['Maintain', 'Keep Ruby and Rails up to date, monitor the application and look after security and integrations. Stay ahead of problems with ongoing technical ownership.'],
    ['Improve', 'Ship new features, modernize the architecture and develop the web or mobile experience. Help your product evolve as your business grows.'],
  ];
  return (
    <section className="rails-section rails-tinted" id="how-we-take-over">
      <div className="inner">
        <p className="rails-eyebrow">A clear path forward</p>
        <h2>Take over. Stabilize. Maintain. Improve.</h2>
        <p className="rails-intro">Start with what your application needs today. Build a long-term plan around your customers and business priorities.</p>
        <ol className="ownership-steps">
          {steps.map(([title, text], i) => <li key={title}><div className="ownership-step-heading"><span className="step-number">0{i + 1}</span><h3>{title}</h3></div><p>{text}</p></li>)}
        </ol>
      </div>
    </section>
  );
}

export function OwnershipCTA() {
  return (
    <section className="rails-section rails-final-cta">
      <div className="inner">
        <p className="rails-eyebrow">Your application. A clear next step.</p>
        <h2>Let&apos;s talk about your Rails application</h2>
        <p>Tell us where the project stands today. We&apos;ll help identify the risks, priorities and a practical way to take it over.</p>
        <div className="rails-actions"><RailsCall /><Link href="/contact">Prefer to write? Get in touch <LinkIndicator /></Link></div>
      </div>
    </section>
  );
}
