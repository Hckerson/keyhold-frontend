import { ProgressBar } from "@/components/ui/progress-bar";
import { matchTone } from "@/lib/config/saved-tones";
import { cn } from "@/lib/utils";

export interface SavedMatchMeterProps {
    score: number;
    className?: string;
}

export function SavedMatchMeter({ score, className }: SavedMatchMeterProps) {
    return (
        <span className={cn("flex items-center gap-1.5", className)}>
            <ProgressBar
                value={score}
                tone={matchTone(score)}
                className="w-10 shrink-0"
            />
            <span className="text-text-secondary w-8 shrink-0 text-right text-xs tabular-nums">
                {score}%
            </span>
        </span>
    );
}

SavedMatchMeter.displayName = "SavedMatchMeter";
