import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { socialPreview, socialTwitter } from '@/lib/socialPreview';
import styles from './page.module.scss';

const title = 'Shared Team Authenticator: Share 2FA Codes with Your Team | WideFix';
const description = 'Stop waiting for someone to send an authentication code. Shared Team Authenticator gives teammates independent access to shared account codes, with vaults and access controls. Install it yourself or get setup help from WideFix.';
const repository = 'https://github.com/widefix/share-authenticator';
export const metadata: Metadata = {
  title, description,
  alternates: { canonical: 'https://widefix.com/shared-authenticator' },
  twitter: socialTwitter('/img/shared-authenticator/codes.webp', 'Shared Team Authenticator by WideFix'),
  openGraph: { title, description, url: 'https://widefix.com/shared-authenticator', type: 'website', siteName: 'WideFix', images: [socialPreview('/img/shared-authenticator/codes.webp', 'Shared Team Authenticator by WideFix')] },
};

type CardIconName = 'key' | 'focus' | 'vault' | 'invite' | 'server' | 'adjust' | 'terminal' | 'pipeline' | 'integration' | 'download' | 'support';

const iconPaths: Record<CardIconName, string> = {
  key: 'M8 15a5 5 0 1 1 4-8l9 0v4h-3v3h-3l-3-3M7 7h.01',
  focus: 'M8 3H5a2 2 0 0 0-2 2v3m13-5h3a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3M9 12l2 2 4-4',
  vault: 'M4 3h16v18H4zM16 8v8M8 9h4v6H8zM10 9V7m0 8v2',
  invite: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M19 8v6m-3-3h6',
  server: 'M3 3h18v7H3zM3 14h18v7H3zM7 6.5h.01M7 17.5h.01M11 6.5h6m-6 11h6',
  adjust: 'M4 7h3m4 0h9M4 17h9m4 0h3M7 4v6h4V4zM13 14v6h4v-6z',
  terminal: 'M3 4h18v16H3zM7 9l3 3-3 3m6 0h4',
  pipeline: 'M6 7v10m2-12h8m-2 14H8',
  integration: 'M3 3h7v7H3zM14 14h7v7h-7zM7 10v7h7m-3-3 3 3-3 3',
  download: 'M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5',
  support: 'M3 14v-3a9 9 0 0 1 18 0v3M3 12h4v7H3zM17 12h4v7h-4zM21 19a3 3 0 0 1-3 3h-6',
};

function CardIcon({ name }: { name: CardIconName }) {
  return <span className={styles.cardIcon} aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" focusable="false">
      <path d={iconPaths[name]} />
      {name === 'invite' && <circle cx="9" cy="7" r="4" />}
      {name === 'pipeline' && <><circle cx="6" cy="5" r="2" /><circle cx="6" cy="19" r="2" /><circle cx="18" cy="5" r="2" /><circle cx="18" cy="19" r="2" /><path d="M18 7v10" /></>}
    </svg>
  </span>;
}

