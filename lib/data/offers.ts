import { OFFER_STATUSES, OFFER_STATUS_KEYS } from "@/lib/config/offer-tones";
import type {
    Offer,
    OfferStageFilter,
    OfferStatus,
    OfferStatusFilter,
} from "@/lib/types";
import { averageOf, sum } from "@/lib/utils";

export const STAGE_FILTERS: { id: OfferStageFilter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "open", label: "Open" },
    { id: "closed", label: "Closed" },
];

export const STATUS_OPTIONS: { value: OfferStatusFilter; label: string }[] = [
    { value: "all", label: "Every status" },
    ...OFFER_STATUS_KEYS.map((id) => ({
        value: id,
        label: OFFER_STATUSES[id].label,
    })),
];

export const activePrice = (offer: Offer) =>
    offer.counterPrice ?? offer.offerPrice;

export const gapPercent = (offer: Offer) =>
    Math.round(
        ((offer.offerPrice - offer.listPrice) / offer.listPrice) * 1_000,
    ) / 10;

export const discountPercent = (offer: Offer) =>
    Math.max(-gapPercent(offer), 0);

export const askRatio = (offer: Offer) =>
    (offer.offerPrice / offer.listPrice) * 100;

export const isOpen = (offer: Offer) => OFFER_STATUSES[offer.status].open;

export const openOffers = (offers: Offer[]) => offers.filter(isOpen);

export const countedBy = (offers: Offer[], status: OfferStatus) =>
    offers.filter((offer) => offer.status === status).length;

export const committedCapital = (offers: Offer[]) =>
    sum(openOffers(offers).map(activePrice));

export const averageGap = (offers: Offer[]) =>
    averageOf(openOffers(offers).map((offer) => Math.round(askRatio(offer))));

export const matchesFilters = (
    offer: Offer,
    stage: OfferStageFilter,
    status: OfferStatusFilter,
) => {
    if (stage === "open" && !isOpen(offer)) return false;
    if (stage === "closed" && isOpen(offer)) return false;
    return status === "all" || offer.status === status;
};

export const countByStage = (
    offers: Offer[],
): Record<OfferStageFilter, number> => ({
    all: offers.length,
    open: openOffers(offers).length,
    closed: offers.length - openOffers(offers).length,
});

export const rankOffers = (offers: Offer[]) =>
    [...offers].sort(
        (a, b) =>
            Number(isOpen(b)) - Number(isOpen(a)) ||
            OFFER_STATUSES[b.status].rank - OFFER_STATUSES[a.status].rank ||
            activePrice(b) - activePrice(a) ||
            a.minutesAgo - b.minutesAgo,
    );
