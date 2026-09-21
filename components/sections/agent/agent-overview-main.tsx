import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { PanelLink } from "@/components/features/shared/panel-link";
import { AgentPipelineHero } from "@/components/sections/agent/agent-pipeline-hero";
import { OverviewSaleList } from "@/components/features/agent/overview-sale-list";
import { ActivityList } from "@/components/features/shared/activity-list";
import { EmptyState } from "@/components/ui/empty-state";
import { Handshake, History } from "lucide-react";
import type {
    ActivityEntry,
    ClosedSale,
    PipelineStage,
    PipelineSummary,
} from "@/lib/types";
import { ACTIVITY_COPY } from "@/lib/config/activity";

const SALES_TITLE = "Closed Sales";
const SALES_LEDE = "Recent comps, days on market and result against ask";
const SALES_ACTION = "View comps";
const SALES_EMPTY = "No completed sales yet";
const SALES_EMPTY_LEDE =
    "Sales appear here once a transaction settles on one of your listings.";
const SALES_LOADING = "Loading your closed sales";
const SALES_LOADING_LEDE = "Fetching settled transactions on your listings.";
const ACTIVITY_LOADING = "Loading recent activity";
const ACTIVITY_LOADING_LEDE =
    "Fetching enquiries, showings and offers on your listings.";
const ACTIVITY = ACTIVITY_COPY.agent;

export interface AgentOverviewMainProps {
    summary?: PipelineSummary;
    stages: PipelineStage[];
    sales: ClosedSale[];
    activity: ActivityEntry[];
    pending?: boolean;
}

export function AgentOverviewMain({
    summary,
    stages,
    sales,
    activity,
    pending,
}: AgentOverviewMainProps) {
    return (
        <div className="console-span-2 flex flex-col gap-3">
            {summary && <AgentPipelineHero summary={summary} stages={stages} />}

            <Panel
                title={SALES_TITLE}
                description={SALES_LEDE}
                action={
                    <PanelLink href="/agent/analytics" label={SALES_ACTION} />
                }
            >
                {sales.length > 0 ? (
                    <PanelInset>
                        <OverviewSaleList sales={sales} />
                    </PanelInset>
                ) : (
                    <EmptyState
                        icon={Handshake}
                        title={pending ? SALES_LOADING : SALES_EMPTY}
                        description={
                            pending ? SALES_LOADING_LEDE : SALES_EMPTY_LEDE
                        }
                    />
                )}
            </Panel>

            <Panel
                title={ACTIVITY.title}
                count={pending ? undefined : activity.length}
            >
                {activity.length > 0 ? (
                    <PanelInset>
                        <ActivityList entries={activity} />
                    </PanelInset>
                ) : (
                    <EmptyState
                        icon={History}
                        title={pending ? ACTIVITY_LOADING : ACTIVITY.emptyTitle}
                        description={
                            pending
                                ? ACTIVITY_LOADING_LEDE
                                : ACTIVITY.emptyDescription
                        }
                    />
                )}
            </Panel>
        </div>
    );
}

AgentOverviewMain.displayName = "AgentOverviewMain";
