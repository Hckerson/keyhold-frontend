# 0015 · Map surfaces wait on coordinates, not on a provider

**Status:** Accepted
**Date:** 2026-09-08

## Context

The Design-OS conformance audit found three routes short of their blueprint for the same reason. Page 4 (`/map`) is unbuilt entirely; `/search` module 5 has no Map View toggle; `/listing/[id]` module 5 renders a walk-score stat trio where Section 10 asks for a map with school, transit, park and restaurant markers and a toggleable legend. The audit's own reading was that "one unmade decision explains three gaps" — no map provider has been chosen or installed.

That reading is half right, and the half it misses is the expensive half.

A provider is genuinely absent: nothing in `package.json` resolves to Google Maps, Mapbox, Leaflet, MapLibre or `react-map-gl`, and no key exists in `.env.example`. But choosing one closes nothing, because the data underneath is not there either. `Property.latitude` and `Property.longitude` exist on the Prisma model and are nullable. `prisma/seed-data/` never sets them — a grep for `latitude` across the whole of `prisma/` returns nothing — so every seeded property has `latitude = null`. The view model drops them regardless: `Listing` in `lib/types/listing.ts` declares no coordinate fields, and `toListing` maps twenty-odd fields without touching them. `LocalityEntry` in `lib/data/localities.ts` is a `locality|region` string key with a count and no centroid, so it cannot seed a viewport either. There is no bounding-box or radius query on `/properties/search`.

Installing a map library against that would render an empty basemap.

## Decision

The three map surfaces stay unbuilt, and the blueprint stays as written. This is recorded as a deferral with a stated precondition rather than a rejection of the spec: Phase 4 Page 4 and Phase 5 Section 10 remain the target, and `design-os/` loses none of that text.

The precondition is coordinates, in this order: seed and backfill `latitude`/`longitude` on `Property`; widen `Listing` and extend `toListing` to carry them; add a bounding-box filter to the property search endpoint. Only then does the provider question become answerable, and only then is it worth spending a dependency on.

Until that lands, `/search` keeps Grid and List, `listing-neighborhood.tsx` keeps the walk-score trio, and the home page keeps the Latest Sales card row.

**Update, same day.** The precondition has since been met. `prisma/seed-data/coordinates.ts` holds a real centre per locality and places each property deterministically from its seed key, so properties in one neighbourhood spread rather than stack on a single pin; `prisma/backfill-coordinates.ts` (`pnpm db:backfill-coordinates`) applied it to all 34 seed properties, and is scoped to `seed-` ids with null coordinates so no real listing can be given a fabricated location. `Listing` now declares `latitude` and `longitude`, and `toListing` carries them. `GET /properties/search` accepts `south`/`north`/`west`/`east`, rejects an inverted latitude span, and handles a box that crosses the antimeridian.

The provider question was then settled in favour of **MapLibre GL** with **OpenFreeMap** tiles: an open-source renderer and a keyless tile source, so no account, token or billing relationship is needed to run the app. The tile origin is pinned in `lib/config/security-headers.ts`, which also gains `worker-src 'self' blob:` because MapLibre spawns its workers from blob URLs. `/map`, the search Map toggle, the listing map and a Latest Sales map all ship against real coordinates.

This record stays as written because the ordering it argues for — data first, library second — is the reusable part, and because it is the reason the maps render pins instead of an empty basemap.

## Rejected

**Install a provider now and render what we have.** The fastest route to something that looks like the blueprint, and the reason it loses is that it would look like it. A map with no markers, or markers at a geocoded-from-city-name approximation, reports a precision the data does not have — on a luxury listing where the buyer is judging the street, not the metro area. A wrong pin is worse than a stat trio that is honest about what it knows.

**Geocode addresses on read.** Removes the seeding problem by turning every list render into N geocoding calls, with a rate limit, a bill and a latency floor, and it still writes nothing back. It converts a data gap into a permanent runtime cost.

**Rewrite the blueprint to drop the map.** The user's instruction was explicit that `design-os/` is added to, never trimmed, and it is the right instruction here independently: the map is a real product requirement for this catalogue, and deleting the spec would erase the requirement rather than schedule it.

**A static map image per listing.** Cheap and needs no client library, but Section 10 specifies toggleable marker layers, which a raster image cannot do — and it still needs the coordinates that are missing.

## Consequences

The conformance ledger keeps three routes in "modules short" and one in "never built", and that is the accurate state rather than a papered-over one. Anyone reading the ledger now finds the blocking precondition named in one place instead of re-deriving it.

`Listing` carrying no coordinates is now a documented gap rather than an oversight, which makes it a tractable piece of work: the backfill and the type widening can land independently of any provider decision, and each is independently verifiable.

The cost is that the public surface stays visibly short of its blueprint until a provider is chosen, and `/map` remains a route named in the Phase 3 sitemap with nothing behind it.

With the backfill applied and MapLibre in place, that condition is met and the surfaces are built. Two consequences are worth carrying forward.

Tiles come from a free public endpoint with no contractual availability. That is the right trade for a keyless start and the wrong one for a launch that depends on the map; swapping to a paid style URL is a one-line change in `lib/config/map.ts` plus the CSP origin, which is why the style URL is a named constant rather than an inline string.

Section 10's school / transit / park / restaurant markers remain unbuilt, because a POI dataset is a second data problem this record does not solve. Placing invented school pins on a luxury listing would repeat exactly the error this ADR was written to avoid, so the neighborhood tab ships the map and the listing's own position and stops there.

**MapLibre costs 979 KB of client JavaScript**, which is the largest single chunk in the build and pushed total shipped JS from roughly 3.7 MB to 4.7 MB. `styles/bundle-budget.test.ts` caught it, and the budget was deliberately reseeded from 4200 KB to 5200 KB — preserving the same headroom the old figure had — rather than quietly widened. `components/ui/map-view.tsx` is a `next/dynamic` wrapper with `ssr: false` over `map-canvas.tsx`, so a visitor who never opens a map surface never fetches that chunk; the budget test measures bytes on disk and cannot see that, but the user does. If client weight later matters more than vector-tile quality, Leaflet with raster tiles is roughly a sixth of the size and the `MapCanvas` seam is where that swap would happen.
