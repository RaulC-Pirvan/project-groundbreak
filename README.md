# Project Groundbreak

Probabilistic, explainable news-risk analysis platform for dissertation delivery.

## Project Overview

Project Groundbreak is a web-first, mobile-friendly system that analyzes news content and presents:

- `misinformation risk` (probability the content is false/misleading/unreliable)
- `AI-generated risk` (probability the content was AI-generated/heavily AI-assisted)

These two risks are separate by design and must never be merged.

The product goal is to support user judgment with transparent evidence, not declare absolute truth.

## Current Status

Current phase: `Phase 0 / Sprint 0.2` (Local database foundation, no-spend track).

Implemented so far:

- Next.js app scaffold (App Router + TypeScript strict)
- Tailwind CSS baseline
- ESLint + Prettier baseline
- Vitest unit baseline + smoke test
- Playwright E2E baseline + smoke test
- GitHub Actions CI checks (lint, typecheck, unit, build, e2e smoke)

Not implemented yet (beyond tooling baseline):

- backend/API feature endpoints
- ingestion and scoring pipelines
- auth and user workflows

## High-level Architecture

Planned modular structure:

- `mobile/` - mobile client/wrapper concerns
- `backend/` - API and orchestration
- `ml/` - scoring/calibration/evaluation logic
- `ingestion/` - source ingestion and normalization
- `factcheck/` - evidence retrieval and mapping
- `shared/` - schemas/contracts/utilities
- `docs/` - architecture, roadmap, dissertation notes
- `infra/` - deployment/devops configuration
- `tests/` - cross-component tests

Core signal model:

- `p_text` -> text-based misinformation signal
- `p_ai` -> AI-generated signal (separate)
- `p_claim` -> fact-check evidence signal
- `p_source` -> source credibility signal
- `p_final` -> final misinformation risk (must not include `p_ai`)

## Tech Stack

Locked baseline:

- Frontend: Next.js + Tailwind CSS
- Auth: NextAuth (email/password)
- Database: AWS RDS PostgreSQL
- Inference: AWS Bedrock (API-first)
- Deployment: AWS Amplify (web)
- Mobile path: PWA first, then Capacitor (Android + iOS)

## Local Setup

### Prerequisites

- Git
- Node.js 20+ (recommended)
- npm 10+ (recommended)

### Repository setup

```bash
git clone <YOUR_GIT_REMOTE_URL>
cd project-groundbreak
npm ci
npm run prepare
```

### Run app locally

```bash
npm run dev
```

Expected local URL:

- `http://localhost:3000`

## Common Commands

Core development commands:

```bash
npm run dev
npm run lint
npm run typecheck
npm run test
npm run test:e2e
```

Build command:

```bash
npm run build
```

## Troubleshooting

- If dependencies fail to install, confirm Node.js `20+` and npm `10+`:

```bash
node -v
npm -v
```

- If E2E tests fail because browsers are missing, install Playwright browsers:

```bash
npx playwright install chromium firefox
```

- If `npm ci` fails due to lockfile mismatch, regenerate lockfile locally and recommit:

```bash
rd /s /q node_modules
npm install
```

- Use npm only for this repository. Do not add `yarn.lock` or `pnpm-lock.yaml`.

- If Git hooks do not run, reinstall them:

```bash
npm run prepare
```

- If commit fails with a WSL message (for example `Windows Subsystem for Linux has no installed distributions`), re-run:

```bash
npm run prepare
```

This re-patches the Husky runner for Windows shell compatibility.

## Contribution Workflow

Branch model:

- `master` = protected release branch
- `dev` = phase integration branch
- `sprint-*` = short-lived implementation branches

Expected flow:

1. Branch from `dev`
2. Implement changes
3. Open PR to `dev`
4. Merge after checks pass
5. At phase end, merge `dev` -> `master`

Detailed rules are in `CONTRIBUTING.md`.

## Documentation Index

- Repository policy and engineering constraints: [AGENTS.md](AGENTS.md)
- Project roadmap: [docs/roadmap.md](docs/roadmap.md)
- Sprint 0.0 execution plan: [docs/sprints/sprint-0.0.md](docs/sprints/sprint-0.0.md)
- Sprint 0.1 execution plan: [docs/sprints/sprint-0.1.md](docs/sprints/sprint-0.1.md)
- Sprint 0.2 execution plan: [docs/sprints/sprint-0.2.md](docs/sprints/sprint-0.2.md)
- Environment strategy baseline: [docs/infra/environment-strategy.md](docs/infra/environment-strategy.md)
- Dissertation roadmap notes: [docs/dissertation-notes/roadmap-v1.md](docs/dissertation-notes/roadmap-v1.md)
- Contribution rules: [CONTRIBUTING.md](CONTRIBUTING.md)
