# Ratified Divergences

**Real Estate Platform | Companion to Phases 1–10 | Last reviewed 8 September 2026**

---

## What this file is

The ten phase documents in `CORE-PHASES/` are the design record. They are **not edited when the code disagrees with them** — a blueprint that is quietly rewritten to match whatever shipped stops being a specification and becomes a changelog.

So divergences land here instead. Every entry names the phase text it departs from, states what the app does instead, and says whether that is a **ratified** decision (the code is right, the spec has fallen behind) or a **deferral** (the spec is right, the work is scheduled behind a stated precondition).

Nothing in `CORE-PHASES/` has been removed or reworded to accommodate anything on this page.

**Authority is unchanged:** `.claude/CLAUDE.md` binds code. `CORE-PHASES/` explains the design reasoning. This file reconciles the two where they part company.

---

## Ratified — the code is right

The spec has fallen behind these. Each is a considered decision that predates or supersedes the blueprint.

| Phase reference              | Blueprint says                            | App does                                                         | Recorded in                                                    |
| ---------------------------- | ----------------------------------------- | ---------------------------------------------------------------- | -------------------------------------------------------------- |
| Page 9 · Saved Listings      | Card grid                                 | Dense table                                                      | Density rule, `.claude/CLAUDE.md`                              |
| Page 2 module 5 · Section 35 | Price range slider                        | Discrete price-band chips with live facet counts                 | —                                                              |
| Page 7 · Reset Password      | OTP verification as the middle step       | Tokenised email link (request → emailed link → set new password) | —                                                              |
| Page 1 · How It Works        | Four steps: Search → View → Offer → Close | The Concierge scroll-narrative                                   | —                                                              |
| Page 17 · Leads              | Status New / Contacted / Qualified / Lost | `pending / accepted / declined`, mapped from `ConnectionStatus`  | [ADR 0016](../../docs/adr/0016-lead-temperature-is-derived.md) |
| Page 15 · Agent Dashboard    | Route `/agent/dashboard`                  | Route `/agent`                                                   | —                                                              |

### Notes on the entries without an ADR

**Saved listings as a table.** The density rule in `.claude/CLAUDE.md` puts dashboards, panels and lists in the application register. A card grid for a saved collection trades rows-per-screen for whitespace, which is the wrong trade on a screen whose whole job is comparison.

**Price chips over a slider.** Chips carry a facet count per band; a slider cannot. On a catalogue where the price distribution is long-tailed and sparse, the count is the information the buyer actually needs, and a continuous control implies a granularity the inventory does not have.

**Token link over OTP on password reset.** A single-use link in the mailbox proves the same thing a six-digit code proves, with one fewer thing to transcribe. This is _not_ the same decision as signup verification — see the deferral below, where OTP is still owed.

**Concierge over "How It Works".** A different idea rather than a missing one: the four-step strip explains a process, the scroll narrative sells a service. The narrative is what the marketing surface wanted.

---

## Deferred — the spec is right, the work is scheduled

These are **not** ratified. The blueprint stands, and each is blocked on a stated precondition rather than a disagreement.

| Phase reference                   | Owed                                       | Blocked on                                                              | Recorded in |
| --------------------------------- | ------------------------------------------ | ----------------------------------------------------------------------- | ----------- |
| Page 5 · Sign Up                  | OTP email-verification step                | No backend OTP endpoint; `VerificationType.EMAIL` exists but is unwired | —           |
| Phase 3 sitemap · `/verify-email` | The route                                  | same                                                                    | —           |
| Page 5 · Sign Up                  | Facebook OAuth **working**                 | No OAuth strategy exists on the backend for _any_ provider              | —           |
| Page 19 · Calendar                | Google Calendar sync                       | No calendar integration                                                 | —           |
| Section 48 · Footer content       | About, Help, Blog, Privacy, Terms as pages | Never blueprinted in Phase 4 — a scope decision, not a missing file     | —           |
| Page 3 module 5 · Section 10      | School / transit / park / restaurant pins  | No POI dataset — the map and the listing pin now render                 | ADR 0015    |

### Notes

