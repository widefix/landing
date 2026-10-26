---
layout: post
title: "Ruby Regexp RCE Fixes: What Rails App Owners Should Check"
headline: "Ruby Regexp RCE Fixes: What Rails App Owners Should Check"
description: "Ruby's October 2026 regexp fixes explained for Rails teams: assess untrusted patterns, update the runtime, and verify the deployed application."
tags: [ruby, rails, security, maintenance, upgrades]
comments: true
share: true
toc: true
featured_post: false
image: ruby-regexp-safety.svg
image_svg: ruby-regexp-safety.svg
related_posts:
  - /planning-a-rails-upgrade/
  - /your-rails-app-still-works-is-it-still-supported/
---

A security release lands, and someone asks: “Is our Rails application affected?”

I want that answer to come with evidence: which feature accepts the relevant input, which runtime is deployed, and what has actually changed in production. A merged version update is only one part of that answer.

Ruby's October 23, 2026 regexp fixes are a good reason to ask those questions now. Here is the upstream finding, followed by the review and release approach I recommend for an existing Rails product.

## What Ruby announced

The [Ruby announcement](https://www.ruby-lang.org/en/news/2026/10/23/regexp-fixes-for-gitlab-cves/) describes memory-corruption bugs during regexp compilation. GitLab demonstrated remote code execution through attacker-supplied patterns. Ruby recommends these releases or later:

| Ruby series | Release containing all the fixes |
| --- | --- |
| 4.0 | 4.0.9 |
| 3.4 | 3.4.12 |
| 3.3 | 3.3.13 |

Ruby 4.0.8 lacks one fix. The affected boundary is compiling attacker-controlled patterns through APIs such as `Regexp.new`, `Regexp.compile`, or interpolation. Developer-authored fixed expressions are outside the advisory's scope. `Regexp.timeout` and pattern-length limits do not reliably prevent these compilation bugs.

The identifiers belong to GitLab: **CVE-2026-89078, CVE-2026-93577, CVE-2026-97229, and CVE-2026-110264**. At publication, Ruby had not requested separate identifiers. The announcement also names `Regexp.union`; review its argument types rather than treating every call as equivalent.

If an immediate upgrade is impossible, upstream recommends stopping compilation of untrusted patterns. Recheck the announcement for updates when acting on this article.

## Start with the feature, then trace the input

My first review question would be: can a customer or another external system supply a *pattern*, or only the text being searched?

For example, these two operations have different purposes:

```ruby
# The developer defines the pattern; the user supplies text to match.
/\A[A-Z]{2}\z/.match?(submitted_country_code)

# Review this boundary: the user supplies the pattern itself.
Regexp.new(submitted_pattern).match?(document_text)
```

These are illustrative examples, not exploit payloads. The second operation might sit behind a saved search, an import rule, or a tenant's configurable filter. Those are places I would investigate, not claims that every such feature is vulnerable.

Do not stop at the controller. A pattern could be stored in a database today and compiled by a background job tomorrow. An admin screen also deserves review: record who can change the value and which systems can populate it.

As a starting inventory, search the application and supporting scripts:

```sh
rg -n 'Regexp\.(new|compile|union)' app lib config
rg -n -F '#{' app lib config
```

The second search deliberately returns unrelated interpolation too. Inspect regexp literals, including `%r{...}`, among the results. These commands are leads for review; wrappers, dependencies, and indirect calls need separate inspection.

For each relevant call, record the input's origin, who controls it, whether it is escaped, and where compilation runs. That makes the finding actionable for the person responsible for the release.

## When users want text search, preserve text semantics

Before retaining a configurable regexp, ask what the feature needs to do. If it only needs a literal substring check, a string operation may be enough:

```ruby
document_text.include?(search_text)
```

This example is case-sensitive. It changes behavior if users previously relied on regexp syntax, so agree the intended behavior before replacing production code.

If a fixed expression needs an embedded literal value, Ruby documents [`Regexp.escape`](https://docs.ruby-lang.org/en/3.4/Regexp.html#method-c-escape) for escaping metacharacters:

```ruby
pattern = Regexp.new(Regexp.escape(search_text), Regexp::IGNORECASE)
pattern.match?(document_text)
```

Keep the escaping immediately next to construction and test the intended search behavior. For example, `a.b` should find a literal dot if the product promises text search. Check empty values, case handling, and encoding expectations as relevant to your data.

I would treat this as a product and code review alongside the runtime update. I would not assume that accepting arbitrary pattern syntax becomes a sensible feature simply because a patch is available.

## Ship the runtime update through the whole application

My recommended release checklist is:

1. **Inventory what runs.** Record Ruby versions for web processes, workers, scheduled jobs, and separately built services. Capture `RUBY_DESCRIPTION` from each environment's execution context. A fresh console alone does not prove every long-running process has been replaced.
2. **Align the version declarations.** Check `.ruby-version`, the Gemfile's Ruby declaration, lockfile metadata, Docker base images, CI configuration, and hosting settings where applicable. Use the patched release appropriate to the application's series; avoid introducing a major-version migration into a focused patch without a reason.
3. **Build and verify.** Rebuild the application artifact, run the relevant regression checks, and exercise search, imports, rules, and jobs that the review identified. Do not try malicious patterns against production as a verification shortcut.
4. **Deploy every process type.** Replace web and worker processes and update scheduled execution environments. Check for old instances left behind after a partial rollout.
5. **Record completion.** Keep the deployed artifact identifier, runtime evidence, workflow checks, and any temporarily disabled functionality with the release record.

Agree recovery before deployment. If rollback restores the previous runtime, it can also restore the exposure; decide how the affected feature will remain unavailable while a release problem is resolved.

For applications on an older Ruby series, scope a compatible path to a supported runtime. Our [upgrade planning guide](/blog/planning-a-rails-upgrade/) explains how I would separate compatibility investigation from implementation.

## Give the application owner a useful answer

I would report the result in four lines: the input path reviewed, the deployed runtime, the checks completed, and any unresolved work. If exposure is still uncertain, name the missing evidence and the person responsible for resolving it.

At WideFix, we take technical ownership of existing Rails applications and provide [ongoing maintenance](/ruby-on-rails-maintenance). Security updates belong in that responsibility: someone needs to connect the advisory to the application's behavior and follow the change into production.

If your original developer has left, our [Rails application takeover service](/ruby-on-rails-application-takeover) provides a starting point for understanding the codebase and its deployment. Bring your known Ruby version and any configurable search or matching features. The useful next step is to agree the review scope, identify the running environments, and plan the first verified release.

*Published October 26, 2026. Version recommendations above reflect the linked October 23 releases; check current upstream guidance before upgrading.*
