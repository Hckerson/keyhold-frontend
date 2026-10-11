"use client";

import { Users } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Panel } from "@/components/ui/panel";
import { PresenceSwap } from "@/components/patterns/presence-swap";
import { PanelLink } from "@/components/features/shared/panel-link";
import { ModerationAgentSkeleton } from "@/components/features/admin/moderation-agent-skeleton";
import { ModerationAgentTable } from "@/components/features/admin/moderation-agent-table";
import { ADMIN_ROUTES } from "@/lib/constants";
import type { ModerationAgentLoad } from "@/lib/types";

const AGENTS_TITLE = "Submitting Agents";
const AGENTS_LEDE = "Who fills the queue and who draws reports";
const AGENTS_ACTION = "Users";
const EMPTY_TITLE = "No submitting agents yet";
const EMPTY_LEDE = "Agents appear here once their listings enter the queue.";

export interface ModerationAgentsProps {
    loads: ModerationAgentLoad[];
    pending?: boolean;
}

export function ModerationAgents({ loads, pending }: ModerationAgentsProps) {
    return (
        <Panel
            title={AGENTS_TITLE}
            description={AGENTS_LEDE}
            count={pending ? undefined : loads.length}
            action={
                <PanelLink href={ADMIN_ROUTES.users} label={AGENTS_ACTION} />
            }
        >
            <PresenceSwap
                swapKey={
                    loads.length > 0 ? "rows" : pending ? "pending" : "empty"
                }
            >
                {loads.length > 0 ? (
                    <ModerationAgentTable loads={loads} />
                ) : pending ? (
                    <ModerationAgentSkeleton />
                ) : (
                    <EmptyState
                        icon={Users}
                        title={EMPTY_TITLE}
                        description={EMPTY_LEDE}
                    />
                )}
            </PresenceSwap>
        </Panel>
    );
}

ModerationAgents.displayName = "ModerationAgents";
