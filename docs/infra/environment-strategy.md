# Environment Strategy Baseline (`dev`, `test`, `prod`)

Status: Active baseline (Sprint 0.2 Task 1)  
Last updated: 2026-03-26

## Purpose

Define clear environment boundaries so development stays reproducible, secure, and no-spend until cloud activation is explicitly approved.

## Environment Matrix

| Environment | Primary Purpose | Data Policy | Database Approach | Secret Source |
| --- | --- | --- | --- | --- |
| `dev` | Local developer workflows and rapid iteration | Local-only development data; no sensitive production data | Local PostgreSQL container (Docker profile) | Local `.env` (never committed) |
| `test` | Automated test execution and CI validation | Disposable test data; deterministic seed/factory data | Isolated test DB (local or CI service container) | Local/CI environment variables (never committed) |
| `prod` | User-facing deployment with stricter controls | Production data minimization policy applies; least-privilege access | Deferred to AWS activation sprint (`RDS PostgreSQL`) | Deferred to AWS secret store activation |

## Access Boundaries

- `dev` is limited to local workstation workflows.
- `test` is limited to automated pipelines and controlled local validation.
- `prod` access is restricted and remains unprovisioned during the no-spend track.

## Naming Baseline

- Application environment variable: `APP_ENV` with values `dev`, `test`, `prod`.
- Suggested database names:
  - `groundbreak_dev`
  - `groundbreak_test`
  - `groundbreak_prod` (reserved for cloud activation stage)
- Keep environment-specific config isolated by file/variable naming (`*.dev`, `*.test`, `*.prod` patterns where applicable).

## Guardrails (Non-Negotiable)

- Do not reuse one database instance across `dev` and `test`.
- Do not store secrets in repository files, issue text, or commit history.
- Do not hardcode environment-specific credentials in code.
- Do not provision paid AWS resources until cloud activation cost gate is approved.
- Do not run manual schema edits directly against future production databases; use migration workflow only.

## Promotion and Change Discipline

- Changes are developed in `dev`, validated in `test`, and only then promoted toward `prod`.
- Configuration changes must be documented in the same PR as the implementation change.
- Any environment policy exception must be documented with reason, scope, and rollback plan.

## Deferred Cloud Activation Note

`prod` environment implementation is intentionally deferred to Sprint `0.7` (AWS activation).  
Current sprint focus remains local development reliability with zero paid cloud spend.

Cloud activation is governed by: `docs/infra/cloud-activation-gate.md`.
