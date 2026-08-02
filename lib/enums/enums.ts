export const PROPERTY_STATUS_LABELS = {
    "for-sale": "For Sale",
    "for-rent": "For Rent",
    new: "New Listing",
    pending: "Pending",
    sold: "Sold",
} as const;

export type PropertyStatus = keyof typeof PROPERTY_STATUS_LABELS;
