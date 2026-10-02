"use client";

import { useMemo } from "react";
import { AgentOverviewHeader } from "@/components/sections/agent/agent-overview-header";
import { AgentOverviewStatBand } from "@/components/sections/agent/agent-overview-stat-band";
import { AgentOverviewMain } from "@/components/sections/agent/agent-overview-main";
import { AgentOverviewRail } from "@/components/sections/agent/agent-overview-rail";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import {
    agentStats,
    pipelineStagesFrom,
    pipelineSummaryFrom,
} from "@/lib/data/agent-overview";
import {
    closedSalesFrom,
    recentActivityFrom,
    recentLeadsFrom,
    upcomingShowingsFrom,
} from "@/lib/data/agent-overview-feed";
import { leadsSummary, rankLeads } from "@/lib/data/agent-leads";
import { useIncomingConnections } from "@/lib/hooks/use-connections";
import { useSession } from "@/lib/hooks/use-session";
import { useSellerStats } from "@/lib/hooks/use-stats";
import { useSales } from "@/lib/hooks/use-transactions";
import { toLead } from "@/lib/utils/to-lead";

export function AgentOverviewConsole() {
    const { user } = useSession();
    const seller = useSellerStats();
    const connections = useIncomingConnections();
    const sales = useSales();

    const pending =
        seller.isPending || connections.isPending || sales.isPending;

    const items = useMemo(() => connections.data ?? [], [connections.data]);
    const salesItems = useMemo(() => sales.data ?? [], [sales.data]);

    const leads = useMemo(() => rankLeads(items.map(toLead)), [items]);

    const stages = useMemo(
        () => pipelineStagesFrom(items, salesItems),
        [items, salesItems],
    );

    const view = useMemo(
        () =>
            pending
                ? null
                : {
                      summary: pipelineSummaryFrom(stages),
                      sales: closedSalesFrom(salesItems),
                      activity: recentActivityFrom(items),
                      showings: upcomingShowingsFrom(items),
                      leads: recentLeadsFrom(leads),
                      digest: leadsSummary(leads),
                  },
        [pending, stages, salesItems, items, leads],
    );

    const stats = useMemo(
        () => agentStats(seller.data, leads),
        [seller.data, leads],
    );

    if (seller.isError || connections.isError)
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.agentOverview}
                onRetry={() => {
                    void seller.refetch();
                    void connections.refetch();
                }}
            />
        );

    return (
        <div className="flex flex-col gap-4">
            <AgentOverviewHeader name={user?.name} summary={view?.digest} />

            <AgentOverviewStatBand stats={stats} pending={pending} />

            <div className="console-split gap-3">
                <AgentOverviewMain
                    summary={view?.summary}
                    stages={stages}
                    sales={view?.sales ?? []}
                    activity={view?.activity ?? []}
                    pending={pending}
                />
                <AgentOverviewRail
                    showings={view?.showings ?? []}
                    leads={view?.leads ?? []}
                    pending={pending}
                />
            </div>
        </div>
    );
}

AgentOverviewConsole.displayName = "AgentOverviewConsole";
