# Security Audit — Stage 08

Security and privacy, audited against `docs/from-idea-to-click.md` stage 08. Twelve concepts, across both halves of the system.

Each finding carries its own **Status** — `Open` or `Fixed`. The status line on each finding is the record; this header makes no claim about the set.

**Verdict:** the habits the stage opens with are mostly in place — input is validated at the boundary, queries go through an ORM, passwords are hashed with the boring library, no secret is in the repo. What is missing is the item the guide puts in a caution box, and it is missing on exactly three routes. Six findings, and two more inherited from stage 07.

**08.1, 08.4, 08.5 and 08.6 are fixed. 08.3 is half closed. 08.2 is triaged but not remediated.**

---

## What came back clean

| Concept                    | Evidence                                                                                                                                                                                                                                                                                                                  |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Injection**              | Every query goes through Prisma. No raw SQL, no string-concatenated query anywhere in `backend/src`.                                                                                                                                                                                                                      |
| **XSS**                    | One `dangerouslySetInnerHTML`, added by 12.2 for the listing JSON-LD, where Next offers no alternative. Its input is a serialised object, not markup, and `serialiseSchema` escapes `<` to `<` so seller-supplied text cannot close the script tag — covered by two tests. Nowhere else is React's escaping opted out of. |
| **Secrets management**     | Only `.env.example` is tracked. `.env`, `.env.development`, `.env.test` and `.env.production` are all ignored, and no key is baked into client code.                                                                                                                                                                      |
| **Cryptographic failures** | `bcrypt` with a generated salt per password. No home-made crypto, no reversible storage.                                                                                                                                                                                                                                  |
| **CSRF**                   | The API is called with a bearer token rather than an ambient cookie, and the cookie that does exist is `SameSite=Lax`. Cross-site submission does not carry authority.                                                                                                                                                    |
| **Mishandled exceptions**  | `AllExceptionsFilter` now catches everything, logs the cause, and returns a non-leaky 500 — closed under 05.7. No bare `catch` swallows a permission check.                                                                                                                                                               |

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

**One package is pure dead weight.** `nodemailer` is a **direct** backend dependency carrying a high-severity advisory, and `grep -rln nodemailer src/` returns nothing — SendGrid is the mailer and nodemailer is imported nowhere. It is the cheapest item on the board: a removal rather than an upgrade, with no reachable code to regress.

**Not closed, and the gate is not wired yet.** Every remediation here is a version bump, and adding, upgrading or swapping a package is not a decision this pass gets to make. `pnpm audit:prod` now exists as a script on the backend so the number is one command away, but it is deliberately **not** in the pre-push gate: a gate that fails on the day it lands is a gate that gets commented out in the same week. It goes in once the reachable five are upgraded.

## 08.3 · No security headers, no CSP

> **Concept:** security misconfiguration · Content Security Policy · **Severity:** defence-in-depth, absent · **Status:** Fixed — CSP now enforcing; nonce-strict `script-src` needs a rendering decision

`helmet` is not installed and no headers are set. The API sends no `X-Content-Type-Options`, no `X-Frame-Options`, no `Referrer-Policy`, no `Strict-Transport-Security`. The frontend defines no Content Security Policy — `next.config.ts` sets `devIndicators` and `images` and nothing else.

The guide calls CSP _"real defence-in-depth against XSS."_ That matters more here than it would elsewhere, because of 07.1: the access token sits in `localStorage` and a JS-readable cookie, so a single successful injection is a session theft. CSP is the layer that makes injected script fail to execute in the first place.

**Both halves are now done.**

`lib/config/security-headers.ts` now backs a `headers()` entry in `next.config.ts` covering every route: `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`, a `Permissions-Policy` that switches off camera, microphone and geolocation, `Strict-Transport-Security`, and a Content Security Policy.

**The CSP is now enforcing**, not report-only. `frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'` and `form-action 'self'` are live, and `upgrade-insecure-requests` is added in production builds only — on `http://localhost` it would be worse than useless. `'unsafe-eval'` is now stripped in production and kept only in development, where Next's React Refresh needs it; a production build was checked and the string is absent from the header.

