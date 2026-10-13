import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SituationIcon from '@/components/rails/SituationIcon';
import ClutchAwards from '@/components/rails/ClutchAwards';
import { socialPreview, socialTwitter } from '@/lib/socialPreview';
import styles from './recognition.module.css';

const title = 'WideFix Recognition, Open Source & Industry Contributions';
const description = 'Explore WideFix’s client reviews, Clutch credentials, Ruby community mentions, open-source gems, published book, and recorded technical talks, with original sources.';
const sources = {
  clutch: 'https://clutch.co/profile/widefix',
  matz: 'https://x.com/yukihiro_matz/status/1249973865544970241',
  rubyWeekly: 'https://rubyweekly.com/issues/497',
  shortRuby: 'https://newsletter.shortruby.com/p/edition-128',
  book: 'https://www.packtpub.com/en-us/product/rake-task-management-essentials-9781783280773',
  talk: 'https://www.rubyevents.org/talks/actualdbschema-the-creation-story-and-purpose',
};

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: 'https://widefix.com/recognition' },
  twitter: socialTwitter('/img/rails-ownership-hero.svg', 'WideFix recognition and contributions'),
  openGraph: { title, description, url: 'https://widefix.com/recognition', siteName: 'WideFix', type: 'website', images: [socialPreview('/img/rails-ownership-hero.svg', 'WideFix recognition and contributions')] },
};

function SourceLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer">{children} →</a>;
}

