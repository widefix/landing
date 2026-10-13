import Link from 'next/link';
import SituationIcon from './SituationIcon';
import styles from './CommunityRecognition.module.css';

const achievements = [
  { title: 'Shared by Ruby’s creator', detail: 'Matz linked Andrei’s article about Ruby closures in April 2020.', icon: 'expertise' as const, anchor: 'ruby-community' },
  { title: 'Featured in Ruby Weekly', detail: 'Issue #497 included the article with an author credit.', icon: 'review' as const, anchor: 'ruby-community' },
  { title: 'Published by Packt', detail: 'Rake Task Management Essentials shares practical Ruby automation techniques.', icon: 'communication' as const, anchor: 'publications-speaking' },
  { title: 'Open-source contributions', detail: 'Actual DB Schema and Migration Data address everyday Rails migration problems.', icon: 'upgrades' as const, anchor: 'open-source' },
];

export default function CommunityRecognition() {
  return <section className={`rails-section rails-tinted ${styles.section}`} aria-labelledby="community-recognition-title"><div className="inner">
    <p className="rails-eyebrow">Recognition &amp; contributions</p>
    <h2 id="community-recognition-title">Recognized by the Ruby community</h2>
    <div className={`rails-card-grid ${styles.grid}`}>{achievements.map(item => <article className="rails-card" key={item.title}><div className="rails-situation-heading"><SituationIcon kind={item.icon} /><h3>{item.title}</h3></div><p>{item.detail}</p><Link href={`/recognition#${item.anchor}`}>View the original sources →</Link></article>)}</div>
    <div className="rails-actions"><Link href="/recognition">Explore recognition &amp; contributions →</Link></div>
  </div></section>;
}
