# Contributing Guide

## Purpose

This repository uses a strict, review-first workflow so changes stay traceable, testable, and dissertation-ready.

## Branching Strategy

Long-lived branches:

- `master`: protected release branch
- `dev`: protected phase integration branch

Working branches:

- `sprint-*`: short-lived sprint/task branches created from `dev`

Recommended sprint branch format:

- `sprint-<phase>.<sprint>-<short-topic>`
- Example: `sprint-0.0-contributing-guide`

Optional branch intent prefixes for scoped work:

- `feat/<topic>` for new functionality
- `fix/<topic>` for bug fixes
- `chore/<topic>` for tooling/maintenance
- `docs/<topic>` for documentation-only changes

## Required Merge Flow

1. Branch from `dev`.
2. Implement and commit changes.
3. Open PR from your branch into `dev`.
4. Merge only after required checks pass.
5. At phase completion, open PR from `dev` into `master`.

Direct pushes to `master` are not allowed.
Direct pushes to `dev` are not allowed; use PRs.

## Pull Request Requirements

Every PR must include:

- clear summary of what changed
- linked issue(s) (`Closes #<issue-number>` where applicable)
- testing evidence (unit/integration/e2e or explicit N/A reason)
- documentation impact (`updated` or `not needed` with reason)
- security impact (`none` or short description)
- risk/rollback notes for non-trivial changes

PR template at `.github/pull_request_template.md` is mandatory.

## Required CI Gates

Protected-branch merges require passing CI checks.

Baseline required checks:

- `lint`
- `typecheck`
- `unit tests`
- `build`
- `e2e smoke tests`

If a check is temporarily unavailable, document the exception in the PR and restore the check quickly.

## Local Git Hooks

This repository uses Husky hooks to catch issues before code reaches CI.

- `pre-commit`:
  - formats staged files (`lint-staged`)
  - runs quick local checks (`lint`, `typecheck`, `unit tests`)
- `pre-push`:
  - runs local CI-equivalent checks (`lint`, `typecheck`, `unit tests`, `e2e smoke tests`)

Setup:

```bash
npm ci
npm run prepare
```

If hooks fail on Windows with a WSL shell error, run `npm run prepare` again to reapply the Husky runner compatibility patch.

Bypass (emergency only):

```bash
git commit --no-verify
git push --no-verify
```

## Issue, Labels, and Milestones

Each issue should map to one concrete task.

Each issue should have:

- one `type:*` label
- one `priority:*` label
- one `area:*` label
- one `risk:*` label
- one milestone assignment

Milestone naming convention:

`P<phase>-S<sprint> <short name>`

Examples:

- `P0-S0.0 GitHub Governance`
- `P0-S0.1 Tooling`
- `P1-S1.1 Core Data Model`

Each milestone must include:

- target month/date
- one-sentence goal
- linked issues

## Commit Message Convention

Use Conventional Commits:

- `feat: ...`
- `fix: ...`
- `chore: ...`
- `docs: ...`
- `refactor: ...`
- `test: ...`

Examples:

- `docs: add contributing workflow and CI gate policy`
- `chore(repo): add issue templates`
- `feat(api): add feed endpoint contract`

## Package Manager and Lockfile Policy

- npm is the only supported package manager for this repository.
- `package-lock.json` must be committed for dependency changes.
- `yarn.lock` and `pnpm-lock.yaml` must not be committed.
- Use `npm ci` in CI for deterministic installs.

## Documentation Update Requirement

Meaningful changes must update docs in the same PR.

At minimum, review and update relevant files from:

- `README.md`
- `docs/roadmap.md`
- `docs/backend.md`
- `docs/mobile.md`
- `docs/ml-pipeline.md`
- `docs/fact-checking.md`
- `docs/security.md`
- `docs/evaluation.md`
- `docs/dissertation-notes/`

If no doc update is needed, state the reason in the PR.

## Closing Issues

Close an issue only when:

- implementation is complete
- PR is merged to the target branch
- tests/docs obligations are met

Creating an issue does not mean it is done.

## Changelog and Release Notes Policy

- `CHANGELOG.md` is mandatory and must be kept current.
- Use Keep a Changelog sections in each release entry:
  - `Added`
  - `Changed`
  - `Fixed`
  - `Security`
- Release-note cadence:
  - update `Unreleased` continuously during development
  - publish release notes at least per milestone and/or per tagged release
- If no code changes occurred in a cycle, add a short note stating that explicitly.
