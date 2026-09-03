"use client";

import { useMemo } from "react";
import { AdminOverviewHeader } from "@/components/sections/admin/admin-overview-header";
import { AdminOverviewMain } from "@/components/sections/admin/admin-overview-main";
import { AdminOverviewRail } from "@/components/sections/admin/admin-overview-rail";
import { AdminOverviewStatBand } from "@/components/sections/admin/admin-overview-stat-band";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import {
    commissionsLabel,
    gmvGrowthLabel,
    gmvLatest,
    gmvMonths,
    moderationLoad,
    overviewSummary,
    platformSignals,
    platformStatBand,
    revenueMetrics,
    integrationSummary,
    serviceSummary,
    signalExposureLabel,
    toIntegrationRows,
    toServiceRows,
} from "@/lib/data/admin-overview";
import { useDisputeCounts } from "@/lib/hooks/use-disputes";
import { useFlagCounts } from "@/lib/hooks/use-flags";
import { useKycCounts } from "@/lib/hooks/use-kyc";
import { useServiceHealth } from "@/lib/hooks/use-service-health";
import {
    usePlatformStats,
    useTrendStats,
    useUserStats,
} from "@/lib/hooks/use-stats";
import { useUsers } from "@/lib/hooks/use-users";
import { toRoleSegments, toStatusSegments } from "@/lib/utils/to-user-segments";

const HEALTH_WINDOW_HOURS = 24;
const TREND_FILTER = "month";

export function AdminOverviewConsole() {
    const platform = usePlatformStats();
    const users = useUserStats();
    const directory = useUsers();
    const trend = useTrendStats(TREND_FILTER);
    const flags = useFlagCounts();
    const kyc = useKycCounts();
    const disputes = useDisputeCounts();
    const health = useServiceHealth(HEALTH_WINDOW_HOURS);

    const stats = useMemo(
        () => platformStatBand(platform.data, users.data),
        [platform.data, users.data],
    );

    const roles = useMemo(
        () => toRoleSegments(directory.data ?? []),
        [directory.data],
    );

    const statuses = useMemo(() => toStatusSegments(users.data), [users.data]);

    const queues = useMemo(
        () => moderationLoad(flags.data, kyc.data, disputes.data),
        [flags.data, kyc.data, disputes.data],
    );

    const signals = useMemo(() => platformSignals(queues), [queues]);

    const services = useMemo(() => toServiceRows(health.data), [health.data]);

    const integrations = useMemo(
        () => toIntegrationRows(health.data),
        [health.data],
    );

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
                <AdminOverviewMain
                    gmv={gmvLatest(trend.data)}
                    growthLabel={gmvGrowthLabel(trend.data)}
                    commissionsLabel={commissionsLabel(platform.data)}
                    months={gmvMonths(trend.data)}
                    metrics={revenueMetrics(trend.data, platform.data)}
                    signals={signals}
                    exposureLabel={signalExposureLabel(platform.data)}
                    services={services}
                    serviceSummary={serviceSummary(health.data)}
                    integrations={integrations}
                    integrationSummary={integrationSummary(health.data)}
                />
                <AdminOverviewRail
                    roles={roles}
                    statuses={statuses}
                    total={users.data?.total ?? 0}
                    queues={queues}
                />
            </div>
        </div>
    );
}

AdminOverviewConsole.displayName = "AdminOverviewConsole";
