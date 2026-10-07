import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { socialPreview, socialTwitter } from '@/lib/socialPreview';
import DownloadPDF from '../worshiponline-paperclip-activestorage/DownloadPDF';
import shared from '../worshiponline-paperclip-activestorage/worshiponline.module.scss';
import styles from './mobile.module.scss';

const title = 'WorshipOnline Mobile App: React Native & Custom C Audio Engine - WideFix';
const description = 'How WideFix built WorshipOnline for iOS and Android, developed a synchronized audio engine in C, and supported the client through store publication and ongoing development.';
const hero = '/img/showcases/worshiponline-mobile-engine.svg';
const appStore = 'https://apps.apple.com/us/app/worship-online/id1439649467';
const googlePlay = 'https://play.google.com/store/apps/details?id=com.worshiponline.iosapp&hl=en_US';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: 'https://widefix.com/showcases/build-crossplatform-mobile-application' },
  twitter: socialTwitter(hero, 'WorshipOnline mobile app and synchronized native C audio engine'),
  openGraph: {
    title, description, siteName: 'WideFix', type: 'article',
    url: 'https://widefix.com/showcases/build-crossplatform-mobile-application',
    images: [socialPreview(hero, 'WorshipOnline mobile app and synchronized native C audio engine')],
  },
};

const videos = [
  {
    key: 'mixer', id: '1dgbpocury', title: 'Change the key. Keep the tracks together',
    label: 'Mixer transposition',
    description: 'Transpose a song in the audio mixer and adjust individual parts for rehearsal.',
    source: 'https://help.worshiponline.com/en/articles/13551705-mixer-transposition-ios-iphone-ipad',
  },
  {
    key: 'tabs', id: 'khq9nh88bc', title: 'Practice the tabs in your key',
    label: 'Tabs transposition',
    description: 'Move the guitar or bass tabs into the key you need to play.',
    source: 'https://help.worshiponline.com/en/articles/13551725-tabs-transpose-feature-ios-iphone-ipad',
  },
  {
    key: 'loop', id: 'v3wbb62ax4', title: 'Repeat the part you need to learn',
    label: 'Tutorial video looping',
    description: 'Loop a section of a tutorial so musicians can work through a difficult passage.',
    source: 'https://help.worshiponline.com/en/articles/13551732-tutorial-video-loop-feature-ios-iphone-ipad',
  },
];

const engineSteps = [
  ['01', 'Keep the tracks synchronized', 'Mix several audio streams while supporting per-track volume, stereo panning, mute, solo, and seeking. Changes to playback must not let one part drift away from the others.'],
  ['02', 'Learn the signal-processing theory', 'AI-generated prototypes repeatedly produced tracks that fell out of sync. We studied the audio signal-processing theory, worked through the timing problem, and implemented the processing ourselves in C.'],
  ['03', 'Bring the native engine into React Native', 'We connected the custom library to the shared React Native application through a native module, making the audio functionality available on both iOS and Android.'],
];

