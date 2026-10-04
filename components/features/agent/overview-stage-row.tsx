import { chartToneText } from "@/lib/config/chart-tones";
import { cn, formatCompactUsd } from "@/lib/utils";
import type { PipelineStage } from "@/lib/types";

const NO_VALUE = "—";

export interface OverviewStageRowProps {
    stage: PipelineStage;
}

export function OverviewStageRow({ stage }: OverviewStageRowProps) {
    return (
        <li className="flex h-9 items-center gap-2">
            <span className="text-text min-w-0 flex-1 truncate text-xs font-medium">
                {stage.name}
            </span>
            <span
                className={cn(
                    "w-5 shrink-0 text-right text-xs font-medium tabular-nums",
                    chartToneText[stage.tone],
                )}
            >
                {stage.count}
            </span>
            <span className="text-text w-16 shrink-0 text-right text-xs font-semibold tabular-nums">
                {stage.value > 0 ? formatCompactUsd(stage.value) : NO_VALUE}
            </span>
        </li>
    );
}

OverviewStageRow.displayName = "OverviewStageRow";
