"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { DEAL_STAGES } from "@/components/features/agent/deal-row";
import { PipelineStageColumn } from "@/components/features/agent/pipeline-stage-column";
import { PipelineHealthPanel } from "@/components/features/agent/pipeline-health-panel";
import { initialDeals, nextStageOf } from "@/lib/data/agent-pipeline";

export default function AgentPipelinePage() {
    const [deals, setDeals] = useState(initialDeals);

    const openDeals = deals.filter((deal) => deal.stage !== "closed");
    const totalValue =
        openDeals.reduce((sum, deal) => sum + deal.price, 0) / 1_000_000;
    const avgDays = openDeals.length
        ? Math.round(
              openDeals.reduce((sum, deal) => sum + deal.daysInStage, 0) /
                  openDeals.length,
          )
        : 0;

    const columns = useMemo(
        () =>
            DEAL_STAGES.map((stage) => {
                const items = deals.filter((deal) => deal.stage === stage.id);
                return {
                    ...stage,
                    items,
                    value:
                        items.reduce((sum, deal) => sum + deal.price, 0) /
                        1_000_000,
                };
            }),
        [deals],
    );

    const advance = (id: string) =>
        setDeals((prev) =>
            prev.map((deal) =>
                deal.id === id
                    ? {
                          ...deal,
                          stage: nextStageOf(deal.stage).id,
                          daysInStage: 0,
                      }
                    : deal,
            ),
        );

    return (
        <div className="space-y-3">
            <PageHeader
                title="Sales Pipeline"
                description={`${openDeals.length} open deals worth $${totalValue.toFixed(2)}M`}
            />

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
                {columns.map((column) => (
                    <PipelineStageColumn
                        key={column.id}
                        label={column.label}
                        items={column.items}
                        value={column.value}
                        onAdvance={advance}
                    />
                ))}
            </div>

            <PipelineHealthPanel
                avgDays={avgDays}
                totalValue={totalValue}
                openCount={openDeals.length}
            />
        </div>
    );
}
