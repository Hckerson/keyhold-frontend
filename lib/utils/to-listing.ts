import type { Property } from "@/lib/validations/property";
import type { Listing, ListingAgent } from "@/lib/types/listing";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

const daysSince = (iso: string) =>
    Math.max(
        0,
        Math.floor((Date.now() - new Date(iso).getTime()) / MS_PER_DAY),
    );

const toAgent = (property: Property): ListingAgent => {
    const seller = property.seller;
    return {
        id: seller?.id ?? property.sellerId,
        name: seller?.fullName ?? "Listing advisor",
        title: seller?.jobTitle ?? "Property advisor",
        agency: seller?.agencyName ?? "",
        license: seller?.licenseNumber ?? "",
        phone: seller?.phoneNumber ?? "",
        email: seller?.email ?? "",
        avatarUrl: seller?.avatar ?? "",
        rating: 0,
        reviews: 0,
        responseTime: "",
        activeListings: 0,
    };
};

export const toListing = (property: Property): Listing => {
    const sqft = property.sqFt ?? 0;

    return {
        id: property.id,
        title: property.title,
        price: property.price,
        beds: property.bedrooms,
        baths: property.bathrooms,
        sqft,
        lotSqft: property.lotSqFt ?? 0,
        yearBuilt: property.yearBuilt ?? 0,
        type: property.type,
        status: property.status,
        address: property.address,
        locality: property.locality,
        zipcode: property.postalCode,
        listedDaysAgo: daysSince(property.createdAt),
        saves: property._count?.savedBy ?? 0,
        walkScore: property.walkScore ?? 0,
        agentId: property.sellerId,
        agent: toAgent(property),
        images: property.images.map((image) => image.url),
        description: property.description,
        features: property.features,
        pricePerSqft: sqft > 0 ? Math.round(property.price / sqft) : 0,
    };
};
