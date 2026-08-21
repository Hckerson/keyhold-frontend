"use client";

import { useState } from "react";
import { DeltaChip } from "@/components/ui/delta-chip";
import { ColumnChart } from "@/components/ui/charts/column-chart";
import { FilterPills } from "@/components/patterns/filter-pills";
import { MetricCell } from "@/components/patterns/metric-cell";
import {
    REPORT_MONTHS,
    REPORT_PERIOD_LABEL,
    REPORT_TREND_METRICS,
} from "@/lib/data/admin-report-trend";
import type { ReportMetricKey } from "@/lib/types";

const METRIC_FILTERS = REPORT_TREND_METRICS.map(({ id, label }) => ({
    id,
    label,
}));

const CHART_HEIGHT = 208;

export function AdminReportsChart() {
    const [metricId, setMetricId] = useState<ReportMetricKey>(
        REPORT_TREND_METRICS[0].id,
    );

    const metric =
        REPORT_TREND_METRICS.find((item) => item.id === metricId) ??
        REPORT_TREND_METRICS[0];

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
                        {REPORT_PERIOD_LABEL}
                    </p>
                </div>

                <FilterPills
                    filters={METRIC_FILTERS}
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
                data={REPORT_MONTHS}
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
