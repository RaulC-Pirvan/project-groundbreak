# Project Groundbreak - Product & Engineering Roadmap (Updated)

---

## Roadmap Constraints (Active)

- Solo developer constraint: planning must tolerate variable weekly capacity.
- Budget constraint: prefer free-tier/low-cost AWS-first services; avoid unnecessary paid dependencies.
- Timeline constraint:
  - internal implementation completion target: May 2027
  - dissertation writing/revisions window: June-July 2027
  - exact official submission day is currently unknown
- Web-first delivery:
  - production-ready web app first
  - PWA first, then Capacitor wrapper for Android and iOS together
  - store release tasks can be deferred if paid prerequisites are not yet available
- Product constraint: users do not submit articles; content is ingested automatically from allowlisted sources.
- Scope constraint:
  - English-only MVP
  - global English news
  - initial allowlist: 10 sources
  - initial throughput target: approximately 100 articles/day
- Non-negotiable modeling constraint:
  - misinformation risk and AI-generated risk must remain separate in architecture, API, and UI
  - all outputs must be probabilistic and explainable

---

## Phase 0: Engineering + DevOps Foundation (Planned)

### Sprint 0.0: GitHub & Repository Governance

- [x] Create GitHub repository and set default branch (`master`)
- [x] Define branching strategy:
  - [x] short-lived feature branches
  - [x] pull-request-only merges to `master`
  - [x] no direct pushes to `master`
- [x] Enable branch protection for `master`:
  - [x] require PR review
  - [x] require passing CI checks
  - [x] block force-push and branch deletion
- [x] Add PR template (scope, testing, docs, security impact)
- [x] Add issue templates (bug, feature, research/documentation)
- [x] Add label taxonomy (`type:*`, `priority:*`, `area:*`, `risk:*`)
- [x] Add milestone naming convention aligned with roadmap phases
- [x] Create `README.md` baseline:
  - [x] project purpose
  - [x] architecture summary
  - [x] local setup
  - [x] scripts and workflows
  - [x] contribution workflow
- [x] Add `CONTRIBUTING.md` (branch/PR/commit expectations)
- [x] Add `CODEOWNERS` baseline (single-owner project)
- [x] Add initial changelog/release notes policy

---

### Sprint 0.1: Project & Tooling Setup

- [x] Initialize Next.js project (App Router, TypeScript strict)
- [x] Configure Tailwind CSS
- [x] Configure ESLint + Prettier
- [x] Configure Vitest (unit testing)
- [x] Configure Playwright (E2E baseline)
- [x] Add unit smoke test
- [x] Add E2E smoke test
- [x] Setup GitHub Actions CI:
  - [x] lint
  - [x] typecheck
  - [x] unit tests
  - [x] build
  - [x] e2e smoke tests
- [x] Establish package manager and lockfile policy
- [x] Add Husky hooks for local quality gates (`pre-commit` and `pre-push`)
- [x] Add README local setup instructions

---

### Sprint 0.2: Local Database Foundation (No-Spend Track)

- [x] Define environment strategy baseline (`dev`, `test`, `prod`)
- [x] Configure local PostgreSQL for development (Docker profile)
- [x] Configure Prisma + initial migration workflow
- [ ] Configure local secret workflow (`.env` + validation + no repo secrets)
- [ ] Verify app-to-db connectivity in development environment
- [ ] Add db health check path
- [ ] Document deferred cloud activation criteria and cost gate

---

### Sprint 0.3: Containerization Baseline (Docker)

- [ ] Create production-ready `Dockerfile` for Next.js app (multi-stage build)
- [ ] Create `docker-compose.yml` for local development
- [ ] Add local services profile for:
  - [ ] app
  - [ ] postgres (dev-only local DB option)
- [ ] Add `.dockerignore` and image-size optimization pass
- [ ] Add local run scripts (`docker compose up/down/logs`)
- [ ] Document Docker workflows and troubleshooting notes in README
- [ ] Add image build step in CI

---

### Sprint 0.4: DevOps Quality Gates (CI/CD)

