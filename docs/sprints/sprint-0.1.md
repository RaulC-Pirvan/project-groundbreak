# Sprint 0.1 - Project & Tooling Setup

Status: Planned  
Owner: Solo developer  
Goal: Establish a runnable Next.js baseline with strict tooling, test scaffolding, and CI quality gates.

## Scope

This sprint covers:

- Next.js project scaffold (App Router + TypeScript strict)
- Tailwind CSS setup
- ESLint + Prettier baseline
- Vitest and Playwright baseline tests
- GitHub Actions CI with required checks
- package manager + lockfile policy
- README local setup updates

This sprint does not cover product features.

---

## Prerequisites

- Sprint 0.0 merged into `dev`
- Node.js 20+ and npm 10+
- GitHub repository with Actions enabled

---

## Task 1 - Initialize Next.js Project (App Router, TypeScript strict)

Checklist:

- [x] Initialize Next.js project (App Router, TypeScript strict)

Step-by-step:

1. From repo root, create app scaffold:

```bash
npx create-next-app@latest . --typescript --app --eslint --src-dir --import-alias "@/*"
```

2. Ensure TypeScript strict mode is enabled in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

3. Verify app starts:

```bash
npm run dev
```

Done when:

- Next.js app runs locally
- `strict: true` is set

---

## Task 2 - Configure Tailwind CSS

Checklist:

- [x] Configure Tailwind CSS

Step-by-step:

1. If not auto-configured by create-next-app, install Tailwind dependencies.
2. Ensure Tailwind config points to `src/**/*.{js,ts,jsx,tsx,mdx}` and app paths.
3. Ensure global stylesheet imports Tailwind layers.
4. Add one visible Tailwind class in homepage to confirm pipeline works.

Done when:

- Tailwind classes render in local app

---

## Task 3 - Configure ESLint + Prettier

Checklist:

- [x] Configure ESLint + Prettier

Step-by-step:

1. Add Prettier and related config packages.
2. Create `.prettierrc` and `.prettierignore`.
3. Add ESLint config compatible with Next.js + TypeScript.
4. Add scripts:

```json
{
  "scripts": {
    "lint": "next lint",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

5. Run lint + format check.

Done when:

- `npm run lint` passes
- `npm run format:check` passes

---

## Task 4 - Configure Vitest (Unit Testing)

Checklist:

- [x] Configure Vitest (unit testing)

Step-by-step:

1. Install `vitest`, `@vitest/coverage-v8`, and testing helpers as needed.
2. Create `vitest.config.ts`.
3. Add scripts:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

4. Create `tests/unit/` directory structure.

Done when:

- `npm run test` executes successfully (even with minimal tests)

---

## Task 5 - Configure Playwright (E2E Baseline)

Checklist:

- [x] Configure Playwright (E2E baseline)

Step-by-step:

1. Install Playwright:

```bash
npx playwright install
```

2. Initialize Playwright config for Next.js app.
3. Set E2E test directory (for example `tests/e2e`).
4. Add script:

```json
{
  "scripts": {
    "test:e2e": "playwright test"
  }
}
```

Done when:

- Playwright command runs locally

---

## Task 6 - Add Unit Smoke Test

Checklist:

- [x] Add unit smoke test

Step-by-step:

1. Create `tests/unit/smoke.test.ts`.
2. Add a simple passing test (for example string/math assertion).
3. Run `npm run test`.

Done when:

- one unit smoke test passes in CI and local

---

## Task 7 - Add E2E Smoke Test

Checklist:

- [ ] Add E2E smoke test

Step-by-step:

1. Create `tests/e2e/smoke.spec.ts`.
2. Add test: open home page and assert a known heading/text is visible.
3. Run `npm run test:e2e`.

Done when:

- one E2E smoke test passes in local run

---

## Task 8 - Setup GitHub Actions CI

Checklist:

- [ ] Setup GitHub Actions CI:
  - [ ] lint
  - [ ] typecheck
  - [ ] unit tests
  - [ ] build
  - [ ] e2e smoke tests

Step-by-step:

1. Create `.github/workflows/ci.yml`.
2. Trigger on `pull_request` and `push` to `dev`/`master`.
3. Add job steps:
   - setup Node.js
   - install dependencies (`npm ci`)
   - run `npm run lint`
   - run `npm run typecheck`
   - run `npm run test`
   - run `npm run build`
   - run `npm run test:e2e`
4. Cache npm dependencies in workflow for speed.
5. Ensure branch protection rules reference the CI checks.

Done when:

- PRs show all required CI checks and pass/fail correctly

---

## Task 9 - Establish Package Manager and Lockfile Policy

Checklist:

- [ ] Establish package manager and lockfile policy

Step-by-step:

1. Adopt npm as the single package manager.
2. Commit `package-lock.json`.
3. Do not commit `yarn.lock` or `pnpm-lock.yaml`.
4. Add policy note to `CONTRIBUTING.md`.
5. Add optional CI guard step to fail if multiple lockfiles are present.

Done when:

- repository contains only `package-lock.json` as lockfile
- policy is documented

---

## Task 10 - Add README Local Setup Instructions

Checklist:

- [ ] Add README local setup instructions

Step-by-step:

1. Update `README.md` with app setup commands:

```bash
npm ci
npm run dev
```

2. Add testing commands:

```bash
npm run lint
npm run typecheck
npm run test
npm run test:e2e
```

3. Add expected local URL and troubleshooting notes.

Done when:

- a new collaborator can run app + checks from README only

---

## Suggested Execution Order

1. Task 1
2. Task 2
3. Task 3
4. Task 4 + Task 6
5. Task 5 + Task 7
6. Task 9
7. Task 8
8. Task 10

---

## Sprint 0.1 Exit Criteria

- Next.js app boots locally.
- Tailwind, ESLint, and Prettier are active.
- Unit and E2E smoke tests exist and pass.
- CI enforces lint, typecheck, test, build, and E2E smoke checks.
- npm lockfile policy is documented and applied.
- README setup instructions are complete and runnable.
