import { format } from "date-fns";
import type { ComparisonRow, MetricItem } from "@/lib/types";
import { CONTINGENCIES_META } from "@/lib/config/contingency-tones";
import { formatUsd } from "@/lib/utils";
import type { Offer } from "@/lib/validations/offer";

export const ENTRY_DATE_FORMAT = "MMM d, yyyy";
const NOT_SET = "—";

export const OFFER_TERMS_COPY = {
    title: "Offer Terms",
    lede: "What the buyer committed to alongside the number",
    moveIn: "Preferred move-in",
    earnest: "Earnest money",
    contingencies: "Contingencies",
    none: "Not specified",
    unconditional: "Unconditional",
} as const;

export const comparisonFrom = (
    offer: Offer,
    listPrice: number,
): ComparisonRow[] => {
    const counter = offer.responsePrice;

    return [
        {
            key: "price",
            label: "Price",
            yours: formatUsd(offer.offeredPrice),
            counter: counter ? formatUsd(counter) : NOT_SET,
            detail: `Listed at ${formatUsd(listPrice)}`,
        },
        {
            key: "terms",
            label: "Terms",
            yours: offer.offeredTerms,
            counter: offer.responseFeedback ?? NOT_SET,
            detail: "Conditions attached to each side of the negotiation",
        },
        {
            key: "expiry",
            label: "Expires",
            yours: format(new Date(offer.expiresAt), ENTRY_DATE_FORMAT),
            counter: offer.respondedAt
                ? format(new Date(offer.respondedAt), ENTRY_DATE_FORMAT)
                : NOT_SET,
            detail: "When the offer lapses, and when the seller replied",
        },
    ];
};

export const termsFrom = (offer: Offer): MetricItem[] => [
    {
        label: OFFER_TERMS_COPY.moveIn,
        value: offer.moveInDate
            ? format(new Date(offer.moveInDate), ENTRY_DATE_FORMAT)
            : OFFER_TERMS_COPY.none,
    },
    {
        label: OFFER_TERMS_COPY.earnest,
        value: offer.earnestMoney
            ? formatUsd(offer.earnestMoney)
            : OFFER_TERMS_COPY.none,
    },
    {
        label: OFFER_TERMS_COPY.contingencies,
        value:
            offer.contingencies && offer.contingencies.length > 0
                ? offer.contingencies
                      .map((id) => CONTINGENCIES_META[id].label)
                      .join(" · ")
                : OFFER_TERMS_COPY.unconditional,
    },
];
