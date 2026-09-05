import type { ConfigField } from "@/components/patterns/config-field-grid";
import { LISTING_FORM_COPY as COPY } from "@/lib/config/listing-form-copy";
import {
    LISTING_AMENITY_SUGGESTIONS as AMENITY_SUGGESTIONS,
    LISTING_FEATURE_SUGGESTIONS as FEATURE_SUGGESTIONS,
} from "@/lib/config/listing-form";

type PlaceField =
    | "address"
    | "locality"
    | "region"
    | "postalCode"
    | "country"
    | "latitude"
    | "longitude";

type SpecField =
    | "price"
    | "bedrooms"
    | "bathrooms"
    | "sqFt"
    | "lotSqFt"
    | "yearBuilt"
    | "walkScore";

const OPTIONAL = COPY.optional;

export const LISTING_PLACE_FIELDS: readonly ConfigField<PlaceField>[] = [
    {
        name: "address",
        label: COPY.address,
        placeholder: "1 Beacon Hill Drive",
    },
    {
        name: "locality",
        label: COPY.locality,
        placeholder: "Beacon Hill",
    },
    {
        name: "region",
        label: COPY.region,
        placeholder: "Massachusetts",
    },
    {
        name: "postalCode",
        label: COPY.postalCode,
        placeholder: "02108",
        variant: "numeric",
    },
    {
        name: "country",
        label: COPY.country,
        placeholder: "US",
    },
    {
        name: "latitude",
        label: COPY.latitude,
        placeholder: "42.3583",
        variant: "numeric",
        hint: OPTIONAL,
    },
    {
        name: "longitude",
        label: COPY.longitude,
        placeholder: "-71.0636",
        variant: "numeric",
        hint: OPTIONAL,
    },
];

export const LISTING_SPEC_FIELDS: readonly ConfigField<SpecField>[] = [
    {
        name: "price",
        label: COPY.price,
        placeholder: "4750000",
        prefix: "$",
        variant: "numeric",
    },
    {
        name: "bedrooms",
        label: COPY.bedrooms,
        placeholder: "4",
        variant: "numeric",
    },
    {
        name: "bathrooms",
        label: COPY.bathrooms,
        placeholder: "3",
        variant: "numeric",
    },
    {
        name: "sqFt",
        label: COPY.sqFt,
        placeholder: "3200",
        suffix: "sq ft",
        variant: "numeric",
        hint: OPTIONAL,
    },
    {
        name: "lotSqFt",
        label: COPY.lotSqFt,
        placeholder: "8000",
        suffix: "sq ft",
        variant: "numeric",
        hint: OPTIONAL,
    },
    {
        name: "yearBuilt",
        label: COPY.yearBuilt,
        placeholder: "1998",
        variant: "numeric",
        hint: OPTIONAL,
    },
    {
        name: "walkScore",
        label: COPY.walkScore,
        placeholder: "72",
        suffix: "/ 100",
        variant: "numeric",
        hint: OPTIONAL,
    },
];

export const LISTING_TAG_FIELDS = [
    {
        name: "amenities",
        label: COPY.amenities,
        placeholder: "Pool, Wine cellar, Gym",
        suggestions: AMENITY_SUGGESTIONS,
    },
    {
        name: "features",
        label: COPY.features,
        placeholder: "Sea view, Smart home",
        suggestions: FEATURE_SUGGESTIONS,
    },
] as const;
