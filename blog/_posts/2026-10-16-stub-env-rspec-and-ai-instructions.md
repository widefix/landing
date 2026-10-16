---
layout: post
title: "A small RSpec helper that saves code, risk, and AI tokens"
headline: "A small RSpec helper that saves code, risk, and AI tokens"
description: "Replace repeated ENV cleanup with stub_env, then teach your AI assistant to use it. A real refactoring with measured line and token counts, and its limitations."
tags: [ruby, rspec, testing, ai, development]
comments: true
share: true
toc: true
featured_post: false
image: stub-env-rspec-ai-instructions.jpg
related_posts:
  - /ruby-and-rails-upgrade-personal-experience/
---

While working with Codex on a Rails application, I noticed a familiar pattern in the generated specs: save an environment variable, change it, run the example, and restore the original value in an `ensure` block.

The code worked. It also repeated a lot of bookkeeping for something that should take one line to express.

In 2023, I proposed a small `stub_env` helper in [an RSpec issue](https://github.com/rspec/rspec-core/issues/3044). I came back to that approach for this change. Then I updated the repository's AI instructions so the next generated spec would use the helper too.

The result was small enough to measure: two spec blocks went from **26 lines to 7**. Including the shared helper, their code representation went from **230 tokens to 121** with the tokenizer described below.

## The code I wanted to stop generating

One controller spec configured HTTP basic authentication like this:

```ruby
around do |example|
  original_password = ENV.fetch("DELAYED_JOB_STATS_HTTP_BASIC_PASSWORD", nil)
  original_user = ENV.fetch("DELAYED_JOB_STATS_HTTP_BASIC_USER", nil)
  ENV["DELAYED_JOB_STATS_HTTP_BASIC_PASSWORD"] = "secret"
  ENV["DELAYED_JOB_STATS_HTTP_BASIC_USER"] = "stats"
  example.run
ensure
  if original_password.nil?
    ENV.delete("DELAYED_JOB_STATS_HTTP_BASIC_PASSWORD")
  else
    ENV["DELAYED_JOB_STATS_HTTP_BASIC_PASSWORD"] = original_password
  end
  if original_user.nil?
    ENV.delete("DELAYED_JOB_STATS_HTTP_BASIC_USER")
  else
    ENV["DELAYED_JOB_STATS_HTTP_BASIC_USER"] = original_user
  end
end
```

That is 18 lines to configure two values. Each additional variable introduces another opportunity to copy the wrong name, forget cleanup, or change how an absent value gets restored.

Another spec had a shorter version of the same pattern for a proxy URL. It also closed a local proxy fixture in the cleanup block. The environment setup and resource cleanup had become mixed together.

## The helper

I added this file at `spec/support/stub_env_helpers.rb`:

```ruby
module Helpers
  module StubEnvHelpers
    def stub_env(name, value)
      stub_const('ENV', ENV.to_hash.merge(name.to_s => value))
    end
  end
end

RSpec.configure do |config|
  config.include Helpers::StubEnvHelpers
end
```

Our `rails_helper.rb` already loads files under `spec/support`. If yours does not, require this file there.

The helper copies the current environment into a hash, changes one entry, and uses RSpec's `stub_const` to replace the `ENV` constant for the example. RSpec handles restoring the constant afterward. Repeated calls build on the currently stubbed hash, so overriding a second variable preserves the first override.

The controller setup becomes:

```ruby
before do
  stub_env(:DELAYED_JOB_STATS_HTTP_BASIC_PASSWORD, 'secret')
  stub_env(:DELAYED_JOB_STATS_HTTP_BASIC_USER, 'stats')
end
```

The proxy spec becomes:

```ruby
before { stub_env(:QUOTAGUARDSTATIC_URL, proxy_url) }

after { proxy.close }
```

Now the environment override is one statement, and the fixture cleanup keeps its own purpose.

## Less repeated code means fewer places to make mistakes

The main benefit is having one implementation of environment stubbing. Reviewers can focus on which values an example needs instead of checking another restoration algorithm.

This approach also avoids changing the operating system environment. That reduces the chance of accidentally passing a test value to a subprocess. It removes the manual cleanup paths that can make later examples depend on which tests ran first.

There are limits. The replacement is a Ruby hash, so it does not reproduce every behavior of the real `ENV` object. In particular:

- `stub_env(:MY_SETTING, nil)` leaves a key with a `nil` value. `ENV.key?` still returns true, and `ENV.fetch` returns nil rather than treating the key as missing.
- A child process will not inherit these hash overrides.
- Code that retained a reference to the original `ENV` object will continue to use that reference.
- Replacing a global constant does not isolate examples running concurrently in the same process.

Use this helper for application code that reads settings through ordinary Ruby lookups. Tests of subprocess inheritance, missing-key behavior, or the environment object's own API need an approach suited to those behaviors.

Centralizing setup reduces repeated mistakes. It also makes understanding the helper's semantics part of the review. The changed specs and related timeout spec passed: **26 examples, zero failures**.

## Update the AI instructions at the same time

Adding the helper alone leaves the assistant free to generate the old pattern again. I added a concrete rule to `.github/instructions/rspec.instructions.md`:

```markdown
Use `stub_env(:VARIABLE_NAME, value)` from
`spec/support/stub_env_helpers.rb` in a `before` block to override
environment variables. Call it once per variable; overrides accumulate
and RSpec restores `ENV` after each example. Do not mutate `ENV` or stub
its lookup methods in specs. Pass `nil` for a nil lookup value; the key
remains present in the stubbed hash.
```

A useful instruction names the helper, gives its path, shows how to call it, and explains the behavior that could surprise someone. “Write clean tests” does not give the assistant enough information to make this choice.

The assistant also needs to discover the rule. Our instructions lived under `.github/instructions`, so we added a root `AGENTS.md` directing Codex to read those files and follow their `applyTo` scopes. [Codex documents `AGENTS.md` as its repository instruction mechanism](https://developers.openai.com/codex/guides/agents-md).

For this guide, `applyTo: "**/*_spec.rb"` keeps the advice scoped to specs. The detailed rules stay in one place, and `AGENTS.md` points to them.

## The line and token counts

Here are the measurements from the actual before and after code, including indentation and blank lines inside the selected blocks:

| Code | Before: lines | After: lines | Before: tokens | After: tokens |
| --- | ---: | ---: | ---: | ---: |
| Controller environment setup | 18 | 4 | 166 | 39 |
| Proxy setup and cleanup | 8 | 3 | 64 | 24 |
| Shared helper and registration | 0 | 11 | 0 | 58 |
| Total | 26 | 18 | 230 | 121 |

The two spec blocks alone require **19 fewer lines**, a reduction of about **73%**. Including the helper, the selected code is **8 lines shorter**. The complete commit, including the instruction update and surrounding whitespace changes, added 18 lines and removed 25: **7 fewer lines overall**.

For tokens, I used `tiktoken` 0.14.0 with the `o200k_base` encoding. Each block retained its repository indentation and ended with a newline; Markdown fences were excluded. The two rewritten blocks total **63 tokens**, compared with **230** before. Including the **58-token** helper gives **121 tokens**, about **47% fewer** than the original blocks.

These are token counts of the code text, not measured billing or total Codex session usage. I did not have session usage data. The counts exclude prompts, tool output, reasoning, and the instruction file. They are a reproducible comparison with one encoding, not a claim about which tokenizer a particular Codex model uses.

The shared helper and the instruction rule have an upfront cost. An assistant that reads them spends input tokens on that guidance. In return, each future spec can express the override with a short helper call, and existing specs take less space when included in context. Avoiding a repeated correction can save another round of prompts and generated code, although I did not measure that saving here.

For a single example, the token difference is modest. Across repeated setup blocks, the practical gain is that the assistant has less code to generate, developers have less code to review, and cleanup behavior has fewer implementations to maintain.

When a review reveals a reusable convention, I now make two changes together: add the abstraction, and document how the AI should use it. That gives the next change a better starting point.
