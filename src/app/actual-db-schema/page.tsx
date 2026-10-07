import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ActualDbSchemaCalculator from '@/components/ActualDbSchemaCalculator';

const title = 'Actual DB Schema: Less Rails Database Cleanup, More Development - WideFix';
const description = 'See how Actual DB Schema keeps Rails development databases aligned with the current Git branch, reduces phantom migration cleanup and helps teams estimate the engineering time involved.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: 'https://widefix.com/actual-db-schema' },
  openGraph: {
    title,
    description,
    url: 'https://widefix.com/actual-db-schema',
    siteName: 'WideFix',
    type: 'website',
  },
};

export default function ActualDbSchemaPage() {
  return (
    <main className="actual-db-schema-page">
      <section className="schema-section schema-hero">
        <div className="schema-inner schema-hero-grid">
          <div className="schema-hero-copy">
            <p className="schema-eyebrow">Open-source Rails development tool</p>
            <h1>Keep your development database in step with your branch</h1>
            <p className="schema-lead">
              When you switch branches, your local database can retain migrations that do not exist in the code you are working on. Actual DB Schema detects those phantom migrations and reconciles them as part of your usual Rails migration workflow.
            </p>
            <div className="schema-actions">
              <Link className="schema-button" href="https://github.com/widefix/actual_db_schema" target="_blank" rel="noopener noreferrer">
                Explore the GitHub project
              </Link>
              <Link className="schema-text-link" href="#actual-db-schema-estimator">Estimate team impact</Link>
            </div>
            <p className="schema-license">MIT-licensed gem · Installed in the development group</p>
          </div>

          <div className="schema-workflow" aria-label="How Actual DB Schema keeps branch migrations aligned">
            <div className="schema-workflow-heading">
              <Image src="/img/library-green-icon.svg" alt="" width={56} height={56} priority />
              <div>
                <span>Actual DB Schema</span>
                <strong>Branch-aware migrations</strong>
              </div>
            </div>
            <ol className="schema-workflow-steps">
              <li><span>01</span><div><strong>Switch branches</strong><small>Some applied migrations belong to other work</small></div></li>
              <li><span>02</span><div><strong>Run <code>rails db:migrate</code></strong><small>Phantom migrations are identified</small></div></li>
              <li><span>03</span><div><strong>Continue on the current schema</strong><small>Less manual rollback and schema cleanup</small></div></li>
            </ol>
          </div>
        </div>
      </section>

      <section className="schema-section schema-stats" aria-labelledby="schema-stats-title">
        <div className="schema-inner schema-stats-layout">
          <div className="schema-stats-intro">
            <p className="schema-eyebrow">RubyGems download activity</p>
            <h2 id="schema-stats-title">Download activity at a glance</h2>
            <Link className="schema-text-link" href="https://clickgems.clickhouse.com/dashboard/actual_db_schema" target="_blank" rel="noopener noreferrer">
              View the ClickGems dashboard
            </Link>
          </div>
          <dl className="schema-stats-values">
            <div><dt>Last day</dt><dd>2K</dd></div>
            <div><dt>Last week</dt><dd>9.6K</dd></div>
            <div><dt>Last month</dt><dd>36K</dd></div>
            <div><dt>Total downloads</dt><dd>763K</dd></div>
          </dl>
          <p className="schema-stats-note">ClickGems dashboard snapshot, October 7, 2026. Download counts include repeat downloads and do not represent unique users or active installations.</p>
        </div>
      </section>

      <section className="schema-section schema-video" aria-labelledby="schema-video-title">
        <div className="schema-inner">
          <div className="schema-video-heading">
            <p className="schema-eyebrow">Product walkthrough</p>
            <h2 id="schema-video-title">See Actual DB Schema in action</h2>
          </div>
          <div className="schema-video-frame">
            <video controls playsInline preload="metadata" aria-label="Actual DB Schema product walkthrough">
              <source src="/actual_db_schema_h264.mp4" type="video/mp4" />
              Your browser does not support HTML video.
            </video>
          </div>
        </div>
      </section>

      <section className="schema-section schema-problem">
        <div className="schema-inner">
          <p className="schema-eyebrow">The hidden cost of parallel development</p>
          <h2>One local database. Many branches. Repeated cleanup</h2>
          <p className="schema-section-intro">A migration applied on one feature branch can remain in a developer&apos;s database after they switch to another branch. The code and schema no longer agree, leading to confusing errors, test failures, and noisy schema dumps.</p>
          <div className="schema-feature-grid">
            <article>
              <span className="schema-feature-index">01</span>
              <h3>Find the source</h3>
              <p>Work out which applied migration came from a different branch and why the current code is failing.</p>
            </article>
            <article>
              <span className="schema-feature-index">02</span>
              <h3>Repair local state</h3>
              <p>Manually reverse the unrelated database change, then get the current branch back to a usable state.</p>
            </article>
            <article>
              <span className="schema-feature-index">03</span>
              <h3>Repeat across the team</h3>
              <p>Every developer can hit the same mismatch as parallel branches move through review and testing.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="schema-section schema-capabilities">
        <div className="schema-inner">
          <p className="schema-eyebrow">Built for the Rails development loop</p>
          <h2>More than branch cleanup</h2>
          <div className="schema-capability-list">
            <article>
              <div className="schema-capability-heading">
                <span className="schema-capability-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></svg></span>
                <h3>Clean, current schema dumps</h3>
              </div>
              <p>Keeps <code>schema.rb</code> or <code>structure.sql</code> aligned with the current branch, so unrelated migration state does not leave noisy or misleading schema changes behind.</p>
            </article>
            <article>
              <div className="schema-capability-heading">
                <span className="schema-capability-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="m7 9 3 3-3 3m6 0h4" /></svg></span>
                <h3>Make development database changes with Ruby</h3>
              </div>
              <p>Enable Console Migrations to run Rails migration DSL commands directly in the Rails console for experiments or local repairs, without writing SQL. This optional feature is disabled by default.</p>
            </article>
            <article>
              <div className="schema-capability-heading">
                <span className="schema-capability-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h10M4 11h6M4 16h6" /><circle cx="16" cy="14" r="4" /><path d="m19 17 2 2" /></svg></span>
                <h3>Trace schema changes to their migration</h3>
              </div>
              <p>Annotated schema diffs identify which migration introduced a change in <code>schema.rb</code>. The local management UI also provides schema-diff views for investigating database changes.</p>
            </article>
            <article>
              <div className="schema-capability-heading">
                <span className="schema-capability-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="5" r="2" /><circle cx="6" cy="19" r="2" /><circle cx="18" cy="19" r="2" /><path d="M8 5h5a5 5 0 0 1 5 5v7" /></svg></span>
                <h3>Recognizes phantom migrations</h3>
              </div>
              <p>Tracks executed migration code and identifies migrations that are not present in the current branch, so they can be rolled back in the correct dependency order.</p>
            </article>
            <article>
              <div className="schema-capability-heading">
                <span className="schema-capability-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="8" height="7" rx="1" /><rect x="13" y="13" width="8" height="7" rx="1" /><path d="M7 11v3h10v-1m-2 2 2-2 2 2" /></svg></span>
                <h3>Fits real Rails setups</h3>
              </div>
              <p>Supports multiple databases and includes optional Git hooks and a local management UI when your workflow needs them.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="schema-section schema-ai">
        <div className="schema-inner schema-ai-grid">
          <div>
            <p className="schema-eyebrow">Works alongside AI-assisted development</p>
            <h2>AI can speed up migration work. Branch-specific database state still needs managing</h2>
          </div>
          <div>
            <p>AI coding tools can help draft migrations and investigate database errors. But a local database can still contain changes from another branch, regardless of how the code was written. Actual DB Schema handles that branch-to-database reconciliation, giving developers and coding agents a more consistent schema to work against.</p>
            <p>If AI has already reduced the time your team spends diagnosing these issues, use the remaining time in the estimator below. It models the incremental opportunity, not a pre-AI baseline.</p>
          </div>
        </div>
      </section>

      <ActualDbSchemaCalculator />

      <section className="schema-section schema-install">
        <div className="schema-inner schema-install-grid">
          <div>
            <p className="schema-eyebrow">Try it in a Rails application</p>
            <h2>Keep the workflow your team already knows</h2>
            <p>Add the gem to the development group, install it, and continue running <code>rails db:migrate</code>. An automatic post-checkout hook is optional; use the migration task directly if you prefer explicit control.</p>
            <p>Irreversible migrations still need manual attention. Actual DB Schema reports them rather than pretending it can safely reverse them.</p>
          </div>
          <div className="schema-install-panel">
            <pre><code>{[
              'group :development do',
              '  gem "actual_db_schema"',
              'end',
              '',
              'bundle install',
              'rails actual_db_schema:install',
              'rails db:migrate',
            ].join('\n')}</code></pre>
            <Link className="schema-install-link" href="https://github.com/widefix/actual_db_schema" target="_blank" rel="noopener noreferrer">Read installation and configuration details</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
