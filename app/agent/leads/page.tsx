"use client";

import { useMemo, useState } from "react";
import { UserSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { StepList } from "@/components/ui/step-list";
import { FilterPills } from "@/components/patterns/filter-pills";
import { LeadCard } from "@/components/features/agent/lead-card";
import {
    LEAD_STAGE_FILTERS,
    NEXT_STAGE,
    initialLeads,
    leadTips,
    type LeadScore,
    type LeadStageFilter,
} from "@/lib/data/agent-leads";

export default function AgentLeadsPage() {
    const [leads, setLeads] = useState(initialLeads);
    const [stageFilter, setStageFilter] = useState<LeadStageFilter>("all");

    const counts = useMemo(() => {
        const map: Record<LeadStageFilter, number> = {
            all: leads.length,
            new: 0,
            contacted: 0,
            qualified: 0,
            lost: 0,
        };
        for (const lead of leads) map[lead.stage] += 1;
        return map;
    }, [leads]);

    const visible = useMemo(
        () =>
            stageFilter === "all"
                ? leads
                : leads.filter((lead) => lead.stage === stageFilter),
        [leads, stageFilter],
    );

    const score = (value: LeadScore) =>
        leads.filter((lead) => lead.score === value).length;

    const advance = (id: string) =>
        setLeads((prev) =>
            prev.map((lead) =>
                lead.id === id
                    ? { ...lead, stage: NEXT_STAGE[lead.stage].id }
                    : lead,
            ),
        );

    return (
        <div className="space-y-3">
            <PageHeader
                title="Lead Pipeline"
                description={`${score("hot")} hot · ${score("warm")} warm · ${score("cold")} cold`}
                action={
                    <Button variant="primary" size="sm">
                        Add Lead
                    </Button>
                }
            />

            <FilterPills<LeadStageFilter>
                filters={LEAD_STAGE_FILTERS}
                active={stageFilter}
                onChange={setStageFilter}
                counts={counts}
            />

            {visible.length > 0 ? (
                <div className="space-y-3">
                    {visible.map((lead) => (
                        <LeadCard
                            key={lead.id}
                            lead={lead}
                            onAdvance={advance}
                        />
                    ))}
                </div>
            ) : (
                <EmptyState
                    icon={UserSearch}
                    title="No leads in this stage"
                    description="Change the filter or capture a new prospect."
                    action={
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => setStageFilter("all")}
                        >
                            Show all leads
                        </Button>
                    }
                />
            )}

            <Panel
                title="Lead Management Tips"
                description="Best practices for converting leads to sales"
            >
                <StepList steps={leadTips} />
            </Panel>
        </div>
    );
}
