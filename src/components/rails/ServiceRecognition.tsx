import LinkIndicator from '@/components/LinkIndicator';
import Link from 'next/link';
import SituationIcon from './SituationIcon';

export default function ServiceRecognition({ kind }: { kind: 'maintenance' | 'database' }) {
  const maintenance = kind === 'maintenance';
  return <section className="rails-section rails-tinted" aria-labelledby={`${kind}-recognition-title`}><div className="inner">
    <p className="rails-eyebrow">Experience you can inspect</p>
    <h2 id={`${kind}-recognition-title`}>{maintenance ? 'Client feedback and practical Rails contributions' : 'Database tooling and documented SQL work'}</h2>
    <div className="rails-card-grid">
      <article className="rails-card"><div className="rails-situation-heading"><SituationIcon kind="upgrades" /><h3>Actual DB Schema</h3></div><p>Our open-source tool tracks migrations and helps keep local Rails databases aligned across Git branches.</p><Link href="/actual-db-schema">Explore the migration tool <LinkIndicator /></Link></article>
      <article className="rails-card"><div className="rails-situation-heading"><SituationIcon kind="review" /><h3>{maintenance ? 'Independent client feedback' : 'Migration Data and PostgreSQL articles'}</h3></div><p>{maintenance ? 'Clutch’s profile shows a 4.9/5 overall rating across 12 reviews, checked October 13, 2026. Read individual engagements and client feedback.' : 'Our migration tooling and SQL articles show how we approach database changes. Performance results for a specific workload are documented separately in the Kajabi case study.'}</p><Link href={maintenance ? '/recognition#industry-recognition' : '/migration-data'}>{maintenance ? 'See verified client feedback' : 'Explore testable data migrations'} <LinkIndicator /></Link>{!maintenance && <div className="rails-actions"><Link href="/blog/financial-plan-on-postgresql/">Read the PostgreSQL article <LinkIndicator /></Link></div>}</article>
      <article className="rails-card"><div className="rails-situation-heading"><SituationIcon kind="expertise" /><h3>Recognition &amp; contributions</h3></div><p>Read the original sources for our community mentions, published book, recorded talk, and open-source work.</p><Link href="/recognition">See the evidence and sources <LinkIndicator /></Link></article>
    </div>
  </div></section>;
}
