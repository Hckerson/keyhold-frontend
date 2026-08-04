"use client";

import { useCallback, useMemo, useState } from "react";
import { LeadsHeader } from "@/components/sections/agent/leads-header";
import { LeadsMain } from "@/components/sections/agent/leads-main";
import { LeadsRail } from "@/components/sections/agent/leads-rail";
import { LeadsStatBand } from "@/components/sections/agent/leads-stat-band";
import {
    advanceStage,
    countByStage,
    initialLeads,
    leadStats,
    leadsSummary,
    rankLeads,
    type LeadStageFilter,
} from "@/lib/data/agent-leads";

export function LeadConsole() {
    const [leads, setLeads] = useState(initialLeads);
    const [stageFilter, setStageFilter] = useState<LeadStageFilter>("all");

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

    const advance = useCallback(
        (id: string) => setLeads((current) => advanceStage(current, id)),
        [],
    );

    return (
        <div className="flex flex-col gap-4">
            <LeadsHeader summary={leadsSummary(leads)} />

            <LeadsStatBand stats={leadStats(leads)} />

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                <LeadsMain
                    top={ranked[0]}
                    leads={visible}
                    stageFilter={stageFilter}
                    counts={counts}
                    onFilterChange={setStageFilter}
                    onAdvance={advance}
                />
                <LeadsRail leads={leads} />
            </div>
        </div>
    );
}

LeadConsole.displayName = "LeadConsole";
