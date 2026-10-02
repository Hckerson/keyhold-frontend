# 0023 · The newsletter uses double opt-in and stores its consent

**Status:** Accepted
**Date:** 2026-09-26

## Context

The footer once carried a "private list" form that told every visitor "You are on the list" and stored nothing. It was removed in `a4df88a`, and `design-os/INDEX/RATIFIED_DIVERGENCES.md` defers its return until there is a subscriber store with consent behind it.

Production runs in Europe ([0019](0019-production-runs-in-europe.md)), so an email address collected for marketing is personal data under GDPR, and sending to it is governed by ePrivacy. That asks for three things the old form had none of: consent the person gave explicitly and that can be shown later, proof that the address belongs to whoever typed it, and a way out that works without signing in.

A public form that accepts any address also answers questions about that address. If it replies differently for a known address, it tells anyone who asks who is already on the list.

## Decision

The list is double opt-in. `POST /newsletter/subscribe` stores a `NewsletterSubscriber` row as `PENDING` with the exact consent wording the form showed, the form it came from and the time, then emails a confirmation link and an unsubscribe link. Only `POST /newsletter/confirm` with that link's token moves the row to `CONFIRMED`. `POST /newsletter/unsubscribe` moves it to `UNSUBSCRIBED` and succeeds again if repeated. Subscribing an unsubscribed address starts over: fresh consent, fresh tokens, `PENDING` again.

Tokens are 32 random bytes sent only in the email; the table keeps their SHA-256 hashes, so a database read does not hand out working links. Subscribe answers every address with the same `202` body, and a confirmed address is sent nothing. The one exception is a failed send: it returns `503` so the person knows no email is coming, rather than waiting for one that never arrives. All three routes run under a per-IP limit of three requests a minute.

## Rejected

**Single opt-in.** One step shorter, but it lists any address anyone types, cannot show that the owner agreed, and is the pattern European regulators treat as insufficient evidence of consent.

**A third-party list provider.** Mailchimp, Buttondown or Resend Audiences would bring double opt-in, unsubscribe pages and sending in one piece. Each is a new dependency and a new processor holding European personal data, which needs a data-processing agreement and a line in the privacy notice before the first address goes in. The platform already sends through its own SMTP path, so the list could be built without either.

**Leaving the form out.** Honest, and the current state. It lost because a consented list is worth having, and the deferral in design-os names exactly what was missing.

## Consequences

A confirmation link expires after three days (`NEWSLETTER_CONFIRM_TTL_MS`). There is no scheduler in the API, so expired `PENDING` rows are deleted at the start of every subscribe request rather than by a job: on a quiet list a row can outlive its link until the next sign-up. The privacy notice states the three-day rule. A scheduled purge replaces this if the API ever gains a scheduler.

Nothing sends newsletters. This builds a consented, confirmable list and nothing more; any sender must read only `CONFIRMED` rows and put each row's unsubscribe link in every message, which means issuing it a fresh unsubscribe token because only hashes are stored.

The footer renders the form, and the privacy notice describes the list, its retention and unsubscribing. The consent line promises "occasional" notes rather than a cadence, because nothing sends yet.

The migration `0017_newsletter_subscribers` is purely additive. Heroku's release phase runs `prisma migrate deploy`, so the next API deploy applies it; locally it is `pnpm db:deploy` then `pnpm db:generate` from `../backend`.

The subscribe, confirm and unsubscribe endpoints are rate-limited per IP. Behind Heroku's router that only works with `TRUST_PROXY_HOPS=1`, which `app.json` sets for new apps and an existing app needs set by hand; without it every visitor shares the router's IP and one limit.

Revisit if the list outgrows plain SMTP sending, at which point a provider with a DPA becomes the cheaper answer.
