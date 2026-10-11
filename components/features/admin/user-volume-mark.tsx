import { ToneReading } from "@/components/patterns/tone-reading";
import { volumeTone } from "@/lib/config/user-tones";
import { cn, formatCompactUsd, percentOf } from "@/lib/utils";

const NO_VOLUME = "—";
const VOLUME_NOUN = "lifetime volume";
const LEADER_NOUN = "of the leading account";

export interface UserVolumeMarkProps {
    volume: number;
    peak: number;
    className?: string;
}

export function UserVolumeMark({
    volume,
    peak,
    className,
}: UserVolumeMarkProps) {
    if (volume === 0)
        return (
            <span className={cn("text-text-muted block text-xs", className)}>
                {NO_VOLUME}
            </span>
        );

    const share = percentOf(volume, peak);

    return (
        <ToneReading
            value={formatCompactUsd(volume)}
            tone={volumeTone(share)}
            label={`${formatCompactUsd(volume)} ${VOLUME_NOUN}, ${share}% ${LEADER_NOUN}`}
            className={className}
        />
    );
}

UserVolumeMark.displayName = "UserVolumeMark";
