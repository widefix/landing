import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import styles from './worshiponline.module.scss';
import DownloadPDF from './DownloadPDF';

const phases = [
  {
    date: 'JUNE 24, 2025',
    title: 'Write to both systems',
    detail: 'Kept Paperclip in place while creating ActiveStorage blobs and attachment records for new uploads. This established the new path without forcing an immediate read cutover.',
    label: 'Dual-write adapter',
  },
  {
    date: 'JUNE 26, 2025',
    title: 'Backfill existing files',
    detail: 'Added a task that found Paperclip-backed records missing an ActiveStorage attachment, copied the original file through a tempfile, and created the new blob and attachment.',
    label: 'Resumable backfill',
  },
  {
    date: 'JUNE 30 - JULY 16, 2025',
    title: 'Switch models incrementally',
    detail: 'Moved attachment ownership model by model, retaining named image styles, default images, and custom key behavior while each slice was validated.',
    label: 'Per-model cutover',
  },
  {
    date: 'JULY 17-18, 2025',
    title: 'Remove Paperclip after the cutover',
    detail: 'Removed Paperclip usage and then dropped its attachment metadata columns, after the ActiveStorage path had replaced it across the application.',
    label: 'Dependency + schema cleanup',
  },
  {
    date: 'AUGUST 2025',
    title: 'Continue with framework upgrades',
    detail: 'The Rails and Ruby upgrades followed the storage cutover. They were enabled by removing the deprecated attachment dependency, not performed as part of the file-copy task itself.',
    label: 'Rails + Ruby upgrade',
  },
];

const adaptations = [
  {
    index: '01',
    title: 'Paperclip-style attachment API',
    detail: 'A temporary adapter let existing Paperclip model declarations continue to work while new ActiveStorage records were created after save. Later, models moved to native has_one_attached declarations with a small styles/default-URL concern.',
  },
  {
    index: '02',
    title: 'Named styles and variants',
    detail: 'ActiveStorage::Attached::One#url(style) and #variant(style) were overridden to map old named styles to ActiveStorage transformations and preserve fallback behavior for non-variant files.',
  },
  {
    index: '03',
    title: 'Custom object and variant keys',
    detail: 'New objects use a model/attachment/UUID/filename key shape. Variant keys include a transformation digest. UUID paths distinguish replacement uploads; the public URL does not rely on a timestamp parameter.',
  },
  {
    index: '04',
    title: 'Direct CloudFront URLs',
    detail: 'The attachment URL helper builds public URLs from CLOUD_FRONT_HOST and the escaped object key instead of sending S3 assets through Rails redirect routes. The filename stays in the path for legibility.',
  },
];

export const metadata: Metadata = {
  title: 'WorshipOnline Paperclip to ActiveStorage Migration - WideFix',
  description: 'How WorshipOnline migrated production media from Paperclip to ActiveStorage with dual-writing, a backfill, staged model cutovers, custom S3 keys and CloudFront URLs.',
  alternates: {
    canonical: 'https://widefix.com/showcases/worshiponline-paperclip-activestorage',
  },
  openGraph: {
    title: 'WorshipOnline Paperclip to ActiveStorage Migration - WideFix',
    description: 'A staged migration of production media from Paperclip to ActiveStorage.',
    url: 'https://widefix.com/showcases/worshiponline-paperclip-activestorage',
    siteName: 'WideFix',
    type: 'article',
  },
};

