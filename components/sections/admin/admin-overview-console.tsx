"use client";

import { useMemo } from "react";
import { AdminOverviewActivity } from "@/components/sections/admin/admin-overview-activity";
import { AdminOverviewBusiness } from "@/components/sections/admin/admin-overview-business";
import { AdminOverviewHeader } from "@/components/sections/admin/admin-overview-header";
import { AdminOverviewHealth } from "@/components/sections/admin/admin-overview-health";
import { AdminOverviewPeople } from "@/components/sections/admin/admin-overview-people";
import { AdminOverviewTriage } from "@/components/sections/admin/admin-overview-triage";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import { moderationLoad } from "@/lib/data/admin-overview";
import { businessDeck } from "@/lib/data/admin-overview-business";
import {
    coverageReading,
    RECORD_WINDOW,
    recordReading,
    statusShares,
} from "@/lib/data/admin-overview-people";
import { systemsDeck } from "@/lib/data/admin-overview-systems";
import { decisionLanes, laneReadiness } from "@/lib/data/admin-overview-triage";
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

    const readiness = laneReadiness({
        verifications: kyc,
        listings: flags,
        flags,
        disputes,
    });

    const lanes = useMemo(
        () =>
            decisionLanes(moderationLoad(flags.data, kyc.data, disputes.data)),
        [flags.data, kyc.data, disputes.data],
    );

    const business = useMemo(
        () => businessDeck(trend.data, platform.data, users.data),
        [trend.data, platform.data, users.data],
    );

    const systems = useMemo(() => systemsDeck(health.data), [health.data]);

    const people = useMemo(
        () => ({
            statuses: statusShares(users.data),
            roles: toRoleSegments(directory.data ?? []),
            coverage: directory.data ? coverageReading(directory.data) : null,
        }),
        [users.data, directory.data],
    );

    const activity = useMemo(() => {
        const events = toAuditEvents(audit.data?.items ?? []);
        return { events, summary: recordReading(events) };
    }, [audit.data]);

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

            <div className="console-split gap-3">
                <div className="console-span-3">
                    <AdminOverviewTriage lanes={lanes} readiness={readiness} />
                </div>
                <div className="console-span-2">
                    <AdminOverviewBusiness
                        reading={business.reading}
                        months={business.months}
                        figures={business.figures}
                        lifetime={business.lifetime}
                        pending={
                            trend.isPending ||
                            platform.isPending ||
                            users.isPending
                        }
                        failed={trend.isError}
                    />
                </div>
                <div className="self-start">
                    <AdminOverviewHealth
                        systems={systems.reading}
                        services={systems.services}
                        integrations={systems.integrations}
                        integrationSummary={systems.summary}
                        pending={health.isPending}
                        failed={health.isError}
                    />
                </div>
                <AdminOverviewPeople
                    users={users.data}
                    statuses={people.statuses}
                    roles={people.roles}
                    coverage={people.coverage}
                    pending={users.isPending || directory.isPending}
                    failed={directory.isError}
                />
                <div className="console-span-2">
                    <AdminOverviewActivity
                        events={activity.events}
                        summary={activity.summary}
                        pending={audit.isPending}
                        failed={audit.isError}
                    />
                </div>
            </div>
        </div>
    );
}

AdminOverviewConsole.displayName = "AdminOverviewConsole";
