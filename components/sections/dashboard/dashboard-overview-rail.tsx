import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { PanelLink } from "@/components/features/shared/panel-link";
import { OverviewAlertList } from "@/components/features/dashboard/overview-alert-list";
import { OverviewTaskList } from "@/components/features/dashboard/overview-task-list";
import { journeyTasks, matchAlerts } from "@/lib/data/dashboard-overview";

export function DashboardOverviewRail() {
    return (
        <div className="flex flex-col gap-3">
            <Panel
                title="Saved-Search Alerts"
                count={matchAlerts.length}
                action={
                    <PanelLink href="/dashboard/alerts" label="All alerts" />
                }
            >
                <PanelInset>
                    <OverviewAlertList alerts={matchAlerts} />
                </PanelInset>
            </Panel>

            <Panel
                title="Next Steps"
                description="Where you stand in the purchase"
            >
                <PanelInset>
                    <OverviewTaskList tasks={journeyTasks} />
                </PanelInset>
            </Panel>
        </div>
    );
}

DashboardOverviewRail.displayName = "DashboardOverviewRail";
