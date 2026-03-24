# Sprint 0.0 - GitHub & Repository Governance

Status: Planned  
Owner: Solo developer  
Goal: Establish repository governance so all future development is controlled, reviewable, and reproducible.

## Scope

This sprint covers:

- GitHub repository setup and `master` branch baseline
- Branching strategy and merge rules
- Branch protection and quality gates
- PR/Issue templates
- Label taxonomy and milestone convention
- `README.md`, `CONTRIBUTING.md`, `CODEOWNERS`
- Initial changelog/release-notes policy

This sprint does not cover feature implementation.

---

## Prerequisites

- Git installed locally
- GitHub account access
- Repository name decided (`project-groundbreak`)

Optional but useful:

- GitHub CLI (`gh`)

---

## Task 1 - Create GitHub Repository and Set `master`

Checklist:

- [x] Create GitHub repository and set default branch (`master`)

Step-by-step:

1. Initialize local git repository in project root:

```bash
git init -b master
```

2. Create a `.gitignore` suitable for Next.js/Node before first commit.
3. Stage and commit initial files:

```bash
git add .
git commit -m "chore(repo): initialize repository baseline"
```

4. Create a new GitHub repository (UI or CLI).
5. Add remote and push:

```bash
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin master
```

6. In GitHub: `Settings -> Branches`, verify default branch is `master`.

Done when:

- local repo exists with initial commit
- remote push succeeded
- GitHub default branch is `master`

---

## Task 2 - Define Branching Strategy

Checklist:

- [ ] Define branching strategy:
  - [x] long-lived branches: `master` (release) and `dev` (phase integration)
  - [x] sprint branches created from `dev` (for example: `sprint-0.3`)
  - [x] pull-request-only merges from sprint branches into `dev`
  - [x] phase-end pull-request merge from `dev` into `master`
  - [x] no direct pushes to `master` (recommended: also no direct pushes to `dev`)

Step-by-step:

1. Create `dev` from `master` and push:

```bash
git checkout master
git pull origin master
git checkout -b dev
git push -u origin dev
```

2. For each sprint, create a sprint branch from `dev`:

```bash
git checkout dev
git pull origin dev
git checkout -b sprint-0.3
```

3. Work only on the sprint branch. When ready, open a PR from `sprint-0.3` to `dev`.
4. When all planned sprints for the phase are integrated into `dev`, open a phase PR from `dev` to `master`.
5. Keep sprint branches short-lived; delete each sprint branch after merge.
6. Optional (for smaller scoped branches inside a sprint), use intent prefixes:
   - `feat/<topic>` for new functionality
   - `fix/<topic>` for bug fixes
   - `chore/<topic>` for tooling/maintenance/non-feature work
   - `docs/<topic>` for documentation-only changes
7. Document this workflow in `CONTRIBUTING.md`.

Done when:

- `dev` exists and is used as the phase integration branch
- sprint branches are merged into `dev` via PRs
- phase release flow (`dev` -> `master`) is documented
- direct push to `master` is blocked by policy
---

## Task 3 - Enable Branch Protection for `master` and `dev`

Checklist:

- [x] Enable branch protection for `master`:
  - [x] require PR before merge
  - [x] require passing CI checks
  - [x] block force-push and branch deletion
- [x] Enable branch protection for `dev`:
  - [x] require PR before merge
  - [x] require passing CI checks
  - [x] block direct integration by push

Step-by-step:

1. Open GitHub: `Settings -> Branches -> Add branch protection rule`.
2. Create rule for `master`:
   - `Require a pull request before merging`
   - `Require status checks to pass before merging`
   - `Allow force pushes` = disabled
   - `Allow deletions` = disabled
   - `Require approvals` = recommended when collaborating with others; for strict solo flow you can rely on CI + PR discipline.
3. Create rule for `dev`:
   - `Require a pull request before merging`
   - `Require status checks to pass before merging`
   - keep direct push disabled through branch protection settings
4. After CI workflows exist, mark required checks (`lint`, `typecheck`, `tests`, `build`).

Done when:

- branch protection is active on both `master` and `dev`
- integration to `dev` and release to `master` are PR-gated
---

## Task 4 - Add PR Template

Checklist:

- [x] Add PR template (scope, testing, docs, security impact)

Step-by-step:

1. Create file: `.github/pull_request_template.md`.
2. Include sections:
   - Summary
   - Scope
   - Test evidence
   - Docs updated
   - Security impact
   - Risks / rollback notes

Minimal template:

