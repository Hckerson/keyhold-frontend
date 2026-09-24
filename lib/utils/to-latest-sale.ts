import type { Property } from "@/lib/validations/property";
import type { LatestSaleData } from "@/lib/types/home";
import { formatCompactUsd } from "@/lib/utils";
import { daysBetween, elapsedLabel } from "@/lib/utils/elapsed";

type SoldProperty = Property & { soldAt: string };

export const hasSoldAt = (property: Property): property is SoldProperty =>
    typeof property.soldAt === "string";

export const toLatestSale = (property: SoldProperty): LatestSaleData => ({
    id: property.id,
    latitude: property.latitude,
    longitude: property.longitude,
    imageUrl: property.images[0]?.url ?? "",
    address: property.address,
    locality: property.locality,
    price: formatCompactUsd(property.price),
    specs: `${property.bedrooms} Bd · ${property.bathrooms} Ba`,
    soldLabel: `Sold ${elapsedLabel(property.soldAt)} ago`,
    daysOnMarket: daysBetween(property.createdAt, property.soldAt),
});
