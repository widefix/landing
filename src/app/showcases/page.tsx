import { socialPreview, socialTwitter } from '@/lib/socialPreview';
import React from 'react';
import type { Metadata } from 'next';
import ShowcasesComponent from '@/components/showcases/ShowcasesComponent';

const description = "Existing Ruby on Rails applications maintained, stabilized and improved: case studies in Rails upgrades, performance, integrations, infrastructure and business growth.";
const title = "Rails Application Maintenance & Takeover Case Studies - WideFix";

export const metadata: Metadata = {
  title: title,
  description: description,
  alternates: {
    canonical: "https://widefix.com/showcases"
  },
  twitter: socialTwitter('/img/showcases/technology-cloud.svg', 'WideFix technology cloud: web, mobile, data and cloud engineering'),
  openGraph: {
    images: [socialPreview('/img/showcases/technology-cloud.svg', 'WideFix technology cloud: web, mobile, data and cloud engineering')],
    title: title,
    description: description,
    url: "https://widefix.com/showcases",
    siteName: "WideFix",
    locale: "en_US",
    type: "website"
  }
}

export default function ShowcasesPage() {
  return <ShowcasesComponent />;
};
