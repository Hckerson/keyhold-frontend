import { config } from "@/lib/constants";
import type { Property } from "@/lib/validations/property";

const CURRENCY = "USD";
const SQFT_UNIT = "FTK";

interface PostalAddressSchema {
    "@type": "PostalAddress";
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
}

interface QuantitativeValueSchema {
    "@type": "QuantitativeValue";
    value: number;
    unitCode: string;
}

interface GeoCoordinatesSchema {
    "@type": "GeoCoordinates";
    latitude: number;
    longitude: number;
}

interface OfferSchema {
    "@type": "Offer";
    price: number;
    priceCurrency: string;
    availability: string;
}

interface ListingSchema {
    "@context": "https://schema.org";
    "@type": "RealEstateListing";
    url: string;
    name: string;
    description: string;
    datePosted: string;
    address: PostalAddressSchema;
    offers: OfferSchema;
    numberOfBedrooms: number;
    numberOfBathroomsTotal: number;
    image?: string[];
    floorSize?: QuantitativeValueSchema;
    yearBuilt?: number;
    geo?: GeoCoordinatesSchema;
}

const availabilityOf = (status: Property["status"]) =>
    status === "AVAILABLE"
        ? "https://schema.org/InStock"
        : "https://schema.org/SoldOut";

export const toListingSchema = (property: Property): ListingSchema => ({
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    url: `${config.site.url}/listing/${property.id}`,
    name: property.title,
    description: property.description,
    datePosted: property.createdAt,
    address: {
        "@type": "PostalAddress",
        streetAddress: property.address,
        addressLocality: property.locality,
        addressRegion: property.region,
        postalCode: property.postalCode,
        addressCountry: property.country,
    },
    offers: {
        "@type": "Offer",
        price: property.price,
        priceCurrency: CURRENCY,
        availability: availabilityOf(property.status),
    },
    numberOfBedrooms: property.bedrooms,
    numberOfBathroomsTotal: property.bathrooms,
    ...(property.images.length > 0 && {
        image: property.images.map((image) => image.url),
    }),
    ...(property.sqFt !== null && {
        floorSize: {
            "@type": "QuantitativeValue",
            value: property.sqFt,
            unitCode: SQFT_UNIT,
        },
    }),
    ...(property.yearBuilt !== null && { yearBuilt: property.yearBuilt }),
    ...(property.latitude !== null &&
        property.longitude !== null && {
            geo: {
                "@type": "GeoCoordinates",
                latitude: property.latitude,
                longitude: property.longitude,
            },
        }),
});

export const serialiseSchema = (schema: ListingSchema) =>
    JSON.stringify(schema).replace(/</g, "\\u003c");
