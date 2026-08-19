import { ProgressBar } from "@/components/ui/progress-bar";
import { DEAL_STAGES } from "@/lib/config/deal-stages";
import type { DealStage } from "@/lib/types/deal";

const COMPLETE_LABEL = "Complete";

export interface DealProgressProps {
    stage: DealStage;
    daysToClose: number;
}

export function DealProgress({ stage, daysToClose }: DealProgressProps) {
    const index = DEAL_STAGES.findIndex((item) => item.id === stage);
    const percent = Math.round(((index + 1) / DEAL_STAGES.length) * 100);
    const closed = stage === "closed";

    return (
        <div>
            <div className="mb-1.5 flex items-center justify-between gap-2">
                <span className="text-text-muted font-mono text-[10px] tracking-wide uppercase">
                    {closed ? COMPLETE_LABEL : `${daysToClose}d to close`}
                </span>
                <span className="text-accent text-xs font-medium tabular-nums">
                    {percent}%
                </span>
            </div>
            <ProgressBar value={percent} tone={closed ? "success" : "accent"} />
        </div>
    );
}

DealProgress.displayName = "DealProgress";
