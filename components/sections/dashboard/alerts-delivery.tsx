import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { AlertPreferenceList } from "@/components/features/dashboard/alert-preference-list";
import type { AlertVolume } from "@/lib/data/alerts";
import type { AlertChannel, AlertPreference, AlertType } from "@/lib/types";

const DELIVERY_TITLE = "Delivery";
const DELIVERY_LEDE = "Choose what fires and where it lands";

export interface AlertsDeliveryProps {
    preferences: Record<AlertType, AlertPreference>;
    volumes: Record<AlertType, AlertVolume>;
    deliverySummary: string;
    onToggleEnabled: (type: AlertType) => void;
    onToggleChannel: (type: AlertType, channel: AlertChannel) => void;
}

export function AlertsDelivery({
    preferences,
    volumes,
    deliverySummary,
    onToggleEnabled,
    onToggleChannel,
}: AlertsDeliveryProps) {
    return (
        <Panel
            title={DELIVERY_TITLE}
            description={DELIVERY_LEDE}
            count={deliverySummary}
        >
            <PanelInset>
                <AlertPreferenceList
                    preferences={preferences}
                    volumes={volumes}
                    onToggleEnabled={onToggleEnabled}
                    onToggleChannel={onToggleChannel}
                />
            </PanelInset>
        </Panel>
    );
}

AlertsDelivery.displayName = "AlertsDelivery";
