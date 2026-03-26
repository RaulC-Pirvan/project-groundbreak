# Project Groundbreak

Probabilistic, explainable news-risk analysis platform for dissertation delivery.

## Project Overview

Project Groundbreak is a web-first, mobile-friendly system that analyzes news content and presents:

- `misinformation risk` (probability the content is false/misleading/unreliable)
- `AI-generated risk` (probability the content was AI-generated/heavily AI-assisted)

These two risks are separate by design and must never be merged.

The product goal is to support user judgment with transparent evidence, not declare absolute truth.

## Current Status

Current phase: `Phase 0 / Sprint 0.3` (Containerization baseline).

Implemented so far:

- Next.js app scaffold (App Router + TypeScript strict)
- Tailwind CSS baseline
- ESLint + Prettier baseline
- Vitest unit baseline + smoke test
- Playwright E2E baseline + smoke test
- GitHub Actions CI checks (lint, typecheck, unit, build, e2e smoke, docker build validation)

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
- Docker Desktop (for local PostgreSQL and containerized app workflows)

### Repository setup

```bash
git clone <YOUR_GIT_REMOTE_URL>
cd project-groundbreak
npm ci
npm run prepare
copy .env.example .env
```

### Run app locally

```bash
npm run dev
```

Expected local URL:

- `http://localhost:3000`

Required runtime variables are validated at startup and test runtime:

- `APP_ENV` (`dev` | `test` | `prod`)
- `DATABASE_URL` (PostgreSQL connection string)

### Local PostgreSQL (Docker)

Baseline PostgreSQL environment variables used by `docker-compose.yml`:

- `POSTGRES_DB` (default: `groundbreak_dev`)
- `POSTGRES_USER` (default: `groundbreak`)
- `POSTGRES_PASSWORD` (default: `change_me_local_only`)
- `POSTGRES_PORT` (default: `5432`)

### Docker Workflows (Sprint 0.3)

Docker prerequisites for this repository:

- Docker Desktop (or equivalent Docker runtime) installed and running
- local `.env` created from `.env.example`
- ports `3000` (app) and `5432` (Postgres) available, or overridden via env

First-run flow (recommended):

```bash
copy .env.example .env
npm run docker:up
npm run docker:logs
```

Expected local endpoints after startup:

- app: `http://localhost:3000`
- db health: `http://localhost:3000/api/v1/health/db`

Stop local Docker stack:

```bash
npm run docker:down
```

Common local Docker flows:

- build + start app + local Postgres:

```bash
npm run docker:up
```

- stream local logs:

```bash
npm run docker:logs
```

- stop and remove stack resources:

```bash
npm run docker:down
```

- rebuild app image without stale layers:

```bash
docker compose --profile app --profile postgres build --no-cache app
npm run docker:up
```

Compose profile usage examples:

- `db-only` (dev-only local DB option):

```bash
docker compose --profile postgres up -d postgres
docker compose --profile postgres logs -f postgres
docker compose --profile postgres down
```

- `app-only` (requires external DB URL via `APP_DATABASE_URL` in `.env`):

```bash
docker compose --profile app up -d app
docker compose --profile app logs -f app
docker compose --profile app down
```

- `app+db` full local baseline:

```bash
docker compose --profile app --profile postgres up -d --build
docker compose --profile app --profile postgres logs -f --tail=200
docker compose --profile app --profile postgres down
```

Docker image optimization notes (`Sprint 0.3 / Task 4`):

- `.dockerignore` excludes local-only and non-runtime files (`.git`, test outputs, docs, local env files, caches) from build context.
- Next.js uses `output: "standalone"` so runtime image ships only traced production dependencies.
- Runtime image does not run `npm ci`; it copies standalone build output instead.
- Runtime env fail-fast checks are preserved through `scripts/validate-runtime-env.mjs` before server startup.
- Trade-off: runtime env validation exists in both TypeScript (`src/config/env.ts`) and a lightweight container startup script, which requires keeping validation rules aligned.

