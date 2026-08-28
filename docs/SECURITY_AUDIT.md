# Security Audit — Stage 08

Security and privacy, audited against `docs/from-idea-to-click.md` stage 08. Twelve concepts, across both halves of the system.

Each finding carries its own **Status** — `Open` or `Fixed`. The status line on each finding is the record; this header makes no claim about the set.

**Verdict:** the habits the stage opens with are mostly in place — input is validated at the boundary, queries go through an ORM, passwords are hashed with the boring library, no secret is in the repo. What is missing is the item the guide puts in a caution box, and it is missing on exactly three routes. Six findings, and two more inherited from stage 07.

**08.1, 08.4, 08.5 and 08.6 are now fixed. 08.2 is triaged but not closed, and 08.3 is blocked on a dependency.**

---

## What came back clean

| Concept                    | Evidence                                                                                                                                                               |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Injection**              | Every query goes through Prisma. No raw SQL, no string-concatenated query anywhere in `backend/src`.                                                                   |
| **XSS**                    | Zero `dangerouslySetInnerHTML` in the entire frontend. React's default escaping is never opted out of.                                                                 |
| **Secrets management**     | Only `.env.example` is tracked. `.env`, `.env.development`, `.env.test` and `.env.production` are all ignored, and no key is baked into client code.                   |
| **Cryptographic failures** | `bcrypt` with a generated salt per password. No home-made crypto, no reversible storage.                                                                               |
| **CSRF**                   | The API is called with a bearer token rather than an ambient cookie, and the cookie that does exist is `SameSite=Lax`. Cross-site submission does not carry authority. |
| **Mishandled exceptions**  | `AllExceptionsFilter` now catches everything, logs the cause, and returns a non-leaky 500 — closed under 05.7. No bare `catch` swallows a permission check.            |

---

## 08.1 · Three read routes return anyone's row to anyone

> **Concept:** broken access control · **Severity:** the highest-severity finding in this audit · **Status:** Fixed

The guide puts this in a caution box for a reason:

> **Authorisation is checked on the server, per request, per row.** If your API can be called directly with a valid token and someone else's ID, that is the only fact that matters.

Three handlers take an id and never ask who is calling:

| Route               | Handler                      | What a stranger gets back                                                |
| ------------------- | ---------------------------- | ------------------------------------------------------------------------ |
| `GET /offers/:id`   | `offersService.getOne(id)`   | The offerer's **email**, the offered price, the property, connection ids |
| `GET /viewings/:id` | `viewingsService.getOne(id)` | The buyer's **phone number**, the schedule, both parties                 |
| `GET /escrow/:id`   | `escrowService.findOne(id)`  | Both parties' **emails**, the amount held, the property, the transaction |

All three sit behind `JwtAuthGuard`, so a caller must be signed in — but any signed-in account will do. Incrementing an id walks the table.

What makes this a miss rather than a design gap is that **the codebase already does it correctly twice**. `transactions.getOne` takes the actor and enforces:

```ts
if (transaction.buyerId !== userId && transaction.sellerId !== userId) {
    throw new ForbiddenException("You are not part of this transaction");
}
```

`disputes.findOne(id, actorId, actorRole)` does the same. The mutation routes are guarded too — `acceptCounter`, `reschedule` and `cancel` all take `@CurrentUser()`. It is only the read paths on these three modules that were left open.

Escrow is the worst of the three: it is the money path, and stage 01 wrote a whole checklist for it without covering the read route, because that checklist was scoped to release.

**Fixed.** All three now take the actor and enforce participant-or-admin, refusing anyone else with `ForbiddenException`. Offers and viewings resolve the participants through `connection`; escrow through `transaction`, which also closes the case of a hold attached to no transaction. Seventeen tests cover the rule — six on escrow inside the existing spec, and new `offers.service.spec.ts` and `viewings.service.spec.ts` — each asserting that the buyer, the seller and an admin get through and a signed-in stranger does not.

