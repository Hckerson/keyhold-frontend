"use client";

import {
    BarChart as RBarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useMounted } from "@/lib/hooks/use-mounted";
import {
    chartToneVar as toneVar,
    type ChartTone,
} from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";
import { formatScaled } from "@/lib/utils/format";

export interface ColumnSeries {
    key: string;
    name: string;
    tone: ChartTone;
}

export interface ColumnChartProps {
    data: Record<string, string | number>[];
    xKey: string;
    series: ColumnSeries[];
    height?: number;
    divideBy?: number;
    fractionDigits?: number;
    valuePrefix?: string;
    valueSuffix?: string;
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
    className,
}: ColumnChartProps) {
    const mounted = useMounted();

    const format = (value: number) =>
        `${valuePrefix}${formatScaled(value, { divideBy, fractionDigits })}${valueSuffix}`;

    return (
        <div className={cn("flex flex-col gap-3", className)}>
            {series.length > 1 && (
                <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    {series.map((s) => (
                        <li
                            key={s.key}
                            className="text-text-secondary flex items-center gap-1.5 text-xs"
                        >
                            <span
                                className="size-2 rounded-full"
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
                                tickLine={false}
                                axisLine={false}
                                tick={{
                                    fontSize: 11,
                                    fill: "var(--color-text-muted)",
                                }}
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                width={56}
                                tick={{
                                    fontSize: 11,
                                    fill: "var(--color-text-muted)",
                                }}
                                tickFormatter={format}
                            />
                            <Tooltip
                                cursor={{ fill: "var(--color-background-alt)" }}
                                formatter={(value, name) => [
                                    format(Number(value)),
                                    name,
                                ]}
                                contentStyle={{
                                    background: "var(--color-background)",
                                    border: "1px solid var(--color-border)",
                                    borderRadius: "var(--radius-lg)",
                                    fontSize: 12,
                                    boxShadow: "var(--shadow-md)",
                                }}
                                labelStyle={{
                                    color: "var(--color-text-muted)",
                                    fontSize: 11,
                                    marginBottom: 2,
                                }}
                            />
                            {series.map((s, i) => (
                                <Bar
                                    key={s.key}
                                    dataKey={s.key}
                                    name={s.name}
                                    stackId="stack"
                                    fill={toneVar[s.tone]}
                                    maxBarSize={38}
                                    radius={
                                        i === series.length - 1
                                            ? [4, 4, 0, 0]
                                            : [0, 0, 0, 0]
                                    }
                                />
                            ))}
                        </RBarChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}

ColumnChart.displayName = "ColumnChart";
