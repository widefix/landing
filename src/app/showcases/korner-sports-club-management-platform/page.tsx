import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import LinkIndicator from '@/components/LinkIndicator';
import SituationIcon from '@/components/rails/SituationIcon';
import { RailsCall } from '@/components/rails/RailsOwnership';
import korner from '@/cases/korner';
import { socialPreview, socialTwitter } from '@/lib/socialPreview';
import styles from './korner.module.scss';

const { slug, body, metadata: copy } = korner;
const url = `https://widefix.com/showcases/${slug}`;
const dashboardAlt = 'Korner admin dashboard on a laptop showing today’s bookings, occupancy and amounts to collect, 30-day club metrics, bookings by hour and the most-used courts';
const appStore = 'https://apps.apple.com/us/app/korner/id6447021279';
const googlePlay = 'https://play.google.com/store/apps/details?id=com.korner.customers';
// The company behind Korner's development; the link renders once a name and URL are set.
const studio: { name: string; url: string } | null = null;
const paragraphs = { display: 'grid', gap: '16px' } as const;
const screen = { display: 'block', width: '100%', height: 'auto', borderRadius: '8px' } as const;

const bookingSteps = [
  ['01', 'Find a club', 'Browse nearby clubs with their sports, field formats and payment options such as paying on arrival.'],
  ['02', 'Pick the sport and time', 'Choose what you are playing, move through the week and select one or more open slots with their prices.'],
  ['03', 'Confirm the booking', 'Review the selected slots and the total, then confirm. The club sees the booking in its dashboard.'],
] as const;

const screens = [
  ['app-booking.jpg', 'Korner booking screen at SportCenter La Villa with squash, volleyball, soccer and padel options, a weekly date picker, available slots for each day, two selected one-hour slots and an $80,000 total with a Next: Confirm button', 'Choose a sport, a day and open slots, then confirm the total'],
  ['app-matches-clubs.jpg', 'Korner home screen with nearby establishments, a tournament match the player already joined, a Create Event banner inviting others to join a match and the list of all clubs with sports, formats and Pay on Arrival', 'Join tournaments, create matches others can join and browse every club'],
] as const;

const products = [
  ['production', 'Admin dashboard', 'Real-time availability, automatic booking confirmations, revenue and occupancy reports, and team roles for running the club.'],
  ['communication', 'Player mobile app', 'Players book courts in minutes, join teams, create public reservations to fill a match and follow tournaments.'],
  ['review', 'Player website', 'The same booking experience on the web for players who prefer not to install the app.'],
  ['payments', 'Venue website and point of sale', 'A personalized club website, online payments, product sales and inventory, synced with bookings and reports.'],
] as const;

const releaseSteps = [
  ['01', 'Build once for iOS and Android', 'The player app is written in Flutter, so one codebase delivers the booking experience on both platforms and new features reach every player at the same time.'],
  ['02', 'Release and publish on both stores', 'The app went through App Store and Google Play review and has been live on the App Store since January 2024, published by Korner Innovations on Google Play.'],
  ['03', 'Keep releasing after launch', 'Version 2 shipped in 2026. Later Android releases improved Google sign-in and added Android 16 compatibility, keeping the app current as the platforms change.'],
] as const;

export const metadata: Metadata = {
  ...copy,
  alternates: { canonical: url },
  openGraph: { ...copy, url, siteName: 'WideFix', type: 'article', images: [socialPreview(body.bannerTopImageSrc, dashboardAlt)] },
  twitter: socialTwitter(body.bannerTopImageSrc, dashboardAlt),
};

