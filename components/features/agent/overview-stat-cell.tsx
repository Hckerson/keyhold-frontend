import Link from "next/link";
import { cn } from "@/lib/utils";
import { chartToneText } from "@/lib/config/chart-tones";
import type { AgentStat } from "@/lib/data/agent-overview";

export interface OverviewStatCellProps {
    stat: AgentStat;
}

export function OverviewStatCell({ stat }: OverviewStatCellProps) {
    const Icon = stat.icon;

    return (
        <Link
            href={stat.href}
            className="group hover:bg-background-alt ease-smooth flex h-14 min-w-0 flex-1 items-center gap-2 px-3 transition-colors"
        >
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
        </Link>
    );
}

OverviewStatCell.displayName = "OverviewStatCell";
