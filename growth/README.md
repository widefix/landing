# WideFix Growth Engine — Phase 1

Read-only, dependency-free SEO audit of public WideFix pages. This is the **first building block**, not an AI visibility or backlink monitor.

## Run locally

```bash
node growth/scan.mjs
```

The script reads `growth/config.json`, fetches the sitemap, checks same-origin URLs and writes `growth/reports/latest.json`. The GitHub Action runs every Monday at 07:17 UTC or manually and uploads the JSON report as an artifact. No API keys required.

## Current limitations

- Handles ordinary sitemap `<loc>` entries; sitemap indexes and JS-rendered metadata need future support.
- Metadata extraction is lightweight regex-based; results require review before action.
- Does not measure indexing, Search Console, AI citations, backlinks, rankings, leads or competitors.
- Does not create issues, PRs or publish content automatically.

## Next milestones

1. Add sitemap-index support and audit tests.
2. Add Search Console data after access is configured.
3. Store longitudinal reports and detect meaningful changes.
4. Implement evidence-based opportunity scoring and deduplicated GitHub Issues.
5. Add guarded code-generation PR workflow with human approval.
6. Integrate reproducible AI search visibility and backlink sources.

All external outreach, production publishing and paid actions remain human-approved.
