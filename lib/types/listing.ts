import type { PropertyStatus } from "@/lib/enums/enums";

export type ListingStatus = Exclude<PropertyStatus, "for-rent">;

export type ListingType =
    | "estate"
    | "villa"
    | "penthouse"
    | "townhouse"
    | "condo";

export interface ListingAgent {
    id: string;
    name: string;
    title: string;
    agency: string;
    license: string;
    phone: string;
    email: string;
    avatarUrl: string;
    rating: number;
    reviews: number;
    responseTime: string;
    activeListings: number;
}

export interface ListingSeed {
    id: string;
    title: string;
    price: number;
    beds: number;
    baths: number;
    sqft: number;
    lotSqft: number;
    yearBuilt: number;
    type: ListingType;
    status: ListingStatus;
    address: string;
    locality: string;
    zipcode: string;
    listedDaysAgo: number;
    saves: number;
    walkScore: number;
    agentId: string;
    blurb: string;
    imageSeed: number;
    featureOffset: number;
    soldMonthsAgo?: number;
}

export interface Listing extends Omit<
    ListingSeed,
    "blurb" | "imageSeed" | "featureOffset"
> {
    agent: ListingAgent;
    images: string[];
    description: string;
    features: string[];
    pricePerSqft: number;
}

export type ManagedListingStatus =
    | "active"
    | "under-offer"
    | "sold"
    | "draft"
    | "expired";

export interface ManagedListing {
    id: string;
    address: string;
    locality: string;
    photo: string;
    price: number;
    beds: number;
    baths: number;
    sqft: number;
    status: ManagedListingStatus;
    listedDaysAgo: number;
    views: number;
    saves: number;
    showings: number;
    offers: number;
}
