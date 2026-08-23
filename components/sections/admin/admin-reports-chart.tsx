"use client";

import { useState } from "react";
import { DeltaChip } from "@/components/ui/delta-chip";
import { ColumnChart } from "@/components/ui/charts/column-chart";
import { FilterPills } from "@/components/patterns/filter-pills";
import { MetricCell } from "@/components/patterns/metric-cell";
import type { ReportMetricKey, ReportTrendMetric } from "@/lib/types";

const CHART_HEIGHT = 208;
const DEFAULT_METRIC: ReportMetricKey = "gmv";

export interface AdminReportsChartProps {
    metrics: ReportTrendMetric[];
    months: Record<string, string | number>[];
    period: string;
}

export function AdminReportsChart({
    metrics,
    months,
    period,
}: AdminReportsChartProps) {
    const [metricId, setMetricId] = useState<ReportMetricKey>(DEFAULT_METRIC);

    const filters = metrics.map(({ id, label }) => ({ id, label }));
    const metric = metrics.find((item) => item.id === metricId) ?? metrics[0];

    if (!metric) return null;

    return (
        <section className="border-highlight/25 bg-background rounded-xl border p-4 shadow-md">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="micro-label truncate">{metric.eyebrow}</p>
                    <div className="mt-1 flex items-center gap-2">
                        <p className="text-h4 font-display text-text font-light tabular-nums">
                            {metric.headline}
                        </p>
                        <DeltaChip
                            value={metric.change}
                            direction={metric.trend}
                        />
                    </div>
                    <p className="text-text-secondary mt-0.5 truncate text-xs">
                        {period}
                    </p>
                </div>

                <FilterPills
                    filters={filters}
                    active={metricId}
                    onChange={setMetricId}
                />
            </div>

            <div className="metric-strip bg-background-muted border-border-light mt-3 gap-3 rounded-md border p-3">
                {metric.summary.map((item) => (
                    <MetricCell key={item.label} label={item.label}>
                        <span className="truncate tabular-nums">
                            {item.value}
                        </span>
                    </MetricCell>
                ))}
            </div>

            <ColumnChart
                className="mt-3"
                data={months}
                xKey="month"
                series={metric.series}
                height={CHART_HEIGHT}
                divideBy={metric.divideBy}
                valuePrefix={metric.valuePrefix}
                valueSuffix={metric.valueSuffix}
            />
        </section>
    );
}

AdminReportsChart.displayName = "AdminReportsChart";
