# Elegant-UI Skill Iteration Report

## 1. Scoreboard

| Sample      | Before avg | After avg | Δ        | Biggest lift                              |
| ----------- | ---------- | --------- | -------- | ----------------------------------------- |
| kpi         | 2.4        | 4.0       | **+1.6** | depth 3→5, hierarchy 2→4, composition 2→4 |
| table       | 3.0        | 4.0       | **+1.0** | hierarchy 2→4, composition 4→5            |
| listingCard | 3.2        | 3.2       | **0.0**  | depth 2→3 (but composition 4→3 regressed) |
| contactRow  | 3.2        | —         | n/a      | not re-judged                             |
| panelForm   | 2.6        | —         | n/a      | not re-judged                             |

Re-judged mean: **2.87 → 3.73 (+0.86)**. The two v1-only samples (contactRow, panelForm) were the two lowest-composition briefs and never got a v2 pass — treat their v1 failures as unverified-but-live.

---

## 2. Recurring gaps (v1 weaknesses, ranked)

These are the failures that repeated across samples — the skill's structural blind spots, not one-off misses.

1. **Focal number is undersized — hierarchy done by decoration, not scale (5/5 samples).**
   Every single v1 output clustered its type in the 14–18px band and leaned on a badge/tint/gradient to fake a hero. kpi hero was one step above peers (`text-h4` vs `text-h5`); table price was `text-h6`; contactRow budget `text-lg`; panelForm's focal count was buried in a `text-[10px]` corner pill; listingCard price `text-h6` sat next to `text-base` address. **The skill never enforces a size _ratio_.**

2. **Too roomy — density defaults are one notch loose (5/5 samples).**
   `p-4`/`md:p-6` where the bar wants `p-3`, `gap-4`/`gap-5` where it wants `gap-2`, `size-8`/`size-9` icon chips, `py-3` table rows. Every sample read "mid-sized and evenly weighted."

3. **Flat opaque fills — no translucency/blur/atmosphere (4/5: kpi, contactRow, listingCard, panelForm).**
   Depth was faked with `shadow-*` + a faint dot-grid or a `/10`–`/12` glow. Not one v1 output shipped a `backdrop-blur` translucent surface. This is the single dimension that moved _most_ on refine (kpi depth 3→5), confirming it was a real, fixable gap.

4. **Uniform grid / hero shares the peers' footprint (4/5: kpi, table, panelForm, listingCard-secondary).**
   The exact anti-pattern the briefs named. `grid-cols-4` with a "hero" flag, three equal header cards, N-identical toggle rows, mirror-image secondary cards. The hero differed by _color props_, not layout or span.

5. **Icons default to `size-4` (16px) everywhere (5/5).**
   No micro-detail register; every glyph — identity icon, Check/Minus, action button — sat at one size.

6. **No tonal nesting (3/5: kpi, contactRow, panelForm).**
   Secondary metrics floated directly on the card face; surfaces swapped `bg-background-*` paint instead of stepping tone via alpha.

7. **Icon-circle inflation + decorative chrome padding (kpi, listingCard, panelForm).**
   `size-7`/`size-9` `rounded-full place-items-center` icon circles bloated spec rows and toggle rows — generic pattern, pure roominess cost.

---

## 3. Proposed skill patch (ready to paste)

### Density values

```
- List/stat/toggle rows: p-3, gap-2 (max gap-3). Table body cells: px-3 py-2. NEVER p-4/md:p-6/gap-4/gap-5 on dense components.
- Reserve p-4 for the ONE featured/hero tile only; forbid p-5+ on any card body in the application register.
- Icon chips: size-6 (peers) / size-4 (hero). Glyph icons (Check, Minus, inline detail): size-3 (12px) strokeWidth={1.5}. Only a tier/identity icon may reach size-4.
- Micro-labels: text-[10px]/text-[11px] font-mono uppercase tracking-wide. Ban text-caption/text-xs as the label register.
- Section padding py-10, not py-16. Build vertical rhythm with a single `flex flex-col gap-4`, never stacked mt-5/mt-6 utilities.
- Ban rounded-full place-items-center icon circles on every row; use a compact inline stat cluster instead.
```

