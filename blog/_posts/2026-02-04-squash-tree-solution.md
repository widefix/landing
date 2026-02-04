---
layout: post
title: "Squash-tree: Preserve and Inspect Squash History Without Fighting Git"
headline: "Squash-tree: Preserve and Inspect Squash History Without Fighting Git"
modified: 2026-02-04 12:00:00 +0100
description: "A Git extension that preserves references to original commits so you can inspect the squash tree and cherry-pick to recover when squashing goes wrong."
tags: [git, squash-tree, version-control, collaboration]
featured_post: false
toc: true
image: post.jpg
author:
    name: Yasir Guzmán
    github: jasirguzman123
    linkedin: yasir-guzman
---

Git squash workflows are widely used to keep main clean. Merge squash, interactive rebase, GitHub squash merge. But once you squash, the original commit structure is gone. You lose the ability to inspect how a commit was composed, recover individual changes, or audit what went into a release. **squash-tree** is a Git extension that preserves squash history alongside Git's native DAG so you can inspect it and recover when you need to.

## The Problem

Git squash workflows permanently collapse history. Whether you use `merge --squash`, interactive rebase, or a platform squash merge, the result is the same: the original commits vanish from the DAG. After a squash:

- The original commit structure is lost
- You cannot inspect how a commit was composed
- Reverting or "unsquashing" is impossible without external context
- Auditability and debuggability suffer

This isn't a bug in Git. It's a design choice. Git favors simplicity and performance over preserving every detail of how history was composed. For many teams, that tradeoff hurts: you squash to keep history tidy, but when something goes wrong (a bad merge, a dropped fix, a need to trace what actually shipped) you have nowhere to look. Squash-tree doesn't try to change Git's behavior. It records squash relationships explicitly so that history stays visible and recoverable.

## The Solution

Squash-tree keeps a *logical squash graph* alongside Git's DAG. You can see how a commit was composed, who contributed what, and cherry-pick the originals if you need to recover. It uses Git notes and hidden refs to record squash relationships explicitly, without changing how Git works.

### Install

```bash
curl -sSL https://raw.githubusercontent.com/widefix/squash-tree/refs/heads/main/scripts/install.sh | bash
```

The script installs the binary, adds it to your PATH (if needed), and configures the Git alias. Run `source ~/.zshrc` or `source ~/.bashrc` (or open a new terminal), then in a repository:

```bash
git squash-tree init           # this repo only
git squash-tree init --global  # all repos
```

Run `git squash-tree init` and it installs hooks that record metadata whenever you squash locally. Say you have a feature branch with three commits. Let's use `rebase -i` to squash them. In the editor you'll see:

```
pick abc1234 Add login form
squash def5678 Add validation
squash ghi9012 Add tests
```

Keep `pick` on the first commit and change the rest to `squash`, save and close. With hooks installed, the metadata is recorded automatically. Then run `git squash-tree HEAD` and you'll see:

```
xyz7890 [SQUASH]  Add login feature (squashed)
├── abc1234 [LEAF]  Add login form
├── def5678 [LEAF]  Add validation
└── ghi9012 [LEAF]  Add tests
```

`[SQUASH]` means a commit formed by squashing others. `[LEAF]` means an original commit. From here you can cherry-pick any of them to recover. Metadata has to be recorded at squash time. If it wasn't, the structure can't be reconstructed later.

For full setup, CLI options, and edge cases, see the [squash-tree repository](https://github.com/widefix/squash-tree) and its README.

## Conclusion

Git prioritizes simplicity; squash-tree restores **visibility and control** over squash history without fighting Git. The project is in an early RFC / design-first stage, with focus on locking the data model and building a minimal, correct foundation. You can follow the project and contribute feedback on [GitHub](https://github.com/widefix/squash-tree).
