import { BarChart, type BarDatum } from "@/components/ui/charts/bar-chart";
import { formatMillions } from "@/lib/utils";
import type { PipelineStage } from "@/lib/data/agent-overview";

export interface OverviewPipelineStagesProps {
    stages: PipelineStage[];
}

export function OverviewPipelineStages({
    stages,
}: OverviewPipelineStagesProps) {
    const data: BarDatum[] = stages.map((stage) => ({
        label: stage.name,
        value: stage.count,
        display:
            stage.value > 0
                ? `${stage.count} · ${formatMillions(stage.value)}`
                : `${stage.count}`,
    }));

    return (
        <BarChart data={data} labelWidth={76} rowHeight={38} valueWidth={92} />
    );
}

OverviewPipelineStages.displayName = "OverviewPipelineStages";
