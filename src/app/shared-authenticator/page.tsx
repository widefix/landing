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

export default function SharedAuthenticatorPage() {
  return <main className={styles.page}>
    <section className={styles.hero}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Built by WideFix for our own team</p>
        <h1>Shared account. Independent teammates.</h1>
        <p className={styles.lead}>Stop waiting for someone to send an authentication code. Shared Team Authenticator lets teammates get the codes they need and keep working.</p>
        <div className={styles.actions}><a className={styles.primary} href="#get-started">Get the code</a><Link className={styles.secondary} href="/contact">Ask us about setup</Link></div>
        <p className={styles.note}>Self-hosted web application · Source code available · MIT license</p>
        <Image className={styles.screenshot} src="/img/shared-authenticator/codes.webp" alt="Shared Team Authenticator vault with four authenticators and Show code buttons; account details are redacted" width={1532} height={1027} priority />
      </div>
    </section>
    <section><div className={styles.inner}>
      <p className={styles.eyebrow}>Less waiting. Fewer interruptions.</p>
      <h2>“Can you send me the code?” should not block your work.</h2>
      <p className={styles.intro}>At WideFix, we sometimes need shared accounts for development tools, CI/CD components, and staging integrations. When the authenticator lives on one person’s phone, everyone else depends on that person being available. We built this tool to remove that dependency.</p>
      <div className={styles.grid}>
        <article><h3>Keep teammates moving</h3><p>Authorized teammates can reveal and copy a code themselves, without sending a message or waiting for a reply.</p></article>
        <article><h3>Protect focus time</h3><p>The person holding the authenticator no longer needs to stop their work whenever someone else signs in.</p></article>
        <article><h3>Organize access by vault</h3><p>Group authenticators into workspaces and vaults, and choose which vaults each teammate can access.</p></article>
        <article><h3>Manage changing responsibilities</h3><p>Invite teammates, assign roles, and revoke access when their work or team membership changes.</p></article>
        <article><h3>Run it on your infrastructure</h3><p>Install the application in your own environment and manage its deployment and backups with your team.</p></article>
        <article><h3>Adapt it to your workflow</h3><p>The MIT-licensed code lets your team use and modify the tool to fit how you work.</p></article>
      </div>
    </div></section>
    <section className={styles.tinted}><div className={styles.inner}>
      <p className={styles.eyebrow}>Practical team access</p><h2>Useful wherever a shared login slows you down.</h2>
      <div className={styles.grid}>
        <article><h3>Development tools</h3><p>Let teammates access a shared development or testing account without relying on one person’s device.</p></article>
        <article><h3>CI/CD services</h3><p>Give authorized engineers access to account codes when they need to investigate a build or deployment.</p></article>
        <article><h3>Staging integrations</h3><p>Help developers and testers sign in to shared third-party test accounts as they work on integrations.</p></article>
      </div>
    </div></section>
    <section><div className={styles.inner}>
      <div className={styles.split}><div><p className={styles.eyebrow}>Choose who can access what</p><h2>One place to manage your team’s access.</h2><p>Invite members, assign their role, and select their vaults. Teammates get access to the authenticators relevant to their work.</p><p>Reveal only the code you need. Authenticator secrets remain encrypted and are not sent to the codes page.</p></div><Image className={styles.screenshot} src="/img/shared-authenticator/members.webp" alt="Members and access screen showing roles and WideFix vault permissions; member emails are redacted" width={1507} height={1044} /></div>
      <p className={styles.note}>Product screenshots with account names and personal information redacted.</p>
    </div></section>
    <section className={styles.tinted} id="get-started"><div className={styles.inner}>
      <p className={styles.eyebrow}>Two ways to get started</p><h2>Install it yourself. Or let us help.</h2>
      <p className={styles.intro}>At the moment, we share the source code only. There is no hosted service to sign up for. You can install it on your own infrastructure, or reach out to WideFix for help getting it running.</p>
      <div className={styles.grid}>
        <article><h3>Install it with your team</h3><p>Follow the repository’s installation guide to run it locally, then use the deployment documentation to set up your team’s environment. The application uses PHP, Laravel, and SQLite.</p><a className={styles.primary} href={repository} target="_blank" rel="noopener noreferrer">View code and installation guide</a><p className={styles.note}>If you need repository access, contact us and we can help.</p></article>
        <article><h3>Get help from WideFix</h3><p>Tell us about your team and where you want to run it. We can help with installation, deployment, configuration, or changes to fit your workflow.</p><Link className={styles.primary} href="/contact">Discuss your setup</Link></article>
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
