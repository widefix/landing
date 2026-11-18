export const organizationId = 'https://widefix.com/#organization';

export function OrganizationData() {
  return <JsonLd data={{
    '@context': 'https://schema.org', '@type': 'Organization', '@id': organizationId,
    name: 'WideFix', url: 'https://widefix.com/',
    description: 'WideFix takes ownership of existing Ruby on Rails applications: handover, stabilization, maintenance, upgrades and ongoing feature development.',
    sameAs: ['https://www.linkedin.com/company/widefix/', 'https://clutch.co/profile/widefix', 'https://github.com/widefix'],
  }} />;
}

export function ServiceData({ slug, name, description }: { slug: string; name: string; description: string }) {
  const url = `https://widefix.com/${slug}`;
  return <JsonLd data={{
    '@context': 'https://schema.org', '@type': 'Service', '@id': `${url}#service`,
    name, description, url, provider: { '@id': organizationId },
  }} />;
}

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}