### Hierarchy through contrast (not decoration)

```
- ONE focal number per card/row. The label→value jump must be ≥3 type steps (e.g. text-[10px] label vs the focal value).
- Application register (KPI, CRM, pricing, listings): focal number caps at text-h4 (30px), peers at text-sm/text-xs. Hierarchy = the RATIO against tiny peers, not absolute bigness.
- Reserve text-h1/text-h2 focal numbers for editorial/marketing ONLY. Explicitly forbid them on dashboards/stat tiles.
- The focal number is SOLID, max-contrast (text-text / text-highlight-dark). BAN gradient bg-clip-text on the primary datum.
- Ban "Primary"/"Featured"/"Recommended" pills as the ranking mechanism. A label may annotate; scale + position must rank. The hero must read as hero with all badges removed.
- "At most one element per card may exceed text-h6" — flag any card where price + 3 specs all sit at text-base as "co-equal numbers fighting for focus."
```

### Depth

```
- Every component needs ≥1 translucent, blurred surface: bg-background/60 backdrop-blur-md over a soft glow. Ban all-opaque compositions (shadow + dot-grid ≠ depth).
- Tonal nesting is mandatory: nest secondary metrics in an inset surface — rounded-md bg-background-muted/60 p-2 — so every card has ≥2 tonal planes. Step tone via ALPHA (bg-highlight/8, bg-text/5), never by swapping bg-background-* tokens.
- Featured hero gets a real light source: an absolute blur-3xl bg-highlight/30 radial blob behind the focal number (pointer-events-none, -z-10), not a border/diagonal gradient.
- Hero elevation = exactly ONE edge treatment (ring-1 ring-highlight/20 OR border-highlight/25, not both) + shadow-md + backdrop-blur. Forbid the border+ring+shadow+blur quadruple stack.
- Glow colors MUST derive from the token: drop-shadow-[0_2px_10px_var(--color-highlight)] or color-mix(in oklab, var(--color-highlight) 28%, transparent). Add raw rgba()/#hex inside shadow/drop-shadow utilities to the reject list.
```

### Composition devices

```
- "One hero among peers" ⇒ MANDATE an asymmetric/bento layout. Forbid grid-cols-N-with-a-hero-flag. Use e.g. grid-cols-3 with hero col-span-2 row-span-2, or a hero tile + condensed sibling rail.
- Featured differentiation must be STRUCTURAL (scale, span, or an added data point), never cosmetic (border/ring/glow/tint alone). A recolored clone is an automatic hierarchy fail.
- Secondary/non-featured items must NOT mirror the hero as a uniform grid — vary the treatment (stacked table-row: thumbnail + inline specs + right-aligned price, or asymmetric tile sizing).
- Tables: lifted featured column gets -translate-y-2 + shadow-lg + ring-1 (NO scale-* — it desyncs from the fixed colgroup width). Run the SAME border-x continuously thead→tbody so the column reads as one plane.
- ONE surface owner per featured band: fill the <col> OR the cells, never both, and never both + per-cell border-x (stacked translucent fills compound alpha into a muddy, wavering edge).
- Motion: restrict hover:-translate-y-0.5 to the ONE focal/clickable tile. Quiet peers get transition-colors only. A lift must always signal "this one is focal."
- Never display-hidden the focal metric or status at any breakpoint. Collapse SECONDARY columns by stacking/truncating, not `hidden md:block`.
- Data tables need a scan affordance: hover:bg-background-muted/40 transition-colors on the <tr>.
```

### Signature details

