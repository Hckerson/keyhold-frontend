import { ProgressBar } from "@/components/ui/progress-bar";
import { formatMillions } from "@/lib/utils";
import {
    PIPELINE_STAGE_CAPACITY,
    type PipelineStage,
} from "@/lib/data/agent-overview";

export interface OverviewPipelineStagesProps {
    stages: PipelineStage[];
}

export function OverviewPipelineStages({
    stages,
}: OverviewPipelineStagesProps) {
    return (
        <div className="space-y-3">
            {stages.map((stage) => (
                <div key={stage.name}>
                    <div className="mb-1.5 flex items-center justify-between gap-3">
                        <span className="text-text text-xs font-medium">
                            {stage.name}
                        </span>
                        <span className="text-text-secondary text-xs tabular-nums">
                            {stage.count} deals
                            {stage.value > 0 &&
                                ` · ${formatMillions(stage.value)}`}
                        </span>
                    </div>
                    <ProgressBar
                        value={Math.min(
                            (stage.count / PIPELINE_STAGE_CAPACITY) * 100,
                            100,
                        )}
                    />
                </div>
            ))}
        </div>
    );
}

OverviewPipelineStages.displayName = "OverviewPipelineStages";
