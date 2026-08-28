# Money Path — Acceptance Criteria

The buyer-facing escrow release flow: what must be true before `/dashboard/transactions` reaches production.

This is the checklist stage 01 never produced, scoped to the one flow where being wrong costs real money. Each criterion is written to become a test name. Anything here that is not yet true is a defect, not a preference.

**Surface:** `/dashboard/transactions` → `TransactionsConsole` → `ReleaseEscrowModal`
**Endpoints:** `GET /transactions/my/purchases` · `PATCH /escrow/:id/release`

---

## What the flow is

A buyer pays. Payment confirmation creates a **held** escrow with an inspection window rather than completing the sale. The buyer sees the hold on their transactions screen, and when they are satisfied, releases the funds themselves. Releasing settles the sale, transfers the held amount to the seller, and marks the property sold. There is no undo.

The whole design rests on one asymmetry: **failing to release is recoverable, releasing wrongly is not.** Every criterion below resolves in that direction.

---

## 01 · Reading the hold

| #   | Criterion                                                                                                                                |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 1.1 | A transaction with no `escrowHold` maps to a purchase with `escrowId`, `escrowStatus`, `escrowAmount` and `inspectionEndsAt` all `null`. |
| 1.2 | When `escrowHold` is absent, `escrowId` falls back to the transaction's own `escrowHoldId`, and to `null` when that is absent too.       |
| 1.3 | A missing `property` or `seller` maps to empty strings, never to `undefined` and never to the string `"undefined"`.                      |
| 1.4 | `price` comes from `finalPrice` — the agreed figure, not the listing's asking price.                                                     |
| 1.5 | `escrowAmount` comes from the hold and is never inferred from `price`.                                                                   |
| 1.6 | An empty purchase list renders the empty state, not a spinner and not an error.                                                          |

## 02 · What is releasable

| #   | Criterion                                                                                                                     |
| --- | ----------------------------------------------------------------------------------------------------------------------------- |
| 2.1 | A purchase is releasable only when its escrow status is `HELD` **and** it carries an `escrowId`.                              |
| 2.2 | A purchase whose escrow is already `RELEASED`, `REFUNDED` or `DISPUTED` offers no release action.                             |
| 2.3 | A purchase with no escrow at all offers no release action.                                                                    |
| 2.4 | A closed inspection window does **not** by itself make a purchase releasable, nor does it block release.                      |
| 2.5 | `inspectionLabel` reads `Window closed` at zero days or fewer, `Nd left` above zero, and the em-dash when there is no window. |

## 03 · Releasing

| #   | Criterion                                                                                                                    |
| --- | ---------------------------------------------------------------------------------------------------------------------------- |
| 3.1 | The release action never calls the API directly — it opens the confirmation modal.                                           |
| 3.2 | The modal names the property, the exact amount held, and the inspection window before asking for confirmation.               |
| 3.3 | The modal states that the action cannot be undone.                                                                           |
| 3.4 | Confirming calls `PATCH /escrow/:id/release` with the escrow's own id — never the transaction id, never the property id.     |
| 3.5 | Confirming fires the mutation **exactly once**, whatever the user does to the interface while it is in flight.               |
| 3.6 | Dismissing the modal without confirming calls nothing.                                                                       |
| 3.7 | On success, the escrow, transaction and property caches are all invalidated, so no stale "held" figure survives the release. |

## 04 · While it is in flight

The gap between clicking confirm and the server answering is the dangerous window. A held escrow is a real sum of money and the request is not idempotent.

| #   | Criterion                                                                                                                                                                           |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 4.1 | The confirm control is disabled for the duration of the request.                                                                                                                    |
| 4.2 | The release is visible as in-progress on the row it belongs to, for the whole duration.                                                                                             |
| 4.3 | A release in flight cannot be started again for the same escrow, by any route through the interface — including dismissing the modal and pressing release on the row a second time. |
| 4.4 | Dismissing the modal mid-flight does not cancel the request, and does not hide the fact that it is still running.                                                                   |
| 4.5 | A release in flight on one purchase does not disable release on a different purchase.                                                                                               |

## 05 · When it fails

