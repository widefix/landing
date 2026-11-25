import LinkIndicator from '@/components/LinkIndicator';
import AudioMixerPlayground from '@/components/AudioMixerPlayground';
import { socialPreview, socialTwitter } from '@/lib/socialPreview';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const projectUrl = 'https://github.com/widefix/react-native-audio-mixer';
const npmUrl = 'https://www.npmjs.com/package/@widefix/react-native-audio-mixer';
const heroImage = '/img/react-native-audio-mixer-hero.svg';
const title = 'React Native Audio Mixer: Multitrack Audio Playback for iOS and Android - WideFix';
const description = 'Play several audio stems in sync in a React Native app, with volume, pan, mute, solo and level meters for every track. Try the mixer in your browser and install it from npm.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: 'https://widefix.com/react-native-audio-mixer' },
  twitter: socialTwitter(heroImage, 'React Native Audio Mixer - multitrack audio playback for iOS and Android'),
  openGraph: {
    images: [socialPreview(heroImage, 'React Native Audio Mixer - multitrack audio playback for iOS and Android')],
    title,
    description,
    url: 'https://widefix.com/react-native-audio-mixer',
    siteName: 'WideFix',
    type: 'website',
  },
};

const usageExample = `import AudioMixer from '@widefix/react-native-audio-mixer';

AudioMixer.addListener('DownloadComplete', setTracks);
AudioMixer.load([vocalsUrl, drumsUrl, bassUrl]);

AudioMixer.togglePlay();
AudioMixer.setVolume(tracks[vocalsUrl], 0.5);
AudioMixer.setPan(tracks[drumsUrl], -1);
AudioMixer.seek(0.25);`;

