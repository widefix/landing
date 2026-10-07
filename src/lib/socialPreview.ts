// Preview JPEGs are generated from the same artwork used by each page.
export function socialPreview(image = '/img/block-hero.jpg', alt = 'WideFix') {
  const name = image.replace(/^\/img\//, '').replace(/\.[^.]+$/, '').replaceAll('/', '-');
  return {
    url: `https://widefix.com/img/social/${name}.jpg`,
    width: 1200,
    height: 630,
    type: 'image/jpeg',
    alt,
  };
}

export function socialTwitter(image?: string, alt?: string) {
  return {
    card: 'summary_large_image' as const,
    site: '@ka8725',
    creator: '@ka8725',
    images: [socialPreview(image, alt)],
  };
}
