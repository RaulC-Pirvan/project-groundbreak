# Project Groundbreak

Probabilistic, explainable news-risk analysis platform for dissertation delivery.

## Project Overview

Project Groundbreak is a web-first, mobile-friendly system that analyzes news content and presents:

- `misinformation risk` (probability the content is false/misleading/unreliable)
- `AI-generated risk` (probability the content was AI-generated/heavily AI-assisted)

These two risks are separate by design and must never be merged.

The product goal is to support user judgment with transparent evidence, not declare absolute truth.

## Current Status

Current phase: `Phase 0 / Sprint 0.0` (GitHub & repository governance).

Implemented so far:

- roadmap baseline
- sprint 0.0 plan
- branching/governance policy docs

Not implemented yet:

- app scaffold (Next.js)
- backend/API endpoints
- ingestion and scoring pipelines

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
```

### Current runnable state

At this stage, the application runtime is not scaffolded yet (Sprint 0.1 pending).

You can still validate repository setup by reviewing:

- roadmap and sprint docs
- governance docs (`CONTRIBUTING.md`, `AGENTS.md`)

## Common Commands

Current commands (available now):

```bash
# show repo status
git status

# create/update feature branch from dev
git checkout dev
git pull origin dev
git checkout -b sprint-0.0-task-<id>
```

Planned app commands (after Sprint 0.1 scaffold):

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run test
```

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
- Dissertation roadmap notes: [docs/dissertation-notes/roadmap-v1.md](docs/dissertation-notes/roadmap-v1.md)
- Contribution rules: [CONTRIBUTING.md](CONTRIBUTING.md)