**The map surfaces are built.** MapLibre GL was taken as the dependency and the three surfaces shipped: `/map` (Page 4), the Map option on the search view toggle (Page 2 module 5), and a placed map on listing detail (Page 3 module 5). Tiles come from OpenFreeMap, which needs no key, and the origin is pinned in the CSP alongside `worker-src blob:` for MapLibre's workers.

One part of Section 10 is still owed and is listed above: the school / transit / park / restaurant markers and their toggleable legend. Those need a POI dataset the platform does not have, and inventing pin positions for schools would be exactly the fabrication ADR 0015 refused for listings. The map, the listing's own pin and a status legend are real today.

**Signup OTP.** The schema is closer than it looks: `VerificationToken` and `VerificationType.EMAIL` both exist, `User.emailVerified` exists and is surfaced, and `PhoneVerification` is already OTP-shaped (`code`, `attempts`, `expiresAt`). What is missing is that `AuthService.register` never mints an EMAIL token and never calls the email service. Two endpoints — send and verify — close this.

**Facebook.** The mark, the label and the row layout are now built, so adding `facebook` to `NEXT_PUBLIC_AUTH_PROVIDERS` renders it correctly. It will then point at `/auth/facebook`, which does not exist — and neither does `/auth/google` or `/auth/apple`. `strategies/` contains only `jwt.strategy.ts`. The frontend is ready for all three; the backend is ready for none.

---

## Closed on 8 September 2026

Everything below was in the conformance ledger's "built, modules short" bucket and is now built. Listed so this file records what _stopped_ being a divergence, not only what remains one.

| Phase reference                    | Module                                                              |
| ---------------------------------- | ------------------------------------------------------------------- |
| Page 8 module 4                    | New Alerts on the buyer dashboard                                   |
| Page 8 module 5                    | Quick Links on the buyer dashboard                                  |
| Page 15                            | Quick links on the agent dashboard                                  |
| Page 20 module 7                   | Quick Actions on the admin overview                                 |
| Page 27 module 3                   | Reporting Timezone on the platform panel                            |
| Page 27 modules 5 & 6 · Section 69 | Moderation Policy and Operations toggle groups — all eight switches |
| Page 27 module 7 · Section 70      | Maintenance Panel                                                   |
| Page 18 · Section 42               | Pipeline drag-to-change-stage and the per-deal detail modal         |
| Page 19                            | Create event on the agent calendar                                  |
| Page 17                            | hot / warm / cold scoring on leads                                  |
| Page 5                             | Password strength meter; Facebook provider mark                     |
| Section 23                         | Attach control on the message composer                              |
| Section 25                         | Document Share — document cards, thread panel, offer detail         |
| Section 38                         | File Upload — drag-drop zone, progress bar, type and size limits    |
| ADR 0015 precondition              | Property coordinates, `Listing` carrying them, viewport filtering   |
| Page 4 · Map View                  | The route, with filter rail, pin peek card and legend               |
| Page 2 module 5                    | Map option on the search view toggle                                |
| Page 3 module 5 · Section 10       | Placed map on listing detail (POI markers still owed)               |
| Page 1 · Latest Sales              | A map of recent closed sales beside the card row                    |

### One implementation note worth carrying forward

**Section 42 drag semantics.** The blueprint says "Drag → change status (column)". On this domain a deal stage is _derived_ — from whether an offer exists and whether a transaction has opened — and the agent is not the actor at most of those boundaries. Only the buyer can submit an offer; only the buyer completes payment.

So a drop is treated as a request to advance, resolved against what the agent can actually do. Dragging out of **Offers** accepts or declines the live offer, which are real mutations the agent owns. Every other drop is refused with a reason naming who must act — "Only _{buyer}_ can submit an offer on this property." The rules live in `dealMove` in `lib/data/agent-pipeline.ts`, and the same accept/decline actions are available from the detail modal, so the board is operable without a pointer.

---

## Adding to this file

An entry is owed whenever the code and a phase document part company. State the phase reference, what each side says, and which one is right. If the code is right and the reversal would be expensive, write an ADR in `docs/adr/` and link it. **Do not edit `CORE-PHASES/` to close the gap.**