| #   | Criterion                                                                                                                   |
| --- | --------------------------------------------------------------------------------------------------------------------------- |
| 5.1 | A failed release leaves the escrow held. Nothing in the interface claims otherwise.                                         |
| 5.2 | A failed release invalidates no caches — a failure must not be able to erase a correct held figure.                         |
| 5.3 | The failure is surfaced to the buyer. Silence after clicking a money button is not an acceptable state.                     |
| 5.4 | After a failure the same release can be attempted again.                                                                    |
| 5.5 | A failed load of the purchases list renders `ConsoleUnavailable` with the `buyerTransactions` fallback and a working retry. |

## 06 · Ordering and totals

The rail and stat band are read before the table. If they disagree with it, the buyer is being told two different things about their own money.

| #   | Criterion                                                                                                               |
| --- | ----------------------------------------------------------------------------------------------------------------------- |
| 6.1 | Releasable purchases sort above everything else; unsettled above settled; newest first within a tier.                   |
| 6.2 | Sorting does not mutate the array it was given.                                                                         |
| 6.3 | `Funds held` totals the escrow amounts of held purchases only, and counts a `null` amount as zero rather than as `NaN`. |
| 6.4 | `In escrow`, `Ready to release` and `Settled` count exactly the sets that criteria 2.1 and the settled rule describe.   |
| 6.5 | The filter counts match the rows each filter actually renders.                                                          |
| 6.6 | Every figure holds for an empty list — zeroes and a formatted zero, never `NaN`, `Infinity` or an empty string.         |

---

# The server half

Everything above is enforced in the browser, where nothing is trustworthy. The rules that actually decide whether a hold may be released live in `EscrowService.release`, and until now had no tests at all.

**Surface:** `PATCH /escrow/:id/release` → `EscrowController.release` → `EscrowService.release`

## 07 · Who may release

The window is the pivot. Before it closes the money is the buyer's to hold; after it closes the seller is entitled to be paid without waiting on someone who has stopped answering.

| #   | Criterion                                                                                                           |
| --- | ------------------------------------------------------------------------------------------------------------------- |
| 7.1 | The buyer on the transaction may release, whether the inspection window is open or closed.                          |
| 7.2 | An admin may release, whether the window is open or closed.                                                         |
| 7.3 | The seller may release once the inspection window has closed.                                                       |
| 7.4 | The seller may **not** release while the window is still open.                                                      |
| 7.5 | A caller who is neither buyer, seller nor admin may never release, whatever the window.                             |
| 7.6 | A refused release has no side effect: no agreement generated, nothing uploaded, nothing emailed, nothing written.   |
| 7.7 | The identity that decides comes from the authenticated caller, never from the route, the body or a query parameter. |

## 08 · What may be released

| #   | Criterion                                                                                       |
| --- | ----------------------------------------------------------------------------------------------- |
| 8.1 | An escrow id that matches nothing is refused as not found.                                      |
| 8.2 | A hold that is already `RELEASED`, `REFUNDED` or `DISPUTED` is refused as already settled.      |
| 8.3 | A hold attached to no transaction is refused, and no part of a settlement is attempted.         |
| #   | Criterion                                                                                       |
| --- | ----------------------------------------------------------------------------------------------- |
| 8.1 | An escrow id that matches nothing is refused as not found.                                      |
| 8.2 | A hold that is already `RELEASED`, `REFUNDED` or `DISPUTED` is refused as already settled.      |
| 8.3 | A hold attached to no transaction is refused, and no part of a settlement is attempted.         |
| 8.4 | A refusal of any of the above writes nothing — the hold survives every rejected release intact. |

## 09 · What a release does

| #   | Criterion                                                                                                                         |
| --- | --------------------------------------------------------------------------------------------------------------------------------- |
| 9.1 | The hold becomes `RELEASED` and carries the moment it was released.                                                               |
| 9.2 | The transaction becomes `COMPLETED`, carries its completion time, and stores the agreement it was settled on.                     |
| 9.3 | The property becomes `SOLD`.                                                                                                      |
| 9.4 | The agreement is generated and stored **before** any of those three writes, so a failure to produce it leaves the hold untouched. |
| 9.5 | The agreement names the parties, the property and the agreed price — `finalPrice`, not the asking price.                          |
| 9.6 | Settlement email that fails does not fail the release. The money is settled; the notification is not the record.                  |

