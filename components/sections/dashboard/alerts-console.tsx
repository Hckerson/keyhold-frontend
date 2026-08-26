"use client";

import { useCallback, useMemo, useState } from "react";
import { AlertsHeader } from "@/components/sections/dashboard/alerts-header";
import { AlertsMain } from "@/components/sections/dashboard/alerts-main";
import { AlertsRail } from "@/components/sections/dashboard/alerts-rail";
import { AlertsStatBand } from "@/components/sections/dashboard/alerts-stat-band";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import {
    alertStats,
    alertsSummary,
    countByRead,
    deliverySummary,
    emptyPreferences,
    matchesFilters,
    rankAlerts,
    toggleChannel,
    toggleEnabled,
    toPreferenceList,
    toPreferenceMap,
    unreadCount,
    type ReadFilter,
    type TypeFilter,
} from "@/lib/data/alerts";
import {
    useMarkAllNotificationsRead,
    useMarkNotificationRead,
    useNotificationPreferences,
    useNotifications,
    useUpdateNotificationPreferences,
} from "@/lib/hooks/use-notifications";
import { toAlert } from "@/lib/utils/to-alert";
import type { AlertChannel, AlertPreference, AlertType } from "@/lib/types";

const ALERT_PAGE_SIZE = 100;

export function AlertsConsole() {
    const { data, isPending, isError, refetch } = useNotifications({
        limit: ALERT_PAGE_SIZE,
    });
    const storedPreferences = useNotificationPreferences();
    const updatePreferences = useUpdateNotificationPreferences();
    const markRead = useMarkNotificationRead();
    const markAllRead = useMarkAllNotificationsRead();

    const [readFilter, setReadFilter] = useState<ReadFilter>("all");
    const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");

    const alerts = useMemo(
        () => (data?.items ?? []).map(toAlert),
        [data?.items],
    );

    const preferences = useMemo(
        () =>
            storedPreferences.data
                ? toPreferenceMap(storedPreferences.data)
                : emptyPreferences(),
        [storedPreferences.data],
    );

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
        (id: string) => void markRead.mutateAsync(id),
        [markRead],
    );

    const onMarkAllRead = () => void markAllRead.mutateAsync();

    const savePreferences = useCallback(
        (next: Record<AlertType, AlertPreference>) =>
            void updatePreferences.mutateAsync({
                preferences: toPreferenceList(next),
            }),
        [updatePreferences],
    );

    const onToggleEnabled = useCallback(
        (type: AlertType) => savePreferences(toggleEnabled(preferences, type)),
        [preferences, savePreferences],
    );

    const onToggleChannel = useCallback(
        (type: AlertType, channel: AlertChannel) =>
            savePreferences(toggleChannel(preferences, type, channel)),
        [preferences, savePreferences],
    );

    if (isError)
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.buyerAlerts}
                onRetry={() => void refetch()}
            />
        );

    return (
        <div className="flex flex-col gap-4">
            <AlertsHeader
                summary={alertsSummary(alerts)}
                unread={unreadCount(alerts)}
                onMarkAllRead={onMarkAllRead}
            />

            <AlertsStatBand stats={stats} />

            <div className="console-split gap-3">
                <AlertsMain
                    top={ranked[0]}
                    alerts={visible}
                    allAlerts={alerts}
                    preferences={preferences}
                    deliverySummary={deliverySummary(preferences)}
                    readFilter={readFilter}
                    typeFilter={typeFilter}
                    counts={counts}
                    pending={isPending}
                    onReadFilterChange={setReadFilter}
                    onTypeFilterChange={setTypeFilter}
                    onMarkRead={onMarkRead}
                    onToggleEnabled={onToggleEnabled}
                    onToggleChannel={onToggleChannel}
                />
                <AlertsRail alerts={alerts} />
            </div>
        </div>
    );
}

AlertsConsole.displayName = "AlertsConsole";
