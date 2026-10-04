import { DeltaChip } from "@/components/ui/delta-chip";
import { formatMillions, percentOf } from "@/lib/utils";
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
    const share = percentOf(month.volume, peakVolume);
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
            <td className="text-accent py-0 pl-3 text-right text-xs font-medium tabular-nums">
                {share}%
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