export default function WorshipOnlineStorageShowcase() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.topline}>
            <Link className={styles.backLink} href="/showcases">All case studies</Link>
            <Image src="/img/showcases/clients/wo.svg" alt="WorshipOnline" width={138} height={35} priority />
          </div>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>WORSHIPONLINE / STORAGE MODERNIZATION</p>
              <h1>Moving media off <span>Paperclip</span>, without taking production offline.</h1>
              <p className={styles.heroLead}>A staged migration of a gigabyte-scale S3 library to ActiveStorage, designed to keep uploads and public media available throughout the transition.</p>
              <div className={styles.heroActions}>
                <Link href="#migration" className={styles.primaryLink}>Explore the migration <span aria-hidden="true">↓</span></Link>
                <DownloadPDF />
                <Link href="/showcases" className={styles.secondaryLink}>More case studies</Link>
              </div>
            </div>
            <div className={styles.heroVisual}>
              <Image
                src="/img/showcases/worshiponline-storage-migration.svg"
                alt="Migration flow from Paperclip through dual-writing, backfill and staged model cutovers to ActiveStorage and CloudFront"
                width={960}
                height={560}
                priority
                sizes="(max-width: 860px) 100vw, 52vw"
              />
            </div>
          </div>
          <div className={styles.factBar}>
            <div><span>Approach</span><strong>Incremental cutover</strong></div>
            <div><span>Migration window</span><strong>June - July 2025</strong></div>
            <div><span>Delivery</span><strong>Amazon S3 + CloudFront</strong></div>
          </div>
        </div>
      </section>

      <section className={styles.intro}>
        <div className={styles.container}>
          <div className={styles.introHeading}>
            <p className={styles.sectionTag}>THE CONSTRAINT</p>
            <h2>Replace the storage layer, not the user experience.</h2>
          </div>
          <div className={styles.introBody}>
            <p>Paperclip was deprecated and had become a compatibility obstacle to moving the application onto newer Rails versions. WorshipOnline also had a large existing media library and depended on established attachment behavior, variant names, and public asset URLs.</p>
            <p>A single release that copied files, changed every model, and retired Paperclip at once would concentrate too much operational risk. We separated the work into reversible stages, kept both systems active during the transition, and removed Paperclip only after model cutovers.</p>
          </div>
        </div>
      </section>

      <section className={styles.timeline} id="migration">
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.sectionTag}>THE ROLLOUT</p>
            <h2>One controlled step at a time.</h2>
            <p>Dual-write first. Copy existing objects. Move reads model by model. Retire the old dependency last.</p>
          </header>
          <ol className={styles.phaseList}>
            {phases.map(phase => (
              <li className={styles.phase} key={phase.title}>
                <div className={styles.phaseDate}>{phase.date}</div>
                <div className={styles.phaseContent}>
                  <h3>{phase.title}</h3>
                  <p>{phase.detail}</p>
                  <span className={styles.phaseLabel}>{phase.label}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.adaptations}>
        <div className={styles.container}>
          <div className={styles.adaptationsHeading}>
            <p className={styles.sectionTag}>COMPATIBILITY LAYER</p>
            <h2>Keep URLs useful. Keep the cutover boring.</h2>
            <p>ActiveStorage was adapted to the application’s attachment contract and delivery path rather than forcing a user-facing URL redesign.</p>
          </div>
          <ol className={styles.adaptationList}>
            {adaptations.map(item => (
              <li key={item.index}>
                <span className={styles.adaptationIndex}>{item.index}</span>
                <div><h3>{item.title}</h3><p>{item.detail}</p></div>
              </li>
            ))}
          </ol>
          <div className={styles.urlExample}>
            <span>PUBLIC OBJECT URL</span>
            <code>https://cdn.worshiponline.com/model/attachment/uuid/filename.jpg</code>
            <p>Readable filename and UUID-based object path. No timestamp query parameter.</p>
          </div>
        </div>
      </section>

      <section className={styles.followUp}>
        <div className={styles.container}>
          <div className={styles.followUpMarker}>AFTER THE CUTOVER</div>
          <div>
            <h2>Audit the blobs, not just the attachment table.</h2>
            <p>A post-migration audit checked for blobs without attachments. The investigation found that asynchronous purge can leave a temporary orphan while a purge job is queued; remaining orphaned files were reviewed and removed to complete the cleanup.</p>
          </div>
          <div className={styles.followUpNote}>
            <strong>2,488</strong>
            <span>Store::Sample records rekeyed in about 10 minutes, according to the migration notes.</span>
          </div>
        </div>
      </section>

      <section className={styles.outcome}>
        <div className={styles.container}>
          <p className={styles.sectionTag}>THE RESULT</p>
          <h2>Paperclip out. A supported storage path in place.</h2>
          <p>ActiveStorage took over in stages, while public delivery stayed on the CloudFront path. Removing Paperclip cleared a dependency barrier; later Rails and Ruby upgrades could proceed on their own schedule.</p>
          <Link href="https://calendly.com/andrei-kaleshka/30min" target="_blank" rel="noreferrer" className={styles.outcomeLink}>Talk through a Rails migration <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </main>
  );
}
