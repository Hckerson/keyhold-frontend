import { daysSince } from "@/lib/utils/elapsed";
import type { SavedProperty } from "@/lib/api/saved-properties";
import type { PropertyStatus } from "@/lib/enums/enums";
import type { SavedListing, SavedStatus } from "@/lib/types/saved";

export const SAVED_STATUS_BY_PROPERTY: Record<PropertyStatus, SavedStatus> = {
    AVAILABLE: "available",
    PENDING: "under-offer",
    SOLD: "sold",
    DRAFT: "withdrawn",
    EXPIRED: "withdrawn",
};

export const toSavedListing = (entry: SavedProperty): SavedListing => {
    const { property } = entry;

    return {
        id: property.id,
        address: property.address,
        locality: property.locality,
        photo: property.images[0]?.url ?? "",
        price: property.price,
        savedPrice: property.price,
        beds: property.bedrooms,
        baths: property.bathrooms,
        sqft: property.sqFt ?? 0,
        status: SAVED_STATUS_BY_PROPERTY[property.status],
        savedDaysAgo: daysSince(entry.createdAt),
        viewedDaysAgo: daysSince(entry.createdAt),
    };
};
