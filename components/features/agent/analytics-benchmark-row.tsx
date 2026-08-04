import { DeltaChip } from "@/components/ui/delta-chip";
import { formatMillions } from "@/lib/utils";
import type { Benchmark, BenchmarkUnit } from "@/lib/data/agent-analytics";

const unitFormat: Record<BenchmarkUnit, (value: number) => string> = {
    usd: (value) => formatMillions(value, 2),
    days: (value) => `${value}d`,
    percent: (value) => `${value.toFixed(1)}%`,
    score: (value) => value.toFixed(1),
};

export interface AnalyticsBenchmarkRowProps {
    benchmark: Benchmark;
}

export function AnalyticsBenchmarkRow({
    benchmark,
}: AnalyticsBenchmarkRowProps) {
    const format = unitFormat[benchmark.unit];
    const deltaPct =
        ((benchmark.you - benchmark.market) / benchmark.market) * 100;
    const leads = benchmark.higherIsBetter ? deltaPct > 0 : deltaPct < 0;

    return (
        <tr className="h-9">
            <td className="text-text truncate py-0 text-xs font-medium">
                {benchmark.label}
            </td>
            <td className="text-text-muted py-0 pl-3 text-right text-xs tabular-nums">
                {format(benchmark.market)}
            </td>
            <td className="text-text py-0 pl-3 text-right text-xs font-semibold tabular-nums">
                {format(benchmark.you)}
            </td>
            <td className="py-0 pl-3 text-right">
                <DeltaChip
                    size="sm"
                    direction={deltaPct < 0 ? "down" : "up"}
                    tone={leads ? "success" : "error"}
                    value={`${deltaPct > 0 ? "+" : ""}${Math.round(deltaPct)}%`}
                />
            </td>
        </tr>
    );
}

AnalyticsBenchmarkRow.displayName = "AnalyticsBenchmarkRow";
