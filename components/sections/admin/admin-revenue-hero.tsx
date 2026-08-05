import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ColumnChart } from "@/components/ui/charts/column-chart";
import { MetricCell } from "@/components/patterns/metric-cell";
import {
    COMMISSIONS_YTD_LABEL,
    GMV_GROWTH_LABEL,
    GMV_MONTHS,
    GMV_SERIES,
    REVENUE_METRICS,
} from "@/lib/data/admin-overview";
import { GMV_30D } from "@/lib/data/admin-platform";
import { formatMillions } from "@/lib/utils";

const HERO_EYEBROW = "Gross merchandise value · last 30 days";
const GMV_LABEL = "Settled";
const COMMISSION_LEAD = "Commissions year to date";
const PAYMENTS_ACTION = "Payments";
const TRANSACTIONS_ACTION = "Transactions";
const CHART_HEIGHT = 200;
const MILLIONS = 1_000_000;

export function AdminRevenueHero() {
    return (
        <section className="border-highlight/25 bg-background rounded-xl border p-4 shadow-md">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="micro-label truncate">{HERO_EYEBROW}</p>
                    <div className="mt-1 flex items-baseline gap-2">
                        <p className="text-h4 font-display text-text font-light tabular-nums">
                            {formatMillions(GMV_30D, 0)}
                        </p>
                        <span className="micro-label">{GMV_LABEL}</span>
                        <span className="text-success text-xs font-medium tabular-nums">
                            {GMV_GROWTH_LABEL}
                        </span>
                    </div>
                    <p className="text-text-secondary mt-0.5 truncate text-xs">
                        {COMMISSION_LEAD} ·{" "}
                        <span className="text-text font-semibold tabular-nums">
                            {COMMISSIONS_YTD_LABEL}
                        </span>
                    </p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                    <Link
                        href="/admin/transactions"
                        className={buttonVariants({
                            variant: "secondary",
                            size: "sm",
                        })}
                    >
                        {TRANSACTIONS_ACTION}
                    </Link>
                    <Link
                        href="/admin/payments"
                        className={buttonVariants({
                            variant: "ghost",
                            size: "sm",
                        })}
                    >
                        {PAYMENTS_ACTION}
                    </Link>
                </div>
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
                data={GMV_MONTHS}
                xKey="month"
                series={GMV_SERIES}
                divideBy={MILLIONS}
                valuePrefix="$"
                valueSuffix="M"
                height={CHART_HEIGHT}
            />
        </section>
    );
}

AdminRevenueHero.displayName = "AdminRevenueHero";
