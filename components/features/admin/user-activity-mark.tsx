import { chartToneText } from "@/lib/config/chart-tones";
import { recencyTone } from "@/lib/config/user-tones";
import { cn } from "@/lib/utils";

const TODAY_LABEL = "Today";
const QUIET_TONE = "accent";
const ACTIVITY_NOUN = "since last sign-in";

export interface UserActivityMarkProps {
    days: number;
    className?: string;
}

export function UserActivityMark({ days, className }: UserActivityMarkProps) {
    const tone = recencyTone(days);

    return (
        <span
            className={cn(
                "text-xs font-medium tabular-nums",
                tone === QUIET_TONE
                    ? "text-text-secondary"
                    : chartToneText[tone],
                className,
            )}
        >
            {days === 0 ? TODAY_LABEL : `${days}d`}
            <span className="sr-only"> {ACTIVITY_NOUN}</span>
        </span>
    );
}

UserActivityMark.displayName = "UserActivityMark";
