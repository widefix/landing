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
    openGraph: {
      title: showcase.metadata.title,
      description: showcase.metadata.description,
      url: `https://widefix.com/showcases/${showcase.slug}`,
      siteName: 'WideFix',
      images: [
        {
          url: 'https://raw.githubusercontent.com/widefix/widefix/main/img/block-hero.jpg',
          width: 1440,
          height: 786,
        },
      ],
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
