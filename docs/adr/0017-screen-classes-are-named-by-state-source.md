# 0017 · Screen classes are named by what drives their state

**Status:** Accepted
**Date:** 2026-09-09

## Context

The seven footer pages shipped as pure server trees: `app/(public)/privacy/page.tsx` is eleven lines that hand a frozen `ProsePage` constant to a pattern, and nothing below it declares `"use client"`. The contents rail is already sticky, but inert — the ninth link looks exactly like the first whether the reader is at the top of the page or the bottom of section nine. Scrolling changes the viewport and nothing else.

The question that forced this record was whether that rail should track the reader's position, and the answer turned out to depend on a distinction the codebase had never named. The app already contains a screen that changes as you move down it — the home Concierge, where an `IntersectionObserver` over a band across the middle of the viewport moves an accent bar and swaps label colours in a sticky column. Nobody had written down how that differs from a console, which also holds state and also re-renders as you interact with it.

Without the distinction, the cheap answer to "make the privacy rail track scroll" is to put `"use client"` on `ProsePage`. That pattern is shared by six public pages, so the one-word change pulls every legal and marketing page out of the server tree and breaks [ADR 0002](0002-per-route-rendering-split.md) — in a way nothing would fail on, because the pages would still render and still read correctly.

## Decision

Every screen in the app is classified by two questions: **what drives its state**, and **what that state does to the screen**. The answers give five classes, and each class carries a fixed boundary rule.

| Class                 | State source → effect                            | Client boundary                  | Instances                                  |
| --------------------- | ------------------------------------------------ | -------------------------------- | ------------------------------------------ |
| **Static document**   | none                                             | none — server all the way down   | `/blog`, any prose page under three blocks |
| **Reactive document** | viewport position → emphasis on rendered content | one leaf inside a server page    | home Concierge, the six prose pages        |
| **Console**           | server + input → substitution and refetch        | at the `*-console` section       | every portal route                         |
| **Experience**        | URL params + input → refetch                     | client, state carried in the URL | `search-experience`                        |
| **Reactive chrome**   | viewport → chrome only, never content            | one leaf                         | `header`, `listing-price-bar`              |

The line between the first two classes is one test: **delete the state and read the page.** If everything it said is still said, only less legibly, the state is emphasis and the screen is a reactive document. If content disappears, it was never a document — it is a console, and it owes loading, error and empty states.

A reactive document puts its client boundary on the smallest leaf that owns the state, never on the pattern or the page. `ProseContents` is that leaf: it takes `blocks` as props, observes the block headings through `SCROLL_HEADING_TRAIL`, and marks the reached one with `aria-current="location"`. `ProsePage`, `ProseBlock` and all six routes stay server components.

The observation band is part of the class, not the component. `SCROLL_NARRATIVE_BAND` (`-45% 0px -45% 0px`) is a strip across the middle of the viewport — whichever panel occupies it wins, which is what a narrative wants, because the panel being read is the one in front of you. `SCROLL_HEADING_TRAIL` (`-96px 0px -70% 0px`) is the top band below the header offset, and the active entry is the last heading passed rather than the one crossing the middle, which is what a table of contents wants. Both live in `lib/config/public-motion.ts` beside `REVEAL_VIEWPORT`.

## Rejected

**Make `ProsePage` a client component.** The two-character version of this change, and the reason the record exists. It moves six server-rendered pages — including the two the signup consent copy links to — into the client bundle to animate one rail, with no test and no type error to catch it. The failure is silent: the pages still render, still read correctly, and quietly stop being what [ADR 0002](0002-per-route-rendering-split.md) says the public site is.

**Track scroll with a listener and `getBoundingClientRect`.** What `header.tsx` does, and correct there — it reads one number against one threshold. For a contents rail it means measuring every heading on every frame, rAF-throttling the handler, and re-measuring whenever the layout reflows. `IntersectionObserver` is given the same answer by the browser off the main thread, and the band is declarative enough to be named as config.

**One shared band for both scroll-driven sections.** Tempting, because it collapses two constants into one. It is wrong on the merits: a narrative asks which panel is being looked at, a contents rail asks which section has been entered. A middle band on a table of contents highlights the wrong entry for the whole first screenful of every long section.

**Reuse the Concierge's index-based rail for the contents.** `ConciergeProgress` translates an accent bar by `activeIdx * 100%`, which is exact only because every step label is one line of the same height. Contents entries wrap at the rail's 14rem, so the bar would drift. Each entry carries its own left border instead — `border-accent` when active, `border-border-light` otherwise — which forms a continuous rail without measuring anything.

**Give the rail an `aria-live` region, or keep it `aria-hidden` like the Concierge's.** Two opposite errors. The Concierge rail is decorative — it duplicates panels sitting beside it — so hiding it is right. A contents rail is a real navigation landmark that a screen reader user tabs through, so it must stay exposed; but announcing every position change during a scroll is noise, not information. `aria-current="location"` states the fact without interrupting.

## Consequences

The classes are the vocabulary for placing new work. A screen's class now decides where `"use client"` may sit before any code is written, which is the point — the boundary question is settled by naming the screen, not by discovering later that a shared pattern went client.

Privacy moves from static document to reactive document, and so does every prose page that reaches `PROSE_CONTENTS_MIN_BLOCKS` — which today is all six of them, from contact at three blocks to help at seven. `/blog` is the only public page left in the static class, because it is a `JournalIndex` rather than a `ProsePage`. That is the intended reach: the threshold, not the route, decides, so a short page added later gets no rail and needs no exception. Every one of these pages still ships its full text in the server HTML — the leaf decorates content that is already there, so with JavaScript off the rail degrades to exactly the anchor list it was.

`proseHeadingId` in `lib/config/prose.ts` is now the one definition of the heading anchor. `ProseBlock` writes it and `ProseContents` reads it; previously the `-heading` suffix was a literal in one file that nothing else knew about.

The observer is not exercisable in jsdom — `IntersectionObserver` has no layout to observe there — so there is no unit test for the active entry, and there should not be a mocked one that only asserts the mock fired. What is testable is the ordering rule — last reached heading in document order wins — and it is three lines inside the callback. If a third band appears, or the rule has to differ between the narrative and the rail, it moves to `lib/utils/` and gets a test then.

Revisit when a public page needs state that changes what it says rather than how it reads. That page is not a document, and forcing it into `ProsePage` would be the mistake this record exists to prevent.
