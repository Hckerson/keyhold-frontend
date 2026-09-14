import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { PanelLink } from "@/components/features/shared/panel-link";
import { OverviewShowingList } from "@/components/features/agent/overview-showing-list";
import { OverviewLeadList } from "@/components/features/agent/overview-lead-list";
import { QuickActionList } from "@/components/features/shared/quick-action-list";
import {
    agentQuickActions,
    type RecentLead,
    type UpcomingShowing,
} from "@/lib/data/agent-overview";

const SHOWINGS_TITLE = "Upcoming Showings";
const SHOWINGS_ACTION = "Calendar";
const LEADS_TITLE = "Recent Enquiries";
const LEADS_ACTION = "All enquiries";
const ACTIONS_TITLE = "Quick Actions";

export interface AgentOverviewRailProps {
    showings: UpcomingShowing[];
    leads: RecentLead[];
}

export function AgentOverviewRail({ showings, leads }: AgentOverviewRailProps) {
    return (
        <div className="flex flex-col gap-3">
            <Panel
                title={SHOWINGS_TITLE}
                count={showings.length}
                action={
                    <PanelLink href="/agent/calendar" label={SHOWINGS_ACTION} />
                }
            >
                <PanelInset>
                    <OverviewShowingList showings={showings} />
                </PanelInset>
            </Panel>

            <Panel
                title={LEADS_TITLE}
                count={leads.length}
                action={<PanelLink href="/agent/leads" label={LEADS_ACTION} />}
            >
                <PanelInset>
                    <OverviewLeadList leads={leads} />
                </PanelInset>
            </Panel>

            <Panel title={ACTIONS_TITLE}>
                <PanelInset>
                    <QuickActionList actions={agentQuickActions} />
                </PanelInset>
            </Panel>
        </div>
    );
}

AgentOverviewRail.displayName = "AgentOverviewRail";
