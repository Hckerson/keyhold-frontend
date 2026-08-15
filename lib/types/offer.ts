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
    photo: string;
    agent: string;
    agentPortrait: string;
    listPrice: number;
    offerPrice: number;
    counterPrice?: number;
    status: OfferStatus;
    minutesAgo: number;
    note: string;
}
