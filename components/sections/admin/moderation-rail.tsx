"use client";

import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { PanelLink } from "@/components/features/shared/panel-link";
import { ModerationAgentTable } from "@/components/features/admin/moderation-agent-table";
import { ModerationInspector } from "@/components/sections/admin/moderation-inspector";
import { ADMIN_ROUTES } from "@/lib/constants";
import type {
    DecisionMode,
    ModerationAgentLoad,
    ModerationListing,
} from "@/lib/types";

const AGENTS_TITLE = "Submitting Agents";
const AGENTS_LEDE = "Who fills the queue and who draws reports";
const AGENTS_ACTION = "Users";

export interface ModerationRailProps {
    focus?: ModerationListing;
    loads: ModerationAgentLoad[];
    pending?: boolean;
    approvingId?: string;
    onOpen: (id: string) => void;
    onApprove: (id: string) => void;
    onDecide: (mode: DecisionMode, id: string) => void;
}

export function ModerationRail({
    focus,
    loads,
    ...inspector
}: ModerationRailProps) {
    return (
        <div className="flex min-w-0 flex-col gap-3">
            <ModerationInspector listing={focus} {...inspector} />
            <Panel
                title={AGENTS_TITLE}
                description={AGENTS_LEDE}
                count={loads.length}
                action={
                    <PanelLink
                        href={ADMIN_ROUTES.users}
                        label={AGENTS_ACTION}
                    />
                }
            >
                <PanelInset scroll>
                    <ModerationAgentTable loads={loads} />
                </PanelInset>
            </Panel>
        </div>
    );
}

ModerationRail.displayName = "ModerationRail";
