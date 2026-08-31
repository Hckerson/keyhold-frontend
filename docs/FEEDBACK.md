# Mutation feedback

How the app tells someone their action worked or failed. The decision behind it — and the
alternatives it beat — is [ADR 0013](adr/0013-mutation-feedback-is-global-by-default.md); this
file is the working reference: the contract, the copy rules, the parts, and how to lift the
whole thing into another project.

---

## 1. The one rule

**Every mutation reports its failure. Silence is opt-in and has to be spelled.**

Feedback attaches to the `MutationCache`, not the call site, so a mutation nobody remembered to
wire still reports. There is no way to add a silent mutation by forgetting something — only by
writing `silentError: true`, which is greppable and shows up in review.

---

## 2. The contract

One `meta` block per mutation. Nothing else.

```ts
export function useCreateOffer() {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.createOffer,
        mutationFn: (input: CreateOfferInput) => offersAPI.create(input),
        onSuccess: () =>
            client.invalidateQueries({ queryKey: queryKeys.offers.all }),
    });
}
```

The copy lives in [`lib/config/feedback.ts`](../lib/config/feedback.ts), never in the hook:

```ts
createOffer:   { success: "Offer submitted", silentError: true },
acceptCounter: { success: "Counter accepted", error: "We couldn't accept the counter-offer." },
cancelViewing: { error: "We couldn't cancel the viewing." },
```

Three fields, each independent, because success and failure are reported independently:

| Field         | Type     | Effect                                                                                                      |
| ------------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| _(omitted)_   | —        | Error toast with `GENERIC_FAILURE`. The safety net: a new mutation is never silent.                         |
| `error`       | `string` | Error toast titled with your copy. Any backend message is shown beneath it.                                 |
| `success`     | `string` | Success toast. Fires only when present — most actions already show their result on screen.                  |
| `silentError` | `true`   | Suppresses the error toast, because the screen reports the failure inline. Does **not** suppress `success`. |

`meta` is typed by augmenting TanStack's `Register` interface in
[`lib/types/query.ts`](../lib/types/query.ts), so a typo in a field name is a compile error.
`MutationFeedback` is a `type` alias rather than an `interface` on purpose — TanStack constrains
meta to `Record<string, unknown>`, and only a type alias carries the implicit index signature
that satisfies it.

### Adding feedback to a new mutation

1. Add a key to `FEEDBACK` in `lib/config/feedback.ts`.
2. Add `meta: FEEDBACK.<key>` to the `useMutation` call.

That is the whole procedure. Skipping step 1 is not a failure mode — the mutation falls back to
generic error copy.

---

## 3. Choosing the copy

The mechanism is easy; the judgement is the part worth writing down.

**Give it `success` only when the outcome is not already visible.** A row that animates out is
its own confirmation — see [MOTION.md](MOTION.md) §8. Suspending a user, cancelling a viewing,
removing a saved search and deleting a listing all get an `error` and no `success`. Confirming
everything trains people to dismiss without reading, which costs you the toasts that matter.

**Give it `silentError` only when the failure is already reported in place**, and say where.
Today that is three situations:

| Situation                                         | Why inline wins                                                             |
| ------------------------------------------------- | --------------------------------------------------------------------------- |
| The 8 modals carrying a `failed` prop → `Callout` | An error you retry in context belongs beside the control you retry it with. |
| Auth forms (`AuthFormError` + `errorMessage`)     | The failure is about the fields on screen.                                  |
| Checkout (`useCheckout` owns an `error` string)   | A payment failure must not be dismissable in 8 seconds.                     |

Those modals still declare `success`, because the modal closes without confirming anything.
That asymmetry is exactly why the flag is `silentError` and not `silent`.

**Error copy names what failed, in the app's voice, without blaming.** "We couldn't cancel the
viewing." — not "Error", not "Request failed", not "You entered something wrong". The backend's
own message is appended as the description when it differs, so the copy is the human frame and
the server supplies the specifics.

---

## 4. The parts

