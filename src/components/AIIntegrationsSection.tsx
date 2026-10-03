
import LinkIndicator from '@/components/LinkIndicator';
import Link from 'next/link';

export default function AIIntegrationsSection() {
  return (
    <section className="ai-integrations" id="ai-integrations" aria-labelledby="ai-integrations-title">
      <div className="inner">
        <div className="ai-integrations-intro">
          <div>
            <p className="ai-integrations-eyebrow">AI integrations</p>
            <h2 id="ai-integrations-title">AI that works with your business</h2>
          </div>
          <div>
            <p className="ai-integrations-description">
              We connect OpenAI and Claude to your products, business data, and everyday workflows.
              Give your team useful tools and your customers a better experience.
            </p>
            <ul className="ai-integrations-providers" aria-label="AI platforms">
              <li>OpenAI</li>
              <li>Claude</li>
            </ul>
          </div>
        </div>
        <div className="ai-integrations-grid">
          <article>
            <span className="ai-integrations-number" aria-hidden="true">01</span>
            <h3>AI agents</h3>
            <p>Automate tasks across your tools, from processing incoming requests to updating records and coordinating workflows.</p>
          </article>
          <article>
            <span className="ai-integrations-number" aria-hidden="true">02</span>
            <h3>AI assistants</h3>
            <p>Help your team find answers in company knowledge, summarize documents, and get work done inside your existing apps.</p>
          </article>
          <article>
            <span className="ai-integrations-number" aria-hidden="true">03</span>
            <h3>AI chatbots</h3>
            <p>Answer customer questions, guide users through your product, and hand conversations to your team when needed.</p>
          </article>
        </div>
        <div className="ai-integrations-actions">
          <Link href="/contact" className="button primary">Talk About AI</Link>
          <Link href="/services#ai-integrations" className="ai-integrations-details">Explore AI integration services <LinkIndicator /></Link>
        </div>
      </div>
    </section>
  );
}
