# 0016 · Lead temperature is derived; the connection taxonomy stays

**Status:** Accepted
**Date:** 2026-09-08

## Context

Phase 4 Page 17 specifies the agent lead desk with statuses New / Contacted / Qualified / Lost and hot / warm / cold scoring. The app ships neither. `LeadStage` is `pending | accepted | declined`, mapped one-to-one from Prisma's `ConnectionStatus` (`PENDING | ACCEPTED | REJECTED`) by `LEAD_STAGE_BY_CONNECTION`, and no field anywhere carries a score, temperature or rating.

The conformance audit recorded this as "built, but on a different taxonomy". The header lede has been overpromising for as long: `leads-header.tsx` reads "Every prospect ranked by temperature, stage and fit", and until now nothing behind it ranked by temperature or fit.

Adopting the spec's status set literally is not a rename. `ConnectionStatus` is a Postgres enum with a default and an index; New/Contacted/Qualified/Lost is not a one-to-one remap, because nothing in the data distinguishes "Contacted" from "Qualified" and "Lost" is not the same claim as "REJECTED". `common/access.ts` grants message, viewing and offer access only when a connection is `ACCEPTED`, so redefining the states is a security-relevant change, not a cosmetic one. The transition API is binary — `PATCH /connections/:id/accept` and `/reject`, both guarded by `if (status !== PENDING) throw` — and cannot express a four-state progression. The same enum also drives the buyer's `/dashboard/interests` through `interest-tones.ts`.

Scoring, by contrast, needs no new state at all. The signals a temperature would read are already on the connection: `_count.offers`, `_count.viewings`, `_count.messages`, and — since ADR 0014 — a real last-contact timestamp from `ContactActivity`.

## Decision

Keep `pending | accepted | declined` as the lead status, and ratify it in the spec record rather than migrating the database to match Phase 4. Add temperature as a **derived** dimension over the already-mapped `Lead`.

`leadScore` in `lib/data/agent-leads.ts` is a pure function of four weighted signals — a live offer (40), viewings (15 each, capped at 30), unread messages (10 each, capped at 20) and contact recency (10 within 48h, 5 within 7d) — clamped to 100, and floored at 0 for a declined lead. `LEAD_TEMPERATURES` in `lib/config/lead-tones.ts` bands that score into hot (≥60), warm (≥30) and cold, each carrying its own label, icon and tone. `temperatureOf` is the only thing that reads the bands.

Nothing is stored. The score is recomputed from the row on every render, so it can never drift from the signals it claims to summarise.

## Rejected

**Migrate `ConnectionStatus` to the spec's four states.** The literal reading of Phase 4, and it loses on cost against value. It is a Postgres enum migration on a live table, a redefinition of the authorisation predicate in `common/access.ts`, a new status-transition endpoint replacing two working ones, and a ripple into the buyer's interests screen — all to obtain two intermediate states ("Contacted", "Qualified") that no existing signal can populate. The rows would be honest about their names and dishonest about their contents.

**Add a `score Int` column to `Connection` and write it on each touch.** Makes the score queryable and sortable in the database, which is the right shape once ranking moves server-side. It also introduces a value that can be stale — every write path that changes an offer, a viewing or a message must remember to recompute it, and the one that forgets produces a hot lead that has gone quiet. Deriving on read cannot have that bug. Revisit when the lead list is paginated server-side and the sort has to happen in SQL.

**Let the agent set the temperature by hand.** A real CRM affordance, and orthogonal to this: a manual override is only meaningful once there is a computed baseline to override. It also invites the failure the spec's lede already had — a field that says "hot" because someone once thought so.

**Leave the header lede alone and ship no scoring.** Rejected outright. The copy claimed a ranking dimension that did not exist.

## Consequences

`rankLeads` now leads with score, so the desk orders by intent rather than by stage. The temperature is visible in three places — a column on `lead-table`, a chip in the top-prospect hero, and a share panel in the rail — and all three read the same `temperatureOf`, so there is one definition to change.

`Lead` gains `lastContactMinutes` because scoring needs the raw recency that `lastContact` had already formatted into a string. That is one more field on the view model and the mapper, and it is the field that makes the score sensitive to ADR 0014's contact records.

The weights are a judgement, not a measurement. They are stated as named exported constants precisely so they can be argued with and tuned in one place, and they are the thing most likely to be wrong on first contact with real agent behaviour.

The spec and the code now disagree on status in a recorded way rather than a silent one. `design-os/` keeps Page 17 as written; `design-os/INDEX/RATIFIED_DIVERGENCES.md` records that the app diverges and points here. Revisit the status question if the product ever needs a state between "accepted" and "closed" that the offer and transaction records cannot already express.
