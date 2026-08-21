"use client";

import { PageHeader } from "@/components/ui/page-header";
import { PipelineStageColumn } from "@/components/features/agent/pipeline-stage-column";
import { PipelineHealthPanel } from "@/components/features/agent/pipeline-health-panel";
import { useDealPipeline } from "@/lib/hooks/use-deal-pipeline";

const TITLE = "Sales Pipeline";

export default function AgentPipelinePage() {
    const { columns, openCount, totalValue, avgDays, advance } =
        useDealPipeline();

    return (
        <div className="space-y-3">
            <PageHeader
                title={TITLE}
                description={`${openCount} open deals worth $${totalValue.toFixed(2)}M`}
            />

            <div className="card-grid gap-3">
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
                openCount={openCount}
            />
        </div>
    );
}
