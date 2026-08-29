# Growth Audit — Stage 12

Usage, growth and the loop back, audited against `docs/from-idea-to-click.md` stage 12. Ten concepts, over the public surface and the instrumentation behind it.

Each finding carries its own **Status** — `Open` or `Fixed`. The status line on each finding is the record; this header makes no claim about the set.

**Verdict:** this is the stage the guide predicted would be emptiest, and it is. Five findings, **three of them now fixed** — the SEO set, 12.2 through 12.4. The two that remain, 12.1 and 12.5, both need a dependency and both are blocked behind 10.4: analytics on a product nobody can reach measures zero of everything. But the shape of the emptiness is worth naming precisely: the product measures its users' businesses in detail and measures its own usage not at all. Every number on the agent analytics console describes a property's performance; no number anywhere describes whether anyone found the site, completed a flow, or came back.

The stage's own summary in the guide says it plainly — _"stage 12 is the one that tells you which of the other eleven to work on next."_ With 23 findings open across the other eleven stages, that is not an abstract loss.

---

## What came back clean

| Concept               | Evidence                                                                                                                                                                     |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **SEO — rendering**   | The findable half of the site is genuinely server-rendered. `/`, `/search` and `/listing/[id]` render on the server; the private portals are correctly client-side.          |
| **SEO — titles**      | Seven routes set metadata, and `generateMetadata` on the listing page is dynamic and per-property, with a real fallback for a listing that no longer exists.                 |
| **Feedback channels** | Not instrumented, but present in the product itself — messaging, enquiries and the concierge flow are direct lines to users. Recorded as available rather than as a finding. |

**Not applicable yet:** A/B testing, funnels and cohorts. All three need traffic to be meaningful, and the guide is explicit that testing without volume means _"reading noise confidently."_ Nothing to fix until stage 10 puts the product somewhere people can reach it.

---

## 12.1 · The product measures its users' businesses and not its own

> **Concept:** product analytics · **Severity:** the loop back to stage 01 has no input · **Status:** Open

There is no product analytics of any kind — no dependency, no event, no call. `grep -rli "gtag|posthog|mixpanel|plausible|segment|dataLayer"` across the frontend returns nothing.

What the search _does_ return is instructive: `lib/data/agent-analytics.ts`, `lib/hooks/use-stats.ts`, `app/agent/analytics/page.tsx`, a whole `stats` module on the backend. The product contains a substantial analytics feature — for agents, about their listings. Views, enquiries, conversion per property, all rendered into a console.

So the capability exists and is pointed outward. Nobody can answer whether a buyer who signed up ever saved a listing, how many people abandoned the offer flow, or which of the four portals is used at all.

The guide's warning applies to the fix as much as the gap:

> Pick the **three** numbers that would change a decision — one acquisition, one activation, one retention — and instrument those properly.

For this product those are close to obvious: signups, first saved listing or first enquiry, and return visits within thirty days.

**To close:** three events, named deliberately, behind one analytics dependency. Event names are effectively permanent — renaming loses the history — so this is worth ten minutes of naming before any code.

## 12.2 · A listing page a search engine cannot read properly

> **Concept:** structured data · **Severity:** the highest-leverage SEO gap for this product · **Status:** Fixed

No JSON-LD anywhere — zero occurrences of `application/ld+json` or `schema.org`.

For a general site that is a minor omission. For a property marketplace it is the central one. `schema.org/RealEstateListing` and `Offer` exist precisely so a search result can carry a price, an address and a photo, and every one of those fields is already loaded on `/listing/[id]` and already passed to `generateMetadata`. The data is in hand and thrown away at the point it would matter most.

**Fixed.** `lib/utils/to-listing-schema.ts` maps a `Property` to a typed `RealEstateListing` document — address split into postal parts, price as a schema.org `Offer` whose availability follows the property status, and optional blocks for images, floor size, year built and coordinates that are omitted rather than emitted as nulls. The listing page renders it.

