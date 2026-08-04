import { ConciergeServiceRow } from "@/components/features/agent/concierge-service-row";
import type { ConciergeService } from "@/lib/data/agent-concierge";

export interface ConciergeServiceListProps {
    services: ConciergeService[];
}

export function ConciergeServiceList({ services }: ConciergeServiceListProps) {
    return (
        <ul className="divide-border divide-y">
            {services.map((service) => (
                <ConciergeServiceRow key={service.id} service={service} />
            ))}
        </ul>
    );
}

ConciergeServiceList.displayName = "ConciergeServiceList";
