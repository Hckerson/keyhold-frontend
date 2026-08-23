"use client";

import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { ShareList } from "@/components/patterns/share-list";
import { AlertPreferenceList } from "@/components/features/dashboard/alert-preference-list";
import { recencyShares, typeShares } from "@/lib/data/alerts";
import type {
    Alert,
    AlertChannel,
    AlertPreference,
    AlertType,
} from "@/lib/types";

const SIGNAL_TITLE = "Signal Mix";
const SIGNAL_LEDE = "What has been firing across your saved book";
const RECENCY_TITLE = "Recency";
const RECENCY_LEDE = "How fresh the stream is right now";
const DELIVERY_TITLE = "Delivery";
const DELIVERY_LEDE = "Choose what fires and where it lands";

export interface AlertsRailProps {
    alerts: Alert[];
    preferences: Record<AlertType, AlertPreference>;
    deliverySummary: string;
    onToggleEnabled: (type: AlertType) => void;
    onToggleChannel: (type: AlertType, channel: AlertChannel) => void;
}

export function AlertsRail({
    alerts,
    preferences,
    deliverySummary,
    onToggleEnabled,
    onToggleChannel,
}: AlertsRailProps) {
    return (
        <div className="flex flex-col gap-3">
            <Panel
                title={SIGNAL_TITLE}
                description={SIGNAL_LEDE}
                count={alerts.length}
            >
                <PanelInset>
                    <ShareList shares={typeShares(alerts)} />
                </PanelInset>
            </Panel>

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

AlertsRail.displayName = "AlertsRail";
