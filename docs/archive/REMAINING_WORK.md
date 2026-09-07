# Remaining Work

Every route in the app, what it reads from today, and the work left to finish it. The backend architecture is complete and green; the remaining effort is almost entirely front-of-house.

|                                      | Count |
| ------------------------------------ | ----: |
| Routes on live data                  |    17 |
| Backend ready, screen still on mocks |     0 |
| Blocked on a product decision        |     0 |
| Backend controllers, all resolving   |    20 |

Both halves currently pass type-check, lint with zero warnings, and Prettier; the frontend also builds clean. The Nest container resolves every module. Nothing is committed — all of it is sitting in the working tree.

---

## The one thing that blocks shipping

### Buyers can now release their own money — but nothing proves it works

Payment confirmation creates a **held** escrow with an inspection window instead of completing the sale outright. The buyer-facing half now exists: `/dashboard/transactions` reads live through `usePurchases`, and `ReleaseEscrowModal` calls `PATCH /escrow/:id/release` via `useReleaseEscrow`. A completed purchase no longer waits on an admin.

What is left is proof on the backend. The buyer-facing half is now covered against a written checklist (`docs/MONEY_PATH.md`), but the authorisation rules that decide who may release a hold, and when, are enforced server-side and have no tests at all. That is the last thing standing between this and production.

---

## Route ledger

Thirty-one routes. **Live** reads from the API today; **Ready** means the endpoint exists and only the screen is left.

### Public & auth — 6 of 6 live

| Route             | State | Data source              |
| ----------------- | ----- | ------------------------ |
| `/`               | Live  | Server-rendered listings |
| `/listing/[id]`   | Live  | Server-rendered detail   |
| `/search`         | Live  | `/properties` + facets   |
| `/login`          | Live  | `/auth/login`            |
| `/signup`         | Live  | `/auth/register`         |
| `/reset-password` | Live  | `/auth/reset-password`   |

### Buyer — 5 of 9 live

| Route                     | State | Data source                                          |
| ------------------------- | ----- | ---------------------------------------------------- |
| `/dashboard`              | Live  | Connections, saved, unread                           |
| `/dashboard/saved`        | Live  | `/saved-properties`                                  |
| `/dashboard/offers/[id]`  | Live  | `/offers` + thread                                   |
| `/dashboard/settings`     | Live  | Profile + `/notifications/preferences`               |
| `/dashboard/transactions` | Live  | `/transactions/my/purchases` + `/escrow/:id/release` |
| `/dashboard/offers`       | Ready | Connections `.offers[]`                              |
| `/dashboard/messages`     | Ready | Connections + `/messages`                            |
| `/dashboard/viewings`     | Ready | Connections `.viewings[]`                            |
| `/dashboard/alerts`       | Ready | `/notifications`                                     |

### Agent — 4 of 8 live

| Route              | State | Data source                      |
| ------------------ | ----- | -------------------------------- |
| `/agent`           | Live  | Seller stats, connections, sales |
| `/agent/leads`     | Live  | `/connections/incoming`          |
| `/agent/listings`  | Live  | `/properties/seller/:id`         |
| `/agent/settings`  | Live  | `/users/me`                      |
| `/agent/pipeline`  | Live  | Connections + transactions       |
| `/agent/calendar`  | Live  | Connections `.viewings[]`        |
| `/agent/analytics` | Live  | `/stats/agent`                   |
| `/agent/concierge` | Live  | `/concierge/*`                   |

### Admin — 2 of 8 live

| Route                  | State | Data source                           |
| ---------------------- | ----- | ------------------------------------- |
| `/admin`               | Live  | Platform + user stats                 |
| `/admin/users`         | Live  | Directory + `/suspensions`            |
| `/admin/listings`      | Ready | `/flags` + `/properties/:id/moderate` |
| `/admin/verifications` | Ready | `/kyc` — screen needs reframing       |
| `/admin/payments`      | Ready | `/escrow` + `/escrow/stages`          |
| `/admin/transactions`  | Ready | `/transactions` + stages              |
| `/admin/reports`       | Ready | `/stats/regions`, `/stats/trend`      |
| `/admin/settings`      | Ready | `/settings` + `/audit-logs`           |

---

## Sequenced work

Ordered by dependency, not priority — each step needs the one above it to have landed.

### 01 · Push the schema — _done_

_One command · blocks phase 03._

