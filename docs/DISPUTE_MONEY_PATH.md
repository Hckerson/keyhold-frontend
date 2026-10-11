# Dispute Money Path — Acceptance Criteria

The admin dispute settlement flow: what must be true before `/admin/disputes` reaches production.

This is the third money path, beside `docs/archive/MONEY_PATH.md` (a buyer releases their own hold) and `docs/ADMIN_MONEY_PATH.md` (an admin settles a held hold). A disputed hold is refused by both of those: only the dispute's decision moves it. Each criterion is written to become a test name. Anything here that is not yet true is a defect, not a preference.

**Surface:** `/admin/disputes` → `AdminDisputesConsole` → `DisputeDecisionModal`
**Endpoints:** `GET /disputes` · `GET /escrow` · `PATCH /disputes/:id/resolve` · `PATCH /disputes/:id/dismiss`

---

## What the flow is

A buyer raises a dispute on a deal, and the deal's escrow hold is frozen as `DISPUTED`. An admin reads the claim and the evidence, then decides once: **release** the hold to the seller, **refund** it to the buyer, or **dismiss** the dispute, which puts the hold back to `HELD` and lets the deal carry on. Every decision closes the dispute for good.

The server will not resolve a dispute without being told which way the money goes. A resolve that leaves the direction out is refused, so a single "resolve" action can never succeed.

---

## 01 · Reading a dispute

| #   | Criterion                                                                                                                    |
| --- | ---------------------------------------------------------------------------------------------------------------------------- |
| 1.1 | Each disputed deal shows the hold it froze, joined on the deal's `escrowHoldId`; the amount comes from the hold.             |
| 1.2 | A deal without a hold, or whose hold the escrow list did not return, shows its price and no escrow figure — never `$0`.      |
| 1.3 | A failed escrow load leaves the queue and every decision working; only the escrow figures are missing.                       |
| 1.4 | Open disputes (`OPEN` and `PENDING_REVIEW`) come first, longest open at the top; decided ones follow, latest decision first. |
| 1.5 | Each deal names its buyer and seller from the hold's deal, and marks the one who raised the dispute.                         |

## 02 · What can be decided

| #   | Criterion                                                                                           |
| --- | --------------------------------------------------------------------------------------------------- |
| 2.1 | Only an open dispute offers decisions; a resolved or dismissed one shows its outcome and no action. |
| 2.2 | An open dispute whose deal froze a hold offers three decisions: dismiss, release, refund.           |
| 2.3 | An open dispute with no hold offers dismiss and resolve only — there is no money to direct.         |

## 03 · Deciding

| #   | Criterion                                                                                                                                                                                     |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 3.1 | A decision never calls the API directly — it opens the confirmation for that decision, with an empty note.                                                                                    |
| 3.2 | The confirmation names the dispute and states that the decision is final. A release or refund names the amount and the person it pays when the hold is loaded, and the side it pays when not. |
| 3.3 | A decision cannot be confirmed until its note has at least four characters that are not blank.                                                                                                |
| 3.4 | Release calls `PATCH /disputes/:id/resolve` with the trimmed note and the outcome `RELEASE`, exactly once.                                                                                    |
| 3.5 | Refund calls `PATCH /disputes/:id/resolve` with the trimmed note and the outcome `REFUND`, exactly once.                                                                                      |
| 3.6 | Resolving a dispute with no hold sends the outcome `RELEASE`, which the server applies to no hold.                                                                                            |
| 3.7 | Dismiss calls `PATCH /disputes/:id/dismiss` with the trimmed note and no outcome.                                                                                                             |
| 3.8 | Closing the confirmation without confirming calls nothing.                                                                                                                                    |
| 3.9 | On success the dispute, escrow and transaction caches are invalidated, so no hold still reads frozen.                                                                                         |

## 04 · While it is in flight, and when it fails

| #   | Criterion                                                                  |
| --- | -------------------------------------------------------------------------- |
| 4.1 | A second confirm while the request is in flight sends nothing.             |
| 4.2 | A failed decision keeps the confirmation open and says that nothing moved. |

---

# The server half

| #   | Criterion                                                                                          |
| --- | -------------------------------------------------------------------------------------------------- |
| S.1 | Resolving without an outcome is refused, whether or not the dispute froze a hold.                  |
| S.2 | Dismissing restores every frozen hold to `HELD`; resolving releases or refunds every one, as told. |
