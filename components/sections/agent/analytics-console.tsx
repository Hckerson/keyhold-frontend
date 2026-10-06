"use client";

import { useMemo } from "react";
import { AnalyticsHeader } from "@/components/sections/agent/analytics-header";
import { AnalyticsMain } from "@/components/sections/agent/analytics-main";
import { AnalyticsRail } from "@/components/sections/agent/analytics-rail";
import { AnalyticsStatBand } from "@/components/sections/agent/analytics-stat-band";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import {
    analyticsPeriod,
    monthlyProduction,
    production,
    quarters,
} from "@/lib/data/agent-analytics";
import { analyticsStats, benchmarks } from "@/lib/data/agent-analytics-stats";
import { useAgentAnalytics } from "@/lib/hooks/use-stats";

export function AnalyticsConsole() {
    const { data, isPending, isError, refetch } = useAgentAnalytics();

    const view = useMemo(
        () =>
            data
                ? {
                      period: analyticsPeriod(data.monthly),
                      stats: analyticsStats(data),
                      production: production(data),
                      months: monthlyProduction(data),
                      quarters: quarters(data),
                      benchmarks: benchmarks(data),
                  }
                : null,
        [data],
    );

    if (isError)
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.agentAnalytics}
                onRetry={() => void refetch()}
            />
        );

    return (
        <div className="flex flex-col gap-4">
            <AnalyticsHeader period={view?.period ?? ""} />

            <AnalyticsStatBand stats={view?.stats ?? []} pending={isPending} />

            <div className="console-split gap-3">
                <AnalyticsMain
                    period={view?.period ?? ""}
                    production={view?.production}
                    months={view?.months ?? []}
                    pending={isPending}
                />
                <AnalyticsRail
                    benchmarks={view?.benchmarks ?? []}
                    quarters={view?.quarters ?? []}
                />
            </div>
        </div>
    );
}

AnalyticsConsole.displayName = "AnalyticsConsole";