No caller broke: the only consumer of any of the three routes is the buyer's own offer page. `useEscrowHold` and `useViewing` are defined in the frontend but not yet used by any component.

## 08.2 · Sixty-six advisories in production dependencies

> **Concept:** supply chain · **Severity:** quantified; remediation blocked · **Status:** Open — triaged, not remediated

`pnpm audit` on the backend reports **82 vulnerabilities — 5 low, 41 moderate, 36 high.** Restricting to production dependencies still leaves **66 — 4 low, 38 moderate, 24 high.**

Nothing in the repo currently runs an audit: no CI step, no `preinstall` hook, no Dependabot or Renovate configuration. The number has never been looked at, which is the actual finding — 24 high-severity advisories reachable in production code is a state nobody chose.

Some are transitive through tooling that never serves a request. That distinction has to be made by reading them, not assumed.

**Triaged.** The 24 high advisories in production dependencies resolve to ten distinct modules, reached through eight direct dependencies:

| Direct dependency | Highs | Reachable from a request?                                     |
| ----------------- | ----: | ------------------------------------------------------------- |
| `@sendgrid/mail`  |    10 | **Yes** — `axios` SSRF, `form-data` CRLF injection, `lodash`  |
| `@prisma/client`  |     6 | No — via `@prisma/dev`, which is tooling, not a server path   |
| `@nestjs/swagger` |     3 | No — Swagger is disabled when `NODE_ENV=production`           |
| `cloudinary`      |     1 | **Yes** — argument injection in the SDK we upload through     |
| `multer`          |     1 | **Yes** — DoS via deeply nested fields, on every upload route |
| `twilio`          |     1 | **Yes** — same `axios` advisory                               |
| `@nestjs/config`  |     1 | No — `deepmerge-ts`, startup only                             |
| `@prisma/config`  |     1 | No — build-time                                               |

So **five of the eight are genuinely reachable** — the two outbound HTTP SDKs, Cloudinary, and Multer — and the remaining three are tooling that never serves a request. `path-to-regexp`'s DoS advisory sits under Express routing and is reachable by definition.

`lodash`'s advisory is specific to `_.template`, which nothing in this codebase calls; it is reachable only if SendGrid's own code calls it.

**The audit measured only the backend.** The frontend was never run. It reports **76 production advisories — 4 low, 37 moderate, 35 high** — which is more highs than the backend has. That belongs in this finding and was missing from it.

**Not closed, and the gate is not wired yet.** Every remediation here is a version bump, and adding, upgrading or swapping a package is not a decision this pass gets to make. `pnpm audit:prod` now exists as a script on the backend so the number is one command away, but it is deliberately **not** in the pre-push gate: a gate that fails on the day it lands is a gate that gets commented out in the same week. It goes in once the reachable five are upgraded.

## 08.3 · No security headers, no CSP

> **Concept:** security misconfiguration · Content Security Policy · **Severity:** defence-in-depth, absent · **Status:** Open — blocked on a dependency

`helmet` is not installed and no headers are set. The API sends no `X-Content-Type-Options`, no `X-Frame-Options`, no `Referrer-Policy`, no `Strict-Transport-Security`. The frontend defines no Content Security Policy — `next.config.ts` sets `devIndicators` and `images` and nothing else.

The guide calls CSP _"real defence-in-depth against XSS."_ That matters more here than it would elsewhere, because of 07.1: the access token sits in `localStorage` and a JS-readable cookie, so a single successful injection is a session theft. CSP is the layer that makes injected script fail to execute in the first place.

**Blocked, in half.** `helmet` is not installed and adding it is not this pass's call, so the API still sends no security headers.

The frontend half needs no package — a CSP is a `headers()` entry in `next.config.ts` — and it was still not done, deliberately. A CSP written without loading a single page is a CSP that either breaks the app or is so loose it protects nothing. Next injects inline bootstrap script, the app loads Google Fonts and remote images from six hosts, and Recharts and motion both write inline styles. Getting from that to a policy means starting in `Content-Security-Policy-Report-Only`, opening the routes, and reading what it complains about. That is a browser exercise, and this pass had no browser.