export default function RecognitionPage() {
  return (
    <main className={`rails-home rails-services ${styles.page}`}>
      <section className="rails-section rails-hero">
        <div className="inner rails-hero-grid">
          <div>
            <p className="rails-eyebrow">Recognition &amp; contributions</p>
            <h1>WideFix recognition, open source &amp; industry contributions</h1>
            <p className="rails-intro">Client feedback, community mentions, and technical work you can inspect. These sources connect WideFix’s practical Rails experience with the tools and knowledge we share.</p>
            <div className="rails-actions"><Link href="/ruby-on-rails-maintenance">Explore Rails maintenance →</Link><a href="#ruby-community">See community mentions →</a></div>
          </div>
          <aside className={styles.proofPanel} aria-label="Clutch profile snapshot">
            <SituationIcon kind="ownership" />
            <p className="rails-eyebrow">Independent client feedback</p>
            <strong className={styles.rating}>4.9<span>/5</span></strong>
            <p>12 client reviews on Clutch</p>
            <SourceLink href={`${sources.clutch}#reviews`}>Read the reviews</SourceLink>
            <p className={styles.note}>Profile checked October 13, 2026</p>
          </aside>
        </div>
      </section>

      <nav className={styles.sectionNav} aria-label="Recognition sections">
        <div className="inner"><a href="#industry-recognition">Industry recognition</a><a href="#ruby-community">Ruby community</a><a href="#open-source">Open source</a><a href="#publications-speaking">Publications &amp; speaking</a></div>
      </nav>

      <section className="rails-section rails-tinted" id="industry-recognition">
        <div className="inner">
          <p className="rails-eyebrow">Third-party business credentials</p>
          <h2>Industry recognition</h2>
          <div className="rails-card-grid">
            <article className="rails-card"><div className="rails-situation-heading"><SituationIcon kind="ownership" /><h3>Clutch Premier Verified</h3></div><p>WideFix’s profile carries Clutch’s Premier Verified designation. This is a business-verification credential, separate from an award or a directory ranking.</p><SourceLink href={`${sources.clutch}#verification`}>View the verification details</SourceLink></article>
            <article className="rails-card"><div className="rails-situation-heading"><SituationIcon kind="communication" /><h3>4.9/5 across 12 client reviews</h3></div><p>The profile’s overall review section shows 12 reviews and a 4.9/5 average. Read the engagement details and individual feedback alongside the score.</p><SourceLink href={`${sources.clutch}#reviews`}>Read the original reviews</SourceLink></article>
            <article className="rails-card"><div className="rails-situation-heading"><SituationIcon kind="expertise" /><h3>Clutch award badges</h3></div><p>WideFix displays Clutch badges for Ruby on Rails development in 2023 and 2024, and application management and support in 2026. Each badge refers to its stated category and year.</p><SourceLink href={sources.clutch}>Visit the Clutch profile</SourceLink></article>
          </div>
          <ClutchAwards />
          <p className={styles.note}>Clutch profile snapshot: October 13, 2026. Directory positions can change and depend on the ranking’s category and location.</p>
        </div>
      </section>

      <section className="rails-section" id="ruby-community">
        <div className="inner">
          <p className="rails-eyebrow">Documented article and project mentions</p>
          <h2>Ruby community recognition</h2>
          <div className="rails-card-grid">
            <article className="rails-card"><div className="rails-situation-heading"><SituationIcon kind="expertise" /><h3>Shared by Yukihiro “Matz” Matsumoto</h3></div><p>Ruby’s creator linked Andrei’s article, “Improve code readability with closures in Ruby,” on April 14, 2020. The original post identifies the article by its title.</p><SourceLink href={sources.matz}>View Matz’s original post</SourceLink><div className="rails-actions"><Link href="/blog/improve-code-readability-with-closures-in-ruby/">Read the article →</Link></div></article>
            <article className="rails-card"><div className="rails-situation-heading"><SituationIcon kind="review" /><h3>Featured in Ruby Weekly</h3></div><p>Ruby Weekly issue #497, published April 16, 2020, included Andrei’s article on improving code readability with closures, credited under his earlier name, Andrey Koleshko.</p><SourceLink href={sources.rubyWeekly}>Read the original issue</SourceLink></article>
            <article className="rails-card"><div className="rails-situation-heading"><SituationIcon kind="momentum" /><h3>Actual DB Schema in Short Ruby</h3></div><p>Short Ruby Newsletter edition 128 included Andrei’s update to actual_db_schema and linked the v0.8.4 release. This is newsletter coverage of the project.</p><SourceLink href={sources.shortRuby}>Read the newsletter mention</SourceLink></article>
          </div>
        </div>
      </section>

      <section className="rails-section rails-tinted" id="open-source">
        <div className="inner">
          <p className="rails-eyebrow">Our own engineering contributions</p>
          <h2>Open-source tools for working Rails applications</h2>
          <p className="rails-intro">Created by WideFix founder Andrei Kaleshka to address migration problems encountered in real Rails projects. Their source code, releases, and public feedback are available for review.</p>
          <div className={`${styles.twoColumns} rails-card-grid`}>
            <article className="rails-card"><div className="rails-situation-heading"><SituationIcon kind="upgrades" /><h3>actual_db_schema</h3></div><p>Tracks executed migration source and helps clean up phantom migrations after switching Git branches.</p><p className={styles.downloads}>753,655 <span>RubyGems downloads</span></p><div className="rails-actions"><Link href="/actual-db-schema">Explore the gem →</Link><SourceLink href="https://github.com/widefix/actual_db_schema">GitHub source</SourceLink><SourceLink href="https://rubygems.org/gems/actual_db_schema">RubyGems</SourceLink></div></article>
            <article className="rails-card"><div className="rails-situation-heading"><SituationIcon kind="review" /><h3>migration_data</h3></div><p>Adds directly testable data hooks to Rails migrations, with explicit execution order and rollback hooks.</p><p className={styles.downloads}>3,260,577 <span>RubyGems downloads</span></p><div className="rails-actions"><Link href="/migration-data">Explore the gem →</Link><SourceLink href="https://github.com/ka8725/migration_data">GitHub source</SourceLink><SourceLink href="https://rubygems.org/gems/migration_data">RubyGems</SourceLink></div><p className={styles.note}>Also listed in <SourceLink href="https://github.com/IonicaBizau/made-in-belarus#ruby">Made in Belarus</SourceLink></p></article>
          </div>
          <p className={styles.note}>RubyGems API snapshots, October 13, 2026. Download counts include repeat downloads and are not counts of unique users or active installations.</p>
        </div>
      </section>

      <section className="rails-section" id="publications-speaking">
        <div className="inner">
          <p className="rails-eyebrow">Published and recorded technical work</p>
          <h2>Publications &amp; speaking</h2>
          <div className={styles.bookPanel}>
            <Image src="/img/book.png" alt="Rake Task Management Essentials by Andrey Koleshko" width={277} height={309} sizes="(max-width: 600px) 150px, 210px" />
            <div><p className="rails-eyebrow">Packt · April 2014</p><h3>Rake Task Management Essentials</h3><p>A practical book about Ruby task automation, task dependencies, and working with Rake. Published under Andrei’s earlier name, Andrey Koleshko.</p><div className="rails-actions"><SourceLink href={sources.book}>View the publisher’s listing</SourceLink><Link href="/blog/how-to-generate-rake-task/">Read the related article →</Link></div></div>
          </div>
          <div className={`${styles.twoColumns} rails-card-grid`}>
            <article className="rails-card"><div className="rails-situation-heading"><SituationIcon kind="communication" /><h3>ActualDbSchema: The creation story and purpose</h3></div><p>Andrei’s recorded talk at Ruby Warsaw Meetup on June 20, 2024 explains the migration problem behind the gem and the value of sharing practical tools.</p><SourceLink href={sources.talk}>View the talk and recording</SourceLink></article>
            <article className="rails-card"><div className="rails-situation-heading"><SituationIcon kind="review" /><h3>WideFix Engineering Notes</h3></div><p>Our own technical articles document Rails upgrades, PostgreSQL investigations, migrations, and lessons from maintaining production applications.</p><Link href="/blog/">Browse the technical articles →</Link></article>
          </div>
        </div>
      </section>

      <section className="rails-section rails-final-cta"><div className="inner"><h2>Put this experience to work on your application</h2><p>Explore the services and documented client work behind our engineering contributions.</p><div className="rails-actions"><Link href="/services">Explore our services →</Link><Link href="/showcases">Read the case studies →</Link><Link href="/contact">Discuss your application →</Link></div></div></section>
    </main>
  );
}
