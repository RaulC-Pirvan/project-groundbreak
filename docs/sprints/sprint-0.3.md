# Sprint 0.3 - Containerization Baseline (Docker)

Status: Planned  
Owner: Solo developer  
Goal: Establish a production-ready container baseline for the Next.js app, aligned local Docker workflows, and CI image-build validation.

## Scope

This sprint covers:

- production-ready multi-stage `Dockerfile` for the Next.js app
- local `docker-compose.yml` baseline for development workflows
- local service profiles for app and local Postgres
- `.dockerignore` and image-size optimization pass
- local helper scripts for `docker compose up/down/logs`
- README Docker workflow + troubleshooting documentation
- CI image build step

This sprint does not cover cloud deployment runtime hardening (that remains in later AWS activation and hardening sprints).

---

## Prerequisites

- Sprint 0.2 merged into `dev`
- Node.js 20+ and npm 10+
- Docker Desktop (or equivalent Docker runtime) installed
- existing local `.env` strategy from Sprint 0.2 in place

---

## Task 1 - Create Production-Ready `Dockerfile` (Multi-Stage Build)

Checklist:

- [x] Create production-ready `Dockerfile` for Next.js app (multi-stage build)

Step-by-step:

1. Add a multi-stage `Dockerfile` at repository root:
   - dependency/install stage
   - build stage (`npm run build`)
   - runtime stage with minimal footprint
2. Configure Next.js for container-friendly runtime output (for example standalone output if selected for this project baseline).
3. Ensure runtime image runs as non-root user where practical.
4. Ensure runtime stage only includes required production artifacts.
5. Validate container boot with environment validation behavior preserved.

Done when:

- `docker build` succeeds consistently from clean checkout
- container starts and serves the app successfully
- runtime image excludes avoidable build-time dependencies

---

## Task 2 - Create `docker-compose.yml` for Local Development

Checklist:

- [x] Create `docker-compose.yml` for local development

Step-by-step:

1. Define local compose services for app runtime and optional local Postgres.
2. Wire app service environment values for local development behavior.
3. Define service dependencies and health-check-aware startup ordering where needed.
4. Ensure port mapping is explicit and conflict-aware.
5. Keep compose file readable and aligned with no-spend local-first workflows.

Done when:

- `docker compose config` validates without errors
- local app can run through compose with predictable behavior
- compose defaults are documented and reproducible

---

## Task 3 - Add Local Services Profile for `app` and `postgres` (Dev-Only DB Option)

Checklist:

- [ ] Add local services profile for:
  - [ ] app
  - [ ] postgres (dev-only local DB option)

Step-by-step:

1. Add/adjust compose profiles so the app and local database can be run together or independently.
2. Keep Postgres profile explicitly dev-only and avoid accidental production coupling.
3. Ensure profile commands are straightforward (for example app-only, db-only, app+db).
4. Verify profile behavior with actual compose runs.
5. Capture profile matrix in docs.

Done when:

- app and Postgres can be started independently via profiles
- app + Postgres combined profile path works for local development
- profile intent (dev-only local DB) is explicit in documentation

---

## Task 4 - Add `.dockerignore` and Perform Image-Size Optimization Pass

Checklist:

- [ ] Add `.dockerignore` and image-size optimization pass

Step-by-step:

1. Create/update `.dockerignore` to exclude unnecessary build context (for example `.git`, test artifacts, local caches, docs not needed for runtime).
2. Ensure local secrets and environment files are excluded from build context where appropriate.
3. Optimize Docker layer ordering for cache reuse.
4. Rebuild image and compare build context/image size before/after.
5. Document optimization choices and any trade-offs.

Done when:

- build context excludes unnecessary files
- image size is reduced versus naive baseline
- no required runtime files are accidentally excluded

---

## Task 5 - Add Local Run Scripts (`docker compose up/down/logs`)

Checklist:

- [ ] Add local run scripts (`docker compose up/down/logs`)

Step-by-step:

1. Add npm scripts for common local Docker workflows:
   - `docker:up`
   - `docker:down`
   - `docker:logs`
2. Optionally add profile-specific convenience scripts if they reduce operational friction.
3. Ensure script names are consistent with existing script conventions.
4. Validate scripts on a clean local setup.
5. Reference scripts in README workflow section.

Done when:

- local Docker workflows are runnable via npm scripts
- scripts map to deterministic compose behavior
- developer onboarding is simpler than raw manual commands

---

## Task 6 - Document Docker Workflows and Troubleshooting in README

Checklist:

- [ ] Document Docker workflows and troubleshooting notes in README

Step-by-step:

1. Add Docker setup prerequisites and first-run flow.
2. Document common local flows (build, start, stop, logs, rebuild).
3. Add profile usage examples (app-only, db-only, app+db).
4. Add troubleshooting notes for frequent issues:
   - port conflicts
   - stale containers/volumes
   - build cache confusion
   - env/config mismatch
5. Cross-link sprint and roadmap artifacts where relevant.

Done when:

- README enables a new collaborator to run Docker workflows without guesswork
- troubleshooting guidance covers the most likely local blockers
- Docker workflow docs remain consistent with actual scripts and compose files

---

## Task 7 - Add Image Build Step in CI

Checklist:

- [ ] Add image build step in CI

Step-by-step:

1. Update CI workflow to include Docker image build validation.
2. Ensure build step fails PRs when `Dockerfile` is broken.
3. Keep CI cost/runtime reasonable (build-only validation at this stage, no registry push required).
4. Capture build logs/artifacts only if needed for debugging.
5. Document CI Docker check purpose in repository docs.

Done when:

- CI runs Docker image build successfully on valid changes
- Docker regressions surface early in pull requests
- workflow remains stable and maintainable for solo development

---

## Suggested Execution Order

1. Task 1
2. Task 4
3. Task 2
4. Task 3
5. Task 5
6. Task 6
7. Task 7

---

## Sprint 0.3 Exit Criteria

- Multi-stage production-ready `Dockerfile` exists and builds successfully.
- Local compose workflow supports app and optional local Postgres via profiles.
- `.dockerignore` is present and image-size optimization has been applied.
- Common Docker operations are available via npm scripts.
- README includes accurate Docker runbook and troubleshooting notes.
- CI validates Docker image build on pull requests.