export default function SharedAuthenticatorPage() {
  return <main className={styles.page}>
    <section className={styles.hero}>
      <div className={`${styles.inner} ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Built by WideFix for our own team</p>
          <h1>Shared account, independent teammates</h1>
          <p className={styles.lead}>Stop waiting for someone to send an authentication code. Shared Team Authenticator lets teammates get the codes they need and keep working.</p>
          <div className={styles.actions}><a className={styles.primary} href="#get-started">Get the code</a><Link className={styles.secondary} href="/contact">Ask us about setup</Link></div>
          <p className={styles.note}>Self-hosted web application · Source code available · MIT license</p>
        </div>
        <Image className={styles.screenshot} src="/img/shared-authenticator/codes.webp" alt="Shared Team Authenticator vault with four authenticators and Show code buttons; account details are redacted" width={1532} height={1027} sizes="(max-width: 680px) calc(100vw - 48px), (max-width: 900px) 640px, (max-width: 1228px) calc((100vw - 104px) * 0.4), 450px" priority />
      </div>
    </section>
    <section><div className={styles.inner}>
      <p className={styles.eyebrow}>Less waiting, fewer interruptions</p>
      <h2>“Can you send me the code?” should not block your work</h2>
      <p className={styles.intro}>At WideFix, we sometimes need shared accounts for development tools, CI/CD components, and staging integrations. When the authenticator lives on one person’s phone, everyone else depends on that person being available. We built this tool to remove that dependency.</p>
      <div className={styles.grid}>
        <article><div className={styles.cardHeading}><CardIcon name="key" /><h3>Keep teammates moving</h3></div><p>Authorized teammates can reveal and copy a code themselves, without sending a message or waiting for a reply—even when the person who set up the account is in a meeting, on leave, or working in another time zone.</p></article>
        <article><div className={styles.cardHeading}><CardIcon name="focus" /><h3>Protect focus time</h3></div><p>The person holding the authenticator no longer needs to stop their work whenever someone else signs in.</p></article>
        <article><div className={styles.cardHeading}><CardIcon name="vault" /><h3>Organize access by vault</h3></div><p>Keep the authenticators for a project together in a vault. Teammates can find the codes relevant to their work in one place, rather than asking who has the right authenticator.</p></article>
        <article><div className={styles.cardHeading}><CardIcon name="invite" /><h3>Get new teammates working sooner</h3></div><p>Invite a teammate, assign their role, and give them access to the vaults they need. They can get codes independently without setting up each shared account’s authenticator on their own phone. Update or revoke access as responsibilities change.</p></article>
        <article><div className={styles.cardHeading}><CardIcon name="server" /><h3>Run it on your infrastructure</h3></div><p>Install the application in your own environment and manage its deployment and backups with your team.</p></article>
        <article><div className={styles.cardHeading}><CardIcon name="adjust" /><h3>Adapt it to your workflow</h3></div><p>The MIT-licensed code lets your team use and modify the tool to fit how you work.</p></article>
      </div>
    </div></section>
    <section className={styles.tinted}><div className={styles.inner}>
      <p className={styles.eyebrow}>Practical team access</p><h2>Useful wherever a shared login slows you down</h2>
      <div className={styles.grid}>
        <article><div className={styles.cardHeading}><CardIcon name="terminal" /><h3>Development tools</h3></div><p>Let teammates access a shared development or testing account without relying on one person’s device.</p></article>
        <article><div className={styles.cardHeading}><CardIcon name="pipeline" /><h3>CI/CD services</h3></div><p>Give authorized engineers access to account codes when they need to investigate a build or deployment.</p></article>
        <article><div className={styles.cardHeading}><CardIcon name="integration" /><h3>Staging integrations</h3></div><p>Help developers and testers sign in to shared third-party test accounts as they work on integrations.</p></article>
      </div>
    </div></section>
    <section><div className={styles.inner}>
      <div className={styles.split}><div><p className={styles.eyebrow}>Choose who can access what</p><h2>One place to manage your team’s access</h2><p>Invite members, assign their role, and select their vaults. Teammates get access to the authenticators relevant to their work.</p><p>Reveal only the code you need. Authenticator secrets remain encrypted and are not sent to the codes page.</p></div><Image className={styles.screenshot} src="/img/shared-authenticator/members.webp" alt="Members and access screen showing roles and WideFix vault permissions; member emails are redacted" width={1507} height={1044} sizes="(max-width: 640px) calc(100vw - 48px), (max-width: 900px) calc(100vw - 40px), (max-width: 1228px) calc((100vw - 96px) * 0.6), 680px" /></div>
      <p className={styles.note}>Product screenshots with account names and personal information redacted.</p>
    </div></section>
    <section className={styles.tinted} id="get-started"><div className={styles.inner}>
      <p className={styles.eyebrow}>Two ways to get started</p><h2>Install it yourself or let us help</h2>
      <p className={styles.intro}>At the moment, we share the source code only. There is no hosted service to sign up for. You can install it on your own infrastructure, or reach out to WideFix for help getting it running.</p>
      <div className={styles.grid}>
        <article><div className={styles.cardHeading}><CardIcon name="download" /><h3>Install it with your team</h3></div><p>Follow the repository’s installation guide to run it locally, then use the deployment documentation to set up your team’s environment. The application uses PHP, Laravel, and SQLite.</p><a className={styles.primary} href={repository} target="_blank" rel="noopener noreferrer">View code and installation guide</a><p className={styles.note}>If you need repository access, contact us and we can help.</p></article>
        <article><div className={styles.cardHeading}><CardIcon name="support" /><h3>Get help from WideFix</h3></div><p>Tell us about your team and where you want to run it. We can help with installation, deployment, configuration, or changes to fit your workflow.</p><Link className={styles.primary} href="/contact">Discuss your setup</Link></article>
      </div>
    </div></section>
    <section><div className={styles.inner}><h2>A few things to know</h2>
      <div className={styles.faq}>
        <details><summary>Is this a hosted product?</summary><p>No. We currently share the code for you to install and operate yourself. WideFix can help you set it up.</p></details>
        <details><summary>Does it replace a password manager?</summary><p>It focuses on authenticator codes and team access to them. You still manage account passwords separately.</p></details>
        <details><summary>Can we use and modify the code?</summary><p>Yes. The project is MIT licensed. You can use and adapt it for your own team under the terms of that license.</p></details>
        <details><summary>Who is it designed for?</summary><p>Teams that already use shared accounts for development, testing, or integrations and need independent access to authenticator codes. Use it where the account provider permits shared access.</p></details>
      </div>
    </div></section>
  </main>;
}
