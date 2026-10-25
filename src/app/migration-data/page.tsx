import LinkIndicator from '@/components/LinkIndicator';
import GemDownloadPDF from '@/components/GemDownloadPDF';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { socialPreview, socialTwitter } from '@/lib/socialPreview';

const projectUrl = 'https://github.com/ka8725/migration_data';
const title = 'Migration Data: Test Your Rails Data Migrations - WideFix';
const description = 'Keep Rails data migrations testable as your application evolves. Explore migration_data, its data and rollback hooks, installation, and a practical backfill example.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: 'https://widefix.com/migration-data' },
  twitter: socialTwitter('/img/block-hero.jpg', 'Migration Data - testable Rails data migrations'),
  openGraph: {
    title,
    description,
    url: 'https://widefix.com/migration-data',
    siteName: 'WideFix',
    type: 'website',
    images: [socialPreview('/img/block-hero.jpg', 'Migration Data - testable Rails data migrations')],
  },
};

const migrationExample = `class AddStatusToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :status, :string
  end

  def data
    User.reset_column_information
    User.update_all(status: 'pending')
  end
end`;

const testExample = `require 'rails_helper'
require 'migration_data/testing'
require_migration 'add_status_to_users'

RSpec.describe AddStatusToUsers do
  describe '#data' do
    it 'backfills existing users' do
      user = create(:user, status: nil)

      described_class.new.data

      expect(user.reload.status).to eq('pending')
    end
  end
end`;

const capabilities = [
  { icon: '/img/library-blue-icon.svg', title: 'Data logic you can test', text: 'Give record updates their own data method. Exercise it directly in your test suite and check the resulting records, so model changes do not quietly break an old backfill.' },
  { icon: '/img/library-green-icon.svg', title: 'A familiar migration workflow', text: 'Run the usual Rails migration task. The gem invokes the data hook after the schema change, keeping related schema and record changes together in one migration file.' },
  { icon: '/img/library-blue-icon.svg', title: 'Control the execution order', text: 'Use data_before when records need changing before a schema operation. The data and data_after hooks run afterward. Choose the order that fits the change.' },
  { icon: '/img/library-green-icon.svg', title: 'Explicit rollback hooks', text: 'Define rollback_before, rollback, or rollback_after when a data change needs its own reversal. Write and test the reverse operation yourself; the gem does not infer it.' },
  { icon: '/img/library-blue-icon.svg', title: 'Load migrations in your tests', text: 'Require migration_data/testing and use require_migration to load a migration by name. Keep focused tests alongside the rest of your Rails test suite.' },
  { icon: '/img/library-green-icon.svg', title: 'Optional environment configuration', text: 'MigrationData.config.skip can disable data hooks in an environment where they should not run. Keep that choice explicit, especially when test setup already supplies the data.' },
];