- [ ] Enforce CI checks on pull requests:
  - [ ] lint
  - [ ] typecheck
  - [ ] unit tests
  - [ ] build
  - [ ] e2e smoke tests
- [ ] Add dependency vulnerability checks (`npm audit` baseline policy)
- [ ] Add secret scanning baseline in CI
- [ ] Add container image vulnerability scan baseline (for Docker images)
- [ ] Define branch protection policy for master branch
- [ ] Add release tagging/versioning policy notes

---

### Sprint 0.5: Observability Baseline (Grafana Learning Track)

- [ ] Add application health endpoint (`/api/v1/health`)
- [ ] Add structured logging standard for API/worker jobs
- [ ] Expose basic application metrics endpoint (`/metrics`)
- [ ] Setup local observability stack via Docker:
  - [ ] Prometheus (metrics scrape)
  - [ ] Grafana (dashboards)
- [ ] Create first dashboards:
  - [ ] API request rate
  - [ ] API latency (p50/p95)
  - [ ] error rate
  - [ ] ingestion/analysis job counts
- [ ] Add alert baseline definitions (error-rate and queue-failure thresholds)
- [ ] Document “how to read dashboards” for dissertation reuse

---

### Sprint 0.6: Documentation Foundation

- [ ] Create `docs/architecture.md` baseline
- [ ] Create `docs/backend.md` baseline
- [ ] Create `docs/mobile.md` baseline
- [ ] Create `docs/ml-pipeline.md` baseline
- [ ] Create `docs/fact-checking.md` baseline
- [ ] Create `docs/security.md` baseline threat model
- [ ] Create `docs/evaluation.md` baseline metrics plan
- [ ] Create first ADR entries in `docs/adr/`
- [ ] Create first dissertation note pack in `docs/dissertation-notes/`

---

### Sprint 0.7: AWS Activation (Deferred Until Budget Readiness)

- [ ] Finalize AWS environment strategy implementation (`dev`, `test`, `prod`)
- [ ] Setup AWS IAM least-privilege roles for app/runtime/ops
- [ ] Provision AWS RDS PostgreSQL (cost-gated execution)
- [ ] Configure AWS secret management (SSM Parameter Store standard first; Secrets Manager when needed)
- [ ] Verify app-to-db connectivity against AWS environment
- [ ] Add cloud runbook notes (provisioning, rollback, and cost controls)

---

## Phase 1: Domain Model & API Contract Baseline (Planned)

### Sprint 1.1: Core Data Model (Prisma)

- [ ] Design Prisma schema for:
  - [ ] `User`
  - [ ] `Role` / role bindings (`user`, `staff`, `admin`)
  - [ ] `Source` (allowlist + source metadata)
  - [ ] `Article` (headline, snippet, source URL, metadata)
  - [ ] `Analysis` (`p_text`, `p_ai`, `p_final`, status, explanations)
  - [ ] `FactCheckEvidence` (top matches + strength labels)
  - [ ] `Vote` (separate vote per score type)
  - [ ] `AuditLog`
- [ ] Define indices and constraints
- [ ] Add migration and schema documentation
- [ ] Add seed data for local development

---

### Sprint 1.2: API Contract v1 Skeleton

- [ ] Establish path-based versioning (`/api/v1/...`)
- [ ] Define unified success/error response envelopes
- [ ] Define async analysis status model (`queued`, `processing`, `completed`, `failed`)
- [ ] Create contract stubs for:
  - [ ] `GET /api/v1/feed`
  - [ ] `GET /api/v1/articles/:id`
  - [ ] `POST /api/v1/votes`
  - [ ] `GET /api/v1/me/votes`
- [ ] Publish API contract draft in `docs/backend.md`

---

## Phase 2: Ingestion Pipeline MVP (Planned)

### Sprint 2.1: Source Ingestion

- [ ] Implement source allowlist registry (initial 10 sources)
- [ ] Build RSS/API ingestion adapters
- [ ] Implement scheduling and retries
- [ ] Add connector health checks
- [ ] Add deduplication (canonical URL + fallback heuristics)
- [ ] Add malformed-source resilience tests

