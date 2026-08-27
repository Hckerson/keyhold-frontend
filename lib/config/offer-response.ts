import type { OfferStatus } from "@/lib/enums/enums";

export type OfferResponseAction = "accept" | "counter" | "decline";

export const OFFER_RESPONSE_STATUS: Record<OfferResponseAction, OfferStatus> = {
    accept: "ACCEPTED",
    counter: "COUNTERED",
    decline: "REJECTED",
};

export interface OfferResponseCopy {
    title: string;
    lede: string;
    confirm: string;
}

export const OFFER_RESPONSE_COPY: Record<
    OfferResponseAction,
    OfferResponseCopy
> = {
    accept: {
        title: "Accept this offer",
        lede: "Accepting closes every other offer on this listing and moves it to pending.",
        confirm: "Accept offer",
    },
    counter: {
        title: "Counter this offer",
        lede: "Name the figure you will take. The buyer can accept it or walk away.",
        confirm: "Send counter",
    },
    decline: {
        title: "Decline this offer",
        lede: "The buyer is told the offer was declined, along with any note you leave.",
        confirm: "Decline offer",
    },
};

export const OFFER_RESPONSE_FIELDS = {
    price: "Your counter",
    note: "Note to the buyer",
    notePlaceholder: "Optional — what would move this deal forward.",
    cancel: "Back",
    failed: "That response did not reach the buyer.",
    retry: "Check the figure and try once more.",
} as const;
