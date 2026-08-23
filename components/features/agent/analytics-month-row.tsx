import { ProgressBar } from "@/components/ui/progress-bar";
import { DeltaChip } from "@/components/ui/delta-chip";
import { formatMillions } from "@/lib/utils";
import type { MonthlyProduction } from "@/lib/data/agent-analytics";

const NO_DELTA = "—";

export interface AnalyticsMonthRowProps {
    month: MonthlyProduction;
    previousVolume?: number;
    peakVolume: number;
}

export function AnalyticsMonthRow({
    month,
    previousVolume,
    peakVolume,
}: AnalyticsMonthRowProps) {
    const share = peakVolume > 0 ? (month.volume / peakVolume) * 100 : 0;
    const deltaPct = previousVolume
        ? ((month.volume - previousVolume) / previousVolume) * 100
        : null;

    return (
        <tr className="h-9">
            <td className="text-text py-0 text-xs font-medium">
                {month.month}
            </td>
            <td className="text-text-secondary py-0 pl-3 text-right text-xs tabular-nums">
                {month.closings}
            </td>
            <td className="py-0 pl-3">
                <div className="flex items-center gap-2">
                    <ProgressBar
                        value={share}
                        tone="accent"
                        className="min-w-0 flex-1"
                    />
                    <span className="text-text-secondary w-9 shrink-0 text-right text-xs tabular-nums">
                        {Math.round(share)}%
                    </span>
                </div>
            </td>
            <td className="text-text py-0 pl-3 text-right text-xs font-semibold tabular-nums">
                {formatMillions(month.volume)}
            </td>
            <td className="py-0 pl-3 text-right">
                {deltaPct === null ? (
                    <span className="text-text-muted text-xs">{NO_DELTA}</span>
                ) : (
                    <DeltaChip
                        size="sm"
                        direction={deltaPct < 0 ? "down" : "up"}
                        value={`${deltaPct > 0 ? "+" : ""}${Math.round(deltaPct)}%`}
                    />
                )}
            </td>
        </tr>
    );
}

AnalyticsMonthRow.displayName = "AnalyticsMonthRow";
