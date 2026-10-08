import { Coins, FileText, Handshake, Percent, Wallet } from "lucide-react";
import {
    GAP_BANDS,
    GAP_BAND_KEYS,
    OFFER_STATUSES,
    OFFER_STATUS_KEYS,
    gapBandOf,
} from "@/lib/config/offer-tones";
import {
    activePrice,
    averageGap,
    committedCapital,
    countedBy,
    discountPercent,
    openOffers,
    rankOffers,
} from "@/lib/data/offers";
import type {
    Offer,
    OfferAgentShare,
    ShareDatum,
    StatDatum,
} from "@/lib/types";
import { formatCompactUsd, percentOf, sum } from "@/lib/utils";

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
        tone: "neutral",
    },
    {
        id: "countered",
        icon: Handshake,
        label: "Countered",
        value: `${countedBy(offers, "countered")}`,
        tone: "neutral",
    },
    {
        id: "position",
        icon: Percent,
        label: "Avg of ask",
        value: `${averageGap(offers)}%`,
        tone: "accent",
    },
    {
        id: "accepted",
        icon: Coins,
        label: "Accepted",
        value: `${countedBy(offers, "accepted")}`,
        tone: "neutral",
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

export const representationSummary = (agentCount: number) =>
    agentCount === 0 ? "None" : String(agentCount);