This introduced the codebase's first `dangerouslySetInnerHTML`, which is unavoidable for JSON-LD in Next. `JSON.stringify` alone does not neutralise a `</script>` sequence in seller-supplied text, so `serialiseSchema` escapes `<` to `<`. Eight tests cover the mapper, two of them the escaping specifically.

## 12.3 · No sitemap and no robots file

> **Concept:** SEO · **Severity:** discovery depends entirely on external links · **Status:** Fixed

Neither `app/sitemap.ts` nor `app/robots.ts` exists. Nothing tells a crawler which listings exist or which portals to stay out of.

The second half is the part worth caring about. With no `robots.ts`, `/admin`, `/agent` and `/dashboard` are not disallowed. They redirect unauthenticated visitors so nothing leaks, but crawl budget gets spent on them, and their URLs are discoverable.

Next generates both from a file, and the listing sitemap can be produced from the same server API the public pages already call.

**Fixed.** `app/robots.ts` allows the public site, disallows the three portals and the auth routes, and points at the sitemap. `app/sitemap.ts` emits the public routes plus every available listing, paging through `propertiesServerAPI.list` via `pageCount` and capped at twenty pages so a large catalogue cannot stall a build. A failed fetch degrades to the static routes rather than throwing. The build now emits `/robots.txt` and `/sitemap.xml`.

## 12.4 · The metadata stops at title and description

> **Concept:** SEO · **Severity:** every share of a listing is a bare link · **Status:** Fixed

`generateMetadata` on the listing page returns exactly two fields:

```ts
return {
    title: `${property.title}, ${property.locality} | Luxury Real Estate`,
    description: property.description,
};
```

No `openGraph`, no `twitter`, no canonical URL, no image. A listing shared into WhatsApp, iMessage or Slack — which is how property links actually travel — arrives as a bare grey rectangle, for a product whose entire value proposition is photographs of beautiful houses.

`description` also passes the property's full description through unbounded; search engines truncate around 160 characters, so most listings will render mid-sentence.

**Fixed.** The listing metadata now carries `openGraph` with the primary property image, a canonical URL, and a description clamped to 160 characters on a word boundary by a new `clamp` helper in `lib/utils/format.ts`. The root layout gained `metadataBase`, without which a relative image URL resolves to nothing.

This needed a public origin, which nothing in the frontend knew. `config.site.url` reads `NEXT_PUBLIC_SITE_URL`, and the frontend gained the `.env.example` it never had — documenting all eight variables. That is half of 10.2; the validation half is still open.

## 12.5 · Nothing measures what real visitors experience

> **Concept:** Core Web Vitals · RUM vs. synthetic · **Severity:** field data does not exist · **Status:** Open

No `useReportWebVitals`, no RUM of any kind. LCP, INP and CLS are unmeasured, and the guide is specific that these are judged at the 75th percentile of _real_ visits, not in a lab.

This compounds two findings from stage 11. 11.2 established that the one latency number the system reports is a median, and 11.4 that no request id threads a journey — so server-side timing is already blunt. Adding no client-side measurement at all means the question "is the site fast for the people using it" has no instrument pointed at it from either end.

The public routes are the ones this matters for, and they are the ones that are server-rendered — so the answer is probably decent today. That is a guess, which is the finding.

**To close:** `useReportWebVitals` reporting into whatever 12.1 chooses, so the field data lands next to the product events rather than in a second system.

---

## The loop back

The guide draws stage 12 as an arrow returning to stage 01, and that arrow is the point of the diagram:

> shipping is not the end of the road, it is how you find out what to build next.

This audit has now produced 56 findings across twelve stages. Which of the 23 still open deserve doing is currently a matter of engineering judgement — reasonable, but unmeasured. 12.1 is what converts that judgement into evidence, and it is the reason this stage is worth doing before, not after, working through the backlog it would inform.

The one caveat: none of it means anything until stage 10 is answered. Analytics on a product nobody can reach measures zero of everything.
