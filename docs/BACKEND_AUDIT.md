# Backend Audit — Stage 05

Backend engineering, audited against `docs/from-idea-to-click.md` stage 05. Sixteen concepts, over the NestJS API in `../backend`.

Each finding carries its own **Status** — `Open` or `Fixed`. The status line on each finding is the record; this header makes no claim about the set.

**Verdict:** the request path is well built — validation, layering and webhook verification are all correct, and the guard coverage is exact. The gaps are the ones the guide warns about by name: nothing throttles a login, nothing makes a repeated request safe, and the token cannot be revoked. Seven findings, three of them security-relevant.

---

## What came back clean

| Concept                               | Evidence                                                                                                                                                                              |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Validation**                        | Global `ValidationPipe` with `whitelist`, `forbidNonWhitelisted` and `transform`. Unknown fields are rejected at the boundary, not ignored.                                           |
| **Controller / service / repository** | Closed in stage 03. No service imports `PrismaService`; every controller delegates.                                                                                                   |
| **Authorisation coverage**            | Every controller carries `JwtAuthGuard` except `stripe-webhook.controller.ts` — which is correct, since Stripe cannot present a bearer token. Role gates use `@Roles` + `RolesGuard`. |
| **Webhooks**                          | The signature is verified. The controller refuses a request with no `stripe-signature` header before the body is read, and the raw body is preserved for verification.                |
| **Routing & HTTP**                    | One module per domain noun, REST verbs used correctly, `api` global prefix, CORS scoped to `FRONTEND_URL` with credentials.                                                           |

**Not applicable:** background jobs, scheduled jobs and real-time. None are installed, and none are yet required — see 05.4 for the one place that will change.

---

## 05.1 · The configured token lifetime is ignored

> **Concept:** sessions vs. tokens · **Severity:** security-relevant, and a rule violation · **Status:** Open

`src/common/config/env.validation.ts` validates `JWT_EXPIRATION` with a default of `24h`. Nothing reads it. `auth.module.ts` hardcodes the lifetime instead:

```ts
return {
    secret: secret,
    signOptions: { expiresIn: "7d" },
};
```

So the environment says one day and the system issues seven. Backend rule 8 forbids exactly this — _"Config, secrets, base URLs, magic numbers... never inline."_ The validated setting exists, is typed, has a default, and is dead.

Whichever number is right, one of the two has to go.

**To close:** read `JWT_EXPIRATION` through `ConfigService` in the factory, or delete it from the schema and record 7 days as the deliberate choice. Do not leave both.

## 05.2 · A seven-day token that cannot be revoked

> **Concept:** sessions vs. tokens · **Severity:** security-relevant · **Status:** Open

There is no logout, no refresh, and no blocklist. `grep -rn "logout|refresh|revoke|blocklist"` over the whole auth module returns nothing. The auth surface is `register`, `login`, `forgot-password`, `reset-password`, `onboarding` — and no way to end a session.

The guide describes this trap precisely:

> a signed token stays valid until it expires, so "sign out everywhere" needs a blocklist — at which point you have rebuilt sessions, worse.

The consequence is concrete. A stolen token works for seven days. A user who suspects compromise cannot invalidate it. An admin who suspends an account cannot cut its access — `suspensions.service.ts` marks the user, but the token in the attacker's hand keeps passing `JwtAuthGuard` until it expires on its own.

**To close:** either shorten the lifetime sharply and add a refresh endpoint, or add a revocation list the guard checks. The suspension path is the one that makes this urgent, not the theoretical theft.

## 05.3 · Nothing is rate limited

> **Concept:** rate limiting · **Severity:** security-relevant · **Status:** Open

`@nestjs/throttler` is not installed, and no throttling exists anywhere. The guide lists rate limiting as one of sixteen backend concepts; the API implements zero of it.

`POST /auth/login` and `POST /auth/forgot-password` accept unlimited attempts from one source. The first is credential stuffing; the second is an email-flood amplifier pointed at any address an attacker knows.

