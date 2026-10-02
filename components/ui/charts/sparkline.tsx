"use client";

import { useId } from "react";
import { AreaChart, Area, YAxis, ResponsiveContainer } from "recharts";
import { useMounted } from "@/lib/hooks/use-mounted";
import {
    chartToneVar as toneVar,
    type ChartTone,
} from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";

export interface SparklineProps {
    data: number[];
    tone?: ChartTone;
    height?: number;
    className?: string;
}

export function Sparkline({
    data,
    tone = "accent",
    height = 32,
    className,
}: SparklineProps) {
    const mounted = useMounted();
    const gradientId = `sparkline-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
    const stroke = toneVar[tone];
    const points = data.map((value, index) => ({ index, value }));

    return (
        <div
            aria-hidden="true"
            className={cn("w-full", className)}
            style={{ height }}
        >
            {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={points}
                        margin={{ top: 2, right: 1, bottom: 0, left: 1 }}
                    >
                        <defs>
                            <linearGradient
                                id={gradientId}
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="0%"
                                    stopColor={stroke}
                                    stopOpacity={0.16}
                                />
                                <stop
                                    offset="100%"
                                    stopColor={stroke}
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <YAxis hide domain={["dataMin", "dataMax"]} />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke={stroke}
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            fill={`url(#${gradientId})`}
                            dot={false}
                            activeDot={false}
                            isAnimationActive={false}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}

Sparkline.displayName = "Sparkline";
