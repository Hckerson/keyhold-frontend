import { AnalyticsBenchmarkRow } from "@/components/features/agent/analytics-benchmark-row";
import type { Benchmark } from "@/lib/data/agent-analytics";

const TABLE_CAPTION = "Your figures against the market average";

export interface AnalyticsBenchmarkTableProps {
    benchmarks: Benchmark[];
}

export function AnalyticsBenchmarkTable({
    benchmarks,
}: AnalyticsBenchmarkTableProps) {
    return (
        <table className="w-full table-fixed">
            <caption className="sr-only">{TABLE_CAPTION}</caption>
            <thead>
                <tr className="border-border h-9 border-b">
                    <th scope="col" className="micro-label text-left">
                        Metric
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-14 pl-3 text-right"
                    >
                        Market
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-14 pl-3 text-right"
                    >
                        You
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-14 pl-3 text-right"
                    >
                        Delta
                    </th>
                </tr>
            </thead>
            <tbody className="divide-border divide-y">
                {benchmarks.map((benchmark) => (
                    <AnalyticsBenchmarkRow
                        key={benchmark.id}
                        benchmark={benchmark}
                    />
                ))}
            </tbody>
        </table>
    );
}

AnalyticsBenchmarkTable.displayName = "AnalyticsBenchmarkTable";
