"use client";

import { useMemo } from "react";
import { DashboardOverviewHeader } from "@/components/sections/dashboard/dashboard-overview-header";
import { DashboardOverviewStatBand } from "@/components/sections/dashboard/dashboard-overview-stat-band";
import { DashboardOverviewMain } from "@/components/sections/dashboard/dashboard-overview-main";
import { DashboardOverviewRail } from "@/components/sections/dashboard/dashboard-overview-rail";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import {
    buyerActivityFrom,
    buyerStats,
    journeyTasksFrom,
    offerBookFrom,
    offerPositionsFrom,
    triggeredAlertsFrom,
    upcomingViewingsFrom,
} from "@/lib/data/dashboard-overview";
import { useMyInterests } from "@/lib/hooks/use-connections";
import { useNotifications } from "@/lib/hooks/use-notifications";
import { useUnreadMessageCount } from "@/lib/hooks/use-messages";
import { useSavedProperties } from "@/lib/hooks/use-saved-properties";
import { useSession } from "@/lib/hooks/use-session";
import { usePurchases } from "@/lib/hooks/use-transactions";
import { toAlert } from "@/lib/utils/to-alert";

const ALERT_FEED_SIZE = 40;

export function DashboardOverviewConsole() {
    const { user } = useSession();
    const connections = useMyInterests();
    const saved = useSavedProperties();
    const unread = useUnreadMessageCount();
    const purchases = usePurchases();
    const notifications = useNotifications({ limit: ALERT_FEED_SIZE });

    const items = useMemo(() => connections.data ?? [], [connections.data]);
    const savedCount = saved.data?.length ?? 0;

    const positions = useMemo(() => offerPositionsFrom(items), [items]);

    const alerts = useMemo(
        () =>
            triggeredAlertsFrom((notifications.data?.items ?? []).map(toAlert)),
        [notifications.data?.items],
    );

    if (connections.isError)
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.buyerOverview}
                onRetry={() => void connections.refetch()}
            />
        );

    return (
        <div className="flex flex-col gap-4">
            <DashboardOverviewHeader name={user?.name} />

            <DashboardOverviewStatBand
                stats={buyerStats(
                    items,
                    savedCount,
                    unread.data?.unreadCount ?? 0,
                )}
                pending={
                    connections.isPending || saved.isPending || unread.isPending
                }
            />

            <div className="console-split gap-3">
                <DashboardOverviewMain
                    book={offerBookFrom(positions)}
                    positions={positions}
                    viewings={upcomingViewingsFrom(items)}
                    activity={buyerActivityFrom(items)}
                />
                <DashboardOverviewRail
                    tasks={journeyTasksFrom(
                        items,
                        savedCount,
                        purchases.data ?? [],
                    )}
                    alerts={alerts}
                />
            </div>
        </div>
    );
}

DashboardOverviewConsole.displayName = "DashboardOverviewConsole";
