import Link from "next/link";
import { BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColumnChart } from "@/components/ui/charts/column-chart";
import { DeltaChip } from "@/components/ui/delta-chip";
import { EmptyState } from "@/components/ui/empty-state";
import { GMV_SERIES, type GmvReading } from "@/lib/data/admin-overview";
import { formatMillions } from "@/lib/utils";

const HERO_EYEBROW = "Gross merchandise value";
const PRIOR_LABEL = "vs prior month";
const COMMISSION_LEAD = "Est. commissions";
const COMMISSION_BASIS = "at the default take of";
const TRANSACTIONS_ACTION = "Transactions";
const PAYMENTS_ACTION = "Payments";
const EMPTY_TITLE = "No settled volume yet";
const EMPTY_LEDE = "Monthly GMV charts once the first deal settles.";
const CHART_HEIGHT = 180;
const MILLIONS = 1_000_000;

export interface AdminRevenueHeroProps {
    reading: GmvReading | null;
    months: Record<string, string | number>[];
}

export function AdminRevenueHero({ reading, months }: AdminRevenueHeroProps) {
    return (
        <section className="bg-background border-border rounded-xl border p-4 shadow-md">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="micro-label truncate">
                        {HERO_EYEBROW}
                        {reading && ` · ${reading.month}`}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                        <p className="text-h4 font-display text-text leading-none font-light tabular-nums">
                            {formatMillions(reading?.value ?? 0, 1)}
                        </p>
                        {reading?.delta && (
                            <>
                                <DeltaChip
                                    size="sm"
                                    value={reading.delta.label}
                                    direction={reading.delta.direction}
                                />
                                <span className="text-text-muted text-xs">
                                    {PRIOR_LABEL}
                                </span>
                            </>
                        )}
                    </div>
                    {reading && (
                        <p className="text-text-secondary mt-1.5 truncate text-xs">
                            {COMMISSION_LEAD}{" "}
                            <span className="text-text font-semibold tabular-nums">
                                {reading.commissionEstimate}
                            </span>{" "}
                            {COMMISSION_BASIS} {reading.commissionRate}
                        </p>
                    )}
                </div>

                <div className="flex shrink-0 items-center gap-1">
                    <Button asChild>
                        <Link href="/admin/transactions">
                            {TRANSACTIONS_ACTION}
                        </Link>
                    </Button>
                    <Button asChild emphasis="quiet">
                        <Link href="/admin/payments">{PAYMENTS_ACTION}</Link>
                    </Button>
                </div>
            </div>

            <div className="border-border-light mt-3 border-t pt-3">
                {months.length > 0 ? (
                    <ColumnChart
                        data={months}
                        xKey="month"
                        series={GMV_SERIES}
                        divideBy={MILLIONS}
                        fractionDigits={1}
                        valuePrefix="$"
                        valueSuffix="M"
                        height={CHART_HEIGHT}
                    />
                ) : (
                    <EmptyState
                        icon={BarChart3}
                        title={EMPTY_TITLE}
                        description={EMPTY_LEDE}
                    />
                )}
            </div>
        </section>
    );
}

AdminRevenueHero.displayName = "AdminRevenueHero";
