# Quality Audit — Stage 09

Quality engineering, audited against `docs/from-idea-to-click.md` stage 09. Ten concepts, across both halves.

Each finding carries its own **Status** — `Open` or `Fixed`. The status line on each finding is the record; this header makes no claim about the set.

**Verdict:** the cheap half is done well and the expensive half does not exist. Types and lint — the guide's stated first priority — are strict and clean on both sides, and 234 unit tests now exist where there were none a week ago. But nothing runs them except a person choosing to, the one commit-time gate is switched off, `pnpm test:e2e` cannot resolve its own imports, and there is not a single test that exercises a route through its guards. Six findings.

---

## What came back clean

| Concept                  | Evidence                                                                                                                                                                                   |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Static analysis**      | `pnpm type-check` and `pnpm lint` both clean on both halves, under `strict` and a zero-warning policy. The guide calls this the cheapest test you will ever run, and it is fully in place. |
| **Linting & formatting** | Prettier owns formatting outright; `lint-staged` is configured for `ts/tsx/js/jsx` and `json/md/css`. Style is never a review comment.                                                     |
| **Unit tests**           | 234 of them — 64 backend across 8 suites, 170 frontend across 17. Named after the criteria they prove, not the functions they call.                                                        |
| **Test doubles**         | External services are stubbed at the right boundary: SendGrid, Stripe, Cloudinary and Twilio are mocked; nothing reaches a third party from a test.                                        |

The money path deserves specific credit. `MONEY_PATH.md` numbered its criteria before the tests existed, and the tests are named after those numbers — `7.4 refuses the seller while the window is still open` reads as the rule it defends. That is the discipline the stage is asking for.

---

## 09.1 · Nothing runs outside a laptop

> **Concept:** the whole stage · **Severity:** the finding that makes the other five matter · **Status:** Fixed

There is no CI. No `.github/workflows` in either repository or at the workspace root, no GitLab, Circle, Travis or Azure configuration, no pipeline of any kind.

234 tests, two type-checkers and two linters exist, and **not one of them runs unless a person remembers to type the command.** A change can be committed and pushed with the suite red and nothing will say so.

The guide opens the stage with the reason this matters:

> Tests are not about proving code correct. They are about changing code six months later without fear.

Fear is only removed by a gate that runs without being asked. A suite that runs when you remember protects you exactly on the days you are not worried — which are not the days you break things.

**Fixed.** `.github/workflows/ci.yml` exists in both repositories and runs install, type-check, lint, format and test on every push to `master` or `development` and on every pull request. The frontend workflow now builds before testing, which both catches a broken build and gives 09.6 something to measure.

## 09.2 · The one gate that exists is switched off

> **Concept:** static analysis · **Severity:** a deliberate disabling nobody reversed · **Status:** Fixed

The guide names this itself, in its own "in your repo" note, and it is still true:

> husky and lint-staged are installed and configured, but the hook file sits at `.husky/pre-commit.disabled`, so nothing currently runs at commit time.

Two things make it worse than the guide implies. First, the hook is **frontend-only** — `backend/` has no `.husky` directory at all, so even restored it would gate half the system. Second, the hook does not run tests:

```sh
1️⃣  TypeScript type check...
2️⃣  ESLint validation...
3️⃣  Formatting staged files...
```

Type-check, lint, format. The suite is not in it. Restoring the file gets back a static-analysis gate, not a correctness one.

**Fixed, with one deliberate deviation.** `.husky/pre-commit.disabled` is `.husky/pre-commit` again, running type-check, lint and lint-staged.

I did **not** add `pnpm test` to it. That instruction and "keep the hook fast" were in tension, and now that CI runs the suite on every push the hook should stay a fast local filter rather than a second slow gate. The backend has no hook because it has no `husky` — installing one is a dependency decision that belongs to you, not to this fix.

## 09.3 · The pyramid has no middle, and the guards are never tested

> **Concept:** integration tests · the testing pyramid · test doubles · **Severity:** a whole tier missing · **Status:** Open

The pyramid is meant to be many unit, some integration, few end-to-end. This one is **234 unit, zero integration, zero end-to-end.**

That gap has a specific and current consequence. Every authorisation test written for 08.1 and stage 05 mocks the repository and calls the service method directly:

