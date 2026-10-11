import { OverviewOfferRow } from "@/components/features/dashboard/overview-offer-row";
import type { OfferPosition } from "@/lib/types";

export interface OverviewOfferListProps {
    offers: OfferPosition[];
}

export function OverviewOfferList({ offers }: OverviewOfferListProps) {
    return (
        <ul className="divide-border divide-y">
            {offers.map((offer) => (
                <OverviewOfferRow key={offer.id} offer={offer} />
            ))}
        </ul>
    );
}

OverviewOfferList.displayName = "OverviewOfferList";
