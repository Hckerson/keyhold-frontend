import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { ShareList } from "@/components/patterns/share-list";
import { typeShares } from "@/lib/data/alerts";
import type { Alert } from "@/lib/types";

const SIGNAL_TITLE = "Signal Mix";
const SIGNAL_LEDE = "What has been firing across your saved book";

export interface AlertsRailProps {
    alerts: Alert[];
}

export function AlertsRail({ alerts }: AlertsRailProps) {
    return (
        <Panel
            className="self-start"
            title={SIGNAL_TITLE}
            description={SIGNAL_LEDE}
            count={alerts.length}
        >
            <PanelInset>
                <ShareList shares={typeShares(alerts)} />
            </PanelInset>
        </Panel>
    );
}

AlertsRail.displayName = "AlertsRail";
