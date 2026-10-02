import { OverviewStageRow } from "@/components/features/agent/overview-stage-row";
import type { PipelineStage } from "@/lib/types";

export interface OverviewStageListProps {
    stages: PipelineStage[];
}

export function OverviewStageList({ stages }: OverviewStageListProps) {
    const maxCount = Math.max(...stages.map((stage) => stage.count), 0);

    return (
        <ul className="divide-border divide-y">
            {stages.map((stage) => (
                <OverviewStageRow
                    key={stage.id}
                    stage={stage}
                    maxCount={maxCount}
                />
            ))}
        </ul>
    );
}

OverviewStageList.displayName = "OverviewStageList";
