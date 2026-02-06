---
layout: post
title: "Squash-tree: Preserve and Inspect Squash History Without Fighting Git"
headline: "Squash-tree: Preserve and Inspect Squash History Without Fighting Git"
modified: 2026-02-04 12:00:00 +0100
description: "Preserves the history of the original commits after git squash. Inspect the squash tree and cherry-pick whenever and whatever you want."
tags: [git, squash-tree, version-control, collaboration]
featured_post: false
toc: true
image: planning_board.jpg
author:
    name: Yasir Guzmán
    github: jasirguzman123
    linkedin: yasir-guzman
    twitter: ka8725
---

The git [squash](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History#_squashing) command is a very powerful and useful tool. It's widely used to keep branches clean. But once you squash, the original commits are gone. You lose the ability to inspect how a squashed commit has been composed. You are no longer able to cherry-pick the original commits or audit what happened during the rebase. You lose the history.

Although it is possible to recover the original state of the branch before the squash using "reflog", after some time, it becomes very challenging, if possible at all, as "reflog" is quite messy, and it's hard to find something in it.

To improve the situation around that, we created [squash-tree](https://github.com/widefix/squash-tree). It's a Git extension that preserves squash history alongside the native history of Git, so that you can inspect it and recover original commits when you need to. If you are a fan of git squashing and face the need for the recovery of the original commits, that might be a very helpful tool for you.

This post is an overview of this tool on installation, usage, and main scenarios.

## The Problem

Git squash workflows permanently collapse history. Say you have three commits on a feature branch:

```bash
$ git log --oneline feature/login
ghi9012 Add tests
def5678 Add validation
abc1234 Add login form
```

You squash them with `rebase -i`. After the rebase, `git log` shows one commit:

```bash
$ git log --oneline -1
xyz7890 Add login feature (squashed)
```

The originals are gone from the [DAG](https://git-scm.com/docs/gitglossary/2.19.0#Documentation/gitglossary.txt-DAG). You can't inspect how the squash was composed. You can't cherry-pick one of the three. If you need to recover a specific change or audit what went into the release, you have nowhere to look. Reflog might help for a while, but over time it gets messy and the entries expire.

## The Solution

Squash-tree keeps a *logical squash graph* alongside Git's [DAG](https://git-scm.com/docs/gitglossary/2.19.0#Documentation/gitglossary.txt-DAG). You can see how a commit was composed, who contributed what, and cherry-pick the originals if you need to recover. It uses Git notes and hidden refs to record squash relationships explicitly, without changing how Git works.

### Install

```bash
curl -sSL https://raw.githubusercontent.com/widefix/squash-tree/refs/heads/main/scripts/install.sh | bash
```

The script installs the binary, adds it to your PATH (if needed), and configures the Git alias. Run `source ~/.zshrc` or `source ~/.bashrc` (or open a new terminal), then in a repository:

```bash
git squash-tree init           # this repo only
git squash-tree init --global  # all repos
```

Run `git squash-tree init` and it installs hooks that record metadata whenever you squash locally.

### Basic usage

Say you have a feature branch with three commits. Let's use `rebase -i` to squash them. Both `squash` and `fixup` work. In the editor you might see:

```
pick abc1234 Add login form
squash def5678 Add validation
squash ghi9012 Add tests
```

Or with `fixup` (which folds changes in but discards the commit message):

```
pick abc1234 Add login form
fixup def5678 Fix typo
fixup ghi9012 Address review
```

Keep `pick` on the first commit and change the rest to `squash` or `fixup`, save and close. With hooks installed, the metadata is recorded automatically. Then run `git squash-tree HEAD` and you'll see:

```
xyz7890 [SQUASH]  Add login feature (squashed)
├── abc1234 [LEAF]  Add login form
├── def5678 [LEAF]  Add validation
└── ghi9012 [LEAF]  Add tests
```

`[SQUASH]` means a commit formed by squashing others. `[LEAF]` means an original commit. From here you can cherry-pick any of them to recover.

### Advanced usage

So far so good. There is one caveat though: the squash metadata (that holds info about which commits went into which squash) has to be recorded at the moment you squash. If it wasn't, squash-tree can't reconstruct the tree later. That happens when:

1. You squashed before running `git squash-tree init`;
2. The squash happened elsewhere, e.g. GitHub "Squash and merge" (your local hooks never ran);
3. You're inspecting a commit someone else squashed in a repo without hooks.

In those cases, you can reconstruct the squash metadata using `git squash-tree add-metadata` by recording the relationship manually. To do that, you need three things:

1. `--root` - the squash commit;
2. `--base` - the commit the branch diverged from, usually the merge base;
3. `--children` - the original commits, oldest first, comma-separated.

For example, say you merged a PR with "Squash and merge". You pull the changes, but the original commits are gone. You find the original commits (e.g. from reflog, or from the PR before it was merged). Then you run:

```bash
# After: git pull origin main
# Find the original commits (e.g. from reflog, or from the PR before it was merged)
git log --oneline feature/login
# abc1234 Add tests
# def5678 Add validation
# ghi9012 Add login form

git squash-tree add-metadata \
  --root=HEAD \
  --base=$(git merge-base main feature/login) \
  --children=ghi9012,def5678,abc1234
```

Children go oldest first: `ghi9012` (Add login form) was the first commit on the branch, then `def5678`, and finally `abc1234`. After running this, `git squash-tree HEAD` will show the tree.

For comprehensive information, see the [squash-tree repository](https://github.com/widefix/squash-tree).

## Conclusion

Use squash-tree to restore **visibility and control** over squash history without fighting Git. This tool might save a decent amount of your time, especially if you frequently squash commits.

> The project is in an early RFC / design-first stage, with focus on locking the data model and building a minimal, correct foundation. Follow the project and provide your feedback on [GitHub](https://github.com/widefix/squash-tree).
