export const OFFER_REQUEST_COPY = {
    title: "Place an offer",
    hint: "Your offer goes straight to the listing office with the terms you set.",
    price: "Your offer",
    terms: "Terms",
    termsPlaceholder: "Cash, fourteen-day close, no financing contingency.",
    cancel: "Not now",
    confirm: "Send offer",
    failed: "That offer did not reach the listing office.",
    retry: "Check the amount and terms, then try once more.",
    ask: "Asking",
    expiry: (days: number) => `Open for ${days} days unless answered sooner.`,
} as const;
