// Example: Enum constants for status values (replace with your domain)
export enum Status {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    PENDING = "PENDING",
}

export const PROPERTY_STATUS_LABELS = {
    "for-sale": "For Sale",
    "for-rent": "For Rent",
    new: "New Listing",
    pending: "Pending",
    sold: "Sold",
} as const;

export type PropertyStatus = keyof typeof PROPERTY_STATUS_LABELS;

export enum TransactionStatus {
    PENDING = "PENDING",
    PROCESSING = "PROCESSING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
    HELD = "HELD",
}
