"use client";

import { PieChart, Pie, ResponsiveContainer } from "recharts";
import { useMounted } from "@/lib/hooks/use-mounted";
import { chartToneVar as toneVar, type ChartTone } from "@/lib/chart-tones";
import { cn } from "@/lib/utils";

export interface DonutSegment {
    name: string;
    value: number;
    tone: ChartTone;
}

export interface DonutChartProps {
    data: DonutSegment[];
    total?: string | number;
    unit?: string;
    size?: number;
    valuePrefix?: string;
    valueSuffix?: string;
    className?: string;
}

export function DonutChart({
    data,
    total,
    unit,
    size = 132,
    valuePrefix = "",
    valueSuffix = "",
    className,
}: DonutChartProps) {
    const mounted = useMounted();
    const sum = data.reduce((acc, d) => acc + d.value, 0);
    const segments = data.map((d) => ({ ...d, fill: toneVar[d.tone] }));

    return (
        <div className={cn("flex items-center gap-5", className)}>
            <div
                className="relative shrink-0"
                style={{ width: size, height: size }}
            >
                {mounted && (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={segments}
                                dataKey="value"
                                nameKey="name"
                                innerRadius="70%"
                                outerRadius="100%"
                                paddingAngle={2}
                                startAngle={90}
                                endAngle={-270}
                                stroke="none"
                                isAnimationActive={false}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                )}
                {total !== undefined && (
                    <div className="pointer-events-none absolute inset-0 grid place-items-center">
                        <div className="text-center">
                            <p className="font-display text-text text-h5 leading-none font-light tabular-nums">
                                {total}
                            </p>
                            {unit && (
                                <p className="text-text-muted text-caption mt-1 font-mono tracking-wide uppercase">
                                    {unit}
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <ul className="min-w-0 flex-1 space-y-2.5">
                {data.map((d) => {
                    const pct = sum > 0 ? Math.round((d.value / sum) * 100) : 0;
                    return (
                        <li
                            key={d.name}
                            className="flex items-center gap-2.5 text-sm"
                        >
                            <span
                                className="size-2.5 shrink-0 rounded-sm"
                                style={{ background: toneVar[d.tone] }}
                            />
                            <span className="text-text-secondary truncate">
                                {d.name}
                            </span>
                            <span className="text-text ml-auto font-medium tabular-nums">
                                {valuePrefix}
                                {d.value.toLocaleString()}
                                {valueSuffix}
                                <span className="text-text-muted ml-1.5 font-normal">
                                    {pct}%
                                </span>
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

DonutChart.displayName = "DonutChart";
