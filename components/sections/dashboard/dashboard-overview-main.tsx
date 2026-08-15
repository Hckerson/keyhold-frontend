import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { PanelLink } from "@/components/features/shared/panel-link";
import { ActivityList } from "@/components/features/shared/activity-list";
import { DashboardOfferHero } from "@/components/sections/dashboard/dashboard-offer-hero";
import { OverviewViewingList } from "@/components/features/dashboard/overview-viewing-list";
import {
    recentActivity,
    upcomingViewings,
} from "@/lib/data/dashboard-overview";

export function DashboardOverviewMain() {
    return (
        <div className="flex flex-col gap-3 lg:col-span-2">
            <DashboardOfferHero />

            <Panel
                title="Upcoming Viewings"
                count={upcomingViewings.length}
                description="Confirmed tours and the agent hosting each one"
                action={
                    <PanelLink
                        href="/dashboard/viewings"
                        label="All viewings"
                    />
                }
            >
                <PanelInset>
                    <OverviewViewingList viewings={upcomingViewings} />
                </PanelInset>
            </Panel>

            <Panel title="Recent Activity" count={recentActivity.length}>
                <PanelInset>
                    <ActivityList entries={recentActivity} />
                </PanelInset>
            </Panel>
        </div>
    );
}

DashboardOverviewMain.displayName = "DashboardOverviewMain";
