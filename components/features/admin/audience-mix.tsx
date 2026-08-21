import {
    DonutChart,
    type DonutSegment,
} from "@/components/ui/charts/donut-chart";
import { ProgressBar } from "@/components/ui/progress-bar";
import { chartToneVar } from "@/lib/config/chart-tones";
import { formatCount } from "@/lib/utils";

const DONUT_SIZE = 132;

export interface AudienceMixProps {
    roles: DonutSegment[];
    segments: DonutSegment[];
    total: string;
    segmentLabel: string;
    segmentTotal?: number;
}

function SegmentRow({
    segment,
    share,
}: {
    segment: DonutSegment;
    share: number;
}) {
    return (
        <li className="flex items-center gap-2.5 py-2">
            <span
                aria-hidden="true"
                className="size-2.5 shrink-0 rounded-sm"
                style={{ background: chartToneVar[segment.tone] }}
            />
            <span className="text-text w-20 shrink-0 truncate text-xs font-medium">
                {segment.name}
            </span>
            <ProgressBar value={share} tone={segment.tone} className="flex-1" />
            <span className="text-text w-10 shrink-0 text-right text-xs font-semibold tabular-nums">
                {formatCount(segment.value)}
            </span>
            <span className="micro-label w-8 shrink-0 text-right tabular-nums">
                {share}%
            </span>
        </li>
    );
}

export function AudienceMix({
    roles,
    segments,
    total,
    segmentLabel,
    segmentTotal,
}: AudienceMixProps) {
    const denominator =
        segmentTotal ??
        segments.reduce((sum, segment) => sum + segment.value, 0);

    return (
        <div className="flex flex-col gap-3">
            <DonutChart
                data={roles}
                total={total}
                unit="users"
                size={DONUT_SIZE}
            />

            <div className="border-border-dark border-t pt-2">
                <p className="micro-label">{segmentLabel}</p>
                <ul className="divide-border divide-y">
                    {segments.map((segment) => (
                        <SegmentRow
                            key={segment.name}
                            segment={segment}
                            share={Math.round(
                                (segment.value / denominator) * 100,
                            )}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}

AudienceMix.displayName = "AudienceMix";
