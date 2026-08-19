export const PROPERTY_TYPES = [
    "ESTATE",
    "VILLA",
    "PENTHOUSE",
    "HOUSE",
    "APARTMENT",
    "CONDO",
    "TOWNHOUSE",
    "LAND",
    "OTHER",
] as const;

export const PROPERTY_STATUSES = [
    "DRAFT",
    "AVAILABLE",
    "PENDING",
    "SOLD",
    "EXPIRED",
] as const;

export const PROPERTY_SORTS = [
    "newest",
    "price-asc",
    "price-desc",
    "bedrooms-desc",
    "sqft-desc",
    "popular",
] as const;

export const CONNECTION_STATUSES = ["PENDING", "ACCEPTED", "REJECTED"] as const;

export const VIEWING_STATUSES = [
    "PENDING",
    "CONFIRMED",
    "COMPLETED",
    "CANCELLED",
] as const;

export const OFFER_STATUSES = [
    "PENDING",
    "ACCEPTED",
    "REJECTED",
    "COUNTERED",
    "EXPIRED",
] as const;

export const TRANSACTION_STATUSES = [
    "PENDING",
    "IN_PROGRESS",
    "COMPLETED",
    "CANCELLED",
] as const;

export const USER_ROLES = ["ADMIN", "BUYER", "SELLER"] as const;

export const USER_ACCOUNT_STATUSES = [
    "ACTIVE",
    "PENDING",
    "SUSPENDED",
] as const;

export type PropertyType = (typeof PROPERTY_TYPES)[number];
export type PropertyStatus = (typeof PROPERTY_STATUSES)[number];
export type PropertySort = (typeof PROPERTY_SORTS)[number];
export type ConnectionStatus = (typeof CONNECTION_STATUSES)[number];
export type ViewingStatus = (typeof VIEWING_STATUSES)[number];
export type OfferStatus = (typeof OFFER_STATUSES)[number];
export type TransactionStatus = (typeof TRANSACTION_STATUSES)[number];
export type UserRole = (typeof USER_ROLES)[number];
export type UserAccountStatus = (typeof USER_ACCOUNT_STATUSES)[number];

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
    ESTATE: "Estate",
    VILLA: "Villa",
    PENTHOUSE: "Penthouse",
    HOUSE: "House",
    APARTMENT: "Apartment",
    CONDO: "Condo",
    TOWNHOUSE: "Townhouse",
    LAND: "Land",
    OTHER: "Other",
};

export const PROPERTY_STATUS_LABELS: Record<PropertyStatus, string> = {
    DRAFT: "Draft",
    AVAILABLE: "For Sale",
    PENDING: "Under Offer",
    SOLD: "Sold",
    EXPIRED: "Expired",
};

export const CONNECTION_STATUS_LABELS: Record<ConnectionStatus, string> = {
    PENDING: "Pending",
    ACCEPTED: "Accepted",
    REJECTED: "Declined",
};

export const VIEWING_STATUS_LABELS: Record<ViewingStatus, string> = {
    PENDING: "Awaiting confirmation",
    CONFIRMED: "Confirmed",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
};

export const OFFER_STATUS_LABELS: Record<OfferStatus, string> = {
    PENDING: "Pending",
    ACCEPTED: "Accepted",
    REJECTED: "Declined",
    COUNTERED: "Countered",
    EXPIRED: "Expired",
};

export const TRANSACTION_STATUS_LABELS: Record<TransactionStatus, string> = {
    PENDING: "Pending",
    IN_PROGRESS: "In progress",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
};

export const PROPERTY_SORT_LABELS: Record<PropertySort, string> = {
    newest: "Newest first",
    "price-asc": "Price: low to high",
    "price-desc": "Price: high to low",
    "bedrooms-desc": "Most bedrooms",
    "sqft-desc": "Largest first",
    popular: "Most viewed",
};