export default function KornerShowcase() {
  return (
    <main className="actual-db-schema-page">
      <section className="schema-section schema-hero">
        <div className="schema-inner schema-hero-grid">
          <div className="schema-hero-copy">
            <Link className="schema-text-link" href="/showcases">All case studies <LinkIndicator /></Link>
            <Image src="/img/showcases/clients/korner.svg" alt="Korner logo" width={150} height={37} style={{ display: 'block', margin: '20px 0' }} />
            <p className="schema-eyebrow">Korner / MVP to cross-platform product</p>
            <h1>{korner.preview.title}</h1>
            <p className="schema-lead">Korner began as a court-booking MVP for soccer fields and grew into a platform that runs sports clubs: a Ruby on Rails backend, an admin dashboard and a Flutter app built, released and published on iOS and Android.</p>
            <div className="schema-actions"><a className="schema-button" href="https://kornerclub.com/en" target="_blank" rel="noopener noreferrer">Visit Korner <LinkIndicator /></a><a className="schema-text-link" href="#mobile-release">See the mobile release cycle <LinkIndicator /></a></div>
          </div>
          <Image src="/img/showcases/korner/app-home.webp" alt="Korner player app home screen on an iPhone with court search, book, matches and tournaments shortcuts, the player’s schedule and nearby establishments" width={1122} height={1402} sizes="(max-width: 900px) 100vw, 440px" priority style={{ width: '100%', maxWidth: '440px', height: 'auto', justifySelf: 'center' }} />
        </div>
      </section>

      <section className="schema-section schema-install">
        <div className="schema-inner schema-install-grid">
          <div><p className="schema-eyebrow">The starting point</p><h2>{body.description}</h2><div style={paragraphs}>{body.descriptionText}{body.problemText}</div></div>
          <div className="schema-workflow"><div className="schema-capability-heading"><SituationIcon kind="priorities" /><h3>A focused first version</h3></div><div style={paragraphs}>{body.detailsText}<p>Starting with one sport and one city kept the MVP small enough to ship, then real club feedback shaped what came next.</p></div></div>
        </div>
      </section>

      <section className="schema-section schema-capabilities" aria-labelledby="korner-products-title">
        <div className="schema-inner">
          <p className="schema-eyebrow">One system, every surface</p>
          <h2 id="korner-products-title">Four connected products on one Rails backend</h2>
          {body.solutionFirstText}
          <figure style={{ margin: '32px 0' }}>
            <Image src={body.bannerTopImageSrc} alt={dashboardAlt} width={1672} height={941} sizes="(max-width: 1228px) 100vw, 1188px" style={screen} />
            <figcaption className="schema-workflow-note">The admin dashboard gives club staff the day at a glance: bookings, occupancy, payments due, revenue trends, peak hours and the most-used courts.</figcaption>
          </figure>
          <div className="schema-capability-list">{products.map(([icon, heading, text]) => (
            <article key={heading}><div className="schema-capability-heading"><SituationIcon kind={icon} /><h3>{heading}</h3></div><p>{text}</p></article>
          ))}</div>
          <p>Korner supports soccer and futsal fields, padel and multi-sport clubs, with schedules, prices, memberships and reports configured per sport or facility.</p>
        </div>
      </section>

      <section className="schema-section schema-install" id="mobile-release" aria-labelledby="korner-mobile-title">
        <div className="schema-inner schema-install-grid">
          <div><p className="schema-eyebrow">Cross-platform mobile app</p><h2 id="korner-mobile-title">Build, release and publish on both stores</h2>{body.solutionSecondText}<div className="schema-actions"><a className="schema-text-link" href={appStore} target="_blank" rel="noopener noreferrer">View on the App Store <LinkIndicator /></a><a className="schema-text-link" href={googlePlay} target="_blank" rel="noopener noreferrer">View on Google Play <LinkIndicator /></a></div></div>
          <div className="schema-workflow">
            <ol className="schema-workflow-steps">{releaseSteps.map(([number, heading, text]) => (
              <li key={number}><span>{number}</span><div><strong>{heading}</strong><small>{text}</small></div></li>
            ))}</ol>
          </div>
        </div>
      </section>

      <section className="schema-section schema-services" aria-labelledby="korner-app-title">
        <div className="schema-inner">
          <p className="schema-eyebrow">The player app</p>
          <h2 id="korner-app-title">Find a club, fill a match and book a court</h2>
          <p>Players see nearby clubs with their sports, formats and payment options, pick open time slots with their prices, create events others can join and keep their upcoming games in one schedule. The app is available in English and Spanish.</p>
          <div className={styles.flow}>
            <div className="schema-workflow">
              <ol className="schema-workflow-steps">{bookingSteps.map(([number, heading, text]) => (
                <li key={number}><span>{number}</span><div><strong>{heading}</strong><small>{text}</small></div></li>
              ))}</ol>
            </div>
            <figure style={{ margin: 0 }}>
              <video autoPlay muted loop playsInline preload="metadata" poster="/img/showcases/korner/app-clubs-poster.jpg" aria-label="Booking a court in the Korner app: from the home screen and the list of clubs to choosing a sport, week, day and two time slots at SportCenter La Villa, then confirming the total">
                <source src="/img/showcases/korner/app-clubs.mp4" type="video/mp4" />
                Your browser does not support HTML video.
              </video>
              <figcaption className="schema-workflow-note">The booking flow from the home screen to confirmation</figcaption>
            </figure>
          </div>
          <div className={styles.screens}>
            {screens.map(([file, alt, caption]) => (
              <figure key={file}>
                <div className={styles.phone}><Image src={`/img/showcases/korner/${file}`} alt={alt} width={923} height={2000} sizes="(max-width: 560px) 300px, (max-width: 900px) 36vw, 280px" /></div>
                <figcaption className="schema-workflow-note">{caption}</figcaption>
              </figure>
            ))}
            <figure>
              <Image className={styles.photo} src="/img/showcases/korner/app-home-spanish.webp" alt="Korner home screen in Spanish on an iPhone held in a hand, with court search, shortcuts to book, matches and tournaments, the player’s agenda and an open soccer match looking for four players" width={1023} height={1537} sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 380px" />
              <figcaption className="schema-workflow-note">The same app in Spanish for players in Colombia</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="schema-section schema-stats" aria-labelledby="korner-stats-title">
        <div className="schema-inner schema-stats-layout">
          <div className="schema-stats-intro">
            <p className="schema-eyebrow">Product at a glance</p>
            <h2 id="korner-stats-title">One platform built and owned end to end</h2>
            <p className="schema-stats-note">A Rails backend, an admin dashboard and a Flutter app for players in English and Spanish, in production since the first release.</p>
          </div>
          <dl className="schema-stats-values">
            {body.resultBoxes.map(box => <div key={box.message}><dt>{box.message}</dt><dd>{box.number}</dd></div>)}
          </dl>
        </div>
      </section>

      <section className="schema-section schema-capabilities">
        <div className="schema-inner">
          <p className="schema-eyebrow">Product ownership</p>
          <h2>Launching was the start, not the finish line</h2>
          <div className="schema-capability-list">
            <article><div className="schema-capability-heading"><SituationIcon kind="ownership" /><h3>Long-term Rails ownership</h3></div><p>The same Rails application has carried Korner from its first bookings to version 2. Owning it over years means keeping dependencies, integrations and data models healthy while new features ship on top.</p></article>
            <article><div className="schema-capability-heading"><SituationIcon kind="upgrades" /><h3>Ongoing app maintenance</h3></div><p>Store requirements and operating systems keep moving. Regular releases keep sign-in, compatibility and the booking flow working for players on current devices.</p></article>
            <article><div className="schema-capability-heading"><SituationIcon kind="expertise" /><h3>Experience we bring to your MVP</h3></div><p>Building and running a product end to end informs how we scope a first version, choose a cross-platform approach and structure a Rails application for the changes that follow.</p></article>
          </div>
          {studio && <p>Korner is developed by <a className="schema-text-link" href={studio.url} target="_blank" rel="noopener noreferrer">{studio.name} <LinkIndicator /></a>, the company of founder Yasir Guzman.</p>}
        </div>
      </section>

      <section className="schema-section schema-services">
        <div className="schema-inner"><p className="schema-eyebrow">Build with WideFix</p><h2>{body.helpTitle}</h2><p>Tell us who the product is for, which platforms you need and the budget you have in mind. We can help define a focused first version, ship the Rails backend and the iOS and Android app, and keep the application maintained after launch.</p><div className="schema-actions"><RailsCall>Discuss your MVP</RailsCall><Link className="schema-text-link" href="/mvp-development">Explore MVP development <LinkIndicator /></Link><Link className="schema-text-link" href="/ruby-on-rails-maintenance">Plan ongoing Rails maintenance <LinkIndicator /></Link></div></div>
      </section>
    </main>
  );
}
