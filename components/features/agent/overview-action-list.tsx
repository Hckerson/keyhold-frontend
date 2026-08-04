import { OverviewActionRow } from "@/components/features/agent/overview-action-row";
import type { AgentQuickAction } from "@/lib/data/agent-overview";

export interface OverviewActionListProps {
    actions: AgentQuickAction[];
}

export function OverviewActionList({ actions }: OverviewActionListProps) {
    return (
        <ul className="divide-border divide-y">
            {actions.map((action) => (
                <OverviewActionRow key={action.id} action={action} />
            ))}
        </ul>
    );
}

OverviewActionList.displayName = "OverviewActionList";
