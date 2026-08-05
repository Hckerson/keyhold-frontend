"use client";

import { useCallback, useMemo, useState } from "react";
import { AlertsHeader } from "@/components/sections/dashboard/alerts-header";
import { AlertsMain } from "@/components/sections/dashboard/alerts-main";
import { AlertsRail } from "@/components/sections/dashboard/alerts-rail";
import { AlertsStatBand } from "@/components/sections/dashboard/alerts-stat-band";
import {
    DEFAULT_THRESHOLD,
    alertStats,
    alertsSummary,
    countByRead,
    deliverySummary,
    initialAlerts,
    initialPreferences,
    markAllRead,
    markRead,
    matchesFilters,
    rankAlerts,
    toggleChannel,
    toggleEnabled,
    unreadCount,
    type ReadFilter,
    type TypeFilter,
} from "@/lib/data/alerts";
import type { AlertChannel, AlertType } from "@/lib/types";

export function AlertsConsole() {
    const [alerts, setAlerts] = useState(initialAlerts);
    const [preferences, setPreferences] = useState(initialPreferences);
    const [threshold, setThreshold] = useState(DEFAULT_THRESHOLD);
    const [readFilter, setReadFilter] = useState<ReadFilter>("all");
    const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");

    const ranked = useMemo(() => rankAlerts(alerts), [alerts]);
    const peers = useMemo(() => ranked.slice(1), [ranked]);
    const counts = useMemo(() => countByRead(peers), [peers]);
    const stats = useMemo(() => alertStats(alerts), [alerts]);

    const visible = useMemo(
        () =>
            peers.filter((alert) =>
                matchesFilters(alert, readFilter, typeFilter),
            ),
        [peers, readFilter, typeFilter],
    );

    const onMarkRead = useCallback(
        (id: string) => setAlerts((current) => markRead(current, id)),
        [],
    );

    const onMarkAllRead = () => setAlerts(markAllRead);

    const onToggleEnabled = useCallback(
        (type: AlertType) =>
            setPreferences((current) => toggleEnabled(current, type)),
        [],
    );

    const onToggleChannel = useCallback(
        (type: AlertType, channel: AlertChannel) =>
            setPreferences((current) => toggleChannel(current, type, channel)),
        [],
    );

    return (
        <div className="flex flex-col gap-4">
            <AlertsHeader
                summary={alertsSummary(alerts)}
                unread={unreadCount(alerts)}
                onMarkAllRead={onMarkAllRead}
            />

            <AlertsStatBand stats={stats} />

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                <AlertsMain
                    top={ranked[0]}
                    alerts={visible}
                    readFilter={readFilter}
                    typeFilter={typeFilter}
                    counts={counts}
                    onReadFilterChange={setReadFilter}
                    onTypeFilterChange={setTypeFilter}
                    onMarkRead={onMarkRead}
                />
                <AlertsRail
                    alerts={alerts}
                    preferences={preferences}
                    threshold={threshold}
                    deliverySummary={deliverySummary(preferences)}
                    onThresholdChange={setThreshold}
                    onToggleEnabled={onToggleEnabled}
                    onToggleChannel={onToggleChannel}
                />
            </div>
        </div>
    );
}

AlertsConsole.displayName = "AlertsConsole";