**To close:** `pnpm add @nestjs/throttler`, a conservative global default, and a much tighter limit on the auth routes specifically.

## 05.4 · No idempotency anywhere, and mail sent inside the request

> **Concept:** idempotency · background jobs · **Severity:** correctness under retry · **Status:** Open

`grep -rli "idempotenc"` over `src/` returns nothing. The guide names the exact scenario: _"The user double-clicks 'Submit offer'; an idempotency key ensures one offer, not two. Networks retry on their own, so this is not paranoia."_

The escrow release is safe by accident rather than design — `requireHeld` rejects a second attempt because the status has already moved. Nothing else has that property. An offer, a viewing request or a connection can be created twice by one impatient user or one network retry.

The related half: settlement mail is awaited inside the request. `notifySettlement` sends two emails through SendGrid before `release` returns, inside the money path. It cannot fail the release — it is wrapped — but it does hold the response open on a third party. The guide's test is _"does the user's next action depend on it"_, and here it does not.

**To close:** an idempotency key on the create paths that a user can double-fire. The mail is a smaller matter and the guide's own advice is to wait — add the first queue when a request crosses ~1s, not before.

## 05.5 · Nine `console.*` calls, six of them swallowing real failures

> **Concept:** error handling · **Severity:** rule violation, with a monitoring consequence · **Status:** Open

Backend rule 12: _"No `console.log` or debug statements in committed code. Use the Nest logger."_ There are nine.

Three are in `main.ts` — startup banners and a bootstrap error. The other six are in service catch blocks:

```
connections.service.ts   console.error('Failed to send notifications:', error)
connections.service.ts   console.error('Failed to send buyer notification:', error)
offers.service.ts        console.error('Failed to send offer notification:', error)
offers.service.ts        console.error('Failed to notify buyer:', error)
viewings.service.ts      console.error('Failed to send viewing notification:', error)
viewings.service.ts      console.error('Failed to send confirmation:', error)
```

Those six are not cosmetic. Each marks a notification that silently failed to reach a user, and `console.error` writes outside the Nest logger — so it carries no context, no level and no correlation, and will not appear wherever the logger is eventually shipped. `EscrowService` already does this correctly with a private `Logger`; these six were never brought across.

**To close:** a `Logger` per service, as `EscrowService` has. `main.ts` can use the Nest logger too.

## 05.6 · Swagger is served in every environment

> **Concept:** HTTP surface · **Severity:** avoidable exposure · **Status:** Open

`SwaggerModule.setup('api/docs', app, document)` runs unconditionally in `main.ts`. Every route, DTO shape, enum and required field is published at `/api/docs` wherever the app runs, production included.

This is a map of the attack surface handed over for free — and it pairs badly with 05.3, since it names `POST /auth/login` and its exact body shape to anyone who asks.

**To close:** gate the Swagger block on a non-production `NODE_ENV`, or behind basic auth.

## 05.7 · The exception filter catches only half the errors

> **Concept:** error handling · **Severity:** latent, plus a rule violation · **Status:** Open

`HttpExceptionFilter` is `@Catch(HttpException)`, and it is the only filter. Anything that is not an `HttpException` never reaches it — including `RepoError`, which is what every repository throws when Prisma fails. Those fall through to Nest's default handler and become a bare 500 with no logging of the underlying cause.

The filter also contains an unapproved assertion, which backend rule 11 forbids:

```ts
(exceptionResponse as { message: string }).message;
```

`getResponse()` returns `string | object`; the narrowing should be a type guard, not an assertion.

**To close:** add a catch-all filter that logs the cause and returns a non-leaky 500, and replace the assertion with a guard.

---

## What this stage did not cover

Security headers, dependency currency, secret handling and transport are stage 08. `helmet` is absent, which is noted here only so it is not lost — it belongs to that audit, not this one.
