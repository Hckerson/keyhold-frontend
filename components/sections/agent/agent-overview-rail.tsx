import { CalendarOff, Inbox } from "lucide-react";
import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { EmptyState } from "@/components/ui/empty-state";
import { PanelLink } from "@/components/features/shared/panel-link";
import { OverviewShowingList } from "@/components/features/agent/overview-showing-list";
import { OverviewLeadList } from "@/components/features/agent/overview-lead-list";
import { QuickActionList } from "@/components/features/shared/quick-action-list";
import { agentQuickActions } from "@/lib/data/agent-overview";
import type { RecentLead, UpcomingShowing } from "@/lib/types";
import { SkeletonRows } from "@/components/patterns/skeleton-rows";

const SHOWINGS_TITLE = "Upcoming Showings";
const SHOWINGS_ACTION = "Calendar";
const SHOWINGS_EMPTY = "No showings booked";
const SHOWINGS_EMPTY_LEDE =
    "Confirmed viewings on your listings appear here with the client and time.";
const LEADS_TITLE = "Recent Enquiries";
const LEADS_ACTION = "All enquiries";
const LEADS_EMPTY = "No enquiries yet";
const LEADS_EMPTY_LEDE =
    "Buyers who reach out about one of your listings land here first.";
const ACTIONS_TITLE = "Quick Actions";

export interface AgentOverviewRailProps {
    showings: UpcomingShowing[];
    leads: RecentLead[];
    pending?: boolean;
}

export function AgentOverviewRail({
    showings,
    leads,
    pending,
}: AgentOverviewRailProps) {
    return (
        <div className="console-rail flex flex-col gap-3">
            <Panel
                title={SHOWINGS_TITLE}
                count={pending ? undefined : showings.length}
                action={
                    <PanelLink href="/agent/calendar" label={SHOWINGS_ACTION} />
                }
            >
                {showings.length > 0 ? (
                    <PanelInset>
                        <OverviewShowingList showings={showings} />
                    </PanelInset>
                ) : pending ? (
                    <SkeletonRows />
                ) : (
                    <EmptyState
                        icon={CalendarOff}
                        title={SHOWINGS_EMPTY}
                        description={SHOWINGS_EMPTY_LEDE}
                    />
                )}
            </Panel>

            <Panel
                title={LEADS_TITLE}
                count={pending ? undefined : leads.length}
                action={<PanelLink href="/agent/leads" label={LEADS_ACTION} />}
            >
                {leads.length > 0 ? (
                    <PanelInset>
                        <OverviewLeadList leads={leads} />
                    </PanelInset>
                ) : pending ? (
                    <SkeletonRows />
                ) : (
                    <EmptyState
                        icon={Inbox}
                        title={LEADS_EMPTY}
                        description={LEADS_EMPTY_LEDE}
                    />
                )}
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
