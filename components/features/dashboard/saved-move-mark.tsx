import { chartToneText, moveTone } from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";

const FLAT_MOVE = "—";
const RISE_SIGN = "+";

export interface SavedMoveMarkProps {
    percent: number;
    className?: string;
}

export function SavedMoveMark({ percent, className }: SavedMoveMarkProps) {
    return (
        <span
            className={cn(
                "text-xs font-medium tabular-nums",
                chartToneText[moveTone(percent)],
                className,
            )}
        >
            {percent === 0
                ? FLAT_MOVE
                : `${percent > 0 ? RISE_SIGN : ""}${percent}%`}
        </span>
    );
}

SavedMoveMark.displayName = "SavedMoveMark";