export default function MigrationDataPage() {
  return (
    <main className="actual-db-schema-page migration-data-page">
      <section className="schema-section schema-hero">
        <div className="schema-inner schema-hero-grid">
          <div className="schema-hero-copy">
            <p className="schema-eyebrow">Open-source Rails migration tool</p>
            <h1>Migration Data: keep your data migrations working as your app evolves</h1>
            <p className="schema-lead">A migration can change records as well as tables. But the models it calls keep evolving. Migration Data gives that record-changing code a dedicated hook you can test before it runs against production data.</p>
            <div className="schema-actions">
              <Link className="schema-button" href={projectUrl} target="_blank" rel="noopener noreferrer">Explore the GitHub project</Link>
              <a className="schema-text-link" href="#get-started">Get started</a>
              <GemDownloadPDF filename="migration-data.pdf" />
            </div>
            <p className="schema-license">MIT-licensed gem · Data hooks within Rails migrations</p>
          </div>
          <div className="schema-workflow" aria-label="Migration Data workflow">
            <div className="schema-workflow-heading">
              <Image src="/img/library-blue-icon.svg" alt="" width={56} height={56} priority />
              <div><span>Migration Data</span><strong>Change the schema. Test the data</strong></div>
            </div>
            <ol className="schema-workflow-steps">
              <li><span>01</span><div><strong>Define the schema change</strong><small>Use the usual <code>change</code> or <code>up</code> method for tables and columns.</small></div></li>
              <li><span>02</span><div><strong>Put record updates in <code>data</code></strong><small>Keep the backfill in a method your tests can call directly.</small></div></li>
              <li><span>03</span><div><strong>Test, then migrate</strong><small>Assert the intended record changes. Run <code>rails db:migrate</code> to apply the schema and execute the data hook.</small></div></li>
            </ol>
            <p className="schema-workflow-note">Tests check the behavior you specify. Review the migration against your application and production data before deploying.</p>
          </div>
        </div>
      </section>

      <section className="schema-section schema-install" id="get-started" aria-labelledby="migration-install-title">
        <div className="schema-inner schema-install-grid">
          <div>
            <p className="schema-eyebrow">Start with your existing workflow</p>
            <h2 id="migration-install-title">Install once. Keep using Rails migrations</h2>
            <p>Add <code>migration_data</code> to your application&apos;s Gemfile and install it. Include it in the environments that run your migrations.</p>
            <p>Define a <code>data</code> method in a migration. The gem runs it after the usual schema operation when migrating up.</p>
          </div>
          <div className="schema-install-panel">
            <pre><code>{`# Gemfile\ngem 'migration_data'\n\n# Terminal\nbundle install\nrails db:migrate`}</code></pre>
            <Link className="schema-install-link" href={`${projectUrl}#installation`} target="_blank" rel="noopener noreferrer">Read installation and usage details</Link>
          </div>
        </div>
      </section>

      <section className="schema-section schema-stats" aria-labelledby="migration-stats-title">
        <div className="schema-inner schema-stats-layout">
          <div className="schema-stats-intro">
            <p className="schema-eyebrow">Published on RubyGems</p>
            <h2 id="migration-stats-title">A tool developers keep downloading</h2>
            <Link className="schema-text-link" href="https://rubygems.org/gems/migration_data" target="_blank" rel="noopener noreferrer">View migration_data on RubyGems <LinkIndicator /></Link>
          </div>
          <dl className="schema-stats-values">
            <div><dt>Total downloads</dt><dd>3.26M</dd></div>
            <div><dt>Published version</dt><dd>0.6.0</dd></div>
            <div><dt>License</dt><dd>MIT</dd></div>
          </dl>
          <p className="schema-stats-note">RubyGems snapshot, October 13, 2026: 3,260,281 downloads. Counts include repeat downloads and do not represent unique users or active installations.</p>
        </div>
      </section>

      <section className="schema-section schema-testimonials" id="community-feedback" aria-labelledby="migration-testimonials-title">
        <div className="schema-inner">
          <p className="schema-eyebrow">From the project community</p>
          <h2 id="migration-testimonials-title">What developers are saying</h2>
          <p className="schema-section-intro">Public feedback from migration_data users and contributors on GitHub. Each quote links to the original discussion.</p>
          <p>The gem is also listed in <a href="https://github.com/IonicaBizau/made-in-belarus#ruby" target="_blank" rel="noopener noreferrer">Made in Belarus <LinkIndicator /></a>, a collection of open-source projects made in Belarus.</p>
          <div className="schema-testimonial-grid">
            <div className="schema-testimonial-column">
              <figure className="migration-testimonial">
                <p className="schema-eyebrow">User feedback · GitHub</p>
                <blockquote><p>I just used this gem with Rails 7.0.4 and minitest and it works fine, found it quite useful.</p></blockquote>
                <figcaption><a href="https://github.com/ka8725/migration_data/issues/47" target="_blank" rel="noopener noreferrer">KjellMorgenstern <LinkIndicator /></a><span>Reported use with Rails 7.0.4 and Minitest</span></figcaption>
              </figure>
            </div>
            <div className="schema-testimonial-column">
              <figure className="migration-testimonial">
                <p className="schema-eyebrow">User feedback · GitHub</p>
                <blockquote><p>Hi, thanks for developing the awesome gem!</p></blockquote>
                <figcaption><a href="https://github.com/ka8725/migration_data/issues/30" target="_blank" rel="noopener noreferrer">fursich <LinkIndicator /></a><span>Opening excerpt from a column-cache issue report</span></figcaption>
              </figure>
              <figure className="migration-testimonial">
                <p className="schema-eyebrow">Contributor feedback · GitHub</p>
                <blockquote><p>Thanks @ka8725. Awesome work! Just arrived home and seeing this now</p></blockquote>
                <figcaption><a href="https://github.com/ka8725/migration_data/pull/13#issuecomment-169847155" target="_blank" rel="noopener noreferrer">mapreal19 <LinkIndicator /></a><span>Comment in a contribution discussion</span></figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section className="schema-section schema-problem">
        <div className="schema-inner">
          <p className="schema-eyebrow">The problem behind the gem</p>
          <h2>Yesterday&apos;s migration. Today&apos;s models</h2>
          <p className="schema-section-intro">A migration may work when you write it and fail later when a model is renamed, validation changes, or an association behaves differently. Testing the data logic makes those dependencies visible.</p>
          <div className="schema-feature-grid">
            <article><span className="schema-feature-index">01</span><h3>Separate the responsibilities</h3><p>Put schema operations in the standard Rails methods and record changes in data hooks within the same migration.</p></article>
            <article><span className="schema-feature-index">02</span><h3>Check the intended outcome</h3><p>Assert what changed in the records, not just that the method ran without raising an exception.</p></article>
            <article><span className="schema-feature-index">03</span><h3>Catch regressions in CI</h3><p>Run migration tests as the application evolves, so changes to models can expose broken data logic before deployment.</p></article>
          </div>
        </div>
      </section>

      <section className="schema-section schema-install" aria-labelledby="migration-example-title">
        <div className="schema-inner schema-install-grid">
          <div>
            <p className="schema-eyebrow">A practical example</p>
            <h2 id="migration-example-title">Add a column, then backfill existing users</h2>
            <p>This migration adds a string column and sets every existing user&apos;s status to <code>pending</code>. The <code>data</code> hook runs after <code>change</code>.</p>
            <p><code>reset_column_information</code> refreshes the model&apos;s column information before the update. This example uses a Rails 6.0 migration class; use the migration version appropriate for your application.</p>
          </div>
          <div className="schema-install-panel"><pre><code>{migrationExample}</code></pre></div>
        </div>
      </section>

      <section className="schema-section schema-capabilities" aria-labelledby="migration-capabilities-title">
        <div className="schema-inner">
          <p className="schema-eyebrow">Small hooks. Useful control</p>
          <h2 id="migration-capabilities-title">Built around testable data changes</h2>
          <div className="schema-capability-list">
            {capabilities.map(({ icon, title: heading, text }) => (
              <article key={heading}>
                <div className="schema-capability-heading"><span className="schema-capability-icon" aria-hidden="true"><Image src={icon} alt="" width={32} height={32} /></span><h3>{heading}</h3></div>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="schema-section schema-install" aria-labelledby="migration-testing-title">
        <div className="schema-inner schema-install-grid">
          <div>
            <p className="schema-eyebrow">Make the behavior explicit</p>
            <h2 id="migration-testing-title">Test the backfill directly</h2>
            <p>Load the migration with <code>require_migration</code>, create a user with no status, and call the data method. Then assert that the user received the expected value.</p>
            <p>This RSpec example assumes FactoryBot is configured and the test database already has the status column. It tests the record update separately from the schema operation.</p>
            <Link className="schema-text-link" href={`${projectUrl}#testing-migrations`} target="_blank" rel="noopener noreferrer">Explore the testing helper <LinkIndicator /></Link>
          </div>
          <div className="schema-install-panel"><pre><code>{testExample}</code></pre></div>
        </div>
      </section>

      <section className="schema-section schema-ai">
        <div className="schema-inner schema-ai-grid">
          <div><p className="schema-eyebrow">Know what the hooks do</p><h2>Plan the rollback and the workload</h2></div>
          <div><p>On rollback, the schema operation runs before <code>rollback</code> and <code>rollback_after</code>. Use <code>rollback_before</code> if the reverse data operation needs a column that the schema rollback removes.</p><p>The gem organizes execution. You still decide how to reverse data changes and whether a large backfill needs batching or a separate deployment step.</p></div>
        </div>
      </section>

      <section className="schema-section schema-problem" aria-labelledby="migration-related-title">
        <div className="schema-inner">
          <p className="schema-eyebrow">Engineering knowledge, shared</p>
          <h2 id="migration-related-title">The story behind the tool</h2>
          <div className="schema-feature-grid">
            <article><span className="schema-feature-index">01</span><h3>Change data in migrations like a boss</h3><p>Andrei&apos;s article explains the approaches that led to migration_data and why tests matter for migration code.</p><Link className="schema-text-link" href="/blog/change-data-in-migrations-like-a-boss/">Read the original article <LinkIndicator /></Link></article>
            <article><span className="schema-feature-index">02</span><h3>Keep your local schema aligned</h3><p>Actual DB Schema addresses another migration problem: database state left behind when you switch Git branches.</p><Link className="schema-text-link" href="/actual-db-schema">Explore Actual DB Schema <LinkIndicator /></Link></article>
            <article><span className="schema-feature-index">03</span><h3>Contribute to the project</h3><p>Read the source, report an issue, or propose an improvement to migration_data.</p><Link className="schema-text-link" href={projectUrl} target="_blank" rel="noopener noreferrer">Visit GitHub <LinkIndicator /></Link></article>
          </div>
        </div>
      </section>

      <section className="schema-section schema-services" aria-labelledby="migration-services-title">
        <div className="schema-inner">
          <p className="schema-eyebrow">Built by WideFix founder Andrei Kaleshka</p>
          <h2 id="migration-services-title">Need help changing a live Rails application?</h2>
          <p>We maintain existing Rails applications, plan upgrades, and deliver production data changes. That hands-on work shapes the open-source tools we share with the community.</p>
          <Link className="schema-button" href="/ruby-on-rails-maintenance">Explore our Rails maintenance services</Link>
        </div>
      </section>
    </main>
  );
}
