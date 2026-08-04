import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { PanelLink } from "@/components/features/shared/panel-link";
import { AgentPipelineHero } from "@/components/sections/agent/agent-pipeline-hero";
import { OverviewSaleList } from "@/components/features/agent/overview-sale-list";
import { OverviewActivityList } from "@/components/features/agent/overview-activity-list";
import { closedSales, recentActivity } from "@/lib/data/agent-overview";

export function AgentOverviewMain() {
    return (
        <div className="flex flex-col gap-3 lg:col-span-2">
            <AgentPipelineHero />

            <Panel
                title="Closed Sales"
                description="Recent comps, days on market and result against ask"
                action={
                    <PanelLink href="/agent/analytics" label="View comps" />
                }
            >
                <PanelInset>
                    <OverviewSaleList sales={closedSales} />
                </PanelInset>
            </Panel>

            <Panel title="Recent Activity" count={recentActivity.length}>
                <PanelInset>
                    <OverviewActivityList entries={recentActivity} />
                </PanelInset>
            </Panel>
        </div>
    );
}

AgentOverviewMain.displayName = "AgentOverviewMain";
