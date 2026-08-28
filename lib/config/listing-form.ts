import type { ConfigField } from "@/components/patterns/config-field-grid";
import {
    PROPERTY_TYPES,
    PROPERTY_TYPE_LABELS,
    type PropertyType,
} from "@/lib/enums/enums";

export interface ListingDraft {
    title: string;
    description: string;
    address: string;
    locality: string;
    region: string;
    postalCode: string;
    price: string;
    bedrooms: string;
    bathrooms: string;
    sqFt: string;
    lotSqFt: string;
    yearBuilt: string;
    type: PropertyType;
    amenities: string;
    features: string;
}

export const LISTING_TYPE_OPTIONS = PROPERTY_TYPES.map((value) => ({
    value,
    label: PROPERTY_TYPE_LABELS[value],
}));

export const EMPTY_LISTING_DRAFT: ListingDraft = {
    title: "",
    description: "",
    address: "",
    locality: "",
    region: "",
    postalCode: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    sqFt: "",
    lotSqFt: "",
    yearBuilt: "",
    type: "HOUSE",
    amenities: "",
    features: "",
};

export const LISTING_TAG_SEPARATOR = ",";

export const DESCRIPTION_ROWS = 5;

export const LISTING_FORM_COPY = {
    createTitle: "List a new property",
    createLede: "Everything a buyer needs to decide it is worth a viewing",
    createSubmit: "Publish listing",
    editTitle: "Edit listing",
    editLede: "Update what buyers see on this listing",
    editSubmit: "Save changes",
    back: { label: "Back to listings", href: "/agent/listings" },
    identity: "The property",
    identityLede: "How the listing introduces itself",
    place: "Where it is",
    placeLede: "Used for search, mapping and regional reporting",
    specs: "What it offers",
    specsLede: "The measures buyers filter on",
    extras: "Amenities and features",
    extrasLede: "Separate each entry with a comma",
    title: "Listing title",
    description: "Description",
    address: "Street address",
    locality: "Locality",
    region: "Region",
    postalCode: "Postal code",
    price: "Asking price",
    bedrooms: "Bedrooms",
    bathrooms: "Bathrooms",
    sqFt: "Interior sq ft",
    lotSqFt: "Lot sq ft",
    yearBuilt: "Year built",
    type: "Property type",
    amenities: "Amenities",
    features: "Features",
    optional: "Optional",
    cancel: "Cancel",
    failed: "That listing could not be saved.",
    retry: "Check the highlighted fields and try again.",
} as const;

type PlaceField = "address" | "locality" | "region" | "postalCode";
type SpecField =
    | "price"
    | "bedrooms"
    | "bathrooms"
    | "sqFt"
    | "lotSqFt"
    | "yearBuilt";
type ExtraField = "amenities" | "features";

const OPTIONAL = LISTING_FORM_COPY.optional;

export const LISTING_PLACE_FIELDS: readonly ConfigField<PlaceField>[] = [
    {
        name: "address",
        label: LISTING_FORM_COPY.address,
        placeholder: "1 Beacon Hill Drive",
    },
    {
        name: "locality",
        label: LISTING_FORM_COPY.locality,
        placeholder: "Beacon Hill",
    },
    {
        name: "region",
        label: LISTING_FORM_COPY.region,
        placeholder: "Massachusetts",
    },
    {
        name: "postalCode",
        label: LISTING_FORM_COPY.postalCode,
        placeholder: "02108",
        variant: "numeric",
    },
];

export const LISTING_SPEC_FIELDS: readonly ConfigField<SpecField>[] = [
    {
        name: "price",
        label: LISTING_FORM_COPY.price,
        placeholder: "4750000",
        prefix: "$",
        variant: "numeric",
    },
    {
        name: "bedrooms",
        label: LISTING_FORM_COPY.bedrooms,
        placeholder: "4",
        variant: "numeric",
    },
    {
        name: "bathrooms",
        label: LISTING_FORM_COPY.bathrooms,
        placeholder: "3",
        variant: "numeric",
    },
    {
        name: "sqFt",
        label: LISTING_FORM_COPY.sqFt,
        placeholder: "3200",
        suffix: "sq ft",
        variant: "numeric",
        hint: OPTIONAL,
    },
    {
        name: "lotSqFt",
        label: LISTING_FORM_COPY.lotSqFt,
        placeholder: "8000",
        suffix: "sq ft",
        variant: "numeric",
        hint: OPTIONAL,
    },
    {
        name: "yearBuilt",
        label: LISTING_FORM_COPY.yearBuilt,
        placeholder: "1998",
        variant: "numeric",
        hint: OPTIONAL,
    },
];

export const LISTING_EXTRA_FIELDS: readonly ConfigField<ExtraField>[] = [
    {
        name: "amenities",
        label: LISTING_FORM_COPY.amenities,
        placeholder: "Pool, Wine cellar, Gym",
        hint: OPTIONAL,
    },
    {
        name: "features",
        label: LISTING_FORM_COPY.features,
        placeholder: "Sea view, Smart home",
        hint: OPTIONAL,
    },
];
