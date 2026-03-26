# Sprint 0.2 - Local Database Foundation (No-Spend Track)

Status: Planned  
Owner: Solo developer  
Goal: Establish a no-spend local database baseline with Prisma migration workflow, safe local secrets handling, and database health verification.

## Scope

This sprint covers:

- environment strategy baseline (`dev`, `test`, `prod`)
- local PostgreSQL setup for development via Docker profile
- Prisma setup and initial migration workflow
- local secret workflow (`.env` + validation + no repo secrets)
- app-to-db connectivity verification in local development
- database health check endpoint
- documentation for deferred AWS activation and cost gate criteria

This sprint does not provision paid AWS resources.

---

## Prerequisites

- Sprint 0.1 merged into `dev`
- Node.js 20+ and npm 10+
- Docker Desktop (or equivalent Docker runtime) installed

---

## Task 1 - Define Environment Strategy Baseline (`dev`, `test`, `prod`)

Checklist:

- [x] Define environment strategy baseline (`dev`, `test`, `prod`)

Step-by-step:

1. Define environment purpose and data policy:
   - `dev`: local developer workflows and rapid iteration
   - `test`: automated test execution and CI validation
   - `prod`: deployment target with stricter controls
2. Document per-environment database approach:
   - `dev`: local PostgreSQL container
   - `test`: isolated test database (local or CI service container)
   - `prod`: deferred to AWS activation sprint
3. Document per-environment secret source:
   - `dev`/`test`: local `.env` (never committed)
   - `prod`: deferred to AWS secret store activation
4. Record environment-specific guardrails (access boundaries, naming, and prohibited shortcuts).

Done when:

- environment strategy is written and versioned in docs
- `dev`, `test`, and `prod` responsibilities are explicit
- no environment uses ambiguous secret handling rules

---

## Task 2 - Configure Local PostgreSQL for Development (Docker Profile)

Checklist:

- [ ] Configure local PostgreSQL for development (Docker profile)

Step-by-step:

1. Create or update Docker Compose configuration to include a `postgres` service for local development.
2. Use a named volume for persistent local data.
3. Define baseline connection environment variables:
   - `POSTGRES_DB`
   - `POSTGRES_USER`
   - `POSTGRES_PASSWORD`
4. Expose PostgreSQL port on localhost for app connectivity.
5. Add simple local commands to start/stop/view logs:

```bash
docker compose up -d postgres
docker compose logs -f postgres
docker compose down
```

Done when:

- local PostgreSQL boots successfully
- database remains available across container restarts
- startup and shutdown commands are documented

---

## Task 3 - Configure Prisma + Initial Migration Workflow

Checklist:

- [ ] Configure Prisma + initial migration workflow

Step-by-step:

1. Add Prisma dependencies:

```bash
npm install -D prisma
npm install @prisma/client
```

2. Initialize Prisma configuration:

```bash
npx prisma init
```

3. Set `DATABASE_URL` for local PostgreSQL in `.env` (or local env file strategy adopted in this sprint).
4. Add initial schema baseline in `prisma/schema.prisma`.
5. Generate the initial migration:

```bash
npx prisma migrate dev --name init
```

6. Add npm scripts for repeatable workflow:
   - `db:migrate`
   - `db:generate`
   - `db:studio` (optional)

Done when:

- Prisma client generation works locally
- initial migration is created and applies successfully
- migration workflow commands are documented and repeatable

---

## Task 4 - Configure Local Secret Workflow (`.env` + Validation + No Repo Secrets)

Checklist:

- [ ] Configure local secret workflow (`.env` + validation + no repo secrets)

Step-by-step:

1. Create or update `.env.example` with required variables and non-sensitive placeholders.
2. Confirm `.env` is gitignored and never committed.
3. Add runtime environment validation (for example with Zod) for required variables such as:
   - `DATABASE_URL`
   - app runtime settings needed by this phase
4. Fail fast on boot/test when required variables are missing or invalid.
5. Document secret hygiene rules in README and/or security docs.

Done when:

- required environment variables are validated on startup
- contributors can create local `.env` safely from `.env.example`
- repository contains no hardcoded secrets

---

## Task 5 - Verify App-to-DB Connectivity in Development Environment

Checklist:

- [ ] Verify app-to-db connectivity in development environment

Step-by-step:

1. Add a minimal DB connectivity probe path or utility (`SELECT 1` style check).
2. Wire probe through Prisma client.
3. Add an npm command for manual local verification (for example `npm run db:check`).
4. Run the check after PostgreSQL and migrations are applied.
5. Capture troubleshooting notes for common failures (port conflict, wrong credentials, container not running).

Done when:

- connectivity check passes reliably on local development setup
- failure states are visible and actionable
- verification steps are documented

---

## Task 6 - Add DB Health Check Path

Checklist:

- [ ] Add db health check path

Step-by-step:

1. Add API path for database health (for example `/api/v1/health/db`).
2. Return structured JSON with:
   - service status (`ok`/`degraded`)
   - timestamp
   - safe diagnostic message (no secret leakage)
3. Keep timeouts bounded so health calls do not hang.
4. Ensure health response semantics are consistent with future observability work.
5. Add tests for healthy and failure scenarios.

Done when:

- health endpoint reports DB status correctly
- endpoint avoids leaking sensitive internals
- tests cover success and failure paths

---

## Task 7 - Document Deferred Cloud Activation Criteria and Cost Gate

Checklist:

- [ ] Document deferred cloud activation criteria and cost gate

Step-by-step:

1. Document that AWS provisioning is deferred in no-spend mode.
2. Define explicit gate criteria for starting cloud activation, such as:
   - budget approval and monthly spend cap
   - billing alerts configured
   - owner confirms switch from no-spend to paid/credit-backed mode
3. Define first cloud activation targets:
   - IAM least-privilege roles
   - RDS PostgreSQL provisioning path
   - AWS secret store integration
4. Document rollback/defer rule if estimated monthly cost exceeds threshold.
5. Link this policy from roadmap and sprint docs.

Done when:

- cloud activation gate criteria are clear and documented
- deferred AWS scope is traceable in project planning artifacts
- no-spend policy is enforceable for current phase

---

## Suggested Execution Order

1. Task 1
2. Task 2
3. Task 3
4. Task 4
5. Task 5
6. Task 6
7. Task 7

---

## Sprint 0.2 Exit Criteria

- Environment strategy for `dev`/`test`/`prod` is documented.
- Local PostgreSQL development workflow is running through Docker.
- Prisma is integrated with an initial migration workflow.
- Local secret handling is validated and safe by default.
- App-to-db connectivity is verified in local development.
- DB health check path exists and is tested.
- Deferred AWS activation criteria and cost gate are documented.
