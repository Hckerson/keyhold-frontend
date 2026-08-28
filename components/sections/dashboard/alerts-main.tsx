import { BellOff } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { PanelLink } from "@/components/features/shared/panel-link";
import { AlertTable } from "@/components/features/dashboard/alert-table";
import { AlertsDelivery } from "@/components/sections/dashboard/alerts-delivery";
import { AlertsToolbar } from "@/components/sections/dashboard/alerts-toolbar";
import { AlertsTopHero } from "@/components/sections/dashboard/alerts-top-hero";
import type { AlertVolume, ReadFilter, TypeFilter } from "@/lib/data/alerts";
import type {
    Alert,
    AlertChannel,
    AlertPreference,
    AlertType,
} from "@/lib/types";

const STREAM_TITLE = "Alert Stream";
const STREAM_LEDE = "Every signal behind the one that needs you most";
const STREAM_ACTION = "Saved properties";
const EMPTY_TITLE = "Nothing matches this filter";
const EMPTY_LEDE = "Widen the signal or read state to see more alerts.";
const LOADING_TITLE = "Loading alerts";
const LOADING_LEDE = "Fetching the signals across your saved book.";

export interface AlertsMainProps {
    top?: Alert;
    alerts: Alert[];
    preferences: Record<AlertType, AlertPreference>;
    volumes: Record<AlertType, AlertVolume>;
    deliverySummary: string;
    readFilter: ReadFilter;
    typeFilter: TypeFilter;
    counts: Record<ReadFilter, number>;
    pending?: boolean;
    onReadFilterChange: (filter: ReadFilter) => void;
    onTypeFilterChange: (filter: TypeFilter) => void;
    onMarkRead: (id: string) => void;
    onToggleEnabled: (type: AlertType) => void;
    onToggleChannel: (type: AlertType, channel: AlertChannel) => void;
}

export function AlertsMain({
    top,
    alerts,
    preferences,
    volumes,
    deliverySummary,
    readFilter,
    typeFilter,
    counts,
    pending,
    onReadFilterChange,
    onTypeFilterChange,
    onMarkRead,
    onToggleEnabled,
    onToggleChannel,
}: AlertsMainProps) {
    return (
        <div className="console-span-2 flex flex-col gap-3">
            {top && <AlertsTopHero alert={top} onMarkRead={onMarkRead} />}

            <Panel
                title={STREAM_TITLE}
                description={STREAM_LEDE}
                count={alerts.length}
                action={
                    <PanelLink href="/dashboard/saved" label={STREAM_ACTION} />
                }
            >
                <AlertsToolbar
                    readFilter={readFilter}
                    typeFilter={typeFilter}
                    counts={counts}
                    onReadFilterChange={onReadFilterChange}
                    onTypeFilterChange={onTypeFilterChange}
                />

                {alerts.length > 0 ? (
                    <PanelInset scroll>
                        <AlertTable alerts={alerts} onMarkRead={onMarkRead} />
                    </PanelInset>
                ) : (
                    <EmptyState
                        icon={BellOff}
                        title={pending ? LOADING_TITLE : EMPTY_TITLE}
                        description={pending ? LOADING_LEDE : EMPTY_LEDE}
                    />
                )}
            </Panel>

            <AlertsDelivery
                preferences={preferences}
                volumes={volumes}
                deliverySummary={deliverySummary}
                onToggleEnabled={onToggleEnabled}
                onToggleChannel={onToggleChannel}
            />
        </div>
    );
}

AlertsMain.displayName = "AlertsMain";
