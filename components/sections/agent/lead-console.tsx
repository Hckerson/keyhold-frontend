"use client";

import { useCallback, useMemo, useState } from "react";
import { LeadsHeader } from "@/components/sections/agent/leads-header";
import { LeadsMain } from "@/components/sections/agent/leads-main";
import { LeadsRail } from "@/components/sections/agent/leads-rail";
import { LeadsStatBand } from "@/components/sections/agent/leads-stat-band";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import {
    countByStage,
    leadStats,
    leadsSummary,
    rankLeads,
} from "@/lib/data/agent-leads";
import {
    useIncomingConnections,
    useRespondToConnection,
} from "@/lib/hooks/use-connections";
import { toLead } from "@/lib/utils/to-lead";
import type { LeadStageFilter } from "@/lib/types/lead";

export function LeadConsole() {
    const { data, isPending, isError, refetch } = useIncomingConnections();
    const respond = useRespondToConnection();

    const [stageFilter, setStageFilter] = useState<LeadStageFilter>("all");

    const leads = useMemo(() => (data ?? []).map(toLead), [data]);

    const ranked = useMemo(() => rankLeads(leads), [leads]);
    const peers = useMemo(() => ranked.slice(1), [ranked]);
    const counts = useMemo(() => countByStage(peers), [peers]);

    const visible = useMemo(
        () =>
            stageFilter === "all"
                ? peers
                : peers.filter((lead) => lead.stage === stageFilter),
        [peers, stageFilter],
    );

    const onRespond = useCallback(
        (id: string, accept: boolean) =>
            void respond.mutateAsync({ id, accept }),
        [respond],
    );

    if (isError)
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.agentLeads}
                onRetry={() => void refetch()}
            />
        );

    return (
        <div className="flex flex-col gap-4">
            <LeadsHeader summary={leadsSummary(leads)} />

            <LeadsStatBand stats={leadStats(leads)} />

            <div className="console-split gap-3">
                <LeadsMain
                    top={ranked[0]}
                    leads={visible}
                    stageFilter={stageFilter}
                    counts={counts}
                    pending={isPending}
                    onFilterChange={setStageFilter}
                    onRespond={onRespond}
                />
                <LeadsRail leads={leads} />
            </div>
        </div>
    );
}

LeadConsole.displayName = "LeadConsole";
