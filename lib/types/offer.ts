export type OfferStatus =
    | "submitted"
    | "countered"
    | "accepted"
    | "rejected"
    | "withdrawn";

export interface Offer {
    id: string;
    listingId: string;
    address: string;
    locality: string;
    photo: string | null;
    agent: string;
    agentPortrait: string | null;
    listPrice: number;
    offerPrice: number;
    counterPrice?: number;
    status: OfferStatus;
    minutesAgo: number;
    note: string;
}
