import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import { chartToneSoft, moveTone } from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";

const NO_MOVE = "—";

export interface MoveChipProps {
    percent?: number;
    className?: string;
}

export function MoveChip({ percent, className }: MoveChipProps) {
    if (percent === undefined) {
        return <span className="text-text-muted text-xs">{NO_MOVE}</span>;
    }

    const Icon =
        percent === 0 ? Minus : percent < 0 ? TrendingDown : TrendingUp;

    return (
        <span
            className={cn(
                "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-medium tabular-nums",
                chartToneSoft[moveTone(percent)],
                className,
            )}
        >
            <Icon className="size-3" strokeWidth={1.5} aria-hidden="true" />
            {Math.abs(percent)}%
        </span>
    );
}

MoveChip.displayName = "MoveChip";
