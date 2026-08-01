import { TrendingDown, TrendingUp } from "lucide-react";
import {
    DonutChart,
    type DonutSegment,
} from "@/components/ui/charts/donut-chart";
import { MetricList } from "@/components/patterns/metric-list";
import { chartToneVar } from "@/lib/config/chart-tones";
import { cn, formatThousands } from "@/lib/utils";
import type { RevenueStream } from "@/lib/data/admin-payments";
import type { MetricItem } from "@/lib/types";

const DONUT_SIZE = 116;

export interface RevenueStreamSplitProps {
    streams: RevenueStream[];
    segments: DonutSegment[];
    total: string;
    metrics: MetricItem[];
}

function StreamRow({
    stream,
    share,
}: {
    stream: RevenueStream;
    share: number;
}) {
    const rising = stream.momChange >= 0;
    const TrendIcon = rising ? TrendingUp : TrendingDown;

    return (
        <li className="flex items-center gap-2.5">
            <span
                aria-hidden="true"
                className="h-7 w-0.5 shrink-0 rounded-full"
                style={{ background: chartToneVar[stream.tone] }}
            />
            <div className="min-w-0 flex-1">
                <p className="text-text truncate text-xs font-medium">
                    {stream.name}
                </p>
                <p className="micro-label mt-0.5">{share}% of YTD</p>
            </div>
            <div className="shrink-0 text-right">
                <p className="text-text text-xs font-semibold tabular-nums">
                    {formatThousands(stream.ytd)}
                </p>
                <p
                    className={cn(
                        "mt-0.5 flex items-center justify-end gap-0.5 text-xs tabular-nums",
                        rising ? "text-success" : "text-error",
                    )}
                >
                    <TrendIcon
                        className="size-3"
                        strokeWidth={1.5}
                        aria-hidden="true"
                    />
                    {rising ? "+" : ""}
                    {stream.momChange}%
                </p>
            </div>
        </li>
    );
}

export function RevenueStreamSplit({
    streams,
    segments,
    total,
    metrics,
}: RevenueStreamSplitProps) {
    const ytdTotal = streams.reduce((sum, stream) => sum + stream.ytd, 0);

    return (
        <div className="flex flex-col gap-2">
            <div className="bg-background border-border-light flex items-center gap-4 rounded-lg border p-3">
                <DonutChart
                    data={segments}
                    total={total}
                    unit="YTD"
                    size={DONUT_SIZE}
                    legend={false}
                    className="shrink-0"
                />
                <ul className="min-w-0 flex-1 space-y-2.5">
                    {streams.map((stream) => (
                        <StreamRow
                            key={stream.key}
                            stream={stream}
                            share={Math.round((stream.ytd / ytdTotal) * 100)}
                        />
                    ))}
                </ul>
            </div>

            <MetricList metrics={metrics} />
        </div>
    );
}

RevenueStreamSplit.displayName = "RevenueStreamSplit";
