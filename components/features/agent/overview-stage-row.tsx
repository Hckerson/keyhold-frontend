import { ProgressBar } from "@/components/ui/progress-bar";
import { formatMillions } from "@/lib/utils";
import type { PipelineStage } from "@/lib/data/agent-overview";

const NO_VALUE = "—";

export interface OverviewStageRowProps {
    stage: PipelineStage;
    maxCount: number;
}

export function OverviewStageRow({ stage, maxCount }: OverviewStageRowProps) {
    return (
        <li className="flex h-9 items-center gap-2">
            <span className="text-text w-16 shrink-0 truncate text-xs font-medium">
                {stage.name}
            </span>
            <span className="text-text-secondary w-5 shrink-0 text-xs tabular-nums">
                {stage.count}
            </span>
            <ProgressBar
                value={(stage.count / maxCount) * 100}
                tone={stage.tone}
                className="min-w-0 flex-1"
            />
            <span className="text-text w-16 shrink-0 text-right text-xs font-semibold tabular-nums">
                {stage.value > 0 ? formatMillions(stage.value) : NO_VALUE}
            </span>
        </li>
    );
}

OverviewStageRow.displayName = "OverviewStageRow";
