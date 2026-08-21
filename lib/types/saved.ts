export type SavedStatus = "available" | "under-offer" | "sold" | "withdrawn";

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
    savedDaysAgo: number;
    viewedDaysAgo: number;
    offerId?: string;
}
