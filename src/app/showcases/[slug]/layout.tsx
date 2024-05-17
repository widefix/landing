import { Metadata } from 'next';
import categories from '@/showcases';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params } : Props): Promise<Metadata> {
  const { slug } = params;

  const category = categories.find(category =>
    category.showcases.some(showcase => showcase.slug === slug)
  );

  if (!category) {
    return {
      title: 'Not found'
    };
  }

  const showcase = category.showcases.find(showcase => showcase.slug === slug);

  if (!showcase) {
    return {
      title: 'Not found',
    };
  }

  return {
    title: showcase.metadata.title,
    description: showcase.metadata.description,
    alternates: {
      canonical: showcase.slug,
    },
    openGraph: {
      title: showcase.metadata.title,
      description: showcase.metadata.description,
      url: showcase.slug,
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

export default function ShowcaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