### The nonce attempt, and why it was reverted

The obvious next step — and what the Next.js documentation recommends — is `script-src 'self' 'nonce-<per-request>' 'strict-dynamic'`, with the nonce minted in `proxy.ts`. That was built and measured, and it is **incompatible with this application as it renders today**.

Per-request nonces require per-request rendering. Next injects the nonce into its own `<script>` tags only when a page is rendered dynamically; a page prerendered at build time has fixed HTML that cannot carry one. Measured against a production build:

| Page     | Rendering   | `<script>` tags | Carrying a nonce |
| -------- | ----------- | --------------: | ---------------: |
| `/login` | `ƒ` dynamic |              42 |          **all** |
| `/`      | `○` static  |              50 |         **none** |

`'strict-dynamic'` makes the `'self'` source expression **ignored**, so under that policy every one of the 50 scripts on the home page is blocked and the page renders blank. Roughly thirty prerendered routes were in that state. It passed type-check, lint, all 195 tests and a clean production build — the failure is only visible by fetching a page and counting `nonce=` attributes, which is how it was caught.

Nor is there a policy that satisfies both: a `script-src` containing a nonce causes browsers to **ignore `'unsafe-inline'`**, so the two cannot be combined as a fallback for prerendered pages. The choice is genuine — nonce-strict scripts, or static generation. Not both.

**So `script-src` keeps `'unsafe-inline'`, and that is the honest weak point of this policy.** It blocks script from unlisted origins and blocks `eval` in production, but it does not stop injected inline script, which is most of what a CSP exists to prevent.

**Closing it properly is a rendering decision, not a header decision**, and it belongs to [ADR 0002](adr/0002-per-route-rendering-split.md) — whose whole subject is that rendering strategy is chosen per route. Forcing every route dynamic would buy a strict `script-src` at the cost of CDN-cacheable marketing pages on a product where public-page speed and SEO are the business. That trade is the user's to make, and it was not made here.

**The API half is done.** `helmet` 8.3.0 is installed — what the [official NestJS security documentation](https://docs.nestjs.com/security/helmet) recommends by name, zero dependencies, no alternative offered for Express — and registered in `main.ts` immediately after `setGlobalPrefix`, before the validation pipe, the interceptors and CORS. Order is not cosmetic: helmet registered after route setup does not protect routes defined earlier.

Two options are set against helmet's defaults, both because this process serves an API rather than pages:

- `contentSecurityPolicy: false` — a CSP on a JSON endpoint protects nothing, and helmet's default policy would apply to the Swagger UI too. The CSP that matters is the frontend's.
- `crossOriginResourcePolicy: { policy: 'cross-origin' }` — helmet defaults to `same-origin`, which would block the frontend on a different origin from reading API responses.

**Verified on a running API**, not inferred from the config. `GET /api/properties` returns:

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: cross-origin
Origin-Agent-Cluster: ?1
Referrer-Policy: no-referrer
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-DNS-Prefetch-Control: off
X-Download-Options: noopen
X-Frame-Options: SAMEORIGIN
X-Permitted-Cross-Domain-Policies: none
```

`X-Powered-By` is gone — helmet removes it, so the API no longer advertises Express. `POST /api/auth/login` with bad credentials still answers `401` rather than failing to boot, which also confirms the RS256 signing path initialises: had the key loader thrown, the process would not have started at all.

**`preload` has been removed from the frontend's HSTS.** It previously sent `max-age=63072000; includeSubDomains; preload`; it now sends `max-age=31536000; includeSubDomains`, matching helmet's API default.

`preload` is the one part of HSTS that is genuinely hard to undo: submission to the browser preload list ships inside browser binaries, so removal takes months to reach users and applies to every subdomain for the whole `max-age`. This project has no settled production domain yet, which makes that commitment premature by definition. The standard ramp is short `max-age` → long `max-age` → `preload` last, once HTTPS is proven across every subdomain. Everything before the last step is reversible; the last step is not. It should be added deliberately, on a chosen domain, not inherited from a config written during development.

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
