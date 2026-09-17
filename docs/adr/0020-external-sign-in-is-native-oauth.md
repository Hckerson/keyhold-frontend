# 0020 · External sign-in is native OAuth, not Passport strategies

**Status:** Accepted
**Date:** 2026-09-11

## Context

The sign-in and signup screens have rendered Google, Apple and Facebook marks since the auth screens were built, gated behind `NEXT_PUBLIC_AUTH_PROVIDERS`. Every one pointed at `GET /auth/:provider`, and no such route existed: `strategies/` held only `jwt.strategy.ts`, and the backend had `passport`, `@nestjs/passport` and `passport-jwt` but no provider strategy of any kind. Setting the variable would have put three working-looking buttons in front of users, and all three would have 404'd.

Google Calendar sync — owed by the Page 19 blueprint — needed the same foundation. A calendar grant is the same authorization-code flow as a Google sign-in, with one extra scope and a refresh token kept afterwards. Building sign-in without planning for Calendar would have meant building the OAuth exchange twice.

Two constraints shaped the choice. The global rules make every new package a question for the user rather than a step, and ban `any` and unchecked casts outright. And the flows involved are small. Google is authorization code with PKCE, plus an `id_token` whose signature, issuer, audience, expiry and nonce must be checked. Facebook is a code exchange plus a `debug_token` call confirming the token was minted for this app.

## Decision

External sign-in is implemented natively, with no new dependency.

`GoogleOAuthClient` and `FacebookOAuthClient` in `common/services/oauth/` speak each provider's HTTP API through `fetch`, and every response is parsed by a Zod schema before anything reads it. Google's `id_token` is verified against its published JWKS using `node:crypto` — `createPublicKey` over the JWK, `createVerify('RSA-SHA256')` over the signed segments — then checked for issuer, audience, expiry and nonce. Facebook tokens are checked with `debug_token` for this app's `app_id`, and the profile call carries an `appsecret_proof`.

Round-trip state is an HMAC-sealed cookie holding the `state`, the OIDC `nonce` and the PKCE verifier. It expires after ten minutes, is compared against the returned `state` in constant time, and is keyed off the JWT private key with a context label so the signature cannot be confused with any other use of that key. The codec lives in `ServicesModule`, so the auth and calendar modules share it without importing each other.

A provider identity is its own row. `AuthIdentity` records `(provider, providerUserId)` against a `User`, which lets one person reach the same account by password and by Google. Linking follows one rule: **an identity attaches to an existing account only when the provider asserts the email is verified and the account has confirmed that same address.** An unconfirmed account is refused rather than merged, and a deleted account is never signed back in.

Calendar sync reuses the Google client with the `calendar.events` scope and offline access. The refresh token is sealed with AES-256-GCM under `TOKEN_ENCRYPTION_KEY` before it is stored. Pushing events is one-way and fire-and-log: a confirmed viewing writes an event to the agent's calendar, a cancellation or reschedule removes it, and no Google failure can fail a viewing operation.

## Rejected

**Passport strategies** — `passport-google-oauth20`, `passport-facebook`, and an Apple strategy. Less code to own, and each is widely used. The deciding cost was typing: a strategy's `verify` callback hands over a loosely typed `profile`, and using it would have needed casts the codebase forbids. On top of that came three dependencies, and Apple strategies of uneven maintenance. Native code lets every provider response be Zod-parsed at the boundary like every other API response in the system.

**Linking on any matching email.** The common shortcut, and exactly how pre-account-takeover works: someone registers a victim's address with a password they control, never confirms it, and waits for the victim to sign in with Google and be merged into that account. Requiring both sides to be verified closes it, at the cost of asking an unconfirmed member to sign in with their password first.

**One callback URL shared by sign-in and Calendar.** It would mean registering one redirect URI instead of two, but the auth module would then have to dispatch into the calendar module mid-callback, coupling two modules that otherwise do not know about each other.

**Apple.** Deferred rather than rejected. It needs a paid developer account, a `.p8` signing key to mint the client secret, and a `form_post` callback, and it discloses the user's name only on the first authorization. The mark still renders if `apple` is listed in `NEXT_PUBLIC_AUTH_PROVIDERS`, so it must stay unlisted until this lands.

**Two-way calendar sync.** Reading an agent's busy slots would stop a proposed viewing clashing with an external appointment, but it needs a broader scope plus polling or push channels. One-way push covers what Page 19 asks for.

## Consequences

We own the protocol checks, so each one is pinned by a test: a token for another client, from another issuer, expired, replaying a nonce, or signed by an unpublished key is refused; a rewritten, expired or unmatched state is refused; each linking rule has its own case. If Google changes its JWKS format or Facebook bumps its Graph version, the failure will be loud — a Zod parse error, logged, and a redirect to `/login?oauth=failed`.

Nothing works until credentials exist. `API_PUBLIC_URL`, the Google and Facebook client credentials, and `TOKEN_ENCRYPTION_KEY` for Calendar are all optional and validated as all-or-nothing groups. Each provider's console needs its redirect URI registered: `${API_PUBLIC_URL}/auth/google/callback`, `/auth/facebook/callback`, and `/calendar/google/callback`. Until then the clients log a warning, and the frontend's provider list decides whether a button renders.

Calendar's `calendar.events` scope is one Google classes as sensitive. Past a hundred test users, production use needs Google's app verification — a lead time outside the codebase that must start before launch.

A grant revoked from Google's side surfaces as `invalid_grant` on the next refresh, and the connection is deleted then and there, so the calendar screen offers to reconnect instead of claiming a connection that no longer works.

Adding `AuthIdentity`, `CalendarConnection` and `Viewing.googleEventId` means the code and migration `0013` must ship together: every viewing query now selects `googleEventId`, so this code against the previous schema breaks every viewing operation.
