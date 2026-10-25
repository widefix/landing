import LinkIndicator from '@/components/LinkIndicator';
import Image from 'next/image';
import Link from 'next/link';
import styles from './FounderPublications.module.css';

export default function FounderPublications() {
  return (
    <section id="open-source-publications" className="rails-section rails-tinted" aria-labelledby="publications-title">
      <div className="inner">
        <p className="rails-eyebrow">Engineering knowledge, shared</p>
        <h2 id="publications-title">Open source &amp; publications</h2>
        <p className="rails-intro">Alongside client work, WideFix founder Andrei Kaleshka writes about Ruby and builds tools for developers working with existing Rails applications.</p>
        <article className={`rails-card ${styles.book}`}>
          <div className={styles.cover}>
            <Image src="/img/book.png" alt="Cover of Rake Task Management Essentials by Andrey Koleshko" width={277} height={309} sizes="(max-width: 600px) 180px, 220px" />
          </div>
          <div>
            <p className="rails-eyebrow">Published by Packt</p>
            <h3>Rake Task Management Essentials</h3>
            <p>Packt approached Andrei after discovering his article on generating Rake tasks. That invitation led to a book sharing his knowledge of Ruby task automation with other developers.</p>
            <p>The book explores using Rake to organize and automate development tasks. This is the same area of engineering behind his Rails tooling: making repetitive work easier and helping teams maintain a reliable development workflow.</p>
            <p>Published under his earlier name, Andrey Koleshko.</p>
            <div className="rails-actions">
              <a href="https://www.packtpub.com/en-us/product/rake-task-management-essentials-9781783280773" target="_blank" rel="noopener noreferrer">View the book at Packt <LinkIndicator /></a>
              <Link href="/blog/how-to-generate-rake-task/">Read the article that started it <LinkIndicator /></Link>
            </div>
          </div>
        </article>
        <div className="rails-actions"><Link href="/recognition">Explore recognition &amp; contributions <LinkIndicator /></Link></div>
        <div className={`rails-card-grid ${styles.tools}`}>
          <article className="rails-card">
            <p className="rails-eyebrow">Open-source Rails tooling</p>
            <h3>actual_db_schema</h3>
            <p>A tool for keeping the local database schema aligned when switching branches in a Rails application.</p>
            <Link href="/actual-db-schema">Explore actual_db_schema <LinkIndicator /></Link>
          </article>
          <article className="rails-card">
            <p className="rails-eyebrow">Open-source Rails tooling</p>
            <h3>migration_data</h3>
            <p>A Rails gem for adding testable data hooks to schema migrations.</p>
            <Link href="/migration-data">Explore migration_data <LinkIndicator /></Link>
          </article>
        </div>
      </div>
    </section>
  );
}
