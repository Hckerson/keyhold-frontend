import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { PanelLink } from "@/components/features/shared/panel-link";
import { OverviewShowingList } from "@/components/features/agent/overview-showing-list";
import { OverviewLeadList } from "@/components/features/agent/overview-lead-list";
import { OverviewGoalList } from "@/components/features/agent/overview-goal-list";
import { OverviewActionList } from "@/components/features/agent/overview-action-list";
import {
    monthlyGoals,
    quickActions,
    recentLeads,
    upcomingShowings,
} from "@/lib/data/agent-overview";

export function AgentOverviewRail() {
    return (
        <div className="flex flex-col gap-3">
            <Panel
                title="Upcoming Showings"
                count={upcomingShowings.length}
                action={<PanelLink href="/agent/calendar" label="Calendar" />}
            >
                <PanelInset>
                    <OverviewShowingList showings={upcomingShowings} />
                </PanelInset>
            </Panel>

            <Panel
                title="Recent Leads"
                count={recentLeads.length}
                action={<PanelLink href="/agent/leads" label="All leads" />}
            >
                <PanelInset>
                    <OverviewLeadList leads={recentLeads} />
                </PanelInset>
            </Panel>

            <Panel title="This Month">
                <PanelInset>
                    <OverviewGoalList goals={monthlyGoals} />
                </PanelInset>
            </Panel>

            <Panel title="Quick Actions">
                <PanelInset>
                    <OverviewActionList actions={quickActions} />
                </PanelInset>
            </Panel>
        </div>
    );
}

AgentOverviewRail.displayName = "AgentOverviewRail";
