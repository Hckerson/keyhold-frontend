import type { OfferStatus } from "@/lib/enums/enums";

export type OfferResponseAction = "accept" | "counter" | "decline";

export const OFFER_RESPONSE_STATUS: Record<OfferResponseAction, OfferStatus> = {
    accept: "ACCEPTED",
    counter: "COUNTERED",
    decline: "REJECTED",
};

export interface OfferResponseCopy {
    title: string;
    lede: (address: string) => string;
    final?: string;
    confirm: string;
}

export const OFFER_RESPONSE_COPY: Record<
    OfferResponseAction,
    OfferResponseCopy
> = {
    accept: {
        title: "Accept this offer",
        lede: (address) =>
            `Accepting binds you to this buyer for ${address}, closes every other offer on the listing and moves it to pending.`,
        final: "Accepting is final",
        confirm: "Accept offer",
    },
    counter: {
        title: "Counter this offer",
        lede: (address) =>
            `Name the figure you will take for ${address}. The buyer can accept it or walk away.`,
        confirm: "Send counter",
    },
    decline: {
        title: "Decline this offer",
        lede: (address) =>
            `The buyer is told their offer on ${address} was declined, along with any note you leave. It cannot be reopened.`,
        final: "Declining is final",
        confirm: "Decline offer",
    },
};

export const OFFER_RESPONSE_FIELDS = {
    price: "Your counter",
    note: "Note to the buyer",
    notePlaceholder: "Optional — what would move this deal forward.",
    cancel: "Back",
    failed: "That response did not reach the buyer.",
    retry: "Nothing was sent and the offer is still open. Try once more.",
} as const;
