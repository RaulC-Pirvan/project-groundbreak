# Sprint 0.0 - GitHub & Repository Governance

Status: Planned  
Owner: Solo developer  
Goal: Establish repository governance so all future development is controlled, reviewable, and reproducible.

## Scope

This sprint covers:

- GitHub repository setup and `main` branch baseline
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
- Repository name decided (`Project Groundbreak`)

Optional but useful:

- GitHub CLI (`gh`)

---

## Task 1 - Create GitHub Repository and Set `main`

Checklist:

- [ ] Create GitHub repository and set default branch (`main`)

Step-by-step:

1. Initialize local git repository in project root:

```bash
git init -b main
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
git push -u origin main
```

6. In GitHub: `Settings -> Branches`, verify default branch is `main`.

Done when:

- local repo exists with initial commit
- remote push succeeded
- GitHub default branch is `main`

---

## Task 2 - Define Branching Strategy

Checklist:

- [ ] Define branching strategy:
  - [ ] short-lived feature branches
  - [ ] pull-request-only merges to `main`
  - [ ] no direct pushes to `main`

Step-by-step:

1. Adopt branch naming convention:
   - `feat/<short-topic>`
   - `fix/<short-topic>`
   - `chore/<short-topic>`
   - `docs/<short-topic>`
2. Keep branches short-lived (target: merge within 1-3 days of active work).
3. Require all changes to `main` through PRs only.
4. Define merge method:
   - recommended: squash merge for cleaner history
5. Document this in `CONTRIBUTING.md`.

Done when:

- naming convention is documented
- direct push to `main` is prohibited by policy

---

## Task 3 - Enable Branch Protection for `main`

Checklist:

- [ ] Enable branch protection for `main`:
  - [ ] require PR review
  - [ ] require passing CI checks
  - [ ] block force-push and branch deletion

Step-by-step:

1. Open GitHub: `Settings -> Branches -> Add branch protection rule`.
2. Rule target: `main`.
3. Enable:
   - `Require a pull request before merging`
   - `Require approvals` (set to at least 1)
   - `Require status checks to pass before merging`
   - `Do not allow bypassing the above settings` (if available)
   - `Allow force pushes` = disabled
   - `Allow deletions` = disabled
4. After CI workflow exists, select required checks (`lint`, `typecheck`, `tests`, `build`).

Done when:

- branch protection is active on `main`
- merges are blocked without review/checks

---

## Task 4 - Add PR Template

Checklist:

- [ ] Add PR template (scope, testing, docs, security impact)

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

- [ ] Add issue templates (bug, feature, research/documentation)

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

- [ ] Add label taxonomy (`type:*`, `priority:*`, `area:*`, `risk:*`)

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
- Main branch is protected.
- PR/issue workflows are standardized.
- Baseline project docs (`README`, `CONTRIBUTING`, `CHANGELOG`) exist.
- Ownership and release process are explicit.

