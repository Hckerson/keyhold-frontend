# Deployment — web

The Next.js app deploys to Vercel on the free Hobby tier. The GitHub Student
Developer Pack has no Next.js host, and putting the web app on a second Heroku
dyno would cost $7/month against a $13 credit already spent on the API and
database. Hobby covers this app at no cost; its terms exclude commercial use, so
a launch that takes revenue needs Pro.

The API and database deploy separately — see `docs/DEPLOYMENT.md` in the backend
repository.

## Project settings

Vercel infers the framework. Confirm only these:

| Setting           | Value                            |
| ----------------- | -------------------------------- |
| Framework         | Next.js                          |
| Install command   | `pnpm install --frozen-lockfile` |
| Build command     | `pnpm build`                     |
| Node version      | 22.x — pinned by `engines`       |
| Production branch | `master`                         |

`next.config.ts` only switches on `output: "standalone"` when `DOCKER_BUILD` is
set, so the Vercel build takes the default path. Leave `DOCKER_BUILD` unset.

## Environment variables

Every variable in `.env.example` must exist in Vercel for the Production and
Preview environments. Three of them decide whether the app works at all:

- `NEXT_PUBLIC_API_BASE_URL` — the Heroku origin **including the `/api` prefix**.
  It also feeds the `connect-src` directive built by `lib/config/security-headers.ts`,
  so a wrong value fails as a blocked request in the browser rather than a build error.
- `NEXT_PUBLIC_SITE_URL` — the public origin. Canonical URLs, Open Graph tags,
  `sitemap.ts` and `robots.txt` all read it.
- `JWT_PUBLIC_KEY` — base64-encoded RS256 public PEM, the same value the backend
  holds. `proxy.ts` verifies the session cookie with it. Without it
  `verify-session-token.ts` rejects every token and all three portals bounce to
  `/login` while the public site keeps working — which makes it an easy failure to
  misread. This is the only non-`NEXT_PUBLIC_` variable here; it is a public key
  and safe to hold, but the private half must never be set on Vercel.

`NEXT_PUBLIC_SENTRY_DSN` is optional and reporting stays off while it is empty.
Setting it needs no CSP edit — `lib/config/sentry.ts` feeds the DSN origin into
the `connect-src` directive, so a hardcoded ingest host is never required.
`SENTRY_ORG`, `SENTRY_PROJECT` and `SENTRY_AUTH_TOKEN` only affect source-map
upload at build time; without the token the build skips it and still succeeds.

Keep `NEXT_PUBLIC_DEV_QUICK_LOGIN` unset in every deployed environment.

## Cutover order

The two hosts reference each other, so the first deploy needs two passes:

1. Deploy the API to Heroku and note its origin.
2. Deploy the web app with `NEXT_PUBLIC_API_BASE_URL` pointing at it.
3. Set `FRONTEND_URL` on Heroku to the web origin — this is the CORS allow-list
   in `main.ts`, and requests fail until it matches exactly, scheme included.
4. Attach the custom domain to both, then repeat steps 2 and 3 with the final
   hostnames. Changing `NEXT_PUBLIC_*` values requires a rebuild; they are inlined
   at build time, not read at runtime.

## Preview deployments

Every pull request gets its own URL. Those origins are not in the backend's CORS
allow-list, so a preview build authenticates only if you point it at a
separately deployed API. Treat previews as a check on public and visual work.