---

### Sprint 2.2: Content Normalization

- [ ] Normalize article payload to:
  - [ ] headline
  - [ ] snippet
  - [ ] source link
  - [ ] source metadata
  - [ ] ingestion timestamps
- [ ] Enforce data minimization (no full raw article storage by default)
- [ ] Add validation for ingest payloads
- [ ] Add unit tests for normalization and dedup logic

---

## Phase 3: Scoring Pipeline MVP (Planned)

### Sprint 3.1: Inference Orchestration (AWS Bedrock)

- [ ] Implement provider abstraction for model calls
- [ ] Implement AWS Bedrock integration
- [ ] Add safe timeout/retry/fallback policy
- [ ] Add prompt-injection-safe wrappers for untrusted text
- [ ] Add structured inference logging (without leaking sensitive internals)

---

### Sprint 3.2: Dual Score Generation

- [ ] Implement `p_text` pipeline (misinformation risk)
- [ ] Implement separate `p_ai` pipeline (AI-generated risk)
- [ ] Ensure technical and UX separation is enforced in contracts and schema
- [ ] Generate concise explanation bullets per score
- [ ] Add confidence/uncertainty messaging fields
- [ ] Add tests validating score separation

---

### Sprint 3.3: Interpretable Fusion

- [ ] Implement interpretable weighted fusion for misinformation `p_final`
- [ ] Exclude `p_ai` from `p_final` by design
- [ ] Implement missing-signal graceful degradation behavior
- [ ] Add fusion config docs + rationale
- [ ] Add unit tests for fusion and fallback behavior

---

## Phase 4: User-Facing Feed MVP (Planned)

### Sprint 4.1: Public Feed & Article Detail

- [ ] Build feed cards showing:
  - [ ] headline
  - [ ] source name
  - [ ] publish time
  - [ ] misinformation badge
  - [ ] AI-generated badge
  - [ ] explanation preview
- [ ] Build article detail with:
  - [ ] separate full explanations
  - [ ] source link
  - [ ] fact-check evidence block
  - [ ] confidence/uncertainty note
- [ ] Implement 5-level risk bands + numeric percentages
- [ ] Ensure mobile-first responsive behavior

---

### Sprint 4.2: UX Clarity & Accessibility Pass

- [ ] Apply neutral/caution color semantics (avoid truth-certainty visual language)
- [ ] Add loading and failure states for analysis status
- [ ] Add empty-state and no-evidence-state messaging
- [ ] Validate contrast and interaction accessibility
- [ ] Add E2E coverage for feed/detail critical flows

---

## Phase 5: Auth, Voting, and User History (Planned)

### Sprint 5.1: Authentication Baseline

- [ ] Implement NextAuth email/password authentication
- [ ] Protect voting/history/admin routes
- [ ] Implement session hardening defaults
- [ ] Add auth unit/integration tests

---

### Sprint 5.2: Voting & Personal History

- [ ] Implement separate vote actions for:
  - [ ] misinformation score
  - [ ] AI-generated score
- [ ] Store vote signals for analytics/evaluation only (no automatic retraining)
- [ ] Build personal voted-history page
- [ ] Add API/E2E tests for vote flows and history visibility

---

## Phase 6: Fact-Checking MVP (Planned)

### Sprint 6.1: Evidence Retrieval

- [ ] Integrate Google Fact Check Tools API
- [ ] Implement keyword-first (BM25-style) claim matching
- [ ] Return top 3 evidence matches when available
- [ ] Label each match as `strong`, `moderate`, or `weak`
- [ ] Implement explicit `No reliable fact-check evidence found` outcome
- [ ] Add unit/integration tests for evidence matching behavior

---

### Sprint 6.2: Evidence UX Integration

- [ ] Display evidence links in article detail
- [ ] Display match strength labels with clear microcopy
- [ ] Handle no-match case as normal (non-alarmist) result
- [ ] Add E2E coverage for evidence and no-evidence paths

---

## Phase 7: Staff/Admin Operations MVP (Planned)

