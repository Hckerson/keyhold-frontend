import { Badge } from "@/components/ui/badge";
import { DetailRow } from "@/components/features/shared/detail-row";
import type { RecentLead } from "@/lib/data/agent-overview";

export interface OverviewRecentLeadsProps {
    leads: RecentLead[];
}

export function OverviewRecentLeads({ leads }: OverviewRecentLeadsProps) {
    return (
        <div className="divide-border divide-y">
            {leads.map((lead) => (
                <DetailRow
                    key={lead.id}
                    primary={lead.name}
                    secondary={`${lead.budget} · ${lead.received}`}
                    secondaryClassName="tabular-nums"
                    value={
                        <Badge size="sm" variant={lead.variant}>
                            {lead.score}
                        </Badge>
                    }
                />
            ))}
        </div>
    );
}

OverviewRecentLeads.displayName = "OverviewRecentLeads";