| File                                                                      | Responsibility                                                                               |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| [`lib/config/feedback.ts`](../lib/config/feedback.ts)                     | All copy + the `MutationFeedback` shape. The only file most changes touch.                   |
| [`lib/api/query-client.ts`](../lib/api/query-client.ts)                   | `createQueryClient()` — the `MutationCache` that turns an outcome into a toast.              |
| [`lib/stores/toast-store.ts`](../lib/stores/toast-store.ts)               | Zustand store: `push` / `dismiss` / `clear`, plus the `notify()` escape hatch.               |
| [`lib/types/feedback.ts`](../lib/types/feedback.ts)                       | `Toast`, `ToastDraft`, `ToastTone`.                                                          |
| [`lib/types/query.ts`](../lib/types/query.ts)                             | `Register` augmentation that types `meta`.                                                   |
| [`components/ui/toast.tsx`](../components/ui/toast.tsx)                   | One notice: glyph, title, description, dismiss.                                              |
| [`components/ui/toast-viewport.tsx`](../components/ui/toast-viewport.tsx) | The rail. Portals to `document.body`, animates the stack.                                    |
| `styles/globals.css` → `.toast-rail`                                      | Rail geometry. Named class, because inline responsive chains are banned in `components/ui/`. |

Behaviour worth knowing without reading the source:

- **Durations and cap** are tokens in `lib/constants.ts`: `TOAST_DURATION` 5s, `TOAST_ERROR_DURATION`
  8s (failures need longer to read), `TOAST_STACK_LIMIT` 3. Overflow drops the **oldest** and clears
  its timer, so a dropped toast leaves nothing behind to fire later.
- **Accessibility** is derived from tone, not passed in: errors get `role="alert"` +
  `aria-live="assertive"`, everything else `role="status"` + `aria-live="polite"`.
- **Stacking order** — the rail sits at `--z-indices-toast: 80`, above `tooltip` (70) and `modal`
  (50), so a toast raised by a modal action is visible over it.
- **`notify()`** pushes a toast from outside a mutation. Use it sparingly; the cache covers the
  normal path.

### Two constraints that will bite if you move things

**The viewport must render inside `MotionProvider`.** Its `LazyMotion` is `strict`, so an `m`
component mounted outside that tree fails at runtime. The `createPortal` to `document.body` moves
the DOM node, not the React context — the JSX position is what matters.

**Session expiry does not use a toast.** A 401 in `lib/api/client.ts` triggers
`window.location.href`, and a full reload destroys the store before anything paints. The notice is
handed over as a query param (`loginExpired()` → `?expired=1`) and rendered by the login page as an
`AuthNotice`. Any other flow that reloads the page needs the same treatment.

---

## 5. Taking it elsewhere

The core is ~120 lines and is not specific to this domain. What it needs:

`@tanstack/react-query` · `zustand` · `nanoid` · `motion` (exit animation only) ·
`lucide-react` (glyphs). Only the first is load-bearing — the rest are swappable.

**Portable as-is:** `lib/types/feedback.ts`, `lib/types/query.ts`, `lib/stores/toast-store.ts`,
and the two `reportSuccess` / `reportError` functions from `query-client.ts`. That is the
mechanism.

**Expect to adapt:**

| Piece                   | What to change                                                                                                            |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `errorMessage()`        | Written for this backend's `{ message: string \| string[] }` envelope. Rewrite the unwrapping for your API's error shape. |
| `FEEDBACK`              | Your keys, your voice. Keep the shape.                                                                                    |
| `Toast` / `.toast-rail` | Fully house-styled — tokens, tone colours, 12px type, geometry. Rebuild against your design system.                       |
| `ToastTone`             | Derived here from `BadgeTone` via `Extract` to avoid a parallel list. Point it at your own tone union.                    |
| Durations, cap          | Constants. 5s/8s/3 is a starting point, not a finding.                                                                    |

**Order to port in:** types → store → viewport (prove one toast renders) → the `MutationCache`
→ copy registry → then sweep the call sites. Getting the cache in early is what makes the sweep
mechanical instead of a judgement call per mutation.

**The sweep is the real work, not the toast.** In this codebase it meant declaring `meta` on 56
mutations and — the part that is easy to miss — fixing 25 `void x.mutateAsync(...)` call sites
that were swallowing rejections entirely. A global `onError` does not save those: `mutateAsync`
still rejects, so the unhandled rejection remains. Moving them to `mutate(vars, { onSuccess })`
fixes it structurally, because `mutate` returns nothing and cannot reject. Grep for
`mutateAsync` early and budget for it.

---

## 6. Known limits

- **Bulk actions can overrun the stack.** Moderation settles flags one at a time, so a ten-row
  decision pushes ten toasts against three slots. Aggregation in the store is the fix if it
  becomes a real annoyance; it would want its own ADR.
- **Nothing forces considered copy.** `meta` is optional by design — the generic fallback is the
  safety net — so "is this the right message?" stays a review question, not a compiler one.
- **Toasts are ephemeral by design.** There is no history and nothing survives a reload. Anything
  that must persist belongs in the notifications feed, not here.
