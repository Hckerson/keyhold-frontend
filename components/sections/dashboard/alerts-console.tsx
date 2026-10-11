"use client";

import { useCallback, useMemo, useState } from "react";
import { AlertReadAllModal } from "@/components/features/dashboard/alert-read-all-modal";
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
    matchesFilters,
    rankAlerts,
    unreadCount,
} from "@/lib/data/alerts";
import {
    deliverySummary,
    emptyPreferences,
    toggleChannel,
    toggleEnabled,
    toPreferenceList,
    toPreferenceMap,
} from "@/lib/data/alerts-preferences";
import { typeVolumes } from "@/lib/data/alerts-shares";
import { useConfirmation } from "@/lib/hooks/use-confirmation";
import {
    useMarkAllNotificationsRead,
    useMarkNotificationRead,
    useNotificationPreferences,
    useNotifications,
    useUpdateNotificationPreferences,
} from "@/lib/hooks/use-notifications";
import { toAlert } from "@/lib/utils/to-alert";
import type {
    AlertChannel,
    AlertPreference,
    AlertReadFilter,
    AlertType,
    AlertTypeFilter,
} from "@/lib/types";

const ALERT_PAGE_SIZE = 100;

export function AlertsConsole() {
    const { data, isPending, isError, refetch } = useNotifications({
        limit: ALERT_PAGE_SIZE,
    });
    const storedPreferences = useNotificationPreferences();
    const updatePreferences = useUpdateNotificationPreferences();
    const markRead = useMarkNotificationRead();
    const markAllRead = useConfirmation<void, true>(
        useMarkAllNotificationsRead(),
    );

    const [readFilter, setReadFilter] = useState<AlertReadFilter>("all");
    const [typeFilter, setTypeFilter] = useState<AlertTypeFilter>("all");

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
    const volumes = useMemo(() => typeVolumes(alerts), [alerts]);

    const visible = useMemo(
        () =>
            peers.filter((alert) =>
                matchesFilters(alert, readFilter, typeFilter),
            ),
        [peers, readFilter, typeFilter],
    );

    const onMarkRead = useCallback(
        (id: string) => markRead.mutate(id),
        [markRead],
    );

    const savePreferences = useCallback(
        (next: Record<AlertType, AlertPreference>) =>
            updatePreferences.mutate({ preferences: toPreferenceList(next) }),
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
                onMarkAllRead={() => markAllRead.request(true)}
            />

            <AlertsStatBand stats={stats} pending={isPending} />

            <div className="console-split gap-3">
                <AlertsMain
                    top={ranked[0]}
                    alerts={visible}
                    preferences={preferences}
                    volumes={volumes}
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

            <AlertReadAllModal
                open={markAllRead.open}
                unread={unreadCount(alerts)}
                pending={markAllRead.pending}
                failed={markAllRead.failed}
                onClose={markAllRead.dismiss}
                onConfirm={() => markAllRead.confirm()}
            />
        </div>
    );
}

AlertsConsole.displayName = "AlertsConsole";
