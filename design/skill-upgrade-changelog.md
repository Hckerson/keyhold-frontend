# Elegant-UI Skill — Upgrade Compilation

**Source:** 21-agent audit workflow `wcnbw9v30` — 5 new component briefs × (Generate → Judge → Refine → Judge²), then a synthesis pass.
**Full raw report:** [`skill-audit-report.md`](./skill-audit-report.md).

---

## 1. Findings → rules now in `SKILL.md`

| #   | Finding (frequency across 5 samples)                      | Rule applied                                                                                                                                                                                                | Section                                  |
| --- | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| 1   | **Focal done by decoration, not scale (5/5)**             | _Hierarchy is a size RATIO_ — one focal datum per card; label→value jump **≥3 type steps**; focal caps `text-h4`, peers `text-sm/xs`; **ban gradient `bg-clip-text` on the primary datum**                  | Craft §1                                 |
| 2   | **Ranked by a badge / cosmetic "hero" (4/5)**             | _Rank by scale + position, never a badge_ — hero must read as hero with **all badges removed**; differentiation **structural, not cosmetic**                                                                | Craft §2                                 |
| 3   | **Flat opaque fills, no depth (4/5)**                     | _Depth is mandatory_ — ≥1 translucent `bg-background/60 backdrop-blur-md` surface + **≥2 tonal planes** via alpha (`bg-highlight/8`); featured `blur-3xl` glow blob; token-derived glow colors              | Craft §3 + "flat card" anti-pattern      |
| 4   | **Uniform grid / hero shares the peers' footprint (4/5)** | _Composition must be a DEVICE_ — mandate asymmetric/bento (`col-span-2 row-span-2`); **forbid `grid-cols-N` + a hero flag**; table featured column `-translate-y-2` (never `scale-*`)                       | Craft §4                                 |
| 5   | **Too roomy — density one notch loose (5/5)**             | Application register tightened: dense cards/rows `p-3` / `gap-2`; table cells `px-3 py-2`; `p-4` for the ONE hero tile only; **no `p-5+`**; micro-labels `text-[10px]/[11px] font-mono`; sections `py-10`   | Typography & density                     |
| 6   | **Icons `size-4` everywhere (5/5)**                       | Glyph icons `size-3` (12px); chip icons `size-6`; only a hero/identity icon reaches `size-4`                                                                                                                | density + Motion/icons                   |
| 7   | **Signature / state gaps**                                | Mono eyebrow must carry a **new dimension**; encode state in the **data layer** via a token lookup; chips cap with `+N`; **never `truncate` the sole descriptive line** (`line-clamp-2`); snap to the scale | Craft signature details + overflow guard |

**Also added:** 6 new anti-patterns (recolored-clone hero · gradient-clip on data · badge-as-ranking · totally-flat card · `p-5+`/`size-4`-everywhere · truncated sole line + off-token values), and a rewritten **self-check** (focal ratio ≥3 steps · remove-badges test · ≥1 translucent surface + ≥2 planes · device-not-grid).

---

## 2. Scoreboard (from the audit)

Re-judged mean **2.87 → 3.73** after a single refine pass.

| Sample      | Before | After | Δ                                                                           |
| ----------- | ------ | ----- | --------------------------------------------------------------------------- |
| kpi         | 2.4    | 4.0   | **+1.6**                                                                    |
| table       | 3.0    | 4.0   | **+1.0**                                                                    |
| listingCard | 3.2    | 3.2   | 0.0 _(composition regressed 4→3 — proved a cosmetic "featured" flag fails)_ |
| contactRow  | 3.2    | —     | judge² timed out (v1 only)                                                  |
| panelForm   | 2.6    | —     | judge² timed out (v1 only)                                                  |

**Key lesson:** the model fixes depth/hierarchy **only when told** → the rules had to become **hard mandates with exact values**, not nudges.

---

## 3. Components rebuilt against the new rules

- **`StatCard`** — `featured` hero variant (tonal lift to `bg-background`, `ring-highlight/15`, gradient depth wash, `text-h4` focal), **mono eyebrow**, **bordered-circle icon chip**. Agent "Total Pipeline" marked `featured`.
- **`SalesPipeline`** — dropped the gimmicky funnel/progress bars for a **clean aligned stage list** (name · count · value, `tabular-nums`), Closing row = _nearest win_ (brass). Per the user steer: "the stages, cleanly."

---

## 4. Status & open

- Skill **fully patched**; all `tsc` clean.
- **Uncommitted** (skill + `StatCard` + `SalesPipeline` + this report).
- Full workflow **re-run not done** (cost) — optional verification.
- **Open:** sweep the craft treatment (hero/depth/density/composition) across the remaining rows, panels, and page layouts.
