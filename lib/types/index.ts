export type UserTier = "standard" | "premium" | "platinum";

export interface User {
    id: string;
    email: string;
    name: string;
    tier: UserTier;
    verified: boolean;
    createdAt: string;
    updatedAt: string;
}

export type ViewingType = "open" | "appointment" | "private";

export interface Listing {
    id: string;
    title: string;
    description: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    squareFeet: number;
    viewingType: ViewingType;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    latitude: number;
    longitude: number;
    images: string[];
    createdAt: string;
    updatedAt: string;
}

export type OfferStatus =
    | "draft"
    | "pending"
    | "accepted"
    | "rejected"
    | "closed";

export interface Offer {
    id: string;
    listingId: string;
    buyerId: string;
    price: number;
    status: OfferStatus;
    message?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Message {
    id: string;
    conversationId: string;
    senderId: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export interface ViewingRequest {
    id: string;
    listingId: string;
    buyerId: string;
    requestedDate: string;
    status: "pending" | "approved" | "rejected";
    createdAt: string;
    updatedAt: string;
}
