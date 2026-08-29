# Delivery Audit — Stage 10

Build and delivery, audited against `docs/from-idea-to-click.md` stage 10. Fourteen concepts, across both repositories.

Each finding carries its own **Status** — `Open` or `Fixed`. The status line on each finding is the record; this header makes no claim about the set.

**Verdict:** the stage asks how code on a laptop becomes a URL other people can visit, and this repository has no answer written down anywhere. Both halves build, CI now runs, and the git history is disciplined — but there is no deployment configuration of any kind, no environment separation, and local development is pointed at the production database. Six findings, one of them the most consequential thing found in any stage so far.

---

## What came back clean

| Concept             | Evidence                                                                                                                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Version control** | Conventional commits, a `development` branch off `master`, and a history that reads. Nineteen commits landed in this session alone, each scoped to one concern.                      |
| **CI**              | Closed under 09.1 — install, type-check, lint, format and test now run on every push and pull request in both repositories.                                                          |
| **Build artifact**  | `pnpm build` succeeds on both sides. The frontend produces a full route manifest with static and dynamic routes correctly split; the backend compiles to `dist/`.                    |
| **Configuration**   | On the backend only. `env.validation.ts` validates every variable with Zod at startup and fails immediately, and `.env.example` documents all of them — see 10.2 for the other half. |
| **Branching**       | Short-lived work on `development`, merged to `master`. The guide's preferred shape, not Git Flow.                                                                                    |

---

## 10.1 · Local development runs against the production database

> **Concept:** environments · **Severity:** the most consequential finding in the audit so far · **Status:** Open

There is one `DATABASE_URL` and it points at `pooled.db.prisma.io` — the live database, holding real users. Every developer, every test run that forgets to mock, and every `prisma` command typed in a terminal reaches production.

The guide states the rule without qualification:

> Local → preview → staging → production, each with its own database and configuration. **Never point a preview environment at the production database; it will be deleted eventually.**

This is not hypothetical here. Two days ago `prisma migrate deploy` was run against that database and `0001_money_is_decimal` rewrote the type of every money column in place, with no backup, because `pg_dump` is not installed on the machine. It succeeded. The next one may not.

The same absence produced the `0002` failure: a `prisma db push` from someone's terminal had already added `tokensValidFrom` to production, so the migration collided with a column it was meant to create, and the history had to be repaired by hand with `migrate resolve`.

**To close:** a second database for development, and `DATABASE_URL` in `.env` pointing at it. Production credentials belong in the deployment platform, not in a developer's shell. This is cheap on Prisma Postgres and removes an entire category of accident.

## 10.2 · The frontend has no environment contract

> **Concept:** configuration · **Severity:** a production misconfiguration would be silent · **Status:** Open

The backend does this properly. The frontend does not do it at all.

There is **no `.env.example`** in the frontend, and no validation anywhere. Seven `NEXT_PUBLIC_*` variables are read across four config files, and every one falls back silently:

```ts
process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";
process.env.NEXT_PUBLIC_STRIPE_KEY ?? "";
process.env.NEXT_PUBLIC_AUTH_PROVIDERS ?? "";
process.env.NEXT_PUBLIC_DEV_PASSWORD ?? "password123";
```

Deploy with `NEXT_PUBLIC_API_BASE_URL` unset and the build succeeds, the site loads, and every request goes to `localhost:5000` — which resolves to the _visitor's_ machine. The failure is silent, total, and looks like a backend outage.

`NEXT_PUBLIC_STRIPE_KEY ?? ""` is the same shape on the money path, and `NEXT_PUBLIC_DEV_PASSWORD` defaulting to `password123` is a development convenience with no guard rail around it.

The guide's line is exact: _"validated at startup so a missing one fails immediately rather than at 3am."_

**Partly closed by 12.4.** The frontend now has a `.env.example` documenting all eight variables, including the `NEXT_PUBLIC_SITE_URL` that work introduced. The silent fallbacks remain.

**To close the rest:** a validated config module that throws at build time when a required variable is missing. The backend's `env.validation.ts` is the pattern; it already exists in this codebase.

## 10.3 · `db:push` sits next to the migrations that replaced it

> **Concept:** migrations in production · **Severity:** proven, not theoretical · **Status:** Open

`package.json` offers both:

```
db:push    prisma db push
db:migrate prisma migrate dev
db:deploy  prisma migrate deploy
```

`db push` syncs the schema and writes nothing to `_prisma_migrations`. Since stage 04 made migrations the mechanism, it is a foot-gun sitting in the same list as the correct commands, one letter away from `db:deploy`.

It has already fired. `tokensValidFrom` reached production through a push, which is why `0002_token_revocation` failed with `column already exists` and blocked every later migration until the history was repaired by hand.

**To close:** delete `db:push`, or rename it to something that reads as dangerous. With migrations in place it has no remaining legitimate use against a shared database.

## 10.4 · Nothing describes where any of this is deployed

> **Concept:** serverless & managed platforms · containers · infrastructure as code · **Severity:** the stage's central question is unanswered · **Status:** Open

No `Dockerfile`, no `.dockerignore`, no `vercel.json`, no `Procfile`, no Fly, Render, Railway or Nixpacks configuration, no Terraform or Pulumi. Neither repository contains a single file describing where it runs.

Both halves build, so an artifact exists — but nothing states what happens to it. The knowledge is in someone's head or in a dashboard, which the guide identifies as the problem infrastructure-as-code exists to solve: _"reviewable, repeatable, and recoverable."_

The frontend is a Next app and its natural home is a managed platform; the backend is a long-running Nest server that needs a container or a platform that speaks Node. Neither choice is recorded, so neither can be reviewed.

**To close:** decide, then commit the file — a `vercel.json` or a `Dockerfile` is a small artifact that answers a large question. An ADR alongside it recording why that platform, since it is expensive to reverse.

## 10.5 · No rollback, and the one recovery path is untested

> **Concept:** rollback · deployment strategies · **Severity:** the plan is "fix forward under pressure" · **Status:** Open

The guide's test: _"If your answer is 'fix forward under pressure at midnight', you do not have one."_ That is the answer here, on both axes.

**Application.** No deployment strategy — no blue-green, no canary, no rolling. With 10.4 unanswered there is no described way to roll back to a previous artifact, and no tags exist in either repository to identify what a previous artifact would be.

**Database.** Prisma migrations have no down-migrations by design, so recovery is restore-from-backup. `scripts/restore.ts` exists and is well written, but it shells out to `pg_restore`, and the PostgreSQL client tools are not installed on the machine that would run it. The backup half has never produced a file for the same reason. Stage 04 closed the backups finding on the strength of a written procedure; the procedure has never been executed.

**To close:** tag releases so there is something to roll back _to_, and run the backup and restore drill once, end to end, against the development database that 10.1 asks for. A restore you have never performed is the same rumour a backup you have never taken is.

## 10.6 · Deploying and releasing are the same act

> **Concept:** feature flags · CD · **Severity:** low now, structural later · **Status:** Open

No feature-flag mechanism of any kind. Every merge that reaches production is live for every user the moment it lands, so shipping anything incomplete means a branch that ages, and turning something off means a revert and a redeploy.

CI now runs (09.1) but stops at green — nothing deploys, so there is no CD half yet.

This is the mildest finding here and the guide agrees it can wait; it is recorded because the two escrow-adjacent flows now in the codebase are exactly the kind that want to ship dark before they ship live.

---

## What this stage did not cover

Observability, uptime and alerting are stage 11. `service-health` exists in the backend and reports which integrations are configured, which is the beginning of that story rather than this one.
