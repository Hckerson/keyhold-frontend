import { agentFirm } from "@/lib/data/admin-listings";
import { cn } from "@/lib/utils";
import type { ModerationAgent } from "@/lib/types";

export interface ModerationAgentMarkProps {
    agent: ModerationAgent;
    className?: string;
}

export function ModerationAgentMark({
    agent,
    className,
}: ModerationAgentMarkProps) {
    return (
        <span className={cn("block min-w-0", className)}>
            <span className="text-text-secondary block truncate text-xs">
                {agent.name}
            </span>
            <span className="text-text-muted block truncate text-[10px]">
                {agentFirm(agent.email)}
            </span>
        </span>
    );
}

ModerationAgentMark.displayName = "ModerationAgentMark";
