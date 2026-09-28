"use client";

import { useMemo } from "react";
import { AdminOverviewBusiness } from "@/components/sections/admin/admin-overview-business";
import { AdminOverviewHeader } from "@/components/sections/admin/admin-overview-header";
import { AdminOverviewHealth } from "@/components/sections/admin/admin-overview-health";
import { AdminOverviewPeople } from "@/components/sections/admin/admin-overview-people";
import { AdminOverviewTriage } from "@/components/sections/admin/admin-overview-triage";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import {
    gmvMonths,
    gmvReading,
    moderationLoad,
} from "@/lib/data/admin-overview";
import {
    businessFigures,
    lifetimeVolume,
} from "@/lib/data/admin-overview-business";
import { RECORD_WINDOW, recordReading } from "@/lib/data/admin-overview-people";
import {
    integrationSummary,
    systemsReading,
    toIntegrationRows,
    toServiceRows,
} from "@/lib/data/admin-overview-systems";
import { decisionLanes } from "@/lib/data/admin-overview-triage";
import { useAuditLogs } from "@/lib/hooks/use-audit-logs";
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
import { toAuditEvents } from "@/lib/utils/to-audit-event";
import { toRoleSegments } from "@/lib/utils/to-user-segments";
import type { QueueReadiness } from "@/lib/types";

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
    const audit = useAuditLogs({ limit: RECORD_WINDOW });

    const queues = [flags, kyc, disputes];
    const readiness: QueueReadiness = queues.some((query) => query.isError)
        ? "error"
        : queues.some((query) => query.isPending)
          ? "pending"
          : "ready";

    const lanes = useMemo(
        () =>
            decisionLanes(
                moderationLoad(flags.data, kyc.data, disputes.data),
                users.data,
            ),
        [flags.data, kyc.data, disputes.data, users.data],
    );

    const business = useMemo(
        () => ({
            reading: gmvReading(trend.data),
            months: gmvMonths(trend.data),
            figures: businessFigures(trend.data, platform.data, users.data),
            lifetime: lifetimeVolume(platform.data),
        }),
        [trend.data, platform.data, users.data],
    );

    const systems = useMemo(
        () => ({
            reading: systemsReading(health.data),
            services: toServiceRows(health.data),
            integrations: toIntegrationRows(health.data),
            summary: integrationSummary(health.data),
        }),
        [health.data],
    );

    const people = useMemo(() => {
        const events = toAuditEvents(audit.data?.items ?? []);
        return {
            roles: toRoleSegments(directory.data ?? []),
            events,
            summary: recordReading(events),
        };
    }, [directory.data, audit.data]);

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
            <AdminOverviewHeader />

            <div className="bg-background border-border-dark divide-border-dark flex flex-col divide-y overflow-hidden rounded-xl border shadow-sm">
                <AdminOverviewTriage lanes={lanes} readiness={readiness} />
                <AdminOverviewHealth
                    systems={systems.reading}
                    services={systems.services}
                    integrations={systems.integrations}
                    integrationSummary={systems.summary}
                    pending={health.isPending}
                />
                <AdminOverviewBusiness
                    reading={business.reading}
                    months={business.months}
                    figures={business.figures}
                    lifetime={business.lifetime}
                    pending={trend.isPending || platform.isPending}
                />
                <AdminOverviewPeople
                    users={users.data}
                    roles={people.roles}
                    events={people.events}
                    recordSummary={people.summary}
                    eventsPending={audit.isPending}
                    eventsFailed={audit.isError}
                    pending={users.isPending}
                />
            </div>
        </div>
    );
}

AdminOverviewConsole.displayName = "AdminOverviewConsole";
