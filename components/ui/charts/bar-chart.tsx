"use client";

import {
    BarChart as RBarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    LabelList,
    ResponsiveContainer,
} from "recharts";
import { useMounted } from "@/lib/hooks/use-mounted";
import {
    chartToneVar as toneVar,
    type ChartTone,
} from "@/lib/config/chart-tones";

export interface BarDatum {
    label: string;
    value: number;
    display?: string;
    tone?: ChartTone;
}

export interface BarChartProps {
    data: BarDatum[];
    tone?: ChartTone;
    highlightFirstTone?: ChartTone;
    labelWidth?: number;
    rowHeight?: number;
    valueWidth?: number;
    valuePrefix?: string;
    valueSuffix?: string;
    className?: string;
}

export function BarChart({
    data,
    tone = "accent",
    highlightFirstTone,
    labelWidth = 120,
    rowHeight = 40,
    valueWidth = 56,
    valuePrefix = "",
    valueSuffix = "",
    className,
}: BarChartProps) {
    const mounted = useMounted();
    const bars = data.map((datum, index) => ({
        ...datum,
        display:
            datum.display ??
            `${valuePrefix}${datum.value.toLocaleString()}${valueSuffix}`,
        fill: toneVar[
            datum.tone ??
                (index === 0 && highlightFirstTone ? highlightFirstTone : tone)
        ],
    }));

    if (!mounted) {
        return (
            <div
                className={className}
                style={{ height: data.length * rowHeight }}
            />
        );
    }

    return (
        <div className={className} style={{ height: data.length * rowHeight }}>
            <ResponsiveContainer width="100%" height="100%">
                <RBarChart
                    data={bars}
                    layout="vertical"
                    margin={{ top: 4, right: valueWidth, bottom: 4, left: 0 }}
                    barCategoryGap="28%"
                >
                    <CartesianGrid
                        horizontal={false}
                        stroke="var(--color-border-light)"
                    />
                    <XAxis type="number" hide domain={[0, "dataMax"]} />
                    <YAxis
                        type="category"
                        dataKey="label"
                        width={labelWidth}
                        tickLine={false}
                        axisLine={false}
                        tick={{
                            fontSize: 12,
                            fill: "var(--color-text-secondary)",
                        }}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={11}>
                        <LabelList
                            dataKey="display"
                            position="right"
                            style={{
                                fontSize: 12,
                                fontWeight: 500,
                                fill: "var(--color-text)",
                            }}
                        />
                    </Bar>
                </RBarChart>
            </ResponsiveContainer>
        </div>
    );
}

BarChart.displayName = "BarChart";