### Sprint 7.1: Staff Moderation Console

- [ ] Build staff/admin access gates (RBAC)
- [ ] Implement source management panel
- [ ] Implement hide/unhide article controls
- [ ] Implement hide/unhide evidence controls
- [ ] Implement re-run analysis action
- [ ] Add moderation audit trail views

---

### Sprint 7.2: Operational Reliability Surfaces

- [ ] Add queue status visibility
- [ ] Add ingestion error visibility
- [ ] Add analysis failure visibility
- [ ] Add staff-safe remediation guidance in UI

---

## Phase 8: Security, Privacy, and Reliability Hardening (Planned)

### Sprint 8.1: API and App Security Controls

- [ ] Enforce strict Zod validation on write/sensitive endpoints
- [ ] Implement rate limiting and brute-force protections
- [ ] Add security headers and safe HTTP client policies
- [ ] Enforce outbound allowlist for external fetch operations
- [ ] Add dependency review baseline and update policy

---

### Sprint 8.2: Privacy and Retention

- [ ] Finalize snippet/log retention policy and implementation
- [ ] Minimize PII in logs and telemetry
- [ ] Document data lifecycle and storage rationale
- [ ] Validate deletion/minimization paths where applicable

---

## Phase 9: Evaluation, Calibration, and Reproducibility (Planned)

### Sprint 9.1: Evaluation Pipeline

- [ ] Build reproducible evaluation scripts
- [ ] Save fixed config snapshots for repeatable runs
- [ ] Maintain frozen benchmark dataset
- [ ] Track metrics:
  - [ ] AUROC
  - [ ] F1
  - [ ] precision
  - [ ] recall
  - [ ] Brier score
  - [ ] ECE
  - [ ] reliability diagrams
  - [ ] fact-check match quality metrics
  - [ ] p50/p95 latency
  - [ ] failure rates

---

### Sprint 9.2: Calibration & Reporting

- [ ] Implement calibration workflow (Platt/isotonic as appropriate)
- [ ] Compare calibrated vs uncalibrated performance
- [ ] Produce evaluation summary artifacts for dissertation reuse
- [ ] Document limitations, failure modes, and bias risks

---

## Phase 10: Mobile Wrapper & Release Candidate (Planned)

### Sprint 10.1: PWA Finalization

- [ ] Final PWA installability and offline-safe behavior checks
- [ ] Mobile viewport simplification pass for high-traffic screens
- [ ] Performance pass for mobile web interactions
- [ ] Cross-device E2E/manual validation baseline

---

### Sprint 10.2: Capacitor Wrapper (Android + iOS Together)

- [ ] Create Capacitor wrapper integration
- [ ] Validate Android build pipeline
- [ ] Validate iOS build pipeline
- [ ] Verify auth/session behavior inside wrapper
- [ ] Verify feed/detail/voting flows in wrapped app
- [ ] Produce wrapper limitations and store-readiness notes

---

## Phase 11: Final Stabilization and Submission Packaging (Planned)

### Sprint 11.1: Engineering Completion (Target: May 2027)

- [ ] Freeze feature scope (critical bugs only)
- [ ] Run regression suite and fix high-severity issues
- [ ] Final production readiness checklist
- [ ] Final architecture/security/evaluation doc sync

---

### Sprint 11.2: Dissertation Writing & Revisions (June-July 2027)

- [ ] Convert docs and notes into dissertation chapter drafts
- [ ] Generate final figures/tables from frozen evaluation outputs
- [ ] Integrate supervisor feedback revisions
- [ ] Finalize limitations, ethics, and future-work sections

---

## Core Principles (Do Not Break)

- Misinformation risk and AI-generated risk remain separate signals everywhere.
- Outputs are probabilistic risk estimates, not truth verdicts.
- Explainability is mandatory for user-facing scores.
- Evidence and source traceability take priority over opaque confidence.
- Security/privacy controls are part of the core architecture, not post-hoc.
- Scope discipline wins over overengineering.
- Every meaningful implementation includes tests and documentation in the same cycle.