Both halves stay open together, because a CSP on the frontend and no headers on the API is a half-answer that reads as a whole one.

## 08.4 · Auth events and permission denials are never logged

> **Concept:** logging & alerting failures · **Severity:** you cannot see an attack · **Status:** Fixed

There is an audit log, and it is well built — `AuditLogInterceptor` records `POST`, `PATCH`, `DELETE` and `PUT` against a typed action set. But `AuditActionType` is entirely domain events: `USER_CREATED`, `PROPERTY_FLAGGED`, `OFFER_ACCEPTED`, `TRANSACTION_COMPLETED`.

There is no `LOGIN_SUCCEEDED`, no `LOGIN_FAILED`, no `PERMISSION_DENIED`. And because the interceptor records on the success path, a request that throws never reaches it — so every `ForbiddenException` and every failed login passes without trace.

The guide's line is exact: _"If you cannot tell that you were attacked, you were still attacked."_ Concretely, with 05.3's throttling now in place, a blocked credential-stuffing run leaves **no record at all** — the throttler rejects it and nothing is written. The defence works and reports nothing.

**Fixed, and it needed a schema change the finding did not anticipate.** `AuditLog.actorId` was `String` — required, foreign-keyed to `User`. A failed login against an address that matches no account has no actor to point at, so `LOGIN_FAILED` could not be written at all. Migration `0004_security_audit_events` makes `actorId` nullable and adds `LOGIN_SUCCEEDED`, `LOGIN_FAILED` and `PERMISSION_DENIED`.

The same migration changes the actor foreign key from `ON DELETE CASCADE` to `ON DELETE SET NULL`. Under the old rule, deleting a user deleted every audit record of what that user did — the security log was erasable by the subject of it. That was not in the finding and is the more serious of the two problems.

**Where the events are written matters, and the finding's suggestion would not have worked.** It proposes logging denials "from the guards". Guards run _before_ interceptors in Nest, so a guard that rejects never reaches `AuditLogInterceptor` — which is exactly why nothing was being recorded. The split is now:

- `AuditLogInterceptor` records what succeeded: `LOGIN_SUCCEEDED` and `LOGOUT`. It previously skipped any request without `request.user`, which a successful login is, so the actor is now read from the login response body instead.
- `AllExceptionsFilter` records what was refused: `LOGIN_FAILED` on a 401 from `/auth/login`, carrying the attempted address, and `PERMISSION_DENIED` on any 403, carrying the actor when there is one. The filter is the only layer that sees a guard rejection, so it had to move from `new AllExceptionsFilter()` in `main.ts` to an `APP_FILTER` provider that can inject `AuditLogService`.

One more defect fell out: the interceptor wrote `actorId: request.user?.id || 'unknown'` — the literal string `'unknown'` into a foreign key column. Every such write failed the constraint and was swallowed by the service's own `try/catch`. It is `?? null` now.

The throttled credential-stuffing case the finding describes is still partly open: a request rejected by `ThrottlerGuard` is a 429, not a 403, so it is not recorded. Recording throttle rejections needs its own action type and is a follow-up, not part of this fix.

## 08.5 · KYC uploads are capped by count, not by size or type

> **Concept:** security misconfiguration · **Severity:** availability and storage risk · **Status:** Fixed

The identity-document endpoint limits how many files arrive and nothing else:

```ts
@UseInterceptors(AnyFilesInterceptor({ limits: { files: MAX_FILES } }))
```

No `fileSize` limit, so a caller can post files of arbitrary size and hold API memory while doing it. No `fileFilter`, so the content type is never checked before the buffer is handed to Cloudinary — a caller can upload anything and have it stored and served from your account.

**Fixed for KYC and for the route the finding missed.** `src/common/config/upload.config.ts` names both limits once and builds the `fileFilter`; an unaccepted type is refused with `UnsupportedMediaTypeException` before the buffer reaches Cloudinary.

