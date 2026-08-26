import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { ShareList } from "@/components/patterns/share-list";
import { AlertPreferenceList } from "@/components/features/dashboard/alert-preference-list";
import { recencyShares } from "@/lib/data/alerts";
import type {
    Alert,
    AlertChannel,
    AlertPreference,
    AlertType,
} from "@/lib/types";

const RECENCY_TITLE = "Recency";
const RECENCY_LEDE = "How fresh the stream is right now";
const DELIVERY_TITLE = "Delivery";
const DELIVERY_LEDE = "Choose what fires and where it lands";

export interface AlertsSharesProps {
    alerts: Alert[];
    preferences: Record<AlertType, AlertPreference>;
    deliverySummary: string;
    onToggleEnabled: (type: AlertType) => void;
    onToggleChannel: (type: AlertType, channel: AlertChannel) => void;
}

export function AlertsShares({
    alerts,
    preferences,
    deliverySummary,
    onToggleEnabled,
    onToggleChannel,
}: AlertsSharesProps) {
    return (
        <div className="panel-pair items-start gap-3">
            <Panel title={RECENCY_TITLE} description={RECENCY_LEDE}>
                <PanelInset>
                    <ShareList shares={recencyShares(alerts)} />
                </PanelInset>
            </Panel>

            <Panel
                title={DELIVERY_TITLE}
                description={DELIVERY_LEDE}
                count={deliverySummary}
            >
                <PanelInset>
                    <AlertPreferenceList
                        preferences={preferences}
                        onToggleEnabled={onToggleEnabled}
                        onToggleChannel={onToggleChannel}
                    />
                </PanelInset>
            </Panel>
        </div>
    );
}

AlertsShares.displayName = "AlertsShares";
