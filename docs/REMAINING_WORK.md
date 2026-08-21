# Remaining Work

Every route in the app, what it reads from today, and the work left to finish it. The backend architecture is complete and green; the remaining effort is almost entirely front-of-house.

|                                      | Count |
| ------------------------------------ | ----: |
| Routes on live data                  |    16 |
| Backend ready, screen still on mocks |    13 |
| Blocked on a product decision        |     1 |
| Backend controllers, all resolving   |    20 |

Both halves currently pass type-check, lint with zero warnings, and Prettier; the frontend also builds clean. The Nest container resolves every module. Nothing is committed — all of it is sitting in the working tree.

---

## The one thing that blocks shipping

### Buyers can pay, but nothing can release their money

Payment confirmation now creates a **held** escrow with an inspection window instead of completing the sale outright — that was the point of the escrow work. But the release step only exists as an API. There is no `/dashboard/transactions` route anywhere in the app, and no release action on any existing screen.

As it stands, a completed purchase sits in escrow indefinitely until an admin calls `PATCH /escrow/:id/release` by hand. A buyer-facing transaction screen with a release action has to land before this reaches production.

---

## Route ledger

Thirty routes. **Live** reads from the API today; **Ready** means the endpoint exists and only the screen is left.

### Public & auth — 6 of 6 live

| Route             | State | Data source              |
| ----------------- | ----- | ------------------------ |
| `/`               | Live  | Server-rendered listings |
| `/listing/[id]`   | Live  | Server-rendered detail   |
| `/search`         | Live  | `/properties` + facets   |
| `/login`          | Live  | `/auth/login`            |
| `/signup`         | Live  | `/auth/register`         |
| `/reset-password` | Live  | `/auth/reset-password`   |

### Buyer — 4 of 8 live

| Route                    | State | Data source                            |
| ------------------------ | ----- | -------------------------------------- |
| `/dashboard`             | Live  | Connections, saved, unread             |
| `/dashboard/saved`       | Live  | `/saved-properties`                    |
| `/dashboard/offers/[id]` | Live  | `/offers` + thread                     |
| `/dashboard/settings`    | Live  | Profile + `/notifications/preferences` |
| `/dashboard/offers`      | Ready | Connections `.offers[]`                |
| `/dashboard/messages`    | Ready | Connections + `/messages`              |
| `/dashboard/viewings`    | Ready | Connections `.viewings[]`              |
| `/dashboard/alerts`      | Ready | `/notifications`                       |

### Agent — 4 of 8 live

| Route              | State       | Data source                      |
| ------------------ | ----------- | -------------------------------- |
| `/agent`           | Live        | Seller stats, connections, sales |
| `/agent/leads`     | Live        | `/connections/incoming`          |
| `/agent/listings`  | Live        | `/properties/seller/:id`         |
| `/agent/settings`  | Live        | `/users/me`                      |
| `/agent/pipeline`  | Ready       | Connections + transactions       |
| `/agent/calendar`  | Ready       | Connections `.viewings[]`        |
| `/agent/analytics` | Ready       | `/stats/agent`                   |
| `/agent/concierge` | **Blocked** | No model — needs a product call  |

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

### 01 · Push the schema — _blocked on the database_

_One command · blocks phase 03._

Three new models — `Notification`, `NotificationPreference`, `PlatformSetting` — are written into `schema.prisma` and the client is generated, but nothing is in the database yet. Every notification and settings endpoint returns an error until `pnpm prisma:push` runs. The change is purely additive.

`prisma db push` currently fails with `P1001: Can't reach database server at localhost:5432` — Postgres is not running. Start it, then run the push.

### 02 · Build the client transport layer — _done_

_8 domains · unblocked all 13 screens._

- **Endpoints** in `config.api.*` for flags, kyc, suspensions, escrow, disputes, notifications, settings, audit-logs, plus `properties.moderate` and the admin `transactions.list` / `transactions.stages`
- **Zod schemas** in `lib/validations/` for each, over a shared `pageOf()` envelope in `lib/validations/pagination.ts`
- **Resource clients** in `lib/api/` and **query hooks** in `lib/hooks/` with keys for every domain
- **Enums** for flag, verification, dispute, escrow, notification, setting, audit and moderation values in `lib/enums/enums.ts`
- The three new stats calls — `regions`, `trend`, `agent`

### 03 · Wire the thirteen screens

_6 admin · 3 agent · 4 buyer._

Each follows the same transform already proven on the live consoles: server hook, adapter, error fallback, unchanged presentational children. Two carry extra scope:

- **Verifications** needs reframing from tier-upgrade requests to identity-document review, since the schema has no tier concept.
- **The buyer transaction screen does not exist yet** and must be created to carry escrow release.

### 04 · Repoint two live surfaces — _done_

- **Admin user suspension** now posts to `/suspensions` with reason, duration and notes, and reactivation lifts the recorded suspension through `PATCH /suspensions/:id/lift`. The old status-flip path (`useSetUserStatus`, `ACCOUNT_STATUS_BY_MANAGED`) is gone.
- **Buyer alert preferences** read and write `/notifications/preferences`. `AlertType` is now the backend `NotificationType`, so the settings screen covers all eight signals rather than a private set of six.

### 05 · Cover the money path with tests

_Currently zero._

There is no test coverage anywhere in either half — the backend has a single generated `Hello World` end-to-end stub and the frontend has none. Funds now move through a hold-and-release state machine with authorisation rules about who may release and when. That path needs tests before it handles real money.

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
