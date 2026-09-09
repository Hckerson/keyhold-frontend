import { OFFER_WINDOW_DAYS } from "@/lib/constants";
import { CONTINGENCIES_META } from "@/lib/config/contingency-tones";
import { OFFER_REQUEST_COPY as COPY } from "@/lib/config/offer-request";
import type { Contingency } from "@/lib/enums/enums";
import { formatUsd } from "@/lib/utils";
import type { MetricItem } from "@/lib/types";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export const offerExpiry = (from: Date = new Date()) =>
    new Date(from.getTime() + OFFER_WINDOW_DAYS * MS_PER_DAY).toISOString();

export const askGapPercent = (listPrice: number, offeredPrice: number) =>
    listPrice <= 0 ? 0 : ((listPrice - offeredPrice) / listPrice) * 100;

export interface OfferDraftSummary {
    offeredPrice: number;
    moveInDate: string;
    earnestMoney: number;
    contingencies: Contingency[];
}

export const contingencyLabels = (chosen: Contingency[]) =>
    chosen.map((id) => CONTINGENCIES_META[id].label).join(" · ");

export const offerReviewRows = (draft: OfferDraftSummary): MetricItem[] => [
    { label: COPY.price, value: formatUsd(draft.offeredPrice) },
    {
        label: COPY.moveIn,
        value: draft.moveInDate || COPY.noMoveIn,
    },
    {
        label: COPY.earnest,
        value:
            draft.earnestMoney > 0
                ? formatUsd(draft.earnestMoney)
                : COPY.noEarnest,
    },
    {
        label: COPY.contingencies,
        value:
            draft.contingencies.length > 0
                ? contingencyLabels(draft.contingencies)
                : COPY.noContingencies,
    },
];
