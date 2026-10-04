import type { DonutSegment } from "@/components/ui/charts/donut-chart";
import { chartToneVar } from "@/lib/config/chart-tones";
import { formatCount } from "@/lib/utils";

const shareOf = (value: number, total: number) =>
    total > 0 ? Math.round((value / total) * 100) : 0;

export interface ShareBarProps {
    label: string;
    segments: DonutSegment[];
}

export function ShareBar({ label, segments }: ShareBarProps) {
    const total = segments.reduce((sum, segment) => sum + segment.value, 0);

    return (
        <figure className="flex flex-col gap-2">
            <figcaption className="flex items-baseline justify-between gap-2">
                <span className="micro-label">{label}</span>
                <span className="text-text-secondary text-xs tabular-nums">
                    {formatCount(total)}
                </span>
            </figcaption>

            <ul className="divide-border-light divide-y">
                {segments.map((segment) => (
                    <li
                        key={segment.name}
                        className="flex h-8 items-center gap-2 text-xs"
                    >
                        <span
                            aria-hidden="true"
                            className="size-2 shrink-0 rounded-xs"
                            style={{ background: chartToneVar[segment.tone] }}
                        />
                        <span className="text-text-secondary min-w-0 flex-1 truncate">
                            {segment.name}
                        </span>
                        <span className="text-text font-medium tabular-nums">
                            {formatCount(segment.value)}
                        </span>
                        <span className="text-text-muted w-9 text-right tabular-nums">
                            {shareOf(segment.value, total)}%
                        </span>
                    </li>
                ))}
            </ul>
        </figure>
    );
}

ShareBar.displayName = "ShareBar";
