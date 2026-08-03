import { TrendingDown, TrendingUp } from "lucide-react";
import {
    DonutChart,
    type DonutSegment,
} from "@/components/ui/charts/donut-chart";
import { MetricList } from "@/components/patterns/metric-list";
import { chartToneVar } from "@/lib/config/chart-tones";
import { cn, formatCompactUsd } from "@/lib/utils";
import type { RevenueStream } from "@/lib/data/admin-payments";
import type { MetricItem } from "@/lib/types";

const DONUT_SIZE = 96;

export interface RevenueStreamSplitProps {
    streams: RevenueStream[];
    segments: DonutSegment[];
    total: string;
    caption: string;
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
        <li className="flex items-center gap-2.5 py-2">
            <span
                aria-hidden="true"
                className="size-2.5 shrink-0 rounded-sm"
                style={{ background: chartToneVar[stream.tone] }}
            />
            <span className="text-text truncate text-xs font-medium">
                {stream.name}
            </span>
            <span className="micro-label tabular-nums">{share}%</span>
            <span className="text-text ml-auto text-xs font-semibold tabular-nums">
                {formatCompactUsd(stream.ytd)}
            </span>
            <span
                className={cn(
                    "flex w-16 shrink-0 items-center justify-end gap-0.5 text-xs tabular-nums",
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
            </span>
        </li>
    );
}

export function RevenueStreamSplit({
    streams,
    segments,
    total,
    caption,
    metrics,
}: RevenueStreamSplitProps) {
    const ytdTotal = streams.reduce((sum, stream) => sum + stream.ytd, 0);

    return (
        <div className="flex flex-col gap-2">
            <div className="bg-background border-border-light flex items-center justify-between gap-4 rounded-lg border p-3">
                <div className="min-w-0">
                    <p className="micro-label">Revenue year to date</p>
                    <p className="font-display text-text text-h4 mt-1 leading-none font-light tabular-nums">
                        {total}
                    </p>
                    <p className="text-text-secondary mt-1.5 text-xs">
                        {caption}
                    </p>
                </div>
                <DonutChart
                    data={segments}
                    size={DONUT_SIZE}
                    legend={false}
                    className="shrink-0"
                />
            </div>

            <ul className="divide-border divide-y">
                {streams.map((stream) => (
                    <StreamRow
                        key={stream.key}
                        stream={stream}
                        share={Math.round((stream.ytd / ytdTotal) * 100)}
                    />
                ))}
            </ul>

            <MetricList
                metrics={metrics}
                className="border-border-dark border-t pt-1"
            />
        </div>
    );
}

RevenueStreamSplit.displayName = "RevenueStreamSplit";