export default function ReactNativeAudioMixerPage() {
  return (
    <main className="actual-db-schema-page audio-mixer-page">
      <section className="schema-section schema-hero">
        <div className="schema-inner schema-hero-grid">
          <div className="schema-hero-copy">
            <p className="schema-eyebrow">Open-source React Native library</p>
            <h1>React Native Audio Mixer: multitrack audio playback for iOS and Android</h1>
            <p className="schema-lead">
              Load several stems of the same song and play them in sync, with volume, pan, mute, solo and level meters for every track. The mixing runs in native code on each platform, while your app controls it from a small typed JavaScript API.
            </p>
            <div className="schema-actions">
              <Link className="schema-button" href={projectUrl} target="_blank" rel="noopener noreferrer">
                Explore the GitHub project
              </Link>
              <Link className="schema-text-link" href={npmUrl} target="_blank" rel="noopener noreferrer">View the npm package</Link>
            </div>
          </div>

          <div className="schema-workflow" aria-label="How React Native Audio Mixer plays a song">
            <div className="schema-workflow-heading">
              <Image src="/img/audio-mixer-icon.svg" alt="" width={56} height={56} priority />
              <div>
                <span>React Native Audio Mixer</span>
                <strong>Separate stems. One song.</strong>
              </div>
            </div>
            <ol className="schema-workflow-steps">
              <li><span>01</span><div><strong>Load the stems</strong><small>Pass the M4A URLs to <code>AudioMixer.load()</code>. The library downloads and decodes every track before playback.</small></div></li>
              <li><span>02</span><div><strong>Mix each track</strong><small>Change the volume and pan of any track while it plays. Mute and solo are built on volume.</small></div></li>
              <li><span>03</span><div><strong>Play them in sync</strong><small>All tracks are mixed into one native audio stream, so seeking and pausing move them together.</small></div></li>
            </ol>
            <p className="schema-workflow-note">The same API and events on iOS and Android.</p>
          </div>
        </div>
      </section>

      <section className="schema-section audio-mixer-playground-section" id="playground" aria-labelledby="audio-mixer-playground-title">
        <div className="schema-inner">
          <div className="schema-video-heading">
            <p className="schema-eyebrow">Interactive demo</p>
            <h2 id="audio-mixer-playground-title">Mix a song right here</h2>
            <p className="schema-section-intro">
              This demo recreates the library&apos;s example app in your browser. Play the song, solo the bass, pan the chords to one side, and watch the matching <code>AudioMixer</code> calls appear beside the mixer.
            </p>
          </div>
          <AudioMixerPlayground />
          <p className="audio-mixer-playground-note">
            The browser version uses the Web Audio API to show how the mixer behaves. In an app, the library does the same work natively: AudioToolbox and miniaudio on iOS, ffmpeg-kit and Oboe on Android. The four stems are synthesized, so they carry no copyright.
          </p>
        </div>
      </section>

      <section className="schema-section audio-mixer-app-section" aria-labelledby="audio-mixer-app-title">
        <div className="schema-inner">
          <div className="audio-mixer-flow">
            <div>
              <p className="schema-eyebrow">In a real app</p>
              <h2 id="audio-mixer-app-title">The same mixer on an iPhone</h2>
              <p>This is the library&apos;s example app running on iOS, recorded in the simulator. Each control sends one call to the native mixer, and the stems keep playing while you change them.</p>
              <div className="schema-workflow">
                <ol className="schema-workflow-steps">
                  <li><span>01</span><div><strong>Load and play</strong><small>Four five-minute stems download, decode and start together.</small></div></li>
                  <li><span>02</span><div><strong>Solo, mute and pan</strong><small>The bass plays alone, the chords move left and the melody drops out, all mid-song.</small></div></li>
                  <li><span>03</span><div><strong>Seek</strong><small>Jumping to another point moves every stem at once.</small></div></li>
                </ol>
              </div>
            </div>
            <figure>
              <video autoPlay muted loop playsInline preload="metadata" poster="/img/react-native-audio-mixer/mixer-showcase-poster.jpg" aria-label="The React Native Audio Mixer example app on an iPhone: loading four stems, playing them, soloing the bass, panning the chords left, lowering the bass, muting the melody and seeking, with the matching AudioMixer call shown for each step">
                <source src="/img/react-native-audio-mixer/mixer-showcase.mp4" type="video/mp4" />
                Your browser does not support HTML video.
              </video>
              <figcaption className="schema-workflow-note">The example app in the iOS simulator, with the call behind each step</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="schema-section audio-mixer-performance" aria-labelledby="audio-mixer-performance-title">
        <div className="schema-inner">
          <p className="schema-eyebrow">Built for real-time playback</p>
          <h2 id="audio-mixer-performance-title">Fast controls, live updates and a small memory footprint</h2>
          <div className="audio-mixer-performance-grid">
            <article>
              <strong className="audio-mixer-metric">Next buffer</strong>
              <h3>Low-latency controls</h3>
              <p>Volume, pan, mute and solo are picked up by the audio thread on its next buffer, so a change is heard right away without restarting playback. On iOS the audio callback never allocates, locks or reads a file. On Android, Oboe runs in its low-latency, exclusive mode.</p>
            </article>
            <article>
              <strong className="audio-mixer-metric">100 ms</strong>
              <h3>Real-time progress updates</h3>
              <p><code>PlaybackProgress</code> and <code>TracksAmplitudes</code> events arrive about ten times a second while a song plays, enough for a smooth progress bar and a level meter on every track.</p>
            </article>
            <article>
              <strong className="audio-mixer-metric">~5 MB</strong>
              <h3>Low memory, even for long songs</h3>
              <p>Loading four five-minute stems added about 5 MB to the example app on iOS. The engine decodes a two-second window per track ahead of the playhead instead of the whole song, which would take nearly 500 MB. Android reads the converted audio from disk in small chunks.</p>
            </article>
          </div>
          <p className="audio-mixer-performance-note">Measured with a Release build of the example app in the iOS 26 simulator on an iPhone 17 Pro. The whole app, React Native included, stayed under 80 MB through a full five-minute song.</p>
        </div>
      </section>

      <section className="schema-section schema-install" id="get-started" aria-labelledby="audio-mixer-install-title">
        <div className="schema-inner schema-install-grid">
          <div>
            <p className="schema-eyebrow">Add it to your app</p>
            <h2 id="audio-mixer-install-title">Get started in your React Native app</h2>
            <p>Install the package and the iOS pods, then load your stems and control them from JavaScript. Listen for <code>DownloadComplete</code> to get the track id for each URL; every other method takes that id.</p>
            <p>The library contains native code, so in an Expo app it needs a development build rather than Expo Go. Android needs API 24 or newer.</p>
          </div>
          <div className="schema-install-panel">
            <pre><code>{['yarn add @widefix/react-native-audio-mixer', 'cd ios && pod install'].join('\n')}</code></pre>
            <pre><code>{usageExample}</code></pre>
            <div className="audio-mixer-install-links">
              <Link className="schema-install-link" href={`${projectUrl}#readme`} target="_blank" rel="noopener noreferrer">Read the full API and events reference</Link>
              <Link className="schema-install-link" href={npmUrl} target="_blank" rel="noopener noreferrer">See the package on npm</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="schema-section schema-problem">
        <div className="schema-inner">
          <p className="schema-eyebrow">Why multitrack audio is hard on mobile</p>
          <h2>Playing one file is easy, keeping several in step is not</h2>
          <p className="schema-section-intro">Rehearsal, practice and music-learning apps often need every instrument as its own track. Starting a separate player for each stem drifts out of time, and each platform handles decoding, mixing and interruptions differently.</p>
          <div className="schema-feature-grid">
            <article>
              <span className="schema-feature-index">01</span>
              <h3>Stay in time</h3>
              <p>Tracks that start, pause or seek independently slowly fall apart. A listener hears the drift immediately.</p>
            </article>
            <article>
              <span className="schema-feature-index">02</span>
              <h3>React in real time</h3>
              <p>Moving a fader or muting a part has to change what plays right away, without restarting the song.</p>
            </article>
            <article>
              <span className="schema-feature-index">03</span>
              <h3>Behave like a good app</h3>
              <p>Phone calls, other apps and the background all interrupt audio, and iOS and Android report them differently.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="schema-section schema-capabilities">
        <div className="schema-inner">
          <p className="schema-eyebrow">Built for multitrack playback</p>
          <h2>What the library handles for you</h2>
          <div className="schema-capability-list">
            <article>
              <div className="schema-capability-heading">
                <span className="schema-capability-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16M4 12h16M4 17h16" /><circle cx="8" cy="7" r="1.6" /><circle cx="15" cy="12" r="1.6" /><circle cx="10" cy="17" r="1.6" /></svg></span>
                <h3>Stems that stay in sync</h3>
              </div>
              <p>Every track is mixed into one native audio stream, so play, pause and seek move all stems together instead of coordinating separate players.</p>
            </article>
            <article>
              <div className="schema-capability-heading">
                <span className="schema-capability-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4v16M12 4v16M18 4v16" /><rect x="4" y="13" width="4" height="3" rx="1" /><rect x="10" y="7" width="4" height="3" rx="1" /><rect x="16" y="11" width="4" height="3" rx="1" /></svg></span>
                <h3>Volume and pan per track</h3>
              </div>
              <p>Set each track&apos;s volume from 0 to 1 and pan from left to right while the song plays. Mute and solo follow from volume, as the example app shows.</p>
            </article>
            <article>
              <div className="schema-capability-heading">
                <span className="schema-capability-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M5 20V14M10 20V8M15 20v-9M20 20V5" /></svg></span>
                <h3>Progress and level meters</h3>
              </div>
              <p>Events report the playback position and the level of every track about every 100 ms while playing, ready to drive a progress bar and meters.</p>
            </article>
            <article>
              <div className="schema-capability-heading">
                <span className="schema-capability-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" /></svg></span>
                <h3>Interruptions handled</h3>
              </div>
              <p>Playback pauses for phone calls, other apps taking audio focus and the app going to the background, and tells JavaScript when it stopped on its own.</p>
            </article>
            <article>
              <div className="schema-capability-heading">
                <span className="schema-capability-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" /></svg></span>
                <h3>One typed API for both platforms</h3>
              </div>
              <p>The same methods and event payloads on iOS and Android, with TypeScript types for every event, so app code does not branch by platform.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="schema-section schema-ai">
        <div className="schema-inner schema-ai-grid">
          <div>
            <p className="schema-eyebrow">Proven in a production app</p>
            <h2>Extracted from a mobile app we built and maintain</h2>
          </div>
          <div>
            <p>The mixer started as the audio engine of the Worship Online mobile app, where worship teams rehearse with individual instrument tracks. We extracted it into its own package, aligned the iOS and Android behavior and added a typed API, so other React Native teams can use it.</p>
            <p><Link className="audio-mixer-ai-link" href="/showcases/build-crossplatform-mobile-application">Read how we built the Worship Online app <LinkIndicator /></Link></p>
          </div>
        </div>
      </section>

      <section className="schema-section schema-services" aria-labelledby="audio-mixer-services-title">
        <div className="schema-inner">
          <p className="schema-eyebrow">Built and maintained by WideFix</p>
          <h2 id="audio-mixer-services-title">Need a hand with your mobile or Rails product?</h2>
          <p>We build and take ownership of web and mobile applications, from production issues and upgrades to ongoing development. The same practical experience shapes the tools we open-source.</p>
          <div className="schema-actions">
            <Link className="schema-button" href="/services">Explore our services</Link>
            <Link className="schema-text-link" href="/actual-db-schema">Explore Actual DB Schema <LinkIndicator /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
