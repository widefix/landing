import { socialPreview, socialTwitter } from '@/lib/socialPreview';
import { Metadata } from 'next';
import showcases from '@/showcases';

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

  return {
    title: showcase.metadata.title,
    description: showcase.metadata.description,
    alternates: {
      canonical: `https://widefix.com/showcases/${showcase.slug}`,
    },
    twitter: socialTwitter(showcase.body.bannerTopImageSrc, showcase.metadata.title),
    openGraph: {
      images: [socialPreview(showcase.body.bannerTopImageSrc, showcase.metadata.title)],
      title: showcase.metadata.title,
      description: showcase.metadata.description,
      url: `https://widefix.com/showcases/${showcase.slug}`,
      siteName: 'WideFix',
      locale: 'en_US',
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  const slugs = showcases.map(showcase => ({ slug: showcase.slug }));

  return slugs;
}

export default function ShowcaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
