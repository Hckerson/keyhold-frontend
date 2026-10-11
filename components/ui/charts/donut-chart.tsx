"use client";

import { PieChart, Pie, ResponsiveContainer } from "recharts";
import { ChartLegend } from "@/components/ui/charts/chart-legend";
import { useMounted } from "@/lib/hooks/use-mounted";
import { chartToneVar } from "@/lib/config/chart-tones";
import { cn, formatCount, percentOf, sum } from "@/lib/utils";
import type { DonutSegment } from "@/lib/types";

const SEGMENT_GAP = 2;

export interface DonutChartProps {
    data: DonutSegment[];
    label: string;
    total?: string;
    unit?: string;
    size?: number;
    className?: string;
}

export function DonutChart({
    data,
    label,
    total,
    unit,
    size = 120,
    className,
}: DonutChartProps) {
    const mounted = useMounted();
    const whole = sum(data.map((segment) => segment.value));
    const drawn = data
        .filter((segment) => segment.value > 0)
        .map((segment) => ({ ...segment, fill: chartToneVar[segment.tone] }));

    return (
        <div className={cn("flex items-center gap-4", className)}>
            <div
                role="img"
                aria-label={label}
                className="relative shrink-0"
                style={{ width: size, height: size }}
            >
                {mounted && drawn.length > 0 && (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={drawn}
                                dataKey="value"
                                nameKey="name"
                                innerRadius="72%"
                                outerRadius="100%"
                                paddingAngle={
                                    drawn.length > 1 ? SEGMENT_GAP : 0
                                }
                                startAngle={90}
                                endAngle={-270}
                                stroke="none"
                                isAnimationActive={false}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                )}
                {drawn.length === 0 && (
                    <span className="border-background-muted absolute inset-0 rounded-full border-8" />
                )}
                {total !== undefined && (
                    <span className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1">
                        <span className="font-display text-h5 text-text leading-none font-light">
                            {total}
                        </span>
                        {unit && <span className="micro-label">{unit}</span>}
                    </span>
                )}
            </div>
            <ChartLegend
                className="max-w-80 flex-1"
                items={data.map((segment) => ({
                    name: segment.name,
                    tone: segment.tone,
                    value: formatCount(segment.value),
                    detail:
                        segment.detail ?? `${percentOf(segment.value, whole)}%`,
                    quiet: segment.value === 0,
                }))}
            />
        </div>
    );
}

DonutChart.displayName = "DonutChart";
