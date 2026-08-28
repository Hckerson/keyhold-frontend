# Wire Audit — Stage 07

The layer between the browser and the API, audited against `docs/from-idea-to-click.md` stage 07. Ten concepts, over `middleware.ts`, `lib/api/` and the API's CORS and cookie handling.

Each finding carries its own **Status** — `Open` or `Fixed`. The status line on each finding is the record; this header makes no claim about the set.

**Verdict:** the shortest stage so far and the one with the most concentrated risk. CORS and caching are correct. The token, however, is held in two places a script can read, and the edge middleware makes routing decisions from a token it never verifies. Four findings, two of them security-relevant.

**07.3 and 07.4 are now fixed. 07.1 and 07.2 remain open** — 07.2 is blocked on a dependency, 07.1 is the design work the finding says it is.

---

## What came back clean

| Concept            | Evidence                                                                                                                                                      |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **CORS**           | `enableCors({ origin: FRONTEND_URL, credentials: true })` — a single named origin from validated config, not a wildcard, and not reflected from the request.  |
| **HTTP caching**   | `lib/api/server.ts` sets `next: { revalidate: REVALIDATE_SECONDS }` on public server fetches. Authenticated client calls go through axios and are not cached. |
| **Edge functions** | `middleware.ts` bounces a logged-out user before the request reaches the origin, with a `matcher` scoped to the five route groups that need it.               |
| **Same-origin**    | The frontend never tries to read a cross-origin response outside the configured API origin; there is no proxy shim or CORS workaround anywhere in the tree.   |

**Not applicable:** DNS, HTTP versions, CDN, and load balancing are all properties of a deployment that does not exist yet. They belong to stage 10.

---

## 07.1 · The access token lives in two places a script can read

> **Concept:** cookies · **Severity:** security-relevant, structural · **Status:** Open — design work, not attempted

The guide states the flags plainly: _"`httpOnly` (JavaScript cannot read it), `Secure` (HTTPS only), `SameSite` (blocks cross-site sending — your main CSRF defence)."_

Two of the three are set. The first cannot be, by construction:

```ts
document.cookie = `${name}=${encodeURIComponent(value)}${expires};path=/;SameSite=Lax${secure}`;
```

`lib/utils/cookies.ts` writes the cookie from client JavaScript, and a cookie written that way can never carry `httpOnly` — the flag only exists on a `Set-Cookie` header from a server. `SameSite=Lax` is right; `Secure` is applied whenever the page is on HTTPS, which correctly leaves local development alone.

The token is then held a second time. `lib/stores/auth-store.ts` persists the Zustand store, and the store contains `accessToken`:

```ts
persist(/* ... */, { name: "auth-storage" })
```

`persist` defaults to `localStorage`, so the same bearer token sits in a JS-readable cookie **and** in `localStorage`. Any successful XSS on any page reads either one and gets a token good for the full lifetime — which stage 05 established is seven days unless `JWT_EXPIRATION` is corrected.

Stage 05's revocation work reduces the blast radius: a stolen token can now be cut with `POST /auth/logout` or a suspension. It does not reduce the exposure, because nobody knows to revoke a token they do not know was taken.

**To close:** have the API set the token as an `httpOnly`, `Secure`, `SameSite` cookie on login, and stop storing it in the client at all. The middleware already reads the token from a cookie, so it keeps working unchanged. The axios `Authorization` header is what has to change — to `withCredentials`, letting the browser attach the cookie the frontend can no longer see. This is the one finding in this stage that is a genuine piece of design work, not an edit.

**Still open, deliberately.** This one was left alone. It is not a contained edit: it moves the token's authority from a header the client sets to a cookie the browser attaches, which touches login, register, logout, the axios instance, the Zustand store, the middleware and every authenticated request in both portals and the public site. Doing that without being able to drive a single sign-in through a browser is how an auth system quietly breaks for everyone. It wants its own pass, with the app running.

What did change around it: 07.4's fix means a client holding a token the server has rejected no longer _renders_ as signed in, which trims one of the ways the duplicated token goes stale. The exposure is unchanged.

## 07.2 · The middleware trusts a token it never verifies

> **Concept:** client / server split · **Severity:** security-relevant, bounded · **Status:** Open — blocked on a dependency

`middleware.ts` decodes the JWT by base64-decoding the payload segment and reading `role` and `exp` from it. There is no signature check — the edge runtime has no access to `JWT_SECRET`, and none is attempted:

```ts
const decoded = JSON.parse(
    Buffer.from(parts[1], "base64url").toString("utf-8"),
);
return decoded as JwtPayload;
```

