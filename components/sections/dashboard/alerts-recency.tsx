import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { ShareList } from "@/components/patterns/share-list";
import { recencyShares } from "@/lib/data/alerts-shares";
import type { Alert } from "@/lib/types";

const RECENCY_TITLE = "Recency";
const RECENCY_LEDE = "How fresh the stream is right now";

export interface AlertsRecencyProps {
    alerts: Alert[];
}

export function AlertsRecency({ alerts }: AlertsRecencyProps) {
    return (
        <Panel title={RECENCY_TITLE} description={RECENCY_LEDE}>
            <PanelInset>
                <ShareList shares={recencyShares(alerts)} />
            </PanelInset>
        </Panel>
    );
}

AlertsRecency.displayName = "AlertsRecency";
