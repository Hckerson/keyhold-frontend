import { PUBLIC_ROUTES } from "@/lib/constants";
import type { Listing } from "@/lib/types";
import { formatCount } from "@/lib/utils/format";
import { toListing } from "@/lib/utils/to-listing";
import type { PropertyPage, PropertyQuery } from "@/lib/validations/property";

export interface JournalEntry {
    id: string;
    title: string;
    lede: string;
    author: string;
    publishedAt: string;
    href: string;
}

export interface JournalLatest {
    listings: Listing[];
    total: number;
}

export const JOURNAL_ENTRIES: readonly JournalEntry[] = [];

export const JOURNAL_LATEST_QUERY: PropertyQuery = {
    status: "AVAILABLE",
    sort: "newest",
    limit: 4,
};

export const toJournalLatest = (page: PropertyPage | null): JournalLatest => ({
    listings: (page?.items ?? []).map(toListing),
    total: page?.total ?? 0,
});

export const JOURNAL_COPY = {
    eyebrow: "Journal",
    title: "Notes on the market",
    lede: "Occasional writing on architecture, pricing and the mechanics of buying at this end of the market.",
    emptyEyebrow: "Issue 01 · In preparation",
    emptyTitle: "Nothing published yet",
    emptyLede:
        "The first dispatch is being written. In the meantime, the listings are the more interesting read.",
    emptyAction: "Browse listings",
    emptyHref: PUBLIC_ROUTES.search,
    latestLabel: "Meanwhile on the market",
    latestTotal: (total: number) => `${formatCount(total)} available`,
} as const;
