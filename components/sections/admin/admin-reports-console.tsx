"use client";

import { useMemo } from "react";
import { AdminReportsHeader } from "@/components/sections/admin/admin-reports-header";
import { AdminReportsMain } from "@/components/sections/admin/admin-reports-main";
import { AdminReportsRail } from "@/components/sections/admin/admin-reports-rail";
import { AdminReportsStatBand } from "@/components/sections/admin/admin-reports-stat-band";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import {
    regionPerformance,
    reportSignals,
    reportStats,
} from "@/lib/data/admin-reports";
import {
    reportMonths,
    reportPeriodLabel,
    reportTrendMetrics,
} from "@/lib/data/admin-report-trend";
import {
    usePlatformStats,
    useRegionMetrics,
    useTrendStats,
    useUserStats,
} from "@/lib/hooks/use-stats";
import { useTierDistribution, useUsers } from "@/lib/hooks/use-users";
import { toRoleSegments, toTierSegments } from "@/lib/utils/to-user-segments";
import { formatCount } from "@/lib/utils";

const TREND_FILTER = "month";

export function AdminReportsConsole() {
    const platform = usePlatformStats();
    const users = useUserStats();
    const directory = useUsers();
    const tiers = useTierDistribution();
    const regions = useRegionMetrics();
    const trend = useTrendStats(TREND_FILTER);

    const ranked = useMemo(
        () => regionPerformance(regions.data ?? []),
        [regions.data],
    );

    const roles = useMemo(
        () => toRoleSegments(directory.data ?? []),
        [directory.data],
    );

    const tierSegments = useMemo(
        () => toTierSegments(tiers.data),
        [tiers.data],
    );

    if (platform.isError || regions.isError || trend.isError)
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.adminReports}
                onRetry={() => {
                    void platform.refetch();
                    void regions.refetch();
                    void trend.refetch();
                }}
            />
        );

    return (
        <div className="flex flex-col gap-4">
            <AdminReportsHeader period={reportPeriodLabel(trend.data)} />

            <AdminReportsStatBand
                stats={reportStats(platform.data, users.data)}
            />

            <div className="console-split gap-3">
                <AdminReportsMain
                    regions={ranked}
                    metrics={reportTrendMetrics(trend.data)}
                    months={reportMonths(trend.data)}
                    period={reportPeriodLabel(trend.data)}
                />
                <AdminReportsRail
                    signals={reportSignals(
                        platform.data,
                        users.data,
                        regions.data ?? [],
                        trend.data,
                    )}
                    roles={roles}
                    tiers={tierSegments}
                    totalLabel={formatCount(
                        tiers.data?.total ?? users.data?.total ?? 0,
                    )}
                />
            </div>
        </div>
    );
}

AdminReportsConsole.displayName = "AdminReportsConsole";
