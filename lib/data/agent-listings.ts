import type { ManagedListing, ManagedListingStatus } from "@/lib/types";

export type StatusFilter = ManagedListingStatus | "all";

export const FILTERS: { id: StatusFilter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "active", label: "Active" },
    { id: "under-offer", label: "Under Offer" },
    { id: "sold", label: "Sold" },
    { id: "draft", label: "Draft" },
    { id: "expired", label: "Expired" },
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

const today = () => new Date().toISOString().slice(0, 10);

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
        if (action === "renew")
            return { ...listing, status, listDate: today() };
        return { ...listing, status };
    });
};

export const initialListings: ManagedListing[] = [
    {
        id: "1",
        address: "456 Oak Avenue, Beverly Hills, CA",
        price: 3200000,
        beds: 4,
        baths: 3,
        sqft: 5200,
        status: "active",
        listDate: "2024-06-15",
        views: 2840,
        saves: 164,
        showings: 12,
        offers: 2,
    },
    {
        id: "2",
        address: "789 Sunset Blvd, West Hollywood, CA",
        price: 2950000,
        beds: 3,
        baths: 2.5,
        sqft: 4800,
        status: "under-offer",
        listDate: "2024-05-20",
        views: 3610,
        saves: 221,
        showings: 8,
        offers: 1,
    },
    {
        id: "3",
        address: "234 Oak Street, Bel Air, CA",
        price: 4500000,
        beds: 5,
        baths: 4,
        sqft: 6500,
        status: "active",
        listDate: "2024-07-01",
        views: 1290,
        saves: 88,
        showings: 5,
        offers: 0,
    },
    {
        id: "4",
        address: "12 Canyon Ridge, Malibu, CA",
        price: 6750000,
        beds: 5,
        baths: 5.5,
        sqft: 7100,
        status: "draft",
        listDate: "2024-07-08",
        views: 0,
        saves: 0,
        showings: 0,
        offers: 0,
    },
    {
        id: "5",
        address: "890 Beverly Grove, Los Angeles, CA",
        price: 2400000,
        beds: 3,
        baths: 2,
        sqft: 3200,
        status: "sold",
        listDate: "2024-03-02",
        views: 5120,
        saves: 342,
        showings: 19,
        offers: 4,
    },
    {
        id: "6",
        address: "77 Hillcrest Terrace, Pasadena, CA",
        price: 1850000,
        beds: 4,
        baths: 3,
        sqft: 3900,
        status: "expired",
        listDate: "2023-11-14",
        views: 940,
        saves: 41,
        showings: 3,
        offers: 0,
    },
];
