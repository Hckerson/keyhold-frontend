import { chartToneText } from "@/lib/config/chart-tones";
import { DEAL_STAGES } from "@/lib/config/deal-stages";
import type { DealStage } from "@/lib/types/deal";
import { cn } from "@/lib/utils";

const COMPLETE_LABEL = "Complete";

export interface DealProgressProps {
    stage: DealStage;
    daysInStage: number;
}

export function DealProgress({ stage, daysInStage }: DealProgressProps) {
    const index = DEAL_STAGES.findIndex((item) => item.id === stage);
    const closed = stage === "closed";

    return (
        <div className="flex items-center justify-between gap-2">
            <span className="text-text-muted font-mono text-[10px] tracking-wide uppercase">
                {closed ? COMPLETE_LABEL : `${daysInStage}d in stage`}
            </span>
            <span
                className={cn(
                    "text-xs font-medium tabular-nums",
                    chartToneText.accent,
                )}
            >
                Stage {index + 1} of {DEAL_STAGES.length}
            </span>
        </div>
    );
}

DealProgress.displayName = "DealProgress";
