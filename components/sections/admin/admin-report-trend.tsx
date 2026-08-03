"use client";

import { useState } from "react";
import { Panel } from "@/components/ui/panel";
import { ColumnChart } from "@/components/ui/charts/column-chart";
import { FilterPills } from "@/components/patterns/filter-pills";
import { MetricList } from "@/components/patterns/metric-list";
import {
    REPORT_MONTHS,
    REPORT_PERIOD_LABEL,
    REPORT_TREND_METRICS,
    type ReportMetricKey,
} from "@/lib/data/admin-reports";

const METRIC_FILTERS = REPORT_TREND_METRICS.map(({ id, label }) => ({
    id,
    label,
}));

const CHART_HEIGHT = 224;

export function AdminReportTrend() {
    const [metricId, setMetricId] = useState<ReportMetricKey>(
        REPORT_TREND_METRICS[0].id,
    );

    const metric =
        REPORT_TREND_METRICS.find((item) => item.id === metricId) ??
        REPORT_TREND_METRICS[0];

    return (
        <Panel
            title="Performance trend"
            description={REPORT_PERIOD_LABEL}
            bodyClassName="pt-3"
            action={
                <FilterPills
                    filters={METRIC_FILTERS}
                    active={metricId}
                    onChange={setMetricId}
                />
            }
        >
            <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_14rem]">
                <ColumnChart
                    data={REPORT_MONTHS}
                    xKey="month"
                    series={metric.series}
                    height={CHART_HEIGHT}
                    divideBy={metric.divideBy}
                    valuePrefix={metric.valuePrefix}
                    valueSuffix={metric.valueSuffix}
                />

                <MetricList
                    metrics={metric.summary}
                    className="lg:border-border-light self-center lg:border-l lg:pl-4"
                />
            </div>
        </Panel>
    );
}

AdminReportTrend.displayName = "AdminReportTrend";
