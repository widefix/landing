# Rails buyer answer benchmark

This extends the existing visibility work without replacing earlier prompts or organic search measurements. The exact three prompts, expected facts and empty observation lists are in `rails-buyer-answers.json`. Two prompts measure discovery; the branded pricing prompt measures factual accuracy. Do not combine their scores.

## Baseline before publication

No live AI answer baseline has been collected. No connected answer-provider runner is available in this session. Search results, our own assistant's answers after reading the repository, and inaccessible products are not substitutes for fresh buyer answers. Empty lists mean missing measurements, not that WideFix was absent.

Before deployment, run each prompt in fresh sessions in each chosen buyer-facing product. A practical starting sample is five runs per prompt and product across more than one day; it is an exploratory sample, not a significance threshold. Store the complete answer and citations in dated artifacts and fill every observation field. Use `unknown` for an unavailable version and `null` for unobservable outcomes. Record provider errors separately rather than counting them as non-mentions. Preserve results whether favorable or unfavorable.

Use the same product, locale, language, search/browsing setting and fresh-session conditions in follow-up batches. Do not seed sessions with WideFix links, earlier answers or the expected facts. API observations and consumer-product observations must remain separate series. Keep exact original prompts; register paraphrases separately.

## After publication

Record deployment date and commit. Check that the changed URLs are crawlable and indexed where the product exposes indexing evidence. Repeat batches after recrawling and then weekly for an initial four-week observation period; do not assume a fixed indexing delay or that a citation reflects the newest page. Inspect cited content where possible and record uncertainty.

For each prompt/product/batch report the numerator and denominator for brand mentions, recommendations and citations separately. Classify pricing, shared hours and support coverage as correct, incorrect, omitted or not applicable. A citation alone does not establish that it supports the answer's claim. Compare factual error patterns as well as frequency. Preserve raw answers so classifications can be reviewed.

Do not infer causation from before/after variation: model changes, retrieval changes and other site edits are confounders. This bundled content update cannot isolate the effect of schema versus the table. Do not claim an uplift without observations, and do not pool all products into one unexplained visibility score.

Track qualified enquiries and buyer questions alongside citations using existing analytics/CRM processes. A mention or citation is not evidence of a sale. No recurring job, paid tool subscription or external account change is configured by this benchmark.

## Structured-data baseline

`structured-data-before.json` records the published homepage, maintenance and takeover HTML audit on November 18, 2026. All three had zero JSON-LD scripts in the fetched HTML. Hashes identify the inspected responses; this is a technical baseline, not an AI visibility measurement.