Containerization planning references:

- roadmap item: [docs/roadmap.md](docs/roadmap.md) (`Sprint 0.3: Containerization Baseline`)
- sprint execution doc: [docs/sprints/sprint-0.3.md](docs/sprints/sprint-0.3.md)

CI Docker gate purpose (`Sprint 0.3 / Task 7`):

- CI runs a build-only `docker build` validation job on `push` and `pull_request`.
- This catches Dockerfile/runtime packaging regressions early without pushing images to any registry.

## Secret Hygiene

- Never commit `.env` or any secret-bearing file.
- Keep `.env.example` non-sensitive and use placeholders only.
- Rotate local passwords before any shared/demo environment use.
- Do not hardcode credentials or tokens in source code, tests, or docs.
- Runtime env validation fails fast when required keys are missing or invalid.

Prisma local connection string (`.env`, local only):

```bash
DATABASE_URL="postgresql://groundbreak:change_me_local_only@localhost:5432/groundbreak_dev?schema=public"
```

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

Database/Prisma commands:

```bash
npm run db:check
npm run db:generate
npm run db:migrate -- --name <migration_name>
npm run db:studio
```

Manual DB connectivity verification:

```bash
npm run db:check
```

The command uses Prisma to run a `SELECT 1` probe and prints actionable failure hints when connectivity fails.

DB health endpoint (app must be running):

```bash
curl http://localhost:3000/api/v1/health/db
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

- If `npm run db:check` fails with connectivity errors:

```bash
docker compose up -d postgres
docker compose ps
docker compose logs -f postgres
```

- If `npm run db:check` fails with authentication errors:
  - Verify `DATABASE_URL` in `.env`.
  - Verify `POSTGRES_USER` / `POSTGRES_PASSWORD` used by Docker.
  - Restart postgres after updating credentials.

- If `npm run db:check` reports database/server unreachable:
  - Ensure PostgreSQL is running on port `5432`.
  - Check for local port conflicts on `5432`.
  - Confirm migrations are applied (`npm run db:migrate -- --name <migration_name>`).

- If `/api/v1/health/db` returns `503`:
  - Check local DB status with `npm run db:check`.
  - Check `docker compose ps` and `docker compose logs -f postgres`.
  - Verify `.env` has valid `APP_ENV` and `DATABASE_URL`.

- Docker port conflicts (`3000` app, `5432` postgres):
  - Check current bindings: `docker ps`.
  - Override ports in `.env`:
    - `APP_PORT="3001"`
    - `POSTGRES_PORT="5433"`
  - Restart stack: `npm run docker:down` then `npm run docker:up`.

- Stale containers or networks:
  - Run `npm run docker:down`.
  - Remove orphan resources: `docker compose --profile app --profile postgres down --remove-orphans`.
  - Retry startup with `npm run docker:up`.

- Stale Postgres volume state (unexpected old data/schema):
  - Stop stack: `npm run docker:down`.
  - Remove local DB volume (destructive for local DB data):
    - `docker volume rm project-groundbreak_groundbreak_postgres_data`
  - Start fresh local DB: `npm run docker:up`.

- Build cache confusion (image not reflecting latest changes):
  - Rebuild without cache:
    - `docker compose --profile app --profile postgres build --no-cache app`
  - Restart: `npm run docker:up`.

- Env/config mismatch in container startup:
  - Validate `.env` contains `APP_ENV` and `DATABASE_URL` with PostgreSQL protocol.
  - For `app-only` profile, ensure `APP_DATABASE_URL` targets a reachable external DB host.
  - Inspect startup logs: `docker compose --profile app logs -f app`.

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
- Cloud activation gate policy: [docs/infra/cloud-activation-gate.md](docs/infra/cloud-activation-gate.md)
- Dissertation roadmap notes: [docs/dissertation-notes/roadmap-v1.md](docs/dissertation-notes/roadmap-v1.md)
- Contribution rules: [CONTRIBUTING.md](CONTRIBUTING.md)
