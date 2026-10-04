import { chartToneText } from "@/lib/config/chart-tones";
import { matchTone } from "@/lib/config/saved-tones";
import { cn } from "@/lib/utils";

export interface SavedMatchMarkProps {
    score: number;
    className?: string;
}

export function SavedMatchMark({ score, className }: SavedMatchMarkProps) {
    return (
        <span
            className={cn(
                "text-xs font-medium tabular-nums",
                chartToneText[matchTone(score)],
                className,
            )}
        >
            {score}%
        </span>
    );
}

SavedMatchMark.displayName = "SavedMatchMark";
