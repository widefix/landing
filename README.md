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

Visit `/team-cost-calculator` (also linked in the footer) to plan a team budget in USD. The page has two modes, and its logic lives in [teamCostCalculator.ts](src/lib/teamCostCalculator.ts):

- **I have a monthly budget** turns a budget into team hours. Set the architect's share of team hours (1% to 50%) and an optional QA share; developers cover the rest.
- **I have a team in mind** turns a team into a cost. One solution architect is always included; developer and QA headcounts are whole numbers (zero leaves a role out) with hours per person per week.

The architect is counted as a share of total team hours, so the team needs at least one developer or QA hour. Starting hourly rates are $80 architect, $50 developer and $35 QA, defined once in `defaultRates`; `pricesAsOf` holds the date shown beside them on the maintenance page and in the calculator. Update both, and the blog posts and service pages, when prices change. All rates are editable, from $0 to $1,000,000 per hour. Hours per person must be above 0 and at most 60 a week. The page opens in budget mode with no budget, and example buttons ($1,500 and $3,000 a month, 25 and 40 hours a week) match the figures in the maintenance cost article.

Estimates use the same hours every week: a month averages 52 ÷ 12 weeks, a quarter 13 weeks and a year 52 weeks, with no adjustment for holidays, time off, taxes or extra costs. Only the fields for the selected mode must be valid.

The share link updates with the configuration. Version 3 URL fragments hold the mode and only that mode's fields, without server storage, and work with static exports. Earlier versions of the link, which used daily hours, are not supported and show the invalid-link message with defaults. Links are not access-controlled: anyone with a link can read the configuration. Editing a received estimate produces a new link and does not change the original.

Inside the results block, "Discuss this plan with WideFix" opens the Calendly call, like the site's other discuss buttons. "Send this estimate to WideFix" opens `/contact?estimate=…` with the message pre-filled. The contact page rebuilds that message from the validated link, so every figure comes from the calculator's own code and an invalid or tampered link leaves the form empty.

Run the calculator's unit tests with Node.js 22.6 or newer:

```bash
node --experimental-strip-types --test src/lib/teamCostCalculator.test.ts
```

## Social preview images

Next.js generates 1200 x 630 JPEG previews when it loads the configuration, including during a direct `next build`. The generator uses each showcase's `bannerTopImageSrc` and the page artwork listed in [generate-social-images.mjs](scripts/generate-social-images.mjs). Images are fitted without cropping. Pages without hero artwork use the default preview.

Use [socialPreview.ts](src/lib/socialPreview.ts) for both Open Graph and X/Twitter metadata. To regenerate previews manually, run `node scripts/generate-social-images.mjs`. The Actual DB Schema source image is a snapshot of its hero workflow card. The blog generates its own previews through its Jekyll plugin.
