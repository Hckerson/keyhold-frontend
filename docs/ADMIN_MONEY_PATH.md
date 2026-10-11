# Admin Money Path — Acceptance Criteria

The admin escrow settlement flow: what must be true before `/admin/payments` reaches production.

This is the admin twin of `docs/archive/MONEY_PATH.md`, which covers the buyer releasing their own hold. Here an admin settles any hold on the platform, in either direction. Each criterion is written to become a test name. Anything here that is not yet true is a defect, not a preference.

**Surface:** `/admin/payments` → `AdminPaymentsConsole` → `EscrowSettleModal`
**Endpoints:** `GET /escrow` · `GET /escrow/stages` · `PATCH /escrow/:id/release` · `PATCH /escrow/:id/refund`

---

## What the flow is

Every purchase parks its money in an escrow hold. An admin sees every hold on the platform and can settle one that is still held: **release** pays the seller the net amount and completes the sale; **refund** repays the buyer in full and cancels it. Both are final. A hold under dispute is not settled here — the dispute's resolution settles it.

The asymmetry from the buyer flow holds twice over: **not settling is recoverable, settling wrongly is not**, and a refund that moves money while the screen says nothing moved is the worst outcome of all.

---

## 01 · Reading the holds

| #   | Criterion                                                                                                                  |
| --- | -------------------------------------------------------------------------------------------------------------------------- |
| 1.1 | Every hold on the platform is loaded, across as many pages as the server returns — never only the first page.              |
| 1.2 | A failed load of the holds renders `ConsoleUnavailable` with the `adminPayments` fallback and a working retry.             |
| 1.3 | While the escrow position is loading, or after it fails to load, no figure in the band is shown — never `$0` or `0 holds`. |
| 1.4 | The amount in escrow counts held and disputed holds only; released and refunded money is never counted as still held.      |
| 1.5 | While the holds are loading, the payouts panel shows no count and no reading — never `0` or `No payouts on record yet`.    |

## 02 · What is settlable

| #   | Criterion                                                                                                  |
| --- | ---------------------------------------------------------------------------------------------------------- |
| 2.1 | Only a hold whose status is `HELD` offers a settle action — in its row and in its detail.                  |
| 2.2 | A `RELEASED` or `REFUNDED` hold offers no settle action.                                                   |
| 2.3 | A `DISPUTED` hold offers no settle action: the server refuses it, and the dispute's resolution settles it. |

## 03 · Releasing

| #   | Criterion                                                                                                        |
| --- | ---------------------------------------------------------------------------------------------------------------- |
| 3.1 | The settle action never calls the API directly — it opens the confirmation.                                      |
| 3.2 | The confirmation names the agent, the deal and the net amount, and states that the action cannot be undone.      |
| 3.3 | Release is the mode the confirmation opens in, and it asks for no reason.                                        |
| 3.4 | Confirming calls `PATCH /escrow/:id/release` with the hold's own id, exactly once, then closes the confirmation. |
| 3.5 | Dismissing the confirmation without confirming calls nothing.                                                    |

## 04 · Refunding

| #   | Criterion                                                                                                              |
| --- | ---------------------------------------------------------------------------------------------------------------------- |
| 4.1 | Switching to refund changes the confirmation to the refund wording and its `Refund buyer` action.                      |
| 4.2 | A refund cannot be confirmed until its reason has at least four characters that are not blank — the server's own rule. |
| 4.3 | Confirming calls `PATCH /escrow/:id/refund` with the hold's own id and the trimmed reason, exactly once.               |
| 4.4 | Every confirmation opens in release mode with an empty reason, whatever the last one was left at.                      |

## 05 · While it is in flight

| #   | Criterion                                                                                        |
| --- | ------------------------------------------------------------------------------------------------ |
| 5.1 | A second click on the confirm action while the request is in flight sends nothing.               |
| 5.2 | The confirmation cannot be dismissed, and its mode cannot be switched, until the server answers. |

## 06 · When it fails

| #   | Criterion                                                                                                            |
| --- | -------------------------------------------------------------------------------------------------------------------- |
| 6.1 | A failed settlement keeps the confirmation open and says that nothing moved, in the wording of the mode that failed. |
| 6.2 | Switching mode after a failure clears the failure.                                                                   |
| 6.3 | After a failure the same settlement can be attempted again.                                                          |

## 07 · Finding a hold

| #   | Criterion                                                                                           |
| --- | --------------------------------------------------------------------------------------------------- |
| 7.1 | Picking a state narrows the holds to it; picking it again, or `Show every state`, shows every hold. |
| 7.2 | Searching matches the agent or the deal.                                                            |
| 7.3 | `Open deal` lands on `/admin/transactions` with that deal's review open.                            |

---

# The server half

| #   | Criterion                                                                                                                                                                                                |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| S.1 | A refund's reason is recorded against the hold, where both parties can see it. **Defect:** `EscrowService.refund` returns the reason and stores it nowhere.                                              |
| S.2 | A refund only reaches Stripe after the hold has been claimed for it, so a failed or repeated refund can never move money while the hold still reads held. **Defect:** Stripe is called before the claim. |
