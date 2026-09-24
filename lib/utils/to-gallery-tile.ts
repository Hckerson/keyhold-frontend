import type { Property } from "@/lib/validations/property";
import type { GalleryTileData } from "@/lib/types/home";
import { formatUsd } from "@/lib/utils";
import { formatCount } from "@/lib/utils/format";
import { isPromotionActive } from "@/lib/utils/promotion";

export const toGalleryTile = (property: Property): GalleryTileData => ({
    id: property.id,
    imageUrl: property.images[0]?.url ?? "",
    price: formatUsd(property.price),
    address: `${property.address}, ${property.locality}`,
    specs: `${property.bedrooms} Bd · ${property.bathrooms} Ba · ${formatCount(property.sqFt ?? 0)} Sq Ft`,
    agentName: property.seller?.fullName ?? "Listing advisor",
    featured: isPromotionActive(property.featuredUntil),
});
