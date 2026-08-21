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
    closedSalesFrom,
    pipelineStagesFrom,
    pipelineSummaryFrom,
    recentActivityFrom,
    recentLeadsFrom,
    upcomingShowingsFrom,
} from "@/lib/data/agent-overview";
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

    const items = useMemo(() => connections.data ?? [], [connections.data]);
    const salesItems = useMemo(() => sales.data ?? [], [sales.data]);

    const leads = useMemo(() => rankLeads(items.map(toLead)), [items]);

    const stages = useMemo(
        () => pipelineStagesFrom(items, salesItems),
        [items, salesItems],
    );

    const summary = useMemo(() => pipelineSummaryFrom(stages), [stages]);

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
            <AgentOverviewHeader
                name={user?.name}
                summary={leadsSummary(leads)}
            />

            <AgentOverviewStatBand stats={agentStats(seller.data, leads)} />

            <div className="console-split gap-3">
                <AgentOverviewMain
                    summary={summary}
                    stages={stages}
                    sales={closedSalesFrom(salesItems)}
                    activity={recentActivityFrom(items)}
                />
                <AgentOverviewRail
                    showings={upcomingShowingsFrom(items)}
                    leads={recentLeadsFrom(leads)}
                />
            </div>
        </div>
    );
}

AgentOverviewConsole.displayName = "AgentOverviewConsole";
