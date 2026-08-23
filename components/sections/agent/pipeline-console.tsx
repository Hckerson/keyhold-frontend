"use client";

import { PageHeader } from "@/components/ui/page-header";
import { PipelineStageColumn } from "@/components/features/agent/pipeline-stage-column";
import { PipelineHealthPanel } from "@/components/features/agent/pipeline-health-panel";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import { useDealPipeline } from "@/lib/hooks/use-deal-pipeline";

const TITLE = "Sales Pipeline";

export function PipelineConsole() {
    const pipeline = useDealPipeline();

    if (pipeline.failed)
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.agentPipeline}
                onRetry={pipeline.refetch}
            />
        );

    return (
        <div className="space-y-3">
            <PageHeader
                title={TITLE}
                description={`${pipeline.openCount} open deals worth $${pipeline.totalValue.toFixed(2)}M`}
            />

            <div className="card-grid gap-3">
                {pipeline.columns.map((column) => (
                    <PipelineStageColumn
                        key={column.id}
                        label={column.label}
                        items={column.items}
                        value={column.value}
                    />
                ))}
            </div>

            <PipelineHealthPanel
                avgDays={pipeline.avgDays}
                totalValue={pipeline.totalValue}
                openCount={pipeline.openCount}
                closeRate={pipeline.closeRate}
                closedCount={pipeline.closedCount}
            />
        </div>
    );
}

PipelineConsole.displayName = "PipelineConsole";
