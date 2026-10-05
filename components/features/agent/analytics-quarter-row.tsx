import { StatusDot } from "@/components/patterns/status-dot";
import { formatMillions, percentOf } from "@/lib/utils";
import type { QuarterStatus, QuarterSummary } from "@/lib/data/agent-analytics";
import type { StatusTone } from "@/lib/types";

const statusTone: Record<QuarterStatus, StatusTone> = {
    complete: "success",
    "in-progress": "warning",
};

const statusLabel: Record<QuarterStatus, string> = {
    complete: "Complete",
    "in-progress": "In progress",
};

export interface AnalyticsQuarterRowProps {
    quarter: QuarterSummary;
    totalVolume: number;
}

export function AnalyticsQuarterRow({
    quarter,
    totalVolume,
}: AnalyticsQuarterRowProps) {
    return (
        <li className="flex h-9 items-center gap-2">
            <StatusDot tone={statusTone[quarter.status]} />
            <span className="sr-only">{statusLabel[quarter.status]}</span>
            <span className="text-text min-w-0 flex-1 truncate text-xs font-medium">
                {quarter.label}
            </span>
            <span className="text-text-secondary w-4 shrink-0 text-xs tabular-nums">
                {quarter.closings}
            </span>
            <span className="text-accent w-9 shrink-0 text-right text-xs font-medium tabular-nums">
                {percentOf(quarter.volume, totalVolume)}%
            </span>
            <span className="text-text w-14 shrink-0 text-right text-xs font-semibold tabular-nums">
                {formatMillions(quarter.volume)}
            </span>
        </li>
    );
}

AnalyticsQuarterRow.displayName = "AnalyticsQuarterRow";
