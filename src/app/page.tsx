import type { Metadata } from 'next';
import { socialPreview, socialTwitter } from '@/lib/socialPreview';

import LinkIndicator from '@/components/LinkIndicator';
import ClutchWidget from '@/components/ClutchWidget';
import SituationIcon from '@/components/rails/SituationIcon';
import RailsFAQ from '@/components/rails/RailsFAQ';
import ClientTrust from '@/components/rails/ClientTrust';
import ClutchAwards from '@/components/rails/ClutchAwards';
import { OwnershipProcess, OwnershipCTA, RailsCall } from '@/components/rails/RailsOwnership';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  twitter: socialTwitter('/img/rails-ownership-hero.svg', 'Your Rails application, in good hands'),
  openGraph: {
    title: 'Ruby on Rails Application Ownership - WideFix',
    description: 'WideFix takes ownership of existing Ruby on Rails applications: handover, stabilization, maintenance, upgrades and ongoing feature development.',
    url: 'https://widefix.com',
    siteName: 'WideFix',
    type: 'website',
    images: [socialPreview('/img/rails-ownership-hero.svg', 'Your Rails application, in good hands')],
  },
};

export default function HomePage() {
  return (
    <main className="rails-home rails-homepage">
      <section className="rails-section rails-hero">
        <div className="inner rails-hero-grid">
          <div>
            <p className="rails-eyebrow">Ruby on Rails application ownership</p>
            <h1>We take ownership of existing <span>Ruby on Rails</span> applications</h1>

            <p className="rails-lead">Need someone to take over your Rails app?</p>
            <p className="rails-intro">We maintain, stabilize and improve existing Rails applications from production issues and upgrades to new features and infrastructure. Keep your product moving without unnecessary rewrites or rebuilding your engineering team.</p>
            <div className="rails-actions"><RailsCall /><Link href="#how-we-take-over">How we take over <LinkIndicator /></Link></div>

          </div>
          <div className="rails-hero-aside">

            <Image src="/img/rails-ownership-hero.svg" alt="Your Rails application supported through takeover, stabilization, maintenance and ongoing development" width={560} height={490} priority />
            <p>Ongoing maintenance + product development</p>
            <ClutchAwards />
          </div>
        </div>
      </section>
      <ClientTrust />
      <section className="rails-section rails-situations">
        <div className="inner">
          <p className="rails-eyebrow">Does this sound familiar?</p>
          <h2>Your Rails application needs an owner</h2>
          <p className="rails-intro">You have a live product and customers who rely on it. You need someone who can understand the existing system and take responsibility for what comes next.</p>
          <div className="rails-card-grid">
            {([
              ['handover', 'Your developer left', 'Your developer or agency moved on. You need a reliable team to take over the codebase and keep the product running.'],
              ['expertise', 'Your team needs Rails expertise', 'Your team knows the business, but needs experienced Rails engineers to guide decisions and deliver the work.'],
              ['production', 'Production issues keep returning', 'Slow pages, failed jobs or unreliable deployments pull your attention away from your customers.'],
              ['upgrades', 'Ruby and Rails are falling behind', 'Outdated versions and dependencies make changes harder. You need a safe, incremental upgrade plan.'],
              ['momentum', 'Development has slowed down', 'Every feature feels risky or takes too long. You need someone to untangle the code and restore momentum.'],
              ['ownership', 'You need an owner, not just a fix', 'You want a partner who understands the whole application and can maintain it while shipping new features.'],
            ] as const).map(([kind, title, text]) => <article className="rails-card" key={title}><div className="rails-situation-heading"><SituationIcon kind={kind} /><h3>{title}</h3></div><p>{text}</p></article>)}
          </div>
          <Link className="rails-text-link" href="/ruby-on-rails-application-takeover">Explore our Rails application takeover service <LinkIndicator /></Link>
        </div>
      </section>
      <OwnershipProcess />
      <section className="rails-section" id="services">
        <div className="inner">
          <p className="rails-eyebrow">One team for the whole application</p>
          <h2>Rails specialists who can handle the rest of your stack too</h2>
          <p className="rails-intro">We look after the existing application and develop what comes next: upgrades, production fixes, PostgreSQL, background jobs, performance, infrastructure, integrations, CI/CD, monitoring, security, architecture and new features.</p>
          <ul className="rails-stack" aria-label="Technologies we work with">{['Ruby on Rails', 'PostgreSQL', 'Redis', 'React', 'React Native', 'AWS', 'Heroku', 'Docker'].map(tech => <li key={tech}>{tech}</li>)}</ul>
          <Link className="rails-text-link" href="/services">See our full capabilities <LinkIndicator /></Link>
        </div>
      </section>
      <section className="rails-section rails-tinted">
        <div className="inner">
          <p className="rails-eyebrow">Real applications. Practical results.</p>
          <h2>Existing systems, moving forward</h2>
          <div className="rails-card-grid rails-case-grid">
            <article className="rails-card"><Image src="/img/showcases/clients/shopwired.svg" width={160} height={48} alt="ShopWired" /><h3>A production background queue stopped processing jobs</h3><p>We diagnosed the bottlenecks, restored processing and eliminated recurring H12 errors on Heroku.</p><Link href="/showcases/shopwired-queue-optimization">Read the queue recovery story <LinkIndicator /></Link></article>
            <article className="rails-card"><Image src="/img/showcases/clients/wo.svg" width={160} height={48} alt="Worship Online" /><h3>Stripe and the application disagreed about subscriptions</h3><p>We corrected webhook processing and historical data, recovered subscriptions and added monitoring to catch future inconsistencies.</p><Link href="/showcases/stripe-integration">See how we restored consistency <LinkIndicator /></Link></article>
            <article className="rails-card"><Image src="/img/showcases/clients/wo.svg" width={160} height={48} alt="Worship Online" /><h3>A live Rails product needed a new experience</h3><p>We gradually redesigned the application with zero downtime while keeping existing mobile clients working.</p><Link href="/showcases/ruby-on-rails-redesign">Explore the gradual redesign <LinkIndicator /></Link></article>
          </div>
          <Link className="rails-text-link" href="/showcases">View all case studies <LinkIndicator /></Link>
        </div>
      </section>
      <section className="expertise has-vertical-paddings">
        <div className="inner">
          <header id="proven-track">
            <h2>Why trust us with an existing Rails application?</h2>
            <p>
              Meet the Rails specialists behind the work: a Toptal-verified founder, a published book, practical upgrade experience and open-source tools built for real codebases.
            </p>
          </header>
          <div className="container">
            <div className="item toptal-resume">
              <Link rel="noopener noreferrer nofollow" href="https://www.toptal.com/resume/andrei-kaleshka"
                target="_blank" aria-label="View Andrei Kaleshka’s verified Toptal profile">
                <Image className="verified-expert-art" src="/img/verified-rails-expert.svg"
                  alt="Andrei Kaleshka, WideFix founder - Verified Expert in Engineering on Toptal"
                  width={320} height={394} />
              </Link>
              <p>WideFix founder is among the top 3% of freelance developers accepted worldwide by Toptal.</p>
            </div>
            <div className="item book">
              <Link rel="nofollow" href="https://www.packtpub.com/product/rake-task-management-essentials/9781783280773"
                target="_blank">
                <div className="content">
                  <span>BOOK</span>
                </div>
              </Link>
              <p>A book authored by the founder of WideFix, Andrei Kaleshka.</p>
            </div>
            <div className="item tech-blog">
              <Link href="https://widefix.com/blog/spike-of-signups-business-threat/" target="_blank">
                <div className="content">
                  <span>Article</span>
                  <h3>Fake signups: a threat to your business</h3>
                </div>
              </Link>
              <p>Recent tech problem solved by us for a client.</p>
            </div>
            <div className="item rails-upgrade">
              <Link href="https://widefix.com/blog/ruby-and-rails-upgrade-personal-experience/" target="_blank">
                <div className="content">
                  <span>Article</span>
                  <h3>Ruby and Rails upgrade: personal experience</h3>
                </div>
              </Link>
              <p>Featured article on our blog describes a step-by-step approach to upgrading the Ruby and Rails stack.</p>
            </div>
            <div className="item migration-data">
              <Link rel="nofollow" href="https://github.com/ka8725/migration_data" target="_blank">
                <div className="content">
                  <span>Open-Sourced Library</span>
                  <h3>Migration Data</h3>
                </div>
              </Link>
              <p>An open-sourced library developed by us to improve our daily developer task routine.</p>
            </div>
            <div className="item actual-db-schema">
              <Link href="/actual-db-schema">
                <div className="content">
                  <span>Open-Sourced Library</span>
                  <h3>Actual DB Schema</h3>
                </div>
              </Link>
              <p>Keeps Rails development databases aligned with the current branch by handling phantom migrations.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="achievements has-vertical-paddings">
        <div className="inner">
          <header>
            <h2>Rails expertise you can <span>build on</span></h2>
            <p>Open-source contributions, production results and recognition from clients and the Ruby community</p>
          </header>
          <div className="achievements-grid">
            <div className="achievement-item">
              <div className="number">Top 3%</div>
              <p>WideFix founder among <Link href="https://www.toptal.com/resume/andrei-kaleshka" target="_blank" rel="nofollow">top software engineers worldwide</Link> (Toptal)</p>
              <div className="achievement-tags">
                <div className="achievement-tag founder">Founder</div>
              </div>
            </div>
            <div className="achievement-item">
              <div className="number">4000%</div>
              <p><Link href="https://widefix.com/showcases/seo-optimization" target="_blank" rel="nofollow">Increased organic Google traffic</Link> through app optimization</p>
              <div className="achievement-tags">
                <div className="achievement-tag solutions">Solutions</div>
                <div className="achievement-tag team">Team</div>
              </div>
            </div>
            <div className="achievement-item">
              <div className="number">4M+</div>
              <p>Total downloads of our <Link href="https://rubygems.org/profiles/ka8725" target="_blank" rel="nofollow">open-sourced libraries</Link></p>
              <div className="achievement-tags">
                <div className="achievement-tag solutions">Solutions</div>
                <div className="achievement-tag founder">Founder</div>
              </div>
            </div>
            <div className="achievement-item">
              <div className="number">3M+</div>
              <p><Link href="https://rubygems.org/gems/migration_data" target="_blank" rel="nofollow">Migration Data</Link> - our most popular library downloads</p>
              <div className="achievement-tags">
                <div className="achievement-tag solutions">Solutions</div>
                <div className="achievement-tag team">Team</div>
              </div>
            </div>
            <div className="achievement-item">
              <div className="number">400K+</div>
              <p><Link href="https://rubygems.org/gems/actual_db_schema" target="_blank" rel="nofollow">Actual DB Schema</Link> - our latest valuable library downloads</p>
              <div className="achievement-tags">
                <div className="achievement-tag solutions">Solutions</div>
                <div className="achievement-tag team">Team</div>
              </div>
            </div>
            <div className="achievement-item">
              <div className="number achievement-heading">Cost Savings</div>
              <p><Link href="https://www.linkedin.com/feed/update/urn:li:activity:7379533312295395328/" target="_blank" rel="nofollow">Optimize software efficiently</Link> - no extra infrastructure costs</p>
              <div className="achievement-tags">
                <div className="achievement-tag solutions">Solutions</div>
                <div className="achievement-tag team">Team</div>
              </div>
            </div>
            <div className="achievement-item">
              <div className="number">30%<span className="achievement-metric-label">Revenue</span></div>
              <p><Link href="https://widefix.com/blog/prevent-account-sharing-with-mfa/" target="_blank" rel="nofollow">Prevented account sharing</Link> increasing client revenue by 30%</p>
              <div className="achievement-tags">
                <div className="achievement-tag solutions">Solutions</div>
                <div className="achievement-tag team">Team</div>
              </div>
            </div>
            <div className="achievement-item">
              <div className="number">4.9★</div>
              <p><Link href="https://play.google.com/store/apps/details?id=com.worshiponline.iosapp" target="_blank" rel="nofollow">Mobile app created from scratch</Link> - top ratings on both stores</p>
              <div className="achievement-tags">
                <div className="achievement-tag solutions">Solutions</div>
                <div className="achievement-tag team">Team</div>
              </div>
            </div>
            <div className="achievement-item">
              <div className="number achievement-heading">Most Trusted</div>
              <p><Link href="https://www.linkedin.com/feed/update/urn:li:activity:7376194644583350272/" target="_blank" rel="nofollow">Recognized by Techreviewer.co</Link> as most trusted development partner</p>
              <div className="achievement-tags">
                <div className="achievement-tag team">Team</div>
              </div>
            </div>
            <div className="achievement-item">
              <div className="number">4.8/5</div>
              <p><Link href="https://clutch.co/profile/widefix#reviews" target="_blank" rel="nofollow">Average client rating on Clutch</Link> - industry-leading satisfaction</p>
              <div className="achievement-tags">
                <div className="achievement-tag team">Team</div>
              </div>
            </div>
            <div className="achievement-item">
              <div className="number">5★</div>
              <p>Published author of <Link href="https://www.amazon.com/-/es/Rake-Management-Essentials-Andrey-Koleshko/dp/1783280778" target="_blank" rel="nofollow">&ldquo;Rails Task Management Essentials&rdquo;</Link> book</p>
              <div className="achievement-tags">
                <div className="achievement-tag founder">Founder</div>
              </div>
            </div>
            <div className="achievement-item">
              <div className="number achievement-heading">Spotlighted Tweet</div>
              <p><Link href="https://x.com/yukihiro_matz/status/1249973865544970241" target="_blank" rel="nofollow">Quoted by Yukihiro &ldquo;Matz&rdquo; Matsumoto</Link> - Ruby language creator</p>
              <div className="achievement-tags">
                <div className="achievement-tag founder">Founder</div>
              </div>
            </div>
          </div>
        </div>
      </section>



      <section className="reviews has-vertical-paddings">
        <div className="inner">
          <header id="reviews">
            <h2>Read what our <span>clients</span> have to say.</h2>
            <div className="button-container">
              <Link className="button primary" href="https://calendly.com/andrei-kaleshka/30min" target="_blank"
                rel="nofollow">Discuss your Rails application</Link>
            </div>
          </header>
          <div className="slider-wrapper">
            <ClutchWidget />
          </div>
        </div>
      </section>
      <RailsFAQ />
      <OwnershipCTA />
    </main>
  );
}
