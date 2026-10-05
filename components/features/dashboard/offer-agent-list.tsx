import { OfferAgentRow } from "@/components/features/dashboard/offer-agent-row";
import type { OfferAgentShare } from "@/lib/types";

export interface OfferAgentListProps {
    shares: OfferAgentShare[];
}

export function OfferAgentList({ shares }: OfferAgentListProps) {
    return (
        <ul className="divide-border divide-y">
            {shares.map((share) => (
                <OfferAgentRow key={share.id} share={share} />
            ))}
        </ul>
    );
}

OfferAgentList.displayName = "OfferAgentList";
