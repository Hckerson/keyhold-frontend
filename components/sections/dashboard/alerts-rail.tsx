"use client";

import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { FormField } from "@/components/ui/forms/form-field";
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
const THRESHOLD_LABEL = "Drop threshold";
const THRESHOLD_HINT = "Minimum reduction before a price drop fires";

export interface AlertsRailProps {
    alerts: Alert[];
    preferences: Record<AlertType, AlertPreference>;
    threshold: string;
    deliverySummary: string;
    onThresholdChange: (value: string) => void;
    onToggleEnabled: (type: AlertType) => void;
    onToggleChannel: (type: AlertType, channel: AlertChannel) => void;
}

export function AlertsRail({
    alerts,
    preferences,
    threshold,
    deliverySummary,
    onThresholdChange,
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

                {preferences["price-drop"].enabled && (
                    <PanelInset>
                        <div className="py-3">
                            <FormField
                                label={THRESHOLD_LABEL}
                                name="priceDropThreshold"
                                value={threshold}
                                onChange={(event) =>
                                    onThresholdChange(event.target.value)
                                }
                                prefix="$"
                                variant="numeric"
                                inputMode="numeric"
                                placeholder="50,000"
                                hint={
                                    <span className="text-text-muted text-xs">
                                        {THRESHOLD_HINT}
                                    </span>
                                }
                            />
                        </div>
                    </PanelInset>
                )}
            </Panel>
        </div>
    );
}

AlertsRail.displayName = "AlertsRail";
