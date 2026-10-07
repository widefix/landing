# [WideFix](https://widefix.com) landing page

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Social preview images

Next.js generates 1200 x 630 JPEG previews when it loads the configuration, including during a direct `next build`. The generator uses each showcase's `bannerTopImageSrc` and the page artwork listed in [generate-social-images.mjs](scripts/generate-social-images.mjs). Images are fitted without cropping. Pages without hero artwork use the default preview.

Use [socialPreview.ts](src/lib/socialPreview.ts) for both Open Graph and X/Twitter metadata. To regenerate previews manually, run `node scripts/generate-social-images.mjs`. The Actual DB Schema source image is a snapshot of its hero workflow card. The blog generates its own previews through its Jekyll plugin.
