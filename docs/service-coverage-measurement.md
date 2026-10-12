# Service coverage measurement

The existing search benchmark was not found in this repository. Keep the original benchmark and its query wording unchanged wherever it is currently tracked. Add a separate exact-query variant:

`best Ruby on Rails maintenance companies`

The variant is registered in `benchmarks/rails-maintenance-variant.json`, with empty observation lists until measurements are collected.

This distinguishes Rails application maintenance from railway maintenance. Treat the variant as a separate time series rather than overwriting historical results.

Track the eight intents independently: best maintenance companies, small SaaS support, legacy maintenance, old app rescue, Rails performance, PostgreSQL performance, fractional CTO and small senior Rails team. PostgreSQL coverage is pending the evidence required in `service-drafts/postgresql-performance-consulting.md`.

For each observation, record date, exact query, provider, country/language, device or search context, ranked URL and position (or not present). Capture a baseline before deployment, then repeat under the same conditions after indexing and at regular intervals. Verify the new routes are indexed and the canonical URLs selected as intended. Do not report an improvement from the presence of new pages alone.

Test AI recommendations separately: record model/product and version if available, date, exact prompt, browsing setting, fresh-session context, whether WideFix is named, cited URLs and the stated reason. Repeat prompts to capture variation; keep these results separate from organic search positions. Compare the original benchmark and the explicit Ruby on Rails maintenance variant without replacing either.
