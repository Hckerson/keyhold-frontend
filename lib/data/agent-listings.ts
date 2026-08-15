import { CalendarCheck, Eye, Handshake, Store, Wallet } from "lucide-react";
import type { ShareDatum } from "@/components/patterns/share-row";
import type { StatDatum } from "@/components/patterns/stat-cell";
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
import { propertyImage } from "@/lib/data/sample-images";
import type { ManagedListing, ManagedListingStatus } from "@/lib/types";
import { formatCompactUsd, formatCount, percentOf, sum } from "@/lib/utils";

export type StatusFilter = ManagedListingStatus | "all";

export const FILTERS: { id: StatusFilter; label: string }[] = [
    { id: "all", label: "All" },
    ...LISTING_STATUS_KEYS.map((id) => ({
        id,
        label: LISTING_STATUSES[id].label,
    })),
];

export const BULK_ACTIONS = ["publish", "draft", "renew", "delete"] as const;

export type BulkAction = (typeof BULK_ACTIONS)[number];

export const BULK_LABELS: Record<BulkAction, string> = {
    publish: "Publish",
    draft: "Move to Draft",
    renew: "Renew",
    delete: "Delete",
};

type StatusChangeAction = Exclude<BulkAction, "delete">;

const BULK_STATUS: Record<StatusChangeAction, ManagedListingStatus> = {
    publish: "active",
    draft: "draft",
    renew: "active",
};

export const initialListings: ManagedListing[] = [
    {
        id: "oak-avenue",
        address: "456 Oak Avenue",
        locality: "Beverly Hills",
        photo: propertyImage(0),
        price: 3_200_000,
        beds: 4,
        baths: 3,
        sqft: 5200,
        status: "active",
        listedDaysAgo: 41,
        views: 2840,
        saves: 164,
        showings: 12,
        offers: 2,
    },
    {
        id: "sunset-blvd",
        address: "789 Sunset Blvd",
        locality: "West Hollywood",
        photo: propertyImage(1),
        price: 2_950_000,
        beds: 3,
        baths: 2.5,
        sqft: 4800,
        status: "under-offer",
        listedDaysAgo: 67,
        views: 3610,
        saves: 221,
        showings: 8,
        offers: 1,
    },
    {
        id: "oak-street",
        address: "234 Oak Street",
        locality: "Bel Air",
        photo: propertyImage(2),
        price: 4_500_000,
        beds: 5,
        baths: 4,
        sqft: 6500,
        status: "active",
        listedDaysAgo: 25,
        views: 1290,
        saves: 88,
        showings: 5,
        offers: 0,
    },
    {
        id: "canyon-ridge",
        address: "12 Canyon Ridge",
        locality: "Malibu",
        photo: propertyImage(3),
        price: 6_750_000,
        beds: 5,
        baths: 5.5,
        sqft: 7100,
        status: "draft",
        listedDaysAgo: 3,
        views: 0,
        saves: 0,
        showings: 0,
        offers: 0,
    },
    {
        id: "beverly-grove",
        address: "890 Beverly Grove",
        locality: "Los Angeles",
        photo: propertyImage(4),
        price: 2_400_000,
        beds: 3,
        baths: 2,
        sqft: 3200,
        status: "sold",
        listedDaysAgo: 156,
        views: 5120,
        saves: 342,
        showings: 19,
        offers: 4,
    },
    {
        id: "hillcrest-terrace",
        address: "77 Hillcrest Terrace",
        locality: "Pasadena",
        photo: propertyImage(5),
        price: 1_850_000,
        beds: 4,
        baths: 3,
        sqft: 3900,
        status: "expired",
        listedDaysAgo: 264,
        views: 940,
        saves: 41,
        showings: 3,
        offers: 0,
    },
    {
        id: "palisades-bluff",
        address: "18 Palisades Bluff",
        locality: "Pacific Palisades",
        photo: propertyImage(6),
        price: 8_400_000,
        beds: 6,
        baths: 6,
        sqft: 9200,
        status: "active",
        listedDaysAgo: 12,
        views: 4380,
        saves: 396,
        showings: 15,
        offers: 3,
    },
    {
        id: "montana-row",
        address: "301 Montana Row",
        locality: "Santa Monica",
        photo: propertyImage(7),
        price: 3_950_000,
        beds: 4,
        baths: 3.5,
        sqft: 4100,
        status: "under-offer",
        listedDaysAgo: 88,
        views: 2210,
        saves: 97,
        showings: 9,
        offers: 1,
    },
    {
        id: "brentwood-mews",
        address: "64 Brentwood Mews",
        locality: "Brentwood",
        photo: propertyImage(8),
        price: 5_100_000,
        beds: 5,
        baths: 4.5,
        sqft: 5800,
        status: "active",
        listedDaysAgo: 104,
        views: 1760,
        saves: 52,
        showings: 4,
        offers: 0,
    },
    {
        id: "laurel-canyon",
        address: "9 Laurel Canyon Way",
        locality: "Studio City",
        photo: propertyImage(9),
        price: 2_150_000,
        beds: 3,
        baths: 2,
        sqft: 2900,
        status: "draft",
        listedDaysAgo: 1,
        views: 0,
        saves: 0,
        showings: 0,
        offers: 0,
    },
];

export const saveRate = (listing: ManagedListing) =>
    percentOf(listing.saves, listing.views);

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
): Record<StatusFilter, number> => {
    const counts: Record<StatusFilter, number> = {
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

export const applyBulkAction = (
    listings: ManagedListing[],
    selectedIds: string[],
    action: BulkAction,
): ManagedListing[] => {
    if (action === "delete") {
        return listings.filter((listing) => !selectedIds.includes(listing.id));
    }
    const status = BULK_STATUS[action];
    return listings.map((listing) => {
        if (!selectedIds.includes(listing.id)) return listing;
        if (action === "renew") return { ...listing, status, listedDaysAgo: 0 };
        return { ...listing, status };
    });
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

export const statusShares = (listings: ManagedListing[]): ShareDatum[] => {
    const counts = countByStatus(listings);
    return LISTING_STATUS_KEYS.map((id) => ({
        id,
        icon: LISTING_STATUSES[id].icon,
        label: LISTING_STATUSES[id].label,
        value: `${counts[id]}`,
        percent: percentOf(counts[id], listings.length),
        tone: LISTING_STATUSES[id].chartTone,
    }));
};

export const demandShares = (listings: ManagedListing[]): ShareDatum[] =>
    DEMAND_BAND_KEYS.map((id) => {
        const count = listings.filter(
            (listing) => demandBandOf(listing) === id,
        ).length;
        return {
            id,
            icon: DEMAND_BANDS[id].icon,
            label: DEMAND_BANDS[id].label,
            value: `${count}`,
            percent: percentOf(count, listings.length),
            tone: DEMAND_BANDS[id].tone,
        };
    });

export const ageShares = (listings: ManagedListing[]): ShareDatum[] =>
    AGE_BAND_KEYS.map((id) => {
        const count = listings.filter(
            (listing) => ageBandOf(listing) === id,
        ).length;
        return {
            id,
            icon: AGE_BANDS[id].icon,
            label: AGE_BANDS[id].label,
            value: `${count}`,
            percent: percentOf(count, listings.length),
            tone: AGE_BANDS[id].tone,
        };
    });

export const listingsSummary = (listings: ManagedListing[]) =>
    `${onMarket(listings).length} on market · ${formatCompactUsd(portfolioValue(listings))} portfolio`;
