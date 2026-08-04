import { cn } from "@/lib/utils";
import { chartToneText } from "@/lib/config/chart-tones";
import type { AnalyticsStat } from "@/lib/data/agent-analytics";

export interface AnalyticsStatCellProps {
    stat: AnalyticsStat;
}

export function AnalyticsStatCell({ stat }: AnalyticsStatCellProps) {
    const Icon = stat.icon;

    return (
        <div className="flex h-14 min-w-0 flex-1 items-center gap-2 px-3">
            <Icon
                className={cn("size-3 shrink-0", chartToneText[stat.tone])}
                strokeWidth={1.5}
                aria-hidden="true"
            />
            <span className="micro-label min-w-0 truncate">{stat.label}</span>
            <span
                className={cn(
                    "bg-background ml-auto shrink-0 rounded-md px-1.5 py-0.5 text-xs font-semibold tabular-nums",
                    chartToneText[stat.tone],
                )}
            >
                {stat.value}
            </span>
        </div>
    );
}

AnalyticsStatCell.displayName = "AnalyticsStatCell";
