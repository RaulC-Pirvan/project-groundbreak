# Contributing Guide

## Purpose

This repository uses a disciplined workflow to keep development traceable, testable, and easy to review.

## Branching Model

- `master`: protected release branch
- `dev`: phase integration branch
- `sprint-*`: short-lived sprint/task branches created from `dev`

### Required Flow

1. Create branch from `dev` (example: `sprint-0.0-task-7`).
2. Implement changes in that branch.
3. Open PR into `dev`.
4. Merge only after required checks pass.
5. At phase completion, open PR from `dev` to `master`.

Direct pushes to `master` are not allowed.
Direct pushes to `dev` are strongly discouraged; use PR flow.

## Milestone Naming Convention

Use this format:

`P<phase>-S<sprint> <short name>`

Examples:

- `P0-S0.0 GitHub Governance`
- `P0-S0.1 Tooling`
- `P1-S1.1 Core Data Model`

Each milestone must include:

- target month/date
- one-sentence goal
- linked issues

## Issue and PR Workflow

- Each issue should map to one concrete task.
- Every issue should have labels:
  - one `type:*`
  - one `priority:*`
  - one `area:*`
  - one `risk:*`
- Every issue should be assigned to a milestone.
- PR descriptions must use the PR template.
- Use `Closes #<issue-number>` in PR description when appropriate.

## Closing Issues

Close an issue only when:

- implementation is complete
- changes are merged to target branch
- docs/tests are updated if applicable

Creating an issue does not mean it is done.

## Commit Message Convention

Use Conventional Commit style when possible:

- `feat: ...`
- `fix: ...`
- `chore: ...`
- `docs: ...`
- `refactor: ...`
- `test: ...`

Example:

`chore(repo): add milestone naming convention to contributing guide`