```ts
await expect(service.getOne("off_1", STRANGER, UserRole.BUYER)).rejects.toThrow(
    ForbiddenException,
);
```

That proves the rule. It does not prove the rule is **reachable**. Nothing tests that `OffersController.getOne` actually passes `@CurrentUser()` into it. Delete that decorator and `actorId` becomes `undefined`, the participant check fails closed for everyone — and all 64 backend tests still pass. The wiring between guard, decorator and service is exactly what unit tests structurally cannot see, and it is the wiring that carries the access-control fix.

There is a second, milder version of the guide's warning here: _"Mock the payment provider, not your own database."_ Every repo is mocked in every test. That is a defensible unit-test choice, but it means no test has ever seen the schema, a real `where` clause, or a Prisma error.

**To close:** integration tests against a test database for the money path first — `PATCH /escrow/:id/release` and the three read routes from 08.1, issued through the real guard stack with real tokens. That is where the highest-consequence rules live and where unit tests cannot follow.

## 09.4 · `pnpm test:e2e` cannot resolve its own imports

> **Concept:** integration tests · **Severity:** a script that has never worked · **Status:** Fixed

The script exists and is broken:

```
Cannot find module '@common/repos/repo.module' from '../src/app.module.ts'
Test Suites: 1 failed, 1 total
Tests:       0 total
```

`test/jest-e2e.json` carries no `moduleNameMapper`, so none of the `@common/*`, `@modules/*`, `@core/*` or `@generated/*` aliases resolve. It has been dead since path aliases were introduced — the same gap the unit config had until it was fixed for the money-path work.

The test it would run is the untouched Nest scaffold asserting that `GET /` returns `Hello World!`.

**Fixed — `pnpm test:e2e` now passes.** Originally recorded as partially closed: `jest-e2e.json` now carries the unit config's `moduleNameMapper`, plus two entries the unit config needed as well: a stripper for Prisma 7's ESM `.js` specifiers, and a mapping for bare `src/...` imports.

With resolution fixed the suite reaches a real failure rather than a resolution error. `validateEnv` rejects the developer's partially configured SendGrid block, and past that, booting `AppModule` calls `PrismaService.$connect` — which today points at production. **A full-app e2e suite cannot honestly run until 10.1 provides a non-production database**, so the remainder is blocked behind that finding and 09.3, not behind this one.

## 09.5 · No end-to-end tests and no automated accessibility checks

> **Concept:** end-to-end tests · accessibility & visual testing · **Severity:** absent by decision or by drift, unrecorded · **Status:** Open

No Playwright, no Cypress, no `axe`. The guide asks for restraint here rather than volume — _"three or four end-to-end tests on the flows that would be an emergency"_ — and names the candidates: sign up, search, submit an offer. For this product the fourth is releasing escrow.

The accessibility half connects back to stage 02, which audited a11y by grep and found the markup genuinely good. Nothing holds that in place. `axe` in a component test would catch roughly a third of regressions automatically, and it is the third that arrives silently.

**To close:** four Playwright specs, no more. `axe` wired into the existing Vitest setup for the console components.

## 09.6 · No performance budget, though the pattern is already understood

> **Concept:** performance budgets · **Severity:** the one concept with a working example and no application · **Status:** Fixed

There is no bundle-size ceiling, no load-time budget, nothing enforced anywhere.

What makes this worth writing down rather than dismissing is that the technique is **already in the repository and working**. `styles/responsive-budget.test.ts` asserts a hard ceiling on inline responsive utility chains and fails when the count rises:

```
AssertionError: expected 118 to be less than or equal to 115
```

That is a performance budget in every respect except its subject. The same shape applied to `.next` bundle output would make page weight degrade visibly instead of quietly — which is the guide's entire argument for budgets.

**Fixed.** `styles/bundle-budget.test.ts` totals every `.js` file under `.next/static/chunks` and holds it under 4200 KB, seeded against today's 3713 KB. It follows the responsive-budget shape, and skips rather than fails when no build is present, so a bare `pnpm test` locally stays green. CI builds before testing, so the budget is enforced there.

---

## What this stage did not cover

Code review is a process concept with no repository artifact to audit — there is no `CODEOWNERS`, no PR template, and no way to tell from the tree whether review happens. Recorded, not scored.
