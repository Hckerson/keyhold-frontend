import { ProgressBar } from "@/components/ui/progress-bar";
import { StatusDot, type DotTone } from "@/components/patterns/status-dot";
import { formatMillions } from "@/lib/utils";
import type { QuarterStatus, QuarterSummary } from "@/lib/data/agent-analytics";

const statusTone: Record<QuarterStatus, DotTone> = {
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
            <span className="text-text w-14 shrink-0 truncate text-xs font-medium">
                {quarter.label}
            </span>
            <span className="text-text-secondary w-4 shrink-0 text-xs tabular-nums">
                {quarter.closings}
            </span>
            <ProgressBar
                value={(quarter.volume / totalVolume) * 100}
                className="min-w-0 flex-1"
            />
            <span className="text-text w-14 shrink-0 text-right text-xs font-semibold tabular-nums">
                {formatMillions(quarter.volume)}
            </span>
        </li>
    );
}

AnalyticsQuarterRow.displayName = "AnalyticsQuarterRow";
