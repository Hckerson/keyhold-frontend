import { ProgressBar } from "@/components/ui/progress-bar";
import { chartToneText } from "@/lib/config/chart-tones";
import { volumeTone } from "@/lib/config/user-tones";
import { cn, formatCompactUsd, percentOf } from "@/lib/utils";

const NO_VOLUME = "—";
const VOLUME_NOUN = "lifetime volume";
const LEADER_NOUN = "of the leading account";

export interface UserVolumeMeterProps {
    volume: number;
    peak: number;
    className?: string;
}

export function UserVolumeMeter({
    volume,
    peak,
    className,
}: UserVolumeMeterProps) {
    if (volume === 0) {
        return (
            <span className={cn("text-text-muted block text-xs", className)}>
                {NO_VOLUME}
            </span>
        );
    }

    const share = percentOf(volume, peak);
    const tone = volumeTone(share);

    return (
        <span
            className={cn("flex items-center justify-end gap-1.5", className)}
            aria-label={`${formatCompactUsd(volume)} ${VOLUME_NOUN}, ${share}% ${LEADER_NOUN}`}
        >
            <ProgressBar value={share} tone={tone} className="w-8" />
            <span
                className={cn(
                    "w-14 shrink-0 text-right text-xs font-semibold tabular-nums",
                    chartToneText[tone],
                )}
            >
                {formatCompactUsd(volume)}
            </span>
        </span>
    );
}

UserVolumeMeter.displayName = "UserVolumeMeter";
