import {
    PROPERTY_TYPES,
    PROPERTY_TYPE_LABELS,
    type PropertyStatus,
    type PropertyType,
} from "@/lib/enums/enums";

export interface ListingDraft {
    title: string;
    description: string;
    address: string;
    locality: string;
    region: string;
    postalCode: string;
    country: string;
    latitude: string;
    longitude: string;
    price: string;
    bedrooms: string;
    bathrooms: string;
    sqFt: string;
    lotSqFt: string;
    yearBuilt: string;
    walkScore: string;
    type: PropertyType;
    status: PropertyStatus;
    amenities: string[];
    features: string[];
}

export const DEFAULT_COUNTRY = "US";

export const EMPTY_LISTING_DRAFT: ListingDraft = {
    title: "",
    description: "",
    address: "",
    locality: "",
    region: "",
    postalCode: "",
    country: DEFAULT_COUNTRY,
    latitude: "",
    longitude: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    sqFt: "",
    lotSqFt: "",
    yearBuilt: "",
    walkScore: "",
    type: "HOUSE",
    status: "AVAILABLE",
    amenities: [],
    features: [],
};

export const CLEARABLE_LISTING_FIELDS = [
    "latitude",
    "longitude",
    "sqFt",
    "lotSqFt",
    "yearBuilt",
    "walkScore",
] as const satisfies readonly (keyof ListingDraft)[];

export const LISTING_TYPE_OPTIONS = PROPERTY_TYPES.map((value) => ({
    value,
    label: PROPERTY_TYPE_LABELS[value],
}));

export const LISTING_STATUS_HINTS: Record<PropertyStatus, string> = {
    DRAFT: "Only you can see this listing",
    AVAILABLE: "Live in search and open to enquiries",
    PENDING:
        "Under offer — only the deal settling or falling through changes it",
    SOLD: "Sold — contact support if this sale needs correcting",
    EXPIRED: "Rejected by moderation — contact support to have it reviewed",
};

export const LISTING_AMENITY_SUGGESTIONS = [
    "Pool",
    "Wine cellar",
    "Gym",
    "Spa",
    "Elevator",
    "Garage",
    "Guest house",
    "Home cinema",
    "Tennis court",
    "Concierge",
];

export const LISTING_FEATURE_SUGGESTIONS = [
    "Sea view",
    "Smart home",
    "Chef's kitchen",
    "Fireplace",
    "Heated floors",
    "Private garden",
    "Roof terrace",
    "Gated entry",
    "Walk-in closet",
    "Solar power",
];

export const DESCRIPTION_ROWS = 5;

export const MAX_LISTING_IMAGES = 10;

export const MAX_LISTING_IMAGE_BYTES = 10 * 1024 * 1024;

export const LISTING_IMAGE_ACCEPT = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/avif",
].join(",");
