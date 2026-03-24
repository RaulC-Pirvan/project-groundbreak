# Dissertation Notes - Roadmap v1

## Context

The project started from a greenfield state with strict constraints:

- solo developer capacity
- low budget
- mandatory documentation
- requirement to keep misinformation risk and AI-generated risk technically separate

Given these constraints, roadmap design prioritized explainability, maintainability, and measurable delivery over early complexity.

## Design Decision

Adopt a milestone-based roadmap (M0-M9) from April 2026 through July 2027 with:

- AWS-first infrastructure choices (Amplify, RDS PostgreSQL, Bedrock)
- staged capability growth (ingestion -> scoring -> UX -> auth/voting -> fact-checking -> calibration/evaluation -> hardening)
- implementation completion target by May 2027
- a dedicated June-July documentation and revision window

## Rationale

- Milestone planning is more resilient than rigid weekly sprint cadence for variable developer availability.
- Early feature freeze and dedicated buffer reduce final-stage schedule risk.
- Explicit evaluation and calibration phase improves academic defensibility.
- Continuous documentation requirements support dissertation writing traceability.

## Trade-offs

- Slower introduction of advanced features in exchange for higher delivery confidence.
- API-based inference first (Bedrock) increases vendor dependence but significantly lowers operational complexity.
- Fact-checking starts with keyword-first matching for speed and explainability, delaying embedding sophistication.

## Implementation Summary

- Core roadmap captured in `docs/roadmap.md`
- Milestones defined with objectives, deliverables, and exit criteria
- Cross-cutting governance established for security, testing, observability, and cost control

## Evaluation Approach

Roadmap success will be monitored through:

- milestone exit criteria completion
- reproducible evaluation artifacts
- calibration and performance metrics
- defect rate and regression trend through stabilization

## Limitations

- Official submission day is still unknown and should be inserted once confirmed.
- External data-source and API policy changes can affect schedule predictability.
- Final model quality depends on the quality and volume of evaluation data available during project execution.
