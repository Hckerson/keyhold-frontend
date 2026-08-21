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
    upcomingViewingsFrom,
} from "@/lib/data/dashboard-overview";
import { useMyInterests } from "@/lib/hooks/use-connections";
import { useUnreadMessageCount } from "@/lib/hooks/use-messages";
import { useSavedProperties } from "@/lib/hooks/use-saved-properties";
import { useSession } from "@/lib/hooks/use-session";
import { usePurchases } from "@/lib/hooks/use-transactions";

export function DashboardOverviewConsole() {
    const { user } = useSession();
    const connections = useMyInterests();
    const saved = useSavedProperties();
    const unread = useUnreadMessageCount();
    const purchases = usePurchases();

    const items = useMemo(() => connections.data ?? [], [connections.data]);
    const savedCount = saved.data?.length ?? 0;

    const positions = useMemo(() => offerPositionsFrom(items), [items]);

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
                stats={buyerStats(items, savedCount, unread.data ?? 0)}
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
                />
            </div>
        </div>
    );
}

DashboardOverviewConsole.displayName = "DashboardOverviewConsole";