Three new models — `Notification`, `NotificationPreference`, `PlatformSetting` — are written into `schema.prisma` and the client is generated, but nothing is in the database yet. Every notification and settings endpoint returns an error until `pnpm prisma:push` runs. The change is purely additive.

Pushed and verified against `pooled.db.prisma.io`. Two additive columns were added later for viewings (`mode`, `durationMinutes`) and pushed the same way.

### 02 · Build the client transport layer — _done_

_8 domains · unblocked all 13 screens._

- **Endpoints** in `config.api.*` for flags, kyc, suspensions, escrow, disputes, notifications, settings, audit-logs, plus `properties.moderate` and the admin `transactions.list` / `transactions.stages`
- **Zod schemas** in `lib/validations/` for each, over a shared `pageOf()` envelope in `lib/validations/pagination.ts`
- **Resource clients** in `lib/api/` and **query hooks** in `lib/hooks/` with keys for every domain
- **Enums** for flag, verification, dispute, escrow, notification, setting, audit and moderation values in `lib/enums/enums.ts`
- The three new stats calls — `regions`, `trend`, `agent`

### 03 · Wire the thirteen screens — _done_

_6 admin · 3 agent · 4 buyer._

Each follows the same transform already proven on the live consoles: server hook, adapter, error fallback, unchanged presentational children. Two carry extra scope:

- **Verifications** needs reframing from tier-upgrade requests to identity-document review, since the schema has no tier concept.
- **The buyer transaction screen does not exist yet** and must be created to carry escrow release.

### 04 · Repoint two live surfaces — _done_

- **Admin user suspension** now posts to `/suspensions` with reason, duration and notes, and reactivation lifts the recorded suspension through `PATCH /suspensions/:id/lift`. The old status-flip path (`useSetUserStatus`, `ACCOUNT_STATUS_BY_MANAGED`) is gone.
- **Buyer alert preferences** read and write `/notifications/preferences`. `AlertType` is now the backend `NotificationType`, so the settings screen covers all eight signals rather than a private set of six.

### 05 · Cover the money path with tests — _frontend done, backend open_

The buyer half is covered. `docs/MONEY_PATH.md` states the acceptance criteria for the escrow release flow, and 49 tests across four files encode them: the transaction→purchase mapping, the ranking, filtering and totalling logic, `useReleaseEscrow`, and `TransactionsConsole` end to end through a mocked API. Writing them found three defects — a release that could be fired twice, an in-flight release that could be hidden, and a failure the buyer was never told about. All three are fixed and guarded.

The backend half is untouched: it still has a single generated `Hello World` end-to-end stub. Funds move through a hold-and-release state machine with authorisation rules about who may release and when, and none of those rules is tested. That is what remains before this handles real money.

---

## Waiting on a decision

Four surfaces can't be finished by writing code — they need a decision about what the product actually does.

| Surface                           | Situation                                                                                                                                             | The ask                                        |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| **Agent concierge**               | VIP clients, a service catalogue and practice allocation. Nothing in the schema maps to it, and it isn't derivable from existing data.                | Define it, or drop the route.                  |
| **Service health**                | The uptime, error-rate and latency panel on the admin overview is infrastructure telemetry, not application data. No database can honestly answer it. | Point it at a real probe, or remove the panel. |
| **Saved searches & match scores** | The buyer budget and location fields removed earlier, plus the match score on saved homes. A real feature with no model behind it.                    | Worth a `SavedSearch` model?                   |
| **Membership tiers**              | Removed from the user directory as fabricated, but the reports rail still renders a tier breakdown from a frontend constant.                          | Model tiers, or finish removing them.          |

---

## Risks to weigh before deploying

### Escrow changes behaviour for in-flight transactions

Payment confirmation no longer completes a sale. Anything mid-purchase when this deploys will land in a state the old flow never produced, and the property moves to `PENDING` rather than `SOLD`. Check what is in flight first.

### No migration history

The project uses `prisma db push`, so there is no migration log and no scripted rollback. On a production database that means schema changes are one-way unless you take a backup first.

### Authentication was silently broken until this pass

Every authenticated endpoint was reading `user.sub` from a token payload that carries `id` — thirty-three call sites passing `undefined`. It is fixed, but it means the authenticated surface has effectively never run correctly end to end, and deserves a deliberate pass once the screens are wired.

### Aggregations are computed in memory

Region metrics, trend buckets and agent benchmarks read rows and reduce them in JavaScript rather than in SQL. Fine at current volume, and portable — but it is the first thing that will need moving into the database as transaction counts grow.
