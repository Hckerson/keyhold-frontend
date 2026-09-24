import { PUBLIC_ROUTES } from "@/lib/constants";
import {
    LISTABLE_TYPE_OPTIONS,
    PRICE_BANDS,
    type FilterOption,
} from "@/lib/config/search-filters";
import { HOME_COPY } from "@/lib/data/home";
import type { BrowseEntry, BrowseGroup } from "@/lib/types";
import type { FacetCounts, LocalityCount } from "@/lib/validations/property";

const BROWSE_LOCALITY_COUNT = 6;

const searchHref = (param: string, value: string) =>
    `${PUBLIC_ROUTES.search}?${new URLSearchParams({ [param]: value })}`;

const toEntries = (
    options: FilterOption[],
    counts: Record<string, number>,
    param: string,
): BrowseEntry[] =>
    options
        .map((option) => ({
            id: option.id,
            label: option.label,
            count: counts[option.id] ?? 0,
            href: searchHref(param, option.id),
        }))
        .filter((entry) => entry.count > 0);

const toLocalityEntry = (entry: LocalityCount): BrowseEntry => ({
    id: `${entry.locality}|${entry.region}`,
    label: entry.locality,
    count: entry.count,
    href: searchHref("q", entry.locality),
});

export const toBrowseGroups = (
    facets: FacetCounts | null,
    localities: LocalityCount[],
): BrowseGroup[] =>
    [
        {
            title: HOME_COPY.browse.type,
            entries: toEntries(
                LISTABLE_TYPE_OPTIONS,
                facets?.type ?? {},
                "type",
            ).sort((a, b) => b.count - a.count),
        },
        {
            title: HOME_COPY.browse.price,
            entries: toEntries(PRICE_BANDS, facets?.price ?? {}, "price"),
        },
        {
            title: HOME_COPY.browse.locality,
            entries: localities
                .slice(0, BROWSE_LOCALITY_COUNT)
                .map(toLocalityEntry),
        },
    ].filter((group) => group.entries.length > 0);
