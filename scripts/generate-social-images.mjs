import { readFile, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = fileURLToPath(new URL('../', import.meta.url));

export default async function generateSocialImages() {
  const sources = new Set([
    '/img/block-hero.jpg',
    '/img/rails-ownership-hero.svg',
    '/img/rails-services-hero.svg',
    '/img/actual-db-schema-hero.png',
    '/img/contact.jpg',
    '/img/showcases/technology-cloud.svg',
  ]);
  for (const file of ['src/showcases.tsx', 'src/cases/seo-optimization.tsx']) {
    const source = await readFile(path.join(root, file), 'utf8');
    for (const [, image] of source.matchAll(/bannerTopImageSrc:\s*['"]([^'"]+)['"]/g)) sources.add(image);
  }
  const outputDir = path.join(root, 'public/img/social');
  await mkdir(outputDir, { recursive: true });
  // Generate sequentially to keep memory use bounded during CI builds.
  for (const image of sources) {
    const input = path.join(root, 'public', image);
    const name = image.replace(/^\/img\//, '').replace(/\.[^.]+$/, '').replaceAll('/', '-');
    const output = path.join(outputDir, `${name}.jpg`);
    const inputInfo = await stat(input);
    const outputInfo = await stat(output).catch(() => null);
    if (outputInfo && outputInfo.mtimeMs >= inputInfo.mtimeMs) continue;
    const { data, info } = await sharp(input, { density: 180 })
      .resize(1104, 534, { fit: 'inside' })
      .png().toBuffer({ resolveWithObject: true });
    await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#f1f5f9' } })
      .composite([{ input: data, left: Math.round((1200 - info.width) / 2), top: Math.round((630 - info.height) / 2) }])
      .jpeg({ quality: 90 }).toFile(output);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await generateSocialImages();
