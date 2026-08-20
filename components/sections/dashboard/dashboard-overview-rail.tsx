import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { OverviewTaskList } from "@/components/features/dashboard/overview-task-list";
import type { JourneyTask } from "@/lib/data/dashboard-overview";

const STEPS_TITLE = "Next Steps";
const STEPS_LEDE = "Where you stand in the purchase";

export interface DashboardOverviewRailProps {
    tasks: JourneyTask[];
}

export function DashboardOverviewRail({ tasks }: DashboardOverviewRailProps) {
    return (
        <div className="flex flex-col gap-3">
            <Panel title={STEPS_TITLE} description={STEPS_LEDE}>
                <PanelInset>
                    <OverviewTaskList tasks={tasks} />
                </PanelInset>
            </Panel>
        </div>
    );
}

DashboardOverviewRail.displayName = "DashboardOverviewRail";
