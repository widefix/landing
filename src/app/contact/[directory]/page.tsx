import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ContactComponent from '@/components/contact/ContactComponent';
import { clutchContactSlugs, clutchDirectories, getClutchContactPath } from '@/lib/clutchReferral';
import { socialPreview, socialTwitter } from '@/lib/socialPreview';

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.values(clutchContactSlugs).map(directory => ({ directory }));
}

function getDirectoryReferral(directory: string) {
  const campaign = Object.keys(clutchContactSlugs).find(key => clutchContactSlugs[key] === directory);
  if (!campaign || !Object.hasOwn(clutchDirectories, campaign)) notFound();
  return { campaign, ...clutchDirectories[campaign] };
}

export function generateMetadata({ params }: { params: { directory: string } }): Metadata {
  const referral = getDirectoryReferral(params.directory);
  const title = `${referral.label} — Contact WideFix`;
  const url = `https://widefix.com${getClutchContactPath(referral.campaign)}`;
  return {
    title,
    description: referral.description,
    alternates: { canonical: url },
    twitter: { ...socialTwitter('/img/contact.jpg', 'Contact WideFix'), title, description: referral.description },
    openGraph: {
      title,
      description: referral.description,
      url,
      siteName: 'WideFix',
      type: 'website',
      images: [socialPreview('/img/contact.jpg', 'Contact WideFix')],
    },
  };
}

export default function DirectoryContactPage({ params }: { params: { directory: string } }) {
  const referral = getDirectoryReferral(params.directory);
  return (
    <main className="rails-home rails-contact">
      <ContactComponent referral={referral} />
    </main>
  );
}
