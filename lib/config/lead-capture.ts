export interface LeadDraft {
    propertyId: string;
    buyerEmail: string;
}

export const EMPTY_LEAD_DRAFT: LeadDraft = {
    propertyId: "",
    buyerEmail: "",
};

export const LEAD_CAPTURE_COPY = {
    title: "Add a lead",
    hint: "Record a buyer who reached you off-platform. They must already hold an account — the thread opens for both of you straight away.",
    listing: "Which of your listings",
    email: "Buyer's registered email",
    emailPlaceholder: "buyer@example.com",
    cancel: "Not now",
    submit: "Add lead",
    emptyListings: "You have no listings to attach a lead to",
    emptyListingsLede: "Publish a listing first, then record enquiries on it.",
    failed: "That lead could not be recorded.",
    retry: "Check the address — the buyer may not have an account, or may already be on this listing.",
} as const;
