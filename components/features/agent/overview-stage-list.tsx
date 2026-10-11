import { OverviewStageRow } from "@/components/features/agent/overview-stage-row";
import type { PipelineStage } from "@/lib/types";

export interface OverviewStageListProps {
    stages: PipelineStage[];
}

export function OverviewStageList({ stages }: OverviewStageListProps) {
    return (
        <ul className="divide-border divide-y">
            {stages.map((stage) => (
                <OverviewStageRow key={stage.id} stage={stage} />
            ))}
        </ul>
    );
}

OverviewStageList.displayName = "OverviewStageList";
