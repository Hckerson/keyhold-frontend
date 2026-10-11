import { ChartLegend } from "@/components/ui/charts/chart-legend";
import { chartToneVar } from "@/lib/config/chart-tones";
import { apportion, cn, formatCount, percentOf, sum } from "@/lib/utils";
import type { DonutSegment } from "@/lib/types";

const CELLS = 100;

export interface WaffleChartProps {
    data: DonutSegment[];
    label: string;
    className?: string;
}

export function WaffleChart({ data, label, className }: WaffleChartProps) {
    const units = apportion(
        data.map((segment) => segment.value),
        CELLS,
    );
    const cells = data.flatMap((segment, index) =>
        Array.from({ length: units[index] }, (_, unit) => ({
            key: `${segment.name}-${unit}`,
            tone: segment.tone,
        })),
    );
    const whole = sum(data.map((segment) => segment.value));
    const shareOf = (value: number) => `${percentOf(value, whole)}%`;
    const summary = data
        .map((segment) => `${segment.name} ${shareOf(segment.value)}`)
        .join(", ");

    return (
        <div className={cn("flex items-center gap-4", className)}>
            <div
                role="img"
                aria-label={`${label}: ${summary}`}
                className="grid w-30 shrink-0 grid-cols-10 gap-0.5"
            >
                {cells.map((cell) => (
                    <span
                        key={cell.key}
                        className="aspect-square rounded-xs"
                        style={{ background: chartToneVar[cell.tone] }}
                    />
                ))}
            </div>
            <ChartLegend
                className="max-w-80 flex-1"
                items={data.map((segment) => ({
                    name: segment.name,
                    tone: segment.tone,
                    value: formatCount(segment.value),
                    detail: segment.detail ?? shareOf(segment.value),
                }))}
            />
        </div>
    );
}

WaffleChart.displayName = "WaffleChart";
