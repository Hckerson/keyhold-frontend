import { ListingThumb } from "@/components/features/shared/listing-thumb";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StatusBadge } from "@/components/ui/status-badge";
import { OFFER_STATUSES } from "@/lib/config/offer-tones";
import {
    OFFER_FAIR_RATIO,
    OFFER_STRONG_RATIO,
    type OfferPosition,
} from "@/lib/data/dashboard-overview";
import type { ChartTone } from "@/lib/config/chart-tones";
import { formatCompactUsd } from "@/lib/utils";

function askTone(ratio: number): ChartTone {
    if (ratio >= OFFER_STRONG_RATIO) return "success";
    if (ratio >= OFFER_FAIR_RATIO) return "accent";
    return "warning";
}

export interface OverviewOfferRowProps {
    offer: OfferPosition;
}

export function OverviewOfferRow({ offer }: OverviewOfferRowProps) {
    const ratio = offer.offered / offer.list;

    return (
        <li className="flex h-11 items-center gap-2">
            <ListingThumb src={offer.image} alt={offer.address} />
            <span className="text-text min-w-0 flex-1 truncate text-xs font-medium">
                {offer.address}
            </span>
            <ProgressBar
                value={ratio * 100}
                tone={askTone(ratio)}
                className="w-12 shrink-0"
            />
            <span className="micro-label w-14 shrink-0 text-right">
                {Math.round(ratio * 100)}% ask
            </span>
            <span className="text-text w-16 shrink-0 text-right text-xs font-semibold tabular-nums">
                {formatCompactUsd(offer.offered)}
            </span>
            <StatusBadge
                tone={OFFER_STATUSES[offer.status].tone}
                className="capitalize"
            >
                {offer.status}
            </StatusBadge>
        </li>
    );
}

OverviewOfferRow.displayName = "OverviewOfferRow";
