# 0013 · Mutation feedback is global by default, inline by exception

**Status:** Accepted
**Date:** 2026-08-31

Working reference for the system this record decides: [FEEDBACK.md](../FEEDBACK.md).

## Context

[0005](0005-query-owns-server-state.md) gave every console `isLoading` / `isError` / `refetch`, and `ConsoleUnavailable` turned that into a two-line error state per screen. Reads are covered. Writes were not.

An audit of the 56 `useMutation` definitions across 22 hook files found no `onError` handler anywhere, one `.catch()` in the entire frontend, and no `MutationCache` on the client in `components/providers/provider.tsx`. The design system had specified the missing piece twice — `phase-5-section-blueprints.md` section 50, and `toast.tsx` plus `use-toast.ts` in the `phase-8-frontend-architecture.md` tree — and neither was ever built.

The result was three separate failures. Nineteen call sites ran `void x.mutateAsync(...)` with no catch, so a rejected mutation became an unhandled rejection and nothing else; `moderation-console.tsx` closed its decision modal before the result was known, making a failed moderation indistinguishable from a successful one. Success was confirmed on exactly two surfaces — the `saved` flag in dashboard settings and the checkout `settled` state — so saving a property, sending a message, suspending a user and inviting a user all completed in silence. And where error feedback did exist it followed three unrelated conventions: a `failed` boolean threaded by hand into eight modals, `formError` with `errorMessage()` in the auth forms, and a private `error` string in `useCheckout`.

The common thread is that reporting an outcome was opt-in. Anything nobody remembered to wire reported nothing, and nothing in the type system or the lint rules noticed.

## Decision

Feedback is attached at the cache, not the call site. A `MutationCache` on the `QueryClient` carries `onError` and `onSuccess`; every mutation inherits both. `onError` pushes a toast built from `errorMessage(error, meta?.error ?? FEEDBACK.genericFailure)`, reusing the normaliser that already unwraps the backend's `string | string[]` message envelope. `onSuccess` pushes one only when the mutation asked for it.

Mutations declare their copy through TanStack's `meta`, typed by augmenting the `Register` interface with `mutationMeta: { success?: string; error?: string; silentError?: true }`. Copy lives in `lib/config/feedback.ts`, mirroring the shape of `CONSOLE_FALLBACKS`.

The two directions are opted into separately, because they fail separately. An error toast fires unless `silentError: true` says the failure is already reported in place; a success toast fires only when `success` copy is present. A single `silent` flag was the first shape and was wrong: the eight modals render an inline `Callout` on failure but close without confirming success, so they need the error suppressed and the confirmation kept — one flag cannot say that.

The eight modals keep their inline `Callout`, and the auth forms and checkout keep theirs. An error you can retry in context belongs next to the control you retry it with, not in a corner of the viewport — and a toast on top of an inline callout reports the same failure twice.

Success copy is likewise declared only where the outcome is not already visible. `MOTION.md` section 8 makes row exit double as confirmation; a toast saying a row was removed, next to the row visibly leaving, is noise.

Call sites move from `void x.mutateAsync(...).then(...)` to `x.mutate(vars, { onSuccess })`, which resolves the rejection problem structurally rather than by adding 19 catches: `mutate` does not return a promise and cannot reject.

The toast itself is built on the installed stack — a Zustand store, `motion` for the exit, and the existing tokens. This is the second global store, and [0005](0005-query-owns-server-state.md) requires a stated reason: mutation callbacks fire from the cache, outside the React tree, so a context provider cannot reach them.

## Rejected

**A toast library (`sonner`, `react-hot-toast`)** — roughly 80 lines of store, viewport and primitive against a new dependency that ships its own store, its own portal and its own styling to be overridden back to the tokens. [0012](0012-tokens-are-the-design-source-of-truth.md) makes that override the expensive part, and rule 6 makes the dependency a decision to be asked for rather than assumed.

**Per-hook `onError` on all 56 mutations** — the fix is the same edit 56 times, and the failure mode is unchanged: the 57th mutation is silent again, and nothing catches it in review. It also puts copy in the hook layer, where `lib/config/` is the project's answer.

**Handling it at the call site in each console** — worse than the hook version. The same mutation is called from several consoles, so the copy is duplicated per caller and drifts.

**A global `onSuccess` that always toasts** — makes the common case wrong. Most mutations already show their result on screen, and confirming everything trains people to dismiss without reading, which costs the toasts that matter.

**Routing errors into `ConsoleUnavailable`** — that component answers "this screen could not load", which is a query failure. A write that fails on a screen that loaded fine is a different event and should not blank the screen.

## Consequences

A new mutation reports its failures without anyone wiring it, and the only way to get silence is to write `silentError: true`, which is greppable and visible in review. Adding feedback to an existing mutation is a `meta` block, not a refactor.

The cost is one indirection: reading a hook no longer tells you what the user sees, because the behaviour lives on the cache and the copy lives in `lib/config/feedback.ts`. That is the same trade `CONSOLE_FALLBACKS` already makes.

`meta` is typed but not required, so a mutation that declares nothing still falls back to generic copy. That is deliberate — the fallback is the safety net — but it means "every mutation has considered copy" is a review question, not a compiler one.

What would make us revisit: if `silentError: true` becomes common rather than exceptional, the default is wrong and the inline pattern is the real one. If toast stacking becomes a problem on bulk actions — moderation settles flags one at a time, and a ten-row bulk decision would push ten toasts — the answer is aggregation in the store, and that would want its own record.
