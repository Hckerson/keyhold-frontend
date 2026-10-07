"use client";

import { useId } from "react";
import { BarChart3 } from "lucide-react";
import { ColumnChart } from "@/components/ui/charts/column-chart";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { ReportMeasureTabs } from "@/components/features/admin/report-measure-tabs";
import { REPORT_MEASURES } from "@/lib/config/report-measures";
import {
    measureReading,
    measureSeries,
} from "@/lib/data/admin-reports-measures";
import type { ReportMeasure, ReportMeasureId, ReportMonth } from "@/lib/types";

const TITLE = "Performance";
const EMPTY_TITLE = "Nothing recorded in this window";
const EMPTY_LEDE = "Pick a longer window above to see the monthly trend.";
const CHART_HEIGHT = 232;
const MONEY_PREFIX = "$";

export interface AdminReportsChartProps {
    months: ReportMonth[];
    measures: ReportMeasure[];
    measure: ReportMeasureId;
    pending?: boolean;
    onMeasureChange: (next: ReportMeasureId) => void;
}

export function AdminReportsChart({
    months,
    measures,
    measure,
    pending,
    onMeasureChange,
}: AdminReportsChartProps) {
    const baseId = useId();
    const panelId = `${baseId}-panel`;
    const tabIdOf = (id: ReportMeasureId) => `${baseId}-${id}`;
    const meta = REPORT_MEASURES[measure];
    const series = measureSeries(months, measure);
    const recorded = series.some((point) => point.value > 0);

    return (
        <section
            aria-label={TITLE}
            aria-busy={pending || undefined}
            className="border-border bg-background overflow-hidden rounded-xl border shadow-sm"
        >
            <ReportMeasureTabs
                measures={measures}
                active={measure}
                panelId={panelId}
                tabIdOf={tabIdOf}
                pending={pending}
                onChange={onMeasureChange}
            />

            <div
                role="tabpanel"
                id={panelId}
                aria-labelledby={tabIdOf(measure)}
                className="flex flex-col gap-3 p-4"
            >
                {pending ? (
                    <>
                        <Skeleton className="h-3 w-64" />
                        <Skeleton
                            className="w-full"
                            style={{ height: CHART_HEIGHT }}
                        />
                    </>
                ) : recorded ? (
                    <>
                        <p className="text-text-secondary text-xs">
                            {measureReading(months, measure)}
                        </p>
                        <ColumnChart
                            data={series}
                            xKey="month"
                            series={[
                                {
                                    key: "value",
                                    name: meta.label,
                                    tone: "accent",
                                },
                            ]}
                            height={CHART_HEIGHT}
                            divideBy={meta.divideBy}
                            fractionDigits={meta.fractionDigits}
                            valuePrefix={meta.money ? MONEY_PREFIX : ""}
                            valueSuffix={meta.suffix}
                            faded={(index) => months[index].partial}
                        />
                    </>
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

AdminReportsChart.displayName = "AdminReportsChart";
