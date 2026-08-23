import { Coins, FileText, Handshake, Percent, Wallet } from "lucide-react";
import type { OfferAgentShare } from "@/components/features/dashboard/offer-agent-row";
import type { ShareDatum } from "@/components/patterns/share-row";
import type { StatDatum } from "@/components/patterns/stat-cell";
import {
    GAP_BANDS,
    GAP_BAND_KEYS,
    OFFER_STATUSES,
    OFFER_STATUS_KEYS,
    gapBandOf,
} from "@/lib/config/offer-tones";
import type { Offer, OfferStatus } from "@/lib/types";
import { averageOf, formatCompactUsd, percentOf, sum } from "@/lib/utils";

export type StageFilter = "all" | "open" | "closed";

export type StatusFilter = OfferStatus | "all";

export const STAGE_FILTERS: { id: StageFilter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "open", label: "Open" },
    { id: "closed", label: "Closed" },
];

export const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
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
    stage: StageFilter,
    status: StatusFilter,
) => {
    if (stage === "open" && !isOpen(offer)) return false;
    if (stage === "closed" && isOpen(offer)) return false;
    return status === "all" || offer.status === status;
};

export const countByStage = (offers: Offer[]): Record<StageFilter, number> => ({
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

export const offerStats = (offers: Offer[]): StatDatum[] => [
    {
        id: "open",
        icon: FileText,
        label: "Open",
        value: `${openOffers(offers).length}`,
        tone: "accent",
    },
    {
        id: "committed",
        icon: Wallet,
        label: "At stake",
        value: formatCompactUsd(committedCapital(offers)),
        tone: "highlight",
    },
    {
        id: "countered",
        icon: Handshake,
        label: "Countered",
        value: `${countedBy(offers, "countered")}`,
        tone: "info",
    },
    {
        id: "position",
        icon: Percent,
        label: "Avg of ask",
        value: `${averageGap(offers)}%`,
        tone: "success",
    },
    {
        id: "accepted",
        icon: Coins,
        label: "Accepted",
        value: `${countedBy(offers, "accepted")}`,
        tone: "warning",
    },
];

export const statusShares = (offers: Offer[]): ShareDatum[] =>
    OFFER_STATUS_KEYS.map((id) => {
        const count = countedBy(offers, id);
        return {
            id,
            icon: OFFER_STATUSES[id].icon,
            label: OFFER_STATUSES[id].label,
            value: `${count}`,
            percent: percentOf(count, offers.length),
            tone: OFFER_STATUSES[id].chartTone,
        };
    });

export const gapShares = (offers: Offer[]): ShareDatum[] =>
    GAP_BAND_KEYS.map((id) => {
        const count = offers.filter(
            (offer) => gapBandOf(discountPercent(offer)) === id,
        ).length;
        return {
            id,
            icon: GAP_BANDS[id].icon,
            label: GAP_BANDS[id].label,
            value: `${count}`,
            percent: percentOf(count, offers.length),
            tone: GAP_BANDS[id].tone,
        };
    });

export const agentShares = (offers: Offer[]): OfferAgentShare[] => {
    const names = [...new Set(offers.map((offer) => offer.agent))];
    return names
        .map((name) => {
            const held = offers.filter((offer) => offer.agent === name);
            return {
                id: name,
                name,
                portrait: held[0].agentPortrait,
                value: formatCompactUsd(sum(held.map(activePrice))),
                count: held.length,
                percent: percentOf(held.length, offers.length),
                tone: OFFER_STATUSES[rankOffers(held)[0].status].chartTone,
            };
        })
        .sort((a, b) => b.count - a.count);
};

export const offersSummary = (offers: Offer[]) =>
    `${openOffers(offers).length} open · ${formatCompactUsd(committedCapital(offers))} at stake`;
