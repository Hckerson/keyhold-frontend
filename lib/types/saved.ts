export type SavedStatus = "available" | "under-offer" | "sold" | "withdrawn";

export type SavedStatusFilter = SavedStatus | "all";

export type SavedSortKey = "rank" | "move" | "match" | "price-asc" | "recent";

export interface SavedListing {
    id: string;
    address: string;
    locality: string;
    photo: string;
    price: number;
    savedPrice: number;
    beds: number;
    baths: number;
    sqft: number;
    status: SavedStatus;
    matchScore: number;
    savedDaysAgo: number;
    viewedDaysAgo: number;
    offerId?: string;
}
