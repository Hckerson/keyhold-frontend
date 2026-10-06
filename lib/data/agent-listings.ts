import { CalendarCheck, Eye, Handshake, Store, Wallet } from "lucide-react";
import {
    AGE_BANDS,
    AGE_BAND_KEYS,
    DEMAND_BANDS,
    DEMAND_BAND_KEYS,
    LISTING_STATUSES,
    LISTING_STATUS_KEYS,
    type AgeBand,
    type DemandBand,
} from "@/lib/config/listing-tones";
import {
    BULK_TRANSITIONS,
    type BulkAction,
    type BulkStatusAction,
} from "@/lib/config/listing-bulk";
import type {
    BulkStatusTarget,
    ListingStatusFilter,
    ManagedListing,
    StatDatum,
} from "@/lib/types";
import {
    dateFormatter,
    formatCompactUsd,
    formatCount,
    percentOf,
    sum,
} from "@/lib/utils";
import { isPromotionActive } from "@/lib/utils/promotion";

export const FEATURED_DATE_FORMAT = "MMM d, yyyy";

export const FILTERS: { id: ListingStatusFilter; label: string }[] = [
    { id: "all", label: "All" },
    ...LISTING_STATUS_KEYS.map((id) => ({
        id,
        label: LISTING_STATUSES[id].label,
    })),
];

export const allowsBulk = (listing: ManagedListing, action: BulkAction) =>
    action === "delete" ||
    BULK_TRANSITIONS[action].from.includes(listing.status);

export const bulkStatusTarget = (
    listings: ManagedListing[],
    action: BulkStatusAction,
): BulkStatusTarget => {
    const ids = listings
        .filter((listing) => allowsBulk(listing, action))
        .map((listing) => listing.id);
    return { action, ids, skipped: listings.length - ids.length };
};

export const matchesStatus = (
    listing: ManagedListing,
    filter: ListingStatusFilter,
) => filter === "all" || listing.status === filter;

export const saveRate = (listing: ManagedListing) =>
    percentOf(listing.saves, listing.views);

export const isFeatured = (listing: ManagedListing, now = new Date()) =>
    isPromotionActive(listing.featuredUntil, now);

export const featuredUntilLabel = (listing: ManagedListing) =>
    listing.featuredUntil
        ? dateFormatter(listing.featuredUntil, FEATURED_DATE_FORMAT)
        : undefined;

export const pricePerSqft = (listing: ManagedListing) =>
    Math.round(listing.price / listing.sqft);

export const peakViews = (listings: ManagedListing[]) =>
    Math.max(1, ...listings.map((listing) => listing.views));

export const exposureOf = (listing: ManagedListing, peak: number) =>
    percentOf(listing.views, peak);

export const demandBandOf = (listing: ManagedListing): DemandBand =>
    DEMAND_BAND_KEYS.find(
        (id) => saveRate(listing) >= DEMAND_BANDS[id].floor,
    ) ?? "quiet";

export const ageBandOf = (listing: ManagedListing): AgeBand =>
    AGE_BAND_KEYS.find((id) => listing.listedDaysAgo < AGE_BANDS[id].ceiling) ??
    "stale";

export const onMarket = (listings: ManagedListing[]) =>
    listings.filter((listing) => LISTING_STATUSES[listing.status].onMarket);

export const rankListings = (listings: ManagedListing[]) =>
    [...listings].sort(
        (a, b) =>
            Number(LISTING_STATUSES[b.status].onMarket) -
                Number(LISTING_STATUSES[a.status].onMarket) ||
            b.offers - a.offers ||
            b.views - a.views ||
            b.price - a.price,
    );

export const countByStatus = (
    listings: ManagedListing[],
): Record<ListingStatusFilter, number> => {
    const counts: Record<ListingStatusFilter, number> = {
        all: listings.length,
        active: 0,
        "under-offer": 0,
        sold: 0,
        draft: 0,
        expired: 0,
    };
    for (const listing of listings) counts[listing.status] += 1;
    return counts;
};

export const portfolioValue = (listings: ManagedListing[]) =>
    sum(onMarket(listings).map((listing) => listing.price));

export const listingStats = (listings: ManagedListing[]): StatDatum[] => [
    {
        id: "on-market",
        icon: Store,
        label: "On market",
        value: `${onMarket(listings).length}`,
        tone: "accent",
    },
    {
        id: "portfolio",
        icon: Wallet,
        label: "Portfolio",
        value: formatCompactUsd(portfolioValue(listings)),
        tone: "highlight",
    },
    {
        id: "views",
        icon: Eye,
        label: "Views",
        value: formatCount(sum(listings.map((listing) => listing.views))),
        tone: "info",
    },
    {
        id: "showings",
        icon: CalendarCheck,
        label: "Showings",
        value: `${sum(listings.map((listing) => listing.showings))}`,
        tone: "warning",
    },
    {
        id: "offers",
        icon: Handshake,
        label: "Offers",
        value: `${sum(listings.map((listing) => listing.offers))}`,
        tone: "success",
    },
];

export const listingsSummary = (listings: ManagedListing[]) =>
    `${onMarket(listings).length} on market · ${formatCompactUsd(portfolioValue(listings))} portfolio`;
