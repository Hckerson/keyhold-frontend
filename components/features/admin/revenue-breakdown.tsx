import type { RevenueBreakdown as RevenueBreakdownData } from "@/lib/data/admin-overview";

export interface RevenueBreakdownProps {
    data: RevenueBreakdownData;
}

export function RevenueBreakdown({ data }: RevenueBreakdownProps) {
    const { headline, metrics } = data;

    return (
        <div className="flex flex-col gap-2">
            <div className="bg-background border-border-light rounded-lg border p-3">
                <p className="micro-label">{headline.label}</p>
                <p className="font-display text-text text-h4 mt-1 leading-none font-light">
                    {headline.value}
                </p>
            </div>

            <dl className="bg-background-alt divide-border-light divide-y rounded-lg px-3">
                {metrics.map((metric) => (
                    <div
                        key={metric.label}
                        className="flex items-center justify-between gap-3 py-2"
                    >
                        <dt className="text-text-secondary text-xs">
                            {metric.label}
                        </dt>
                        <dd className="text-text text-xs font-semibold tabular-nums">
                            {metric.value}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}

RevenueBreakdown.displayName = "RevenueBreakdown";
