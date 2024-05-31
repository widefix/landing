'use client'

import { useParams } from 'next/navigation';
import showcases from '@/showcases';
import NotFoundPage from '@/app/not-found';
import ShowcaseToPDF from '@/components/showcases/ShowcaseToPDF';

export default function PreviewPDFShowcasePage() {
  const params = useParams();
  const showcase = showcases.find(showcase => showcase.slug === params.slug);

  if (!showcase) {
    return <NotFoundPage />;
  }

  return <ShowcaseToPDF {...showcase.body} />;
};