```
- Encode urgency/state in the data layer via a token lookup (today → text-highlight, overdue → text-warning), not uniform text-text-muted.
- Meta/interest chips derive tone from the row's accent (bg-highlight/8 text-highlight-dark on hot) and cap visible count with a +N overflow chip.
- Ban stacked eyebrow-over-title that restates the same axis; an eyebrow must carry a NEW dimension (count, status, timestamp).
- Never `truncate` the only descriptive line — line-clamp-2, or cut it. In table value cells, whitespace-nowrap is for boolean glyphs/short tokens only; descriptive strings must wrap (leading-tight text-balance) or overflow-x scroll ensues.
- Off-token arbitrary values (size={17}, size={13}, py-[13px]) are a craft fail — snap to the scale.
```

### Doc structure

```
- Single-source rendering: if a Cell/ValueCell/Row component is defined, it MUST be the only renderer. A defined-but-unused component (or inline re-implementation of its branch logic) is an automatic craft fail — enforce the project's no-dead-code rule in the skill.
- Add a "density register" decision to the skill up front: application (dashboard/CRM/table/listing) vs editorial/marketing — it sets the focal-number cap (text-h4 vs text-h1) and padding scale. Make the model pick the register before writing.
```

---

## 4. Fixed by refine vs. still broken after feedback

**The refine step reliably fixed (soft gaps — a nudge was enough):**

- **Depth/atmosphere.** kpi depth 3→5, listingCard 2→3, table stayed 4. Once told "translucency + backdrop-blur + real glow," the model delivered.
- **Composition / plane-breaking hero.** kpi composition 2→4, table 4→5. The asymmetric-layout and lifted-column mandates landed hard.
- **Hierarchy when the target was explicit.** kpi 2→4, table 2→4.

**Stubborn — survived feedback, needs a HARD rule not a nudge:**

- **Density regresses exactly where hierarchy improves.** kpi hero over-corrected to `text-h2` + `p-5` + stacked `mt-5/mt-6` — it got a hero by becoming _airy_, re-breaking the dense bar. listingCard stayed `gap-4`/`md:p-5`. → Needs the absolute cap: **application focal ≤ text-h4, hero padding ≤ p-4, no stacked mt-\* margins.**
- **Co-equal numbers keep fighting for focus.** listingCard's v2 spec shelf shipped three `text-base` mono numbers competing with the price — composition actually _regressed_ 4→3. → Needs the hard **"at most one element exceeds text-h6"** rule; "make a hero" alone doesn't stop the model from making four.
- **Depth stays hoarded by the hero.** In v2 listingCard the standard cards were still opaque `bg-background + shadow-sm`. → Rule must say **every surface gets tonal nesting, not just the featured one.**
- **Craft literals persist.** v2 table introduced a raw `rgba(176,141,87,0.28)` in a drop-shadow and off-token `size={17}/size={13}` (kpi). Feedback improved layout but not token discipline. → Needs the explicit **reject-list for raw hex/rgba in shadow utilities and off-scale px icon sizes.**
- **Featured = cosmetic clone** (unverified, v1-only in panelForm) — a recolored row with identical layout. The structural-differentiation rule is the guard.

---

## 5. Keep / don't regress

- **Genuine asymmetric composition** — the v2 lifted, glowing, plane-breaking table column (composition 5) and kpi's true hero+peer-rail split are exactly the target. Preserve the "asymmetric layout, not grid-cols-N" instinct.
- **Real atmosphere when invoked** — v2 depth scores (kpi 5, table 4, listingCard 3) show the translucency/blur/glow vocabulary works once triggered. Keep it.
- **Compact peer rails** — kpi's peer rail nailed density even when the hero didn't; that compact register is the reference for the whole component.
- **Clean decomposition & craft baseline** — contactRow/listingCard/panelForm all scored craft 4 in v1 for well-separated, data-driven structure. Don't let new density/hierarchy rules reintroduce inline branching or dead renderers.
- **Restrained featured emphasis when structural** — the table's ring + shadow + lift (minus the scale bug and triple band) is the right elevation recipe; keep it, just enforce single-owner surfaces.
