import { ServiceCard } from "@/components/ui/service-card";
import type { ConciergeService } from "@/lib/data/agent-concierge";

export interface ConciergeServiceGridProps {
    services: ConciergeService[];
}

export function ConciergeServiceGrid({ services }: ConciergeServiceGridProps) {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {services.map((service) => (
                <ServiceCard
                    key={service.title}
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                />
            ))}
        </div>
    );
}

ConciergeServiceGrid.displayName = "ConciergeServiceGrid";
