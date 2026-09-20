import { Avatar } from "@/components/ui/avatar";
import {
    StatusBadge,
    type StatusBadgeProps,
} from "@/components/ui/status-badge";
import { formatCompactUsd, initialsOf } from "@/lib/utils";
import type { RecentLead } from "@/lib/types";
import type { LeadStage } from "@/lib/types/lead";
import { LEAD_STAGES } from "@/lib/config/lead-tones";

const stageTone: Record<LeadStage, StatusBadgeProps["tone"]> = {
    pending: "warning",
    accepted: "success",
    declined: "neutral",
};

export interface OverviewLeadRowProps {
    lead: RecentLead;
}

export function OverviewLeadRow({ lead }: OverviewLeadRowProps) {
    return (
        <li className="flex h-11 items-center gap-2">
            <Avatar
                size="xs"
                tone="accent"
                elevated={false}
                initials={initialsOf(lead.name)}
                className="text-[10px]"
            />
            <span className="text-text min-w-0 flex-1 truncate text-xs font-medium">
                {lead.name}
            </span>
            <span className="text-text shrink-0 text-xs font-semibold tabular-nums">
                {formatCompactUsd(lead.listingPrice)}
            </span>
            <StatusBadge tone={stageTone[lead.stage]}>
                {LEAD_STAGES[lead.stage].label}
            </StatusBadge>
            <span className="micro-label w-6 shrink-0 text-right">
                {lead.received}
            </span>
        </li>
    );
}

OverviewLeadRow.displayName = "OverviewLeadRow";
