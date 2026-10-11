"use client";

import {
    BarChart as RBarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useMounted } from "@/lib/hooks/use-mounted";
import { chartToneVar as toneVar } from "@/lib/config/chart-tones";
import {
    AXIS_TICK,
    STACK_GAP,
    TOOLTIP_CONTENT,
    TOOLTIP_LABEL,
} from "@/components/ui/charts/chart-chrome";
import { cn } from "@/lib/utils";
import { formatScaled } from "@/lib/utils/format";
import type { ColumnSeries } from "@/lib/types";

const FADED_OPACITY = 0.35;

export interface ColumnChartProps {
    data: Record<string, string | number>[];
    xKey: string;
    series: ColumnSeries[];
    height?: number;
    divideBy?: number;
    fractionDigits?: number;
    valuePrefix?: string;
    valueSuffix?: string;
    faded?: (index: number) => boolean;
    xAxis?: boolean;
    className?: string;
}

export function ColumnChart({
    data,
    xKey,
    series,
    height = 260,
    divideBy = 1,
    fractionDigits = 0,
    valuePrefix = "",
    valueSuffix = "",
    faded,
    xAxis = true,
    className,
}: ColumnChartProps) {
    const mounted = useMounted();
    const stacked = series.length > 1;

    const format = (value: number) =>
        `${valuePrefix}${formatScaled(value, { divideBy, fractionDigits })}${valueSuffix}`;

    return (
        <div className={cn("flex flex-col gap-3", className)}>
            {stacked && (
                <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    {series.map((s) => (
                        <li
                            key={s.key}
                            className="text-text-secondary flex items-center gap-1.5 text-xs"
                        >
                            <span
                                className="size-2 rounded-xs"
                                style={{ background: toneVar[s.tone] }}
                            />
                            {s.name}
                        </li>
                    ))}
                </ul>
            )}

            <div style={{ height }}>
                {mounted && (
                    <ResponsiveContainer width="100%" height="100%">
                        <RBarChart
                            data={data}
                            margin={{ top: 4, right: 4, bottom: 0, left: -12 }}
                            barCategoryGap="26%"
                        >
                            <CartesianGrid
                                vertical={false}
                                stroke="var(--color-border-light)"
                            />
                            <XAxis
                                dataKey={xKey}
                                hide={!xAxis}
                                tickLine={false}
                                axisLine={false}
                                tick={AXIS_TICK}
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                width={56}
                                allowDecimals={
                                    divideBy > 1 || fractionDigits > 0
                                }
                                tick={AXIS_TICK}
                                tickFormatter={format}
                            />
                            <Tooltip
                                cursor={{ fill: "var(--color-background-alt)" }}
                                formatter={(value, name) => [
                                    format(Number(value)),
                                    name,
                                ]}
                                contentStyle={TOOLTIP_CONTENT}
                                labelStyle={TOOLTIP_LABEL}
                            />
                            {series.map((s, i) => (
                                <Bar
                                    key={s.key}
                                    dataKey={s.key}
                                    name={s.name}
                                    stackId="stack"
                                    fill={toneVar[s.tone]}
                                    maxBarSize={38}
                                    {...(stacked && STACK_GAP)}
                                    radius={
                                        i === series.length - 1
                                            ? [4, 4, 0, 0]
                                            : [0, 0, 0, 0]
                                    }
                                >
                                    {faded &&
                                        data.map((datum, index) => (
                                            <Cell
                                                key={`${String(datum[xKey])}-${index}`}
                                                fillOpacity={
                                                    faded(index)
                                                        ? FADED_OPACITY
                                                        : 1
                                                }
                                            />
                                        ))}
                                </Bar>
                            ))}
                        </RBarChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}

ColumnChart.displayName = "ColumnChart";
