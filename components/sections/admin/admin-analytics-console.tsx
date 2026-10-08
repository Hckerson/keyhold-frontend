"use client";

import { useMemo, useState } from "react";
import { AdminAnalyticsHeader } from "@/components/sections/admin/admin-analytics-header";
import { AdminAnalyticsSnapshot } from "@/components/sections/admin/admin-analytics-snapshot";
import { AdminAnalyticsSupply } from "@/components/sections/admin/admin-analytics-supply";
import { AdminAnalyticsVolume } from "@/components/sections/admin/admin-analytics-volume";
import { ConsoleGroup } from "@/components/patterns/console-group";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { DEFAULT_ANALYTICS_WINDOW } from "@/lib/config/admin-analytics";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import { joinersLine } from "@/lib/data/admin-analytics";
import { analyticsSnapshot } from "@/lib/data/admin-analytics-panels";
import { moderationLoad } from "@/lib/data/admin-overview";
import {
    decisionLanes,
    deckReadiness,
    laneReadiness,
    triageReading,
} from "@/lib/data/admin-overview-triage";
import { toPayoutStages } from "@/lib/data/admin-payments";
import { reportMonths, reportWindowLabel } from "@/lib/data/admin-reports";
import { reportMarkets } from "@/lib/data/admin-reports-audience";
import { dealFlow, toTransactionStages } from "@/lib/data/admin-transactions";
import { useDisputeCounts } from "@/lib/hooks/use-disputes";
import { useEscrowStages } from "@/lib/hooks/use-escrow";
import { useFlagCounts } from "@/lib/hooks/use-flags";
import { useKycCounts } from "@/lib/hooks/use-kyc";
import {
    usePlatformStats,
    useRegionMetrics,
    useTrendStats,
    useUserStats,
} from "@/lib/hooks/use-stats";
import { useTransactionStages } from "@/lib/hooks/use-transactions";
import { useTierDistribution, useUsers } from "@/lib/hooks/use-users";
import { toTierSegments } from "@/lib/utils/to-user-segments";
import type { TimeFilter } from "@/lib/enums/enums";

const TRENDS_LABEL = "Trends";
const LIVE_LABEL = "Right now";

export function AdminAnalyticsConsole() {
    const [range, setRange] = useState<TimeFilter>(DEFAULT_ANALYTICS_WINDOW);

    const trend = useTrendStats(range);
    const directory = useUsers();
    const users = useUserStats();
    const platform = usePlatformStats();
    const tiers = useTierDistribution();
    const regions = useRegionMetrics();
    const stages = useTransactionStages();
    const escrow = useEscrowStages();
    const flags = useFlagCounts();
    const kyc = useKycCounts();
    const disputes = useDisputeCounts();

    const months = useMemo(() => reportMonths(trend.data), [trend.data]);
    const joiners = useMemo(
        () => joinersLine(directory.data ?? [], range),
        [directory.data, range],
    );

    const queueState = deckReadiness(
        laneReadiness({ verifications: kyc, listings: flags, flags, disputes }),
    );

    const snapshot = useMemo(() => {
        const lanes = decisionLanes(
            moderationLoad(flags.data, kyc.data, disputes.data),
        );
        return analyticsSnapshot({
            flow: dealFlow(toTransactionStages(stages.data ?? [])),
            platform: platform.data,
            escrow: toPayoutStages(escrow.data ?? []),
            lanes,
            queueReading: triageReading(lanes, queueState),
            users: users.data,
            tiers: toTierSegments(tiers.data),
            markets: reportMarkets(regions.data ?? []),
        });
    }, [
        flags.data,
        kyc.data,
        disputes.data,
        stages.data,
        platform.data,
        escrow.data,
        users.data,
        tiers.data,
        regions.data,
        queueState,
    ]);

    const queries = [
        trend,
        directory,
        users,
        platform,
        tiers,
        regions,
        stages,
        escrow,
        flags,
        kyc,
        disputes,
    ];

    if (queries.some((entry) => entry.isError))
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.adminAnalytics}
                onRetry={() => queries.forEach((entry) => void entry.refetch())}
            />
        );

    const trendsPending = trend.isPending || directory.isPending;

    return (
        <div className="flex flex-col gap-4">
            <AdminAnalyticsHeader
                span={reportWindowLabel(months)}
                range={range}
                onRangeChange={setRange}
            />

            <ConsoleGroup label={TRENDS_LABEL} dimmed={trend.isPlaceholderData}>
                <div className="panel-pair gap-3">
                    <AdminAnalyticsVolume
                        months={months}
                        pending={trend.isPending}
                    />
                    <AdminAnalyticsSupply
                        months={months}
                        joiners={joiners}
                        pending={trendsPending}
                    />
                </div>
            </ConsoleGroup>

            <ConsoleGroup label={LIVE_LABEL}>
                <AdminAnalyticsSnapshot
                    snapshot={snapshot}
                    pending={{
                        pipeline: stages.isPending || platform.isPending,
                        escrow: escrow.isPending,
                        queues: queueState === "pending",
                        status: users.isPending,
                        tiers: tiers.isPending,
                        markets: regions.isPending,
                    }}
                />
            </ConsoleGroup>
        </div>
    );
}

AdminAnalyticsConsole.displayName = "AdminAnalyticsConsole";
