import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { PanelLink } from "@/components/features/shared/panel-link";
import { ModerationAgentTable } from "@/components/features/admin/moderation-agent-table";
import { ADMIN_ROUTES } from "@/lib/constants";
import type { ModerationAgentLoad } from "@/lib/types";

const AGENTS_TITLE = "Submitting Agents";
const AGENTS_LEDE = "Who fills the queue and who draws reports";
const AGENTS_ACTION = "Users";

export interface ModerationAgentsProps {
    loads: ModerationAgentLoad[];
}

export function ModerationAgents({ loads }: ModerationAgentsProps) {
    return (
        <Panel
            title={AGENTS_TITLE}
            description={AGENTS_LEDE}
            count={loads.length}
            action={
                <PanelLink href={ADMIN_ROUTES.users} label={AGENTS_ACTION} />
            }
        >
            <PanelInset scroll>
                <ModerationAgentTable loads={loads} />
            </PanelInset>
        </Panel>
    );
}

ModerationAgents.displayName = "ModerationAgents";
