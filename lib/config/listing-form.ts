import {
    PROPERTY_STATUS_LABELS,
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

export const SELLER_STATUSES = [
    "DRAFT",
    "AVAILABLE",
    "PENDING",
] as const satisfies readonly PropertyStatus[];

export type SellerStatus = (typeof SELLER_STATUSES)[number];

export const isSellerStatus = (status: PropertyStatus) =>
    SELLER_STATUSES.some((settable) => settable === status);

export const LISTING_STATUS_OPTIONS = SELLER_STATUSES.map((value) => ({
    value,
    label: PROPERTY_STATUS_LABELS[value],
}));

export const LISTING_TYPE_OPTIONS = PROPERTY_TYPES.map((value) => ({
    value,
    label: PROPERTY_TYPE_LABELS[value],
}));

export const LISTING_STATUS_HINTS: Record<PropertyStatus, string> = {
    DRAFT: "Only you can see this listing",
    AVAILABLE: "Live in search and open to enquiries",
    PENDING: "Shown as under offer, still visible",
    SOLD: "Closed — set it back to for sale to reopen",
    EXPIRED: "Off market — set it back to for sale to relist",
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

export const LISTING_IMAGE_ACCEPT = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/avif",
].join(",");
