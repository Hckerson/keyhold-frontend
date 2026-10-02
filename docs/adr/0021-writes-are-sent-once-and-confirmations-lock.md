# 0021 · Writes are sent once, and confirmations lock while in flight

**Status:** Accepted
**Date:** 2026-09-24

## Context

A button-safety audit of every action control found that the rules [MONEY_PATH.md](../archive/MONEY_PATH.md) set for the escrow release were not holding in production, and had never been written down for anything else.

Three causes sat underneath most of the findings:

- **Every failed write was sent twice.** `createQueryClient` gave mutations the same `retryUnlessExpired` policy as queries, so any failure except a 401 was repeated about a second later. A release that timed out after the server had committed was retried, refused as already settled, and the buyer was told "Nothing has moved and the escrow is still held" about money that had moved. Offers, messages, payment intents and suspensions were exposed the same way. The tests could not see it: every suite that exercised a write built its own client with `mutations: { retry: false }`.
- **A modal could always be dismissed mid-request.** Several confirmations disabled Cancel while pending, but Escape, the backdrop and the header X still closed them. For a `silentError` mutation — whose failure is reported only inside the modal ([0013](0013-mutation-feedback-is-global-by-default.md)) — dismissal hid the outcome entirely. MONEY_PATH 4.4 had made mid-flight dismissal an explicit requirement.
- **There was no shared confirmation.** About ten bespoke modals each rewired pending, failure and reset, and each missed something: no inline failure, closing before the result, a stale error on reopen, a confirm that stayed live while its request ran. Meanwhile a dozen destructive actions — bulk delete, accepting an offer by drag, declining a lead, cancelling a viewing, removing a photo — had no confirmation at all.

## Decision

**Writes are never retried automatically.** Mutations default to `retry: false`; queries keep one retry unless the session has ended. A write that fails is reported once, and the person retries it deliberately from the control that is still in front of them.

**A confirmation cannot be dismissed while its request is in flight.** `Modal` takes `locked`; while it is set, Escape, backdrop and X are ignored and the X renders disabled. The request always gets an answer on screen — success closes the modal, failure keeps it open with the reason.

**Every destructive or irreversible action goes through one pattern.** `ConfirmModal` (`components/patterns/`) names the target and the effect, warns when it cannot be undone, uses the error tone with an effect-stating label, locks while pending, and swaps the warning for an inline failure. `useConfirmation` (`lib/hooks/`) owns the cycle around it: a request resets the mutation so no stale error survives a reopen, dismissal is refused while pending, and the target clears only on success.

## Rejected

**An allowlist of retryable mutations** — no mutation today needs one, and an allowlist is a second list that drifts from the hooks. Idempotent writes can opt back in with `retry` on the hook when one does.

**Idempotency keys on the backend** — the correct long-term defence against a duplicate write, and not excluded by this. It does not help the person in front of the screen, who still needs to see what happened; and it is a backend change per endpoint.

**Leaving dismissal open and reporting a late failure as a toast** — would have meant turning `silentError` off wherever a modal could close, reporting every failure twice while the modal stays open. Locking is shorter and keeps [0013](0013-mutation-feedback-is-global-by-default.md) intact.

## Consequences

A hung request holds its confirmation open until the client timeout answers it. That is the intended trade: a bounded wait against an outcome nobody sees.

MONEY_PATH 4.3 and 4.4 change meaning — dismissal mid-flight is now impossible rather than harmless — and their tests were rewritten to prove the lock.

A new destructive action has one obvious shape to take. What would make us revisit: a genuinely long-running write (bulk import, media processing), which should become a background job with its own status rather than a locked modal.
