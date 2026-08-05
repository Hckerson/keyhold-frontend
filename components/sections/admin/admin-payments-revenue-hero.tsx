import { ColumnChart } from "@/components/ui/charts/column-chart";
import { DeltaChip } from "@/components/ui/delta-chip";
import { MetricCell } from "@/components/patterns/metric-cell";
import {
    REVENUE_CHART_DIVISOR,
    REVENUE_METRICS,
    REVENUE_MOM,
    REVENUE_MONTHS,
    REVENUE_PERIOD_LABEL,
    REVENUE_SERIES,
    REVENUE_YTD,
} from "@/lib/data/admin-payments";
import { formatMillions } from "@/lib/utils";

const HERO_EYEBROW = "Platform revenue · year to date";
const MOM_LABEL = "vs prior month";
const CHART_HEIGHT = 200;
const VALUE_PREFIX = "$";
const VALUE_SUFFIX = "K";

export function AdminPaymentsRevenueHero() {
    const rising = REVENUE_MOM >= 0;

    return (
        <section className="border-highlight/25 bg-background rounded-xl border p-4 shadow-md">
            <div className="min-w-0">
                <p className="micro-label truncate">{HERO_EYEBROW}</p>
                <div className="mt-1 flex flex-wrap items-baseline gap-2">
                    <p className="text-h4 font-display text-text font-light tabular-nums">
                        {formatMillions(REVENUE_YTD, 2)}
                    </p>
                    <DeltaChip
                        direction={rising ? "up" : "down"}
                        value={`${Math.abs(REVENUE_MOM)}%`}
                    />
                    <span className="micro-label">{MOM_LABEL}</span>
                </div>
                <p className="text-text-secondary mt-0.5 truncate text-xs">
                    {REVENUE_PERIOD_LABEL}
                </p>
            </div>

            <div className="bg-background-muted border-border-light mt-3 grid grid-cols-2 gap-3 rounded-md border p-3 sm:grid-cols-4">
                {REVENUE_METRICS.map((metric) => (
                    <MetricCell key={metric.label} label={metric.label}>
                        <span className="truncate tabular-nums">
                            {metric.value}
                        </span>
                    </MetricCell>
                ))}
            </div>

            <ColumnChart
                className="mt-3"
                data={REVENUE_MONTHS}
                xKey="month"
                series={REVENUE_SERIES}
                divideBy={REVENUE_CHART_DIVISOR}
                valuePrefix={VALUE_PREFIX}
                valueSuffix={VALUE_SUFFIX}
                height={CHART_HEIGHT}
            />
        </section>
    );
}

AdminPaymentsRevenueHero.displayName = "AdminPaymentsRevenueHero";
