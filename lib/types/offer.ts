export type OfferStatus =
    | "submitted"
    | "countered"
    | "accepted"
    | "rejected"
    | "withdrawn";

export interface Offer {
    id: string;
    address: string;
    offerPrice: number;
    listPrice: number;
    counterPrice?: number;
    status: OfferStatus;
    lastActivity: string;
}
