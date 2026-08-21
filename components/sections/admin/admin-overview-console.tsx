"use client";

import { useMemo } from "react";
import { AdminOverviewHeader } from "@/components/sections/admin/admin-overview-header";
import { AdminOverviewMain } from "@/components/sections/admin/admin-overview-main";
import { AdminOverviewRail } from "@/components/sections/admin/admin-overview-rail";
import { AdminOverviewStatBand } from "@/components/sections/admin/admin-overview-stat-band";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import { overviewSummary, platformStatBand } from "@/lib/data/admin-overview";
import { usePlatformStats, useUserStats } from "@/lib/hooks/use-stats";
import { useUsers } from "@/lib/hooks/use-users";
import { toRoleSegments, toStatusSegments } from "@/lib/utils/to-user-segments";

export function AdminOverviewConsole() {
    const platform = usePlatformStats();
    const users = useUserStats();
    const directory = useUsers();

    const stats = useMemo(
        () => platformStatBand(platform.data, users.data),
        [platform.data, users.data],
    );

    const roles = useMemo(
        () => toRoleSegments(directory.data ?? []),
        [directory.data],
    );

    const statuses = useMemo(() => toStatusSegments(users.data), [users.data]);

    if (platform.isError || users.isError)
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.adminOverview}
                onRetry={() => {
                    void platform.refetch();
                    void users.refetch();
                }}
            />
        );

    return (
        <div className="flex flex-col gap-4">
            <AdminOverviewHeader
                summary={overviewSummary(platform.data, users.data)}
            />

            <AdminOverviewStatBand stats={stats} />

            <div className="console-split gap-3">
                <AdminOverviewMain />
                <AdminOverviewRail
                    roles={roles}
                    statuses={statuses}
                    total={users.data?.total ?? 0}
                />
            </div>
        </div>
    );
}

AdminOverviewConsole.displayName = "AdminOverviewConsole";
