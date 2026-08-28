import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { ShareList } from "@/components/patterns/share-list";
import { AlertsRecency } from "@/components/sections/dashboard/alerts-recency";
import { typeShares } from "@/lib/data/alerts";
import type { Alert } from "@/lib/types";

const SIGNAL_TITLE = "Signal Mix";
const SIGNAL_LEDE = "What has been firing across your saved book";

export interface AlertsRailProps {
    alerts: Alert[];
}

export function AlertsRail({ alerts }: AlertsRailProps) {
    return (
        <div className="flex flex-col gap-3 self-start">
            <Panel
                title={SIGNAL_TITLE}
                description={SIGNAL_LEDE}
                count={alerts.length}
            >
                <PanelInset>
                    <ShareList shares={typeShares(alerts)} />
                </PanelInset>
            </Panel>

            <AlertsRecency alerts={alerts} />
        </div>
    );
}

AlertsRail.displayName = "AlertsRail";
