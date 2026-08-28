import { daysSince } from "@/lib/utils/elapsed";
import type { PropertyStatus } from "@/lib/enums/enums";
import type { Property } from "@/lib/validations/property";
import type { ManagedListing, ManagedListingStatus } from "@/lib/types/listing";

export const MANAGED_STATUS_BY_PROPERTY: Record<
    PropertyStatus,
    ManagedListingStatus
> = {
    AVAILABLE: "active",
    PENDING: "under-offer",
    SOLD: "sold",
    DRAFT: "draft",
    EXPIRED: "expired",
};

export const PROPERTY_STATUS_BY_MANAGED: Record<
    ManagedListingStatus,
    PropertyStatus
> = {
    active: "AVAILABLE",
    "under-offer": "PENDING",
    sold: "SOLD",
    draft: "DRAFT",
    expired: "EXPIRED",
};

export const toManagedListing = (property: Property): ManagedListing => ({
    id: property.id,
    address: property.address,
    locality: property.locality,
    photo: property.images[0]?.url ?? "",
    price: property.price,
    beds: property.bedrooms,
    baths: property.bathrooms,
    sqft: property.sqFt ?? 0,
    status: MANAGED_STATUS_BY_PROPERTY[property.status],
    listedDaysAgo: daysSince(property.createdAt),
    views: property.viewsCount,
    saves: property._count?.savedBy ?? 0,
    showings: property._count?.viewings ?? 0,
    offers: property._count?.offers ?? 0,
    featuredUntil: property.featuredUntil ?? null,
});
