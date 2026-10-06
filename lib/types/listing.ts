import type { PropertyStatus, PropertyType } from "@/lib/enums/enums";
import type { BulkStatusAction } from "@/lib/config/listing-bulk";

export type ListingStatus = PropertyStatus;

export type ListingType = PropertyType;

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

export interface Listing {
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
    latitude: number | null;
    longitude: number | null;
    listedDaysAgo: number;
    saves: number;
    walkScore: number;
    agentId: string;
    soldMonthsAgo?: number;
    agent: ListingAgent;
    images: string[];
    description: string;
    features: string[];
    pricePerSqft: number;
    featured: boolean;
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
    featuredUntil: string | null;
}

export type ListingStatusFilter = ManagedListingStatus | "all";

export interface BulkTransition {
    from: readonly ManagedListingStatus[];
    to: PropertyStatus;
}

export interface BulkStatusChange {
    ids: readonly string[];
    status: PropertyStatus;
}

export interface BulkStatusTarget {
    action: BulkStatusAction;
    ids: readonly string[];
    skipped: number;
}

export interface ListingRowData {
    imageUrl: string;
    address: string;
    price: number;
    beds: number;
    baths: number;
    sqft: number;
}