export default function WorshipOnlineMobileShowcase() {
  return (
    <main className={`${shared.page} ${styles.page}`}>
      <section className={`${shared.hero} ${styles.hero}`}>
        <div className={shared.container}>
          <div className={shared.topline}>
            <Link className={shared.backLink} href="/showcases">All case studies</Link>
            <Image src="/img/showcases/clients/wo.svg" alt="WorshipOnline" width={138} height={35} priority />
          </div>
          <div className={shared.heroGrid}>
            <div className={shared.heroCopy}>
              <p className={`${shared.eyebrow} ${styles.heroEyebrow}`}>WORSHIPONLINE / MOBILE + AUDIO ENGINEERING</p>
              <h1>A rehearsal app<br /><span>A custom audio engine</span><br />A launch we owned</h1>
              <p className={shared.heroLead}>From React Native screens to native C audio processing, we built an iOS and Android app and helped the client get it into musicians&apos; hands</p>
              <div className={shared.heroActions}>
                <a href="#feature-videos" className={`${shared.primaryLink} ${styles.primaryAction}`}>Watch the app in action <span aria-hidden="true">↓</span></a>
                <DownloadPDF filename="worshiponline-mobile-app.pdf" />
              </div>
            </div>
            <div className={`${shared.heroVisual} ${styles.heroVisual}`}>
              <Image src={hero} alt="Illustration of the WorshipOnline mixer linked to a custom C audio engine with synchronized vocal, guitar, drum and keyboard tracks" width={960} height={640} priority sizes="(max-width: 860px) 100vw, 52vw" />
            </div>
          </div>
          <div className={`${shared.factBar} ${styles.facts}`}>
            <div><span>Application</span><strong>React Native · iOS + Android</strong></div>
            <div><span>Audio</span><strong>Custom native C library</strong></div>
            <div><span>Ownership</span><strong>Build · Publish · Support</strong></div>
          </div>
        </div>
      </section>

      <section className={shared.intro}>
        <div className={shared.container}>
          <div className={shared.introHeading}>
            <p className={`${shared.sectionTag} ${styles.tag}`}>THE PRODUCT</p>
            <h2>Bring the rehearsal experience to a musician&apos;s phone</h2>
          </div>
          <div className={shared.introBody}>
            <p>WorshipOnline wanted a mobile application that let musicians learn their parts wherever they rehearsed. We developed the app for iOS and Android with React Native, adapted the existing backend, and brought the product through publication on both stores.</p>
            <p>The demanding part was the audio. The mixer needed to combine multiple streams and give musicians control over each part while keeping playback synchronized. The proprietary audio solutions we evaluated came with licensing costs that were too high for the project.</p>
          </div>
        </div>
      </section>

      <section className={styles.engine}>
        <div className={shared.container}>
          <div className={styles.engineHeading}>
            <p className={`${shared.sectionTag} ${styles.tag}`}>THE ENGINEERING CHALLENGE</p>
            <h2>Build the audio capability the product needed</h2>
            <p>We could not find a ready-made React Native library that met the project&apos;s synchronization and cost requirements. We built the required audio library from scratch in C at a much lower cost than the proprietary licensing options we had considered.</p>
          </div>
          <ol className={styles.engineSteps}>
            {engineSteps.map(([number, heading, detail]) => <li key={number}><div className={styles.engineStepHeading}><span>{number}</span><h3>{heading}</h3></div><p>{detail}</p></li>)}
          </ol>
          <div className={styles.engineResult}><strong>One reusable native audio library</strong><p>The team gained the functionality it needed for both platforms without adopting the expensive proprietary audio SDKs we evaluated.</p></div>
        </div>
      </section>

      <section className={styles.demos} id="feature-videos">
        <div className={shared.container}>
          <p className={`${shared.sectionTag} ${styles.tag}`}>SEE THE PRODUCT WORK</p>
          <h2>The features, in the client&apos;s own walkthroughs</h2>
          <p className={styles.sectionLead}>These public WorshipOnline help videos demonstrate the current iPhone and iPad experience</p>
          <div className={styles.videoGrid}>
            {videos.map(video => (
              <article className={styles.videoCard} key={video.id}>
                <div className={styles.videoFrame}>
                  <Image src={`/img/showcases/mobile-demos/${video.key}.jpg`} alt={`${video.label} walkthrough preview`} width={592} height={1280} loading="eager" />
                  <iframe src={`https://fast.wistia.net/embed/iframe/${video.id}?videoFoam=true&autoPlay=false`} title={`WorshipOnline: ${video.label}`} loading="lazy" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen data-pdf-exclude />
                </div>
                <div className={styles.videoCopy}><p className={styles.videoLabel}>{video.label}</p><h3>{video.title}</h3><p>{video.description}</p><a href={video.source} target="_blank" rel="noopener noreferrer">Watch in the help center <span aria-hidden="true">↗</span></a></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.publishing}>
        <div className={`${shared.container} ${styles.publishingGrid}`}>
          <div><p className={`${shared.sectionTag} ${styles.lightTag}`}>DELIVERY + OWNERSHIP</p><h2>Get it live. Help the team keep it moving</h2><p>Our responsibility included supporting the client&apos;s team through publication on the Apple App Store and Google Play. We stayed involved as the product moved from implementation into release and ongoing development.</p></div>
          <div className={styles.ownershipList}>
            <article><span aria-hidden="true">01</span><div><h3>Build across both platforms</h3><p>Connect the shared React Native application, native audio functionality, and existing backend.</p></div></article>
            <article><span aria-hidden="true">02</span><div><h3>Support store publication</h3><p>Help the client navigate the iOS and Android release process and bring the app to both stores.</p></div></article>
            <article><span aria-hidden="true">03</span><div><h3>Keep project ownership</h3><p>Support the client&apos;s team along the way, resolve technical challenges, and continue helping the application evolve.</p></div></article>
          </div>
        </div>
      </section>

      <section className={styles.results}>
        <div className={shared.container}>
          <p className={`${shared.sectionTag} ${styles.tag}`}>A PRODUCT PEOPLE USE</p>
          <h2>Published on both stores. Rated by musicians</h2>
          <div className={styles.ratingGrid}>
            <a href={appStore} target="_blank" rel="noopener noreferrer" className={styles.ratingCard}><span>Apple App Store · US</span><strong>4.9<small>/ 5</small></strong><span className={styles.stars} aria-hidden="true">★★★★★</span><p>6.1K ratings</p><span className={styles.storeLink}>View the iOS app ↗</span></a>
            <a href={googlePlay} target="_blank" rel="noopener noreferrer" className={styles.ratingCard}><span>Google Play · Overall listing</span><strong>4.7<small>/ 5</small></strong><span className={styles.stars} aria-hidden="true">★★★★★</span><p>292 reviews · 10K+ downloads</p><span className={styles.storeLink}>View the Android app ↗</span></a>
          </div>
          <p className={styles.ratingNote}>Store listing snapshot checked October 8, 2026. Ratings and counts can change and differ by storefront or device.</p>
          <div className={styles.deliveryOutcomes}><div><strong>React Native</strong><span>Shared app for iOS and Android</span></div><div><strong>C audio engine</strong><span>Custom processing with synchronized tracks</span></div><div><strong>Both stores</strong><span>Publication and client-team support</span></div></div>
        </div>
      </section>

      <section className={`${shared.outcome} ${styles.outcome}`}>
        <div className={shared.container}>
          <p className={`${shared.sectionTag} ${styles.lightTag}`}>FROM TECHNICAL CHALLENGE TO LIVE PRODUCT</p>
          <h2>Need a team that owns the difficult part?</h2>
          <p>We combine application development with the engineering needed to make the product work, then help your team through release and ongoing improvements.</p>
          <Link href="https://calendly.com/andrei-kaleshka/30min" target="_blank" rel="noopener noreferrer" className={`${shared.outcomeLink} ${styles.primaryAction}`}>Discuss your application <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </main>
  );
}
