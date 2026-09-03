# 0008 · Who may release an escrow hold, and when

**Status:** Accepted
**Date:** 2026-08-27

## Context

Payment confirmation creates a **held** escrow with an inspection window rather than completing the sale. Someone has to be able to end that hold, and the choice of who is a product decision, not an implementation detail. It was made in an `if` statement and nowhere else.

The asymmetry that drives it: **failing to release is recoverable, releasing wrongly is not.** There is no undo. Against that, a seller cannot be left unpaid indefinitely because a buyer stopped answering — an inspection window that never expires is a hostage situation with the seller's money.

## Decision

The inspection window is the pivot.

- The **buyer** may release at any time, window open or closed. It is their money until they say otherwise.
- An **admin** may release at any time, as the dispute path of last resort.
- The **seller** may release only once the window has closed. Before it closes the buyer's inspection right is absolute; after it closes the seller's right to be paid is.
- Nobody else may release, ever, whatever the window.

Authorisation is decided on the authenticated caller and is checked before any side effect — no agreement is generated, nothing is uploaded, nothing is emailed and nothing is written on a refused release.

The criteria are written out as sections 07–09 of `docs/MONEY_PATH.md` and enforced by `escrow.service.spec.ts` and `escrow.controller.spec.ts`.

## Rejected

**Buyer only, admin escalates** — safest for the buyer and the obvious first answer. Rejected because it makes every unresponsive buyer an admin ticket, which does not scale and gives sellers no path that does not depend on staff.

**Auto-release when the window closes** — removes the deadlock without anyone acting. Rejected because it converts silence into consent for an irreversible transfer; a buyer on holiday loses their inspection right without ever seeing a prompt.

**Either party at any time** — symmetric and simple. Rejected outright: it lets a seller take the money before the buyer has inspected, which is the exact failure the hold exists to prevent.

## Consequences

The window's length becomes a real product lever rather than a formality — it is the only thing standing between a buyer and a seller-initiated release. It is configurable through the `escrowHoldDays` setting, defaulting to three days.

A seller-initiated release after a closed window is legitimate but will surprise buyers who assumed silence was safe. Notifying the buyer as the window nears its end is the natural follow-on and does not exist yet.

Because the state check runs before the ownership check, a caller who is not entitled to a hold can still distinguish "no such hold" from "already settled". That is a known and deliberate ordering, recorded in `MONEY_PATH.md`, not an oversight.
