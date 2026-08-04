import { OverviewLeadRow } from "@/components/features/agent/overview-lead-row";
import type { RecentLead } from "@/lib/data/agent-overview";

export interface OverviewLeadListProps {
    leads: RecentLead[];
}

export function OverviewLeadList({ leads }: OverviewLeadListProps) {
    return (
        <ul className="divide-border divide-y">
            {leads.map((lead) => (
                <OverviewLeadRow key={lead.id} lead={lead} />
            ))}
        </ul>
    );
}

OverviewLeadList.displayName = "OverviewLeadList";