| Route                         | Files | Max size | Accepted                        |
| ----------------------------- | ----: | -------: | ------------------------------- |
| `POST /kyc`                   |     2 |    10 MB | JPEG, PNG, WebP, HEIC/HEIF, PDF |
| `POST /properties/:id/images` |    10 |     8 MB | JPEG, PNG, WebP, HEIC/HEIF      |

The property-image route had the identical hole — `FilesInterceptor('files', 10)`, a count and nothing else — and is the more exposed of the two, since any seller can reach it while KYC submission is once per account. The finding named only KYC.

## 08.6 · A user cannot delete their account, and "export my data" exports nothing

> **Concept:** privacy & compliance · **Severity:** legal obligation unmet · **Status:** Fixed, with a stated retention policy

The guide: _"allow deletion and export... 'delete my account' has to actually delete things."_

**Deletion.** The only route is `DELETE /users/:id`, gated `@Roles(UserRole.ADMIN)`. There is no path by which a user can request erasure of their own account — it requires emailing someone who has admin access. Under GDPR that is the right to erasure with no mechanism behind it.

**Export.** The settings screen has a data-export action. It produces this:

```ts
const exportData = () =>
    downloadJson(
        { profile: form, alertPreferences: preferences },
        DATA_EXPORT_FILENAME,
    );
```

`form` is the profile form's current in-browser state and `preferences` is the notification toggles. The file contains what is already visible on screen. None of the user's actual data — saved properties, offers, viewings, messages, transactions, documents — is in it. A user exercising a data-access right receives a JSON file of the form they were looking at.

**Fixed.** `PersonalDataService` backs two new routes, both behind `JwtAuthGuard` and both acting only on the caller's own id — there is no id parameter to tamper with.

`GET /users/me/export` assembles the real record: profile (minus the password hash), saved properties, saved searches, connections, messages, viewings, offers, transactions with their escrow holds, reviews written and received, identity documents, notification preferences and notifications. The frontend's export action now downloads that instead of the form state it was looking at.

`DELETE /users/me` erases the account. The finding is right that this needed a policy first, so here it is, and it is deliberately not "delete the row":

| Data                                                                                                               | Treatment                                           |
| ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------- |
| Saved properties, saved searches, notification preferences, notifications, identity documents, verification tokens | **Deleted**                                         |
| Name, email, phone, avatar, bio, job title, agency, licence number, password hash                                  | **Overwritten**, account marked `DELETED`           |
| Transactions, escrow holds, offers, viewings, connections, messages, reviews, audit logs                           | **Retained**, now pointing at an anonymised account |

The reasoning: a completed sale is a financial record and a counterparty's record as much as the leaver's, and a marketplace that lets one side vaporise the evidence of a disputed transaction has a worse problem than the one it solved. So the identity is erased and the trail survives without it. `tokensValidFrom` is bumped in the same transaction, so every existing session for that account dies immediately.

Migration `0005_account_erasure` adds the `DELETED` status and a `deletedAt` stamp.

**Two things this does not do**, and they should not be assumed closed:

- **Cloudinary files are not deleted.** The `IdentityDocument` rows go; the scanned passport they point at stays in the Cloudinary account. That is the part of "delete my account" that most needs to actually delete something, and it needs the storage service wired into the erasure path.
- **Nothing stops a `DELETED` account from being interacted with.** The row still exists and still satisfies foreign keys, which is the point, but no guard or query filter excludes it yet. A deleted seller's listings, for instance, are untouched.

---

## Inherited from stage 07

Two findings from `WIRE_AUDIT.md` are security findings and are not restated here:

- **07.1** — the access token sits in `localStorage` and a JS-readable cookie. It is the reason 08.3 matters more than usual.
- **07.2** — the edge middleware trusts an unverified JWT for routing. Bounded to the UI shell, since the API verifies properly.
