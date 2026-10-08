import { socialPreview, socialTwitter } from '@/lib/socialPreview';
import { Metadata } from 'next';
import showcases from '@/showcases';
import { showcasePositioning } from '@/lib/showcasePositioning';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params } : Props): Promise<Metadata> {
  const showcase = showcases.find(showcase => showcase.slug === params.slug);

  if (!showcase) {
    return {
      title: 'Not found',
    };
  }

  const positioning = showcasePositioning[showcase.slug];
  const title = positioning?.title || showcase.metadata.title;
  const description = positioning?.description || showcase.metadata.description;

  return {
    title,
    description,
    alternates: {
      canonical: `https://widefix.com/showcases/${showcase.slug}`,
    },
    twitter: socialTwitter(showcase.body.bannerTopImageSrc, title),
    openGraph: {
      images: [socialPreview(showcase.body.bannerTopImageSrc, title)],
      title,
      description,
      url: `https://widefix.com/showcases/${showcase.slug}`,
      siteName: 'WideFix',
      locale: 'en_US',
      type: 'article',
    },
  };
}

export async function generateStaticParams() {
  const customPages = new Set(['hipchip-stripe-ach-integration', 'build-crossplatform-mobile-application', 'worshiponline-paperclip-activestorage']);
  const slugs = showcases.filter(showcase => !customPages.has(showcase.slug)).map(showcase => ({ slug: showcase.slug }));

  return slugs;
}

export default function ShowcaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
