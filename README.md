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

## Team cost calculator

Visit `/team-cost-calculator` (also linked in the footer) to estimate a team budget in USD. One solution architect is required; developer and QA headcounts are editable nonnegative whole numbers, with zero excluding that role. Default hourly rates per person are $80, $50 and $35 respectively. The initial example uses two architect hours per working day; optional roles start at zero people, with eight developer hours and two QA hours per person.

Rates and daily hours per person are editable and apply equally to everyone in that role. Each role's daily cost is headcount × hourly rate × daily hours per person. Estimates use 5 working days per week, 260 / 12 per month, 65 per quarter and 260 per year, excluding adjustments for holidays, time off, taxes or extra costs. Daily hours must be greater than zero and at most 24; rates can range from $0 to $1,000,000 per hour. Fields for excluded roles remain editable and must also be valid before sharing.

The share link updates with the configuration. Version 2 URL fragments preserve all headcounts, rates and hours without server storage, and work with static exports. Original version 1 links still load, mapping included roles to one person and excluded roles to zero. Links are not access-controlled: anyone with a link can read the configuration. Editing a received estimate produces a new link and does not change the original. Invalid shared configurations display an error and explicitly show defaults.

Run the calculator's unit tests with Node.js 22.6 or newer:

```bash
node --experimental-strip-types --test src/lib/teamCostCalculator.test.ts
```

## Social preview images

Next.js generates 1200 x 630 JPEG previews when it loads the configuration, including during a direct `next build`. The generator uses each showcase's `bannerTopImageSrc` and the page artwork listed in [generate-social-images.mjs](scripts/generate-social-images.mjs). Images are fitted without cropping. Pages without hero artwork use the default preview.

Use [socialPreview.ts](src/lib/socialPreview.ts) for both Open Graph and X/Twitter metadata. To regenerate previews manually, run `node scripts/generate-social-images.mjs`. The Actual DB Schema source image is a snapshot of its hero workflow card. The blog generates its own previews through its Jekyll plugin.
