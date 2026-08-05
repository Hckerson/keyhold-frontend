import { BellOff } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { PanelLink } from "@/components/features/shared/panel-link";
import { AlertTable } from "@/components/features/dashboard/alert-table";
import { AlertsToolbar } from "@/components/sections/dashboard/alerts-toolbar";
import { AlertsTopHero } from "@/components/sections/dashboard/alerts-top-hero";
import type { ReadFilter, TypeFilter } from "@/lib/data/alerts";
import type { Alert } from "@/lib/types";

const STREAM_TITLE = "Alert Stream";
const STREAM_LEDE = "Every signal behind the one that needs you most";
const STREAM_ACTION = "Saved properties";
const EMPTY_TITLE = "Nothing matches this filter";
const EMPTY_LEDE = "Widen the signal or read state to see more alerts.";

export interface AlertsMainProps {
    top?: Alert;
    alerts: Alert[];
    readFilter: ReadFilter;
    typeFilter: TypeFilter;
    counts: Record<ReadFilter, number>;
    onReadFilterChange: (filter: ReadFilter) => void;
    onTypeFilterChange: (filter: TypeFilter) => void;
    onMarkRead: (id: string) => void;
}

export function AlertsMain({
    top,
    alerts,
    readFilter,
    typeFilter,
    counts,
    onReadFilterChange,
    onTypeFilterChange,
    onMarkRead,
}: AlertsMainProps) {
    return (
        <div className="flex flex-col gap-3 lg:col-span-2">
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
                    <PanelInset flush className="mt-0">
                        <AlertTable alerts={alerts} onMarkRead={onMarkRead} />
                    </PanelInset>
                ) : (
                    <EmptyState
                        icon={BellOff}
                        title={EMPTY_TITLE}
                        description={EMPTY_LEDE}
                    />
                )}
            </Panel>
        </div>
    );
}

AlertsMain.displayName = "AlertsMain";
