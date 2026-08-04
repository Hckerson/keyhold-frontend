import { cn } from "@/lib/utils";
import { chartToneText } from "@/lib/config/chart-tones";
import type { CalendarLoadStat } from "@/lib/data/agent-calendar";

export interface CalendarLoadCellProps {
    stat: CalendarLoadStat;
}

export function CalendarLoadCell({ stat }: CalendarLoadCellProps) {
    const Icon = stat.icon;

    return (
        <div className="flex h-14 min-w-0 flex-1 items-center gap-2 px-3">
            <Icon
                aria-hidden="true"
                strokeWidth={1.5}
                className={cn("size-3 shrink-0", chartToneText[stat.tone])}
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

CalendarLoadCell.displayName = "CalendarLoadCell";
