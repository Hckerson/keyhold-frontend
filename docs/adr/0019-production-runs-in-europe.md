# 0019 · Production runs in one region, and it is Europe

**Status:** Accepted
**Date:** 2026-09-11

## Context

Production spans three providers, and each asks for a region: Heroku for the API and its Postgres, Resend for outbound mail, Vercel for the functions that render server-side pages. They do not ask with equal weight.

Heroku's region is permanent. The Common Runtime offers `us` and `eu`, and an app cannot move between them — the only path is a new app, a copied database and repointed DNS. Resend fixes a sending domain's region at creation; changing it means deleting the domain and re-verifying its records. Vercel's function region is one line of configuration on any deploy, and the Hobby plan allows exactly one.

The traffic that crosses these boundaries is not only the visitor's. A server-rendered page runs Vercel → Heroku → Postgres before a byte reaches the browser, and every notification the API sends goes Heroku → Resend. The portals also call the API straight from the browser, so the distance from the user to Heroku is paid on every dashboard interaction, not once per page.

Resend was provisioned in Ireland (`eu-west-1`) before this was written down, which made Europe the cheaper of the two coherent answers rather than an arbitrary one.

## Decision

All three run in Europe: Heroku in `eu`, Resend in `eu-west-1`, and Vercel Functions in Dublin (`dub1`), pinned in `vercel.json` so the setting lives in the repository rather than in a dashboard. The server-side chain never leaves the region; the only long hop left is the one from the user to Europe, which is the distance this record chooses.

## Rejected

**All-US on defaults.** Heroku `us`, Vercel `iad1` and Resend `us-east-1` are each provider's default, so this needs no configuration at all, and it would be the right answer for an audience in the Americas. It lost because the audience expected at launch is closer to Europe than to Virginia, because the portals put the user-to-API distance on every click, and because it would have meant deleting and re-verifying a Resend domain that was already correct.

**Heroku in Europe, Vercel left on `iad1`.** The quiet failure: nothing breaks, it only gets slow. Every server-rendered page would cross the Atlantic to reach the API and cross back, and the cost would surface as unexplained latency rather than as an error. Vercel's default is the one most likely to be left alone, which is why the region is pinned in code.

**Multi-region.** Hobby allows one function region and the budget buys one dyno, so there is nothing to spread across. It answers a scale problem this deployment does not have.

## Consequences

Moving later is deliberately uneven. Vercel moves with a one-line change and a redeploy; Resend with a delete, a re-add and three DNS records; Heroku with a new app, `heroku pg:copy` from the old database and a full set of config vars — which is why Heroku's region was the decision that needed recording.

Resend keeps account data, logs and message metadata in the United States whatever the sending region, so this record makes a latency choice, not a data-residency one.

Revisit if most real users turn out to be in the Americas. The Docker images in both repositories keep a move to another host or region possible without a rewrite.
