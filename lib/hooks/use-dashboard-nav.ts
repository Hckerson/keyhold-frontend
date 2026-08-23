"use client";

import { useMemo } from "react";
import { dashboardNav } from "@/lib/config/dashboard-nav";
import {
    buildJourneyStations,
    journeyCounts,
    journeyStatus,
} from "@/lib/data/dashboard-journey";
import { useMyInterests } from "@/lib/hooks/use-connections";
import { useUnreadMessageCount } from "@/lib/hooks/use-messages";
import { useUnreadNotificationCount } from "@/lib/hooks/use-notifications";
import { useSavedProperties } from "@/lib/hooks/use-saved-properties";
import { usePurchases } from "@/lib/hooks/use-transactions";

export function useDashboardNav() {
    const saved = useSavedProperties();
    const connections = useMyInterests();
    const purchases = usePurchases();
    const unreadMessages = useUnreadMessageCount();
    const unreadAlerts = useUnreadNotificationCount();

    const counts = useMemo(
        () =>
            journeyCounts(
                saved.data?.length ?? 0,
                connections.data ?? [],
                purchases.data ?? [],
            ),
        [saved.data, connections.data, purchases.data],
    );

    const stations = useMemo(() => buildJourneyStations(counts), [counts]);

    const status = useMemo(
        () => journeyStatus(connections.data ?? [], purchases.data ?? []),
        [connections.data, purchases.data],
    );

    const sections = useMemo(
        () =>
            dashboardNav(
                stations,
                unreadMessages.data?.unreadCount ?? 0,
                unreadAlerts.data?.count ?? 0,
            ),
        [stations, unreadMessages.data, unreadAlerts.data],
    );

    return { sections, status };
}
