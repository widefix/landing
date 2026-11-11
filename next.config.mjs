import generateSocialImages from './scripts/generate-social-images.mjs';

await generateSocialImages();

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.GITHUB_PAGES === 'true' ? { output: 'export' } : {}),
  images: {
    ...(process.env.GITHUB_PAGES === 'true' ? { unoptimized: true } : {}),
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96],
  },
};

export default nextConfig;
