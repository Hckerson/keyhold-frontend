# 0012 · `styles/tokens.css` is the design source of truth

**Status:** Accepted
**Date:** 2026-08-28

## Context

Two files claimed authority over the same design system, and finding 02.2 of the stage 02 audit recorded that they shared no vocabulary: `keyhold-real-estate.md` named its type scale `display-xl` / `body-md` / `caption-md` in pixels, `styles/tokens.css` names its `h1`–`h6` / `base` / `caption` in rems. No mapping existed between them, so neither could be checked against the other.

The audit left the decision open because it read as a genuine tie. It is not one. Reading both files settles it.

The two documents do not describe one system in two vocabularies. They describe two different brands:

|           | `keyhold-real-estate.md`        | `styles/tokens.css`                     |
| --------- | ------------------------------- | --------------------------------------- |
| Primary   | `#0057ff` — saturated blue      | `#faf8f4` — warm off-white              |
| Accent    | `#001e36` — deep navy           | `#1f4e3d` — forest green                |
| Highlight | absent                          | `#b08d57` — brass                       |
| Ground    | `#f9f9f9` / `#181a1a` ink       | `#faf8f4` cream over `#16241d` sidebar  |
| Display   | `acumin-pro`, `acumin-pro-wide` | `--nf-display`, falling back to a serif |

A palette swap is a redesign, not a drift. Nothing in the code reads the document, and nothing in the document survives into the code.

The document is also not a handoff artifact in the first place. It carries agent-skill frontmatter — `name`, `description`, and a `packages` list prescribing shadcn, `lodash` and `react-hook-form` — and it sat at the workspace root, outside both applications. It is the seed prompt the project was generated from, in the same family as `design-os/`. It stopped describing the system the moment the system was built.

## Decision

`styles/tokens.css` is the single source of truth for colour, type, spacing, radii and motion. Every design decision is named there and referenced through the scale classes in `styles/globals.css`.

`keyhold-real-estate.md` moves to `docs/archive/` rather than being deleted. It is the record of what the project was originally asked to be, which is worth keeping and worthless to follow. Nothing reads it, nothing validates against it, and no design question is settled by consulting it.

## Rejected

**Regenerate the brand document from the tokens.** Rejected because a second file that restates the first is a second thing to keep in step, and the audit's own complaint was that two files claimed one authority. Adding a generator does not reduce the count to one.

**Rename the tokens to match the document's vocabulary** — the option the audit offered as the mirror image. Rejected because the document's vocabulary describes a palette the product does not use. Adopting `display-xl` would mean adopting names for a scale that no longer exists, and the pixel values behind them contradict the rem values that ship.

**Delete the document outright.** Rejected on the same principle the ADR README states for superseded records: the old file stays, with its status changed. Deleting it is what happened to the ADRs in `7a2857a`, and finding 03.1 exists because of it.

## Consequences

There is now no prose description of the brand — no palette rationale, no type-scale intent, only the token file and the classes over it. A designer joining the project reads CSS. That is an accepted cost: the token file is the artifact that is true, and a prose companion is exactly the thing that goes stale, as this one did.

Colour contrast remains unverified. The stage 02 audit recorded that the palette was never measured against WCAG AA, and archiving the brand document does not change that — it removes a competing palette, it does not validate the surviving one. That work is still open and is not what this record closes.