```md
## Summary

## Scope
- [ ] Backend
- [ ] Frontend
- [ ] ML/Pipeline
- [ ] Infra/DevOps
- [ ] Docs only

## Testing
- [ ] Unit
- [ ] Integration
- [ ] E2E
- [ ] Not applicable (reason)

## Documentation
- [ ] Updated relevant docs
- [ ] Not applicable (reason)

## Security Impact
- [ ] None
- [ ] Yes (describe)

## Risks / Rollback
```

Done when:

- every new PR is auto-populated with the template

---

## Task 5 - Add Issue Templates

Checklist:

- [x] Add issue templates (bug, feature, research/documentation)

Step-by-step:

1. Create directory: `.github/ISSUE_TEMPLATE/`.
2. Add templates:
   - `bug_report.yml`
   - `feature_request.yml`
   - `research_or_docs.yml`
3. Add `.github/ISSUE_TEMPLATE/config.yml` to disable blank issues (optional but recommended).

Done when:

- creating a new issue shows the three structured templates

---

## Task 6 - Add Label Taxonomy

Checklist:

- [x] Add label taxonomy (`type:*`, `priority:*`, `area:*`, `risk:*`)

Step-by-step:

1. Create labels in GitHub with clear colors/descriptions.
2. Recommended baseline:
   - `type:feature`, `type:bug`, `type:chore`, `type:docs`, `type:research`
   - `priority:p0`, `priority:p1`, `priority:p2`, `priority:p3`
   - `area:frontend`, `area:backend`, `area:ml`, `area:infra`, `area:security`, `area:docs`
   - `risk:low`, `risk:medium`, `risk:high`

Done when:

- all new issues can be triaged with consistent labels

---

## Task 7 - Define Milestone Naming Convention

Checklist:

- [ ] Add milestone naming convention aligned with roadmap phases

Step-by-step:

1. Use convention:
   - `P0-S0.0 GitHub Governance`
   - `P0-S0.1 Tooling`
   - `P1-S1.1 Core Data Model`
2. For each milestone add:
   - target month
   - goal sentence
   - linked issues

Done when:

- milestone naming is documented in `CONTRIBUTING.md`
- first milestone (`P0-S0.0`) exists in GitHub

---

## Task 8 - Create README Baseline

Checklist:

- [ ] Create `README.md` baseline:
  - [ ] project purpose
  - [ ] architecture summary
  - [ ] local setup
  - [ ] scripts and workflows
  - [ ] contribution workflow

Step-by-step:

1. Create `README.md` sections:
   - Project Overview
   - Current Status
   - High-level Architecture
   - Tech Stack
   - Local Setup
   - Common Commands
   - Contribution Workflow
   - Documentation Index
2. Link roadmap and AGENTS docs.
3. Add minimum runnable instructions.

Done when:

- a new collaborator can understand project purpose and local startup path from README alone

---

## Task 9 - Add CONTRIBUTING Guide

Checklist:

- [ ] Add `CONTRIBUTING.md` (branch/PR/commit expectations)

Step-by-step:

1. Create `CONTRIBUTING.md`.
2. Document:
   - branch naming rules
   - PR checklist expectations
   - required CI gates
   - commit message convention (recommended: Conventional Commits)
   - docs update requirement for meaningful changes

Done when:

- contribution workflow is explicit and enforceable

---

## Task 10 - Add CODEOWNERS

Checklist:

- [ ] Add `CODEOWNERS` baseline (single-owner project)

Step-by-step:

1. Create `.github/CODEOWNERS`.
2. Add baseline ownership:

```txt
* @<your-github-username>
```

3. Confirm PRs auto-request reviewer (if repo settings permit).

Done when:

- ownership rules are versioned and active

---

## Task 11 - Add Changelog / Release Notes Policy

Checklist:

- [ ] Add initial changelog/release notes policy

Step-by-step:

1. Create `CHANGELOG.md`.
2. Use Keep-a-Changelog style sections:
   - `Added`
   - `Changed`
   - `Fixed`
   - `Security`
3. Define release note cadence:
   - per milestone or per tagged release
4. Add policy note in `CONTRIBUTING.md`.

Done when:

- changelog file exists and release-note process is documented

---

## Suggested Execution Order

1. Task 1
2. Task 2
3. Task 3
4. Task 4 + Task 5
5. Task 6 + Task 7
6. Task 8 + Task 9 + Task 10 + Task 11

---

## Sprint 0.0 Exit Criteria

- GitHub repository governance is active and enforced.
- `master` and `dev` protections are active.
- PR/issue workflows are standardized.
- Baseline project docs (`README`, `CONTRIBUTING`, `CHANGELOG`) exist.
- Ownership and release process are explicit.



