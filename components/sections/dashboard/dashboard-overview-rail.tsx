import { BellOff } from "lucide-react";
import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { EmptyState } from "@/components/ui/empty-state";
import { PanelLink } from "@/components/features/shared/panel-link";
import { OverviewTaskList } from "@/components/features/dashboard/overview-task-list";
import { OverviewAlertList } from "@/components/features/dashboard/overview-alert-list";
import { QuickActionList } from "@/components/features/shared/quick-action-list";
import { buyerQuickActions } from "@/lib/data/dashboard-overview";
import type { JourneyTask } from "@/lib/data/dashboard-overview";
import type { Alert } from "@/lib/types";

const STEPS_TITLE = "Next Steps";
const STEPS_LEDE = "Where you stand in the purchase";
const ALERTS_TITLE = "New Alerts";
const ALERTS_LEDE = "Price drops and fresh matches on your criteria";
const ALERTS_ACTION = "All alerts";
const ALERTS_EMPTY = "Nothing triggered yet";
const ALERTS_EMPTY_LEDE = "Price and match alerts land here as they fire.";
const ACTIONS_TITLE = "Quick Links";

export interface DashboardOverviewRailProps {
    tasks: JourneyTask[];
    alerts: Alert[];
}

export function DashboardOverviewRail({
    tasks,
    alerts,
}: DashboardOverviewRailProps) {
    return (
        <div className="flex flex-col gap-3">
            <Panel title={STEPS_TITLE} description={STEPS_LEDE}>
                <PanelInset>
                    <OverviewTaskList tasks={tasks} />
                </PanelInset>
            </Panel>

            <Panel
                title={ALERTS_TITLE}
                description={ALERTS_LEDE}
                count={alerts.length}
                action={
                    <PanelLink href="/dashboard/alerts" label={ALERTS_ACTION} />
                }
            >
                {alerts.length > 0 ? (
                    <PanelInset>
                        <OverviewAlertList alerts={alerts} />
                    </PanelInset>
                ) : (
                    <EmptyState
                        icon={BellOff}
                        title={ALERTS_EMPTY}
                        description={ALERTS_EMPTY_LEDE}
                    />
                )}
            </Panel>

            <Panel title={ACTIONS_TITLE}>
                <PanelInset>
                    <QuickActionList actions={buyerQuickActions} />
                </PanelInset>
            </Panel>
        </div>
    );
}

DashboardOverviewRail.displayName = "DashboardOverviewRail";
