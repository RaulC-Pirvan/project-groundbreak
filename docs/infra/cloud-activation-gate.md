# Cloud Activation Criteria and Cost Gate

Status: Active baseline (Sprint 0.2 Task 7)  
Last updated: 2026-03-26

## Purpose

Define enforceable rules for when AWS provisioning can start, and keep the current phase in a strict no-spend mode until those rules are satisfied.

## Current Mode

- Mode: `no-spend`
- Effective monthly cloud spend cap: `0 USD`
- AWS provisioning status: deferred

No paid AWS resources may be provisioned while the spend cap remains `0 USD`.

## Activation Gate Criteria (All Required)

| Gate ID | Requirement | Required Evidence |
| --- | --- | --- |
| G1 | Budget approval and hard monthly spend cap are set | A committed policy update in this file with a numeric cap value (`> 0 USD`) and approval date |
| G2 | Billing alerts are configured | AWS Budget alert thresholds at 50%, 80%, and 100% of the monthly cap with owner email notifications |
| G3 | Explicit mode switch approval | Owner confirms switch from `no-spend` to `paid/credit-backed` mode in sprint issue/PR |
| G4 | Initial cloud scope is limited and named | Sprint plan lists only first activation targets (IAM baseline, RDS provisioning path, secret store integration) |
| G5 | Rollback/defer criteria are acknowledged | Sprint issue/PR includes acceptance of defer and rollback rules defined in this document |

## First Cloud Activation Targets

When the gate is opened, execute this scope only:

1. IAM least-privilege role and policy baseline (app/runtime/ops).
2. RDS PostgreSQL provisioning path for target environment.
3. Secret management integration path (SSM Parameter Store standard first; Secrets Manager when justified).

Do not expand to non-essential services before verifying post-activation cost behavior.

## Cost Estimation Rule

Before opening the gate, produce a short monthly estimate using current AWS pricing inputs for the planned activation scope.

Minimum estimate items:

- RDS instance class and hours/month
- storage and backup assumptions
- secret store assumptions (SSM/Secrets Manager)
- expected network/data transfer assumptions relevant to selected services

If estimated monthly cost exceeds the approved cap, activation is deferred.

## Defer and Rollback Rules

- Pre-activation defer:
  - if estimated monthly cost is above cap, do not provision resources; remain in local no-spend mode.
- Post-activation expansion freeze:
  - if actual spend reaches 80% of monthly cap before month-end, freeze new cloud resource creation.
- Hard stop condition:
  - if spend reaches 100% of monthly cap, deprovision non-critical resources within 24 hours and revert active development to local no-spend path.

## Traceability

This policy is linked from:

- `docs/infra/environment-strategy.md`
- `docs/sprints/sprint-0.2.md`
- `docs/roadmap.md`
- `README.md`
