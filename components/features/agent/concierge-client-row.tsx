import { Avatar } from "@/components/ui/avatar";
import { StatusDot } from "@/components/patterns/status-dot";
import { ConciergeAllocation } from "@/components/features/agent/concierge-allocation";
import {
    CONCIERGE_STATUSES,
    CONCIERGE_TIERS,
} from "@/lib/config/concierge-tones";
import { allocationPct, type VIPClient } from "@/lib/data/agent-concierge";
import { formatMillions, initialsOf } from "@/lib/utils";

export interface ConciergeClientRowProps {
    client: VIPClient;
}

export function ConciergeClientRow({ client }: ConciergeClientRowProps) {
    const tier = CONCIERGE_TIERS[client.tier];
    const status = CONCIERGE_STATUSES[client.status];

    return (
        <tr className="hover:bg-background-muted ease-smooth h-11 transition-colors">
            <td className="py-0">
                <div className="flex min-w-0 items-center gap-2">
                    <Avatar
                        size="xs"
                        elevated={false}
                        src={client.portrait ?? undefined}
                        alt={client.name}
                        initials={initialsOf(client.name)}
                        className="text-[10px]"
                    />
                    <span className="text-text min-w-0 truncate text-xs font-medium">
                        {client.name}
                    </span>
                </div>
            </td>
            <td className="py-0 pl-3">
                <span className="micro-label truncate">{tier.label}</span>
            </td>
            <td className="py-0 pl-3">
                <span className="flex min-w-0 items-center gap-1.5">
                    <StatusDot tone={status.tone} />
                    <span className="text-text-secondary min-w-0 truncate text-xs">
                        {status.label}
                    </span>
                </span>
            </td>
            <td className="text-text py-0 pl-3 text-right text-xs font-semibold tabular-nums">
                {formatMillions(client.budget)}
            </td>
            <td className="py-0 pl-3">
                <ConciergeAllocation percent={allocationPct(client)} />
            </td>
            <td className="text-text-secondary py-0 pl-3 text-right text-xs tabular-nums">
                {client.openRequests}
            </td>
            <td className="text-text-secondary truncate py-0 pl-3 text-xs">
                {client.nextAction}
            </td>
        </tr>
    );
}

ConciergeClientRow.displayName = "ConciergeClientRow";