## 10 · Settlement is atomic

The three writes that settle a hold describe one event. A partial settlement is not a degraded outcome — it is a false record of where the money is.

| #    | Criterion                                                                                                              |
| ---- | ---------------------------------------------------------------------------------------------------------------------- |
| 10.1 | The hold, the transaction and the property are written inside one database transaction, opened exactly once.           |
| 10.2 | The agreement is generated and uploaded **before** the transaction opens — no third-party call is held open inside it. |
| 10.3 | A failure on any of the three writes fails the whole release. No subset of them survives.                              |
| 10.4 | A release that is refused never opens a transaction at all.                                                            |

---

## What the criteria caught

Writing the checklist first, then the tests, turned up three defects. All three are fixed; the tests that found them now guard them.

**4.3 — a release in flight could be started twice.** `TransactionsConsole` derived the row's in-progress state as `release.isPending ? confirmingId : null`, and dismissing the modal cleared `confirmingId`. Dismissing mid-flight therefore dropped that state to `null`: the row looked idle again, its release control returned, and pressing it re-opened the modal on an escrow that was already being released. Confirming a second time issued a second `PATCH` against the same hold.

**4.4 — dismissing mid-flight hid a running request.** The same clearing removed every trace of an in-flight release from the screen.

Both are fixed by deriving the in-flight id from the mutation itself — `release.isPending ? release.variables : null` — so dismissal cannot clear it and no second piece of state has to be kept in step.

**5.3 — a failed release said nothing.** `release.isError` was never rendered anywhere. A buyer who pressed the money button and hit a failing gateway saw the modal close and the row unchanged, with no way to tell whether the release had gone through. The modal now stays open on failure and states that the funds were not released and the escrow is still held.

## What the server criteria caught

Sections 07–10 are green: `EscrowService.release` grants and refuses exactly as written, and a refused release leaves no trace — no agreement, no upload, no email, no write. `EscrowController.release` decides on the authenticated caller and nothing else.

Three things the checklist surfaced were **not** written as criteria at the time, because each needed a decision before it could be a test rather than a wish. One of the three — atomicity — has since been decided and is now section 10.

**The seller is never paid.** `release` moves the hold to `RELEASED`, completes the transaction and marks the property `SOLD` — and transfers nothing. `StripeService` exposes `createPaymentIntent`, `confirmPayment`, `refundPayment` and `getPaymentIntent`; there is no transfer or payout method. `Escrow.stripeTransferId` and `Escrow.stripeAccountId` exist on the model and are never written. The sentence at the top of this document — "transfers the held amount to the seller" — is not true of the code. Closing this needs Stripe Connect and a decision about onboarding sellers as connected accounts.

**Settlement was not atomic — it is now.** The three writes ran in a `Promise.all`, so a failure between them could leave a released hold against an in-progress transaction, or a sold property against an unreleased hold. Stage 04 of the field guide names this exact case: _"Accepting an offer while marking a property sold must not half-succeed."_ It is closed. `PrismaContext` ([ADR 0011](adr/0011-transactions-via-ambient-client.md)) gives the repository layer a transaction boundary it did not have, and `release` and `refund` now open one around their three writes. The agreement is still generated and uploaded first, outside the transaction, so no Cloudinary round-trip is held open inside it. Section 10 above is the checklist this closed against.

**A refusal tells a stranger too much.** `requireHeld` runs before the authorisation check, so an unauthorised caller learns whether a hold exists and whether it has settled — 404 and 400 separate from 403. Moving the ownership check ahead of the state check closes it, at the cost of one extra branch.

## Note on placement

`lib/data/purchases.ts` held no data. It is the ranking, filtering, totalling and labelling logic behind this flow, and criteria in sections 02, 05 and 06 test it directly — so it now lives at `lib/utils/purchases.ts`, beside the other derivations, with its tests colocated. `lib/data/` is meant to disappear as the consoles go live; this module had to move rather than go. Its fixtures stay in `lib/data/__fixtures__/`, which is where test fixtures belong.
