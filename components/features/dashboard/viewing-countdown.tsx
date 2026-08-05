import { chartToneText } from "@/lib/config/chart-tones";
import { timingTone } from "@/lib/config/viewing-tones";
import { countdownLabel } from "@/lib/data/viewings";
import { cn } from "@/lib/utils";

export interface ViewingCountdownProps {
    days: number;
    className?: string;
}

export function ViewingCountdown({ days, className }: ViewingCountdownProps) {
    return (
        <span
            className={cn(
                "text-xs font-medium tabular-nums",
                chartToneText[timingTone(days)],
                className,
            )}
        >
            {countdownLabel(days)}
        </span>
    );
}

ViewingCountdown.displayName = "ViewingCountdown";