Every routing decision downstream rests on that. Anyone can hand-write a cookie with `{"role":"ADMIN","exp":<far future>}`, and the middleware will let them into `/admin` and redirect them there from `/login`.

**What this does and does not cost.** The API verifies signatures properly, so no data is exposed: every request the forged session makes comes back 401 or 403. What the attacker gets is the shell — the admin chrome, the navigation, the empty consoles, and whatever route names and copy those reveal. It is a UI-level bypass, not an exfiltration.

That is still the rule the guide leads with: _"anything the user can see, the user can change, so trust nothing decided on the client."_ The middleware is server-side, but the input it trusts is not.

**To close:** verify the signature at the edge with `jose`, which works in the edge runtime where `jsonwebtoken` does not, and treat a token that fails verification exactly like a missing one. This also removes one of the three untrusted-input assertions in finding 06.6.

**Blocked.** `jose` is not installed, and adding a package is not a decision this pass gets to make on its own. Nothing already in the stack verifies a JWT signature in the edge runtime: `jsonwebtoken` is a Node library and is a backend dependency in any case, and the Web Crypto API alone would mean hand-rolling JWS verification, which is precisely the kind of code that should not be hand-rolled. The finding stays open pending that call.

One thing worth adding to the finding: the middleware also needs `JWT_SECRET` at the edge to verify anything, and the frontend has no such variable today. Closing this is a package **and** a secret-plumbing change, not just an import.

## 07.3 · The middleware re-implements four constants it could import

> **Concept:** single source of truth · **Severity:** rule violation · **Status:** Fixed

`lib/constants.ts` already defines everything `middleware.ts` hardcodes:

| `middleware.ts` has                         | `lib/constants.ts` already exports   |
| ------------------------------------------- | ------------------------------------ |
| `request.cookies.get("access_token")`       | `ACCESS_TOKEN_COOKIE`                |
| `getPortalForRole` with its own `portalMap` | `portalForRole` and `PORTAL_BY_ROLE` |
| `["/admin", "/agent", "/dashboard"]`        | `BUYER_ROUTES`, `AGENT_ROUTES`, …    |
| `["/login", "/signup"]`                     | `AUTH_ROUTES`                        |

Commit `fbb5a27` — _"stop hardcoding portal hrefs now that routes are named"_ — did this work across the application and did not reach the middleware, which sits outside `app/` and `components/`. The role-to-portal map now exists twice, and the two can drift silently: a portal renamed in `constants.ts` would still redirect to the old path from the edge.

**Fixed.** The middleware imports `ACCESS_TOKEN_COOKIE`, `AUTH_ROUTES`, `PORTAL_BY_ROLE`, `portalForRole` and `loginWithRedirect`. The role-to-portal map exists once again.

It removed more duplication than the finding counted. The middleware also carried a second hand-written role→prefix mapping in the protected-route branch — an `if/else` chain deciding that `/admin` requires `ADMIN`, `/agent` requires `SELLER`, `/dashboard` requires `BUYER`. That is the _same_ fact as `PORTAL_BY_ROLE`, written a third time and in the opposite direction. Both the protected-prefix list and the role check now derive from one `Object.entries(PORTAL_BY_ROLE)`, so adding a portal is one edit in one file rather than three edits in two.

## 07.4 · A rejected token is deleted without being cleared

> **Concept:** cookies · **Severity:** minor, user-visible · **Status:** Fixed

When the middleware finds an expired or unparseable token it deletes the cookie and redirects to `/login`:

```ts
const response = NextResponse.redirect(new URL("/login", request.url));
response.cookies.delete("access_token");
```

The cookie goes; `localStorage` does not. `auth-storage` still holds the user object and the dead token, so the client rehydrates into a signed-in-looking state — `useAuthStore` reports a user, the topbar renders an account, and the axios interceptor keeps attaching a token the API will reject. The user sees a logged-in shell that 401s on contact.

Note that the redirect also drops the path the user was trying to reach, unlike the no-token branch immediately above it, which preserves it as `?redirect=`.

**Fixed, and wider than a `/login` mount effect.** `useSessionSync` clears the store whenever it holds a user or token while the cookie is gone, and `SessionProvider` runs it at the application root rather than on one route. The narrower fix would only have caught the user who lands on `/login`; the real case is any tab left open when the token expires, which never navigates to `/login` at all. It now self-corrects wherever it is.

The `redirect` parameter is carried through the rejected-token branch, via the same `loginWithRedirect` the no-token branch uses, so the two branches can no longer drift. The branch only preserves the path when the request was for a protected route — a rejected token on `/login` itself redirects to `/login` without a self-referential `?redirect=/login`.
