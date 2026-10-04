import { ToneReading } from "@/components/patterns/tone-reading";
import { rankTone } from "@/lib/config/report-tones";

const SHARE_NOUN = "of regional volume";

export interface RegionShareMarkProps {
    share: number;
    rank: number;
    label: string;
    className?: string;
}

export function RegionShareMark({
    share,
    rank,
    label,
    className,
}: RegionShareMarkProps) {
    return (
        <ToneReading
            value={`${share}%`}
            tone={rankTone(rank)}
            label={`${label} holds ${share}% ${SHARE_NOUN}`}
            className={className}
        />
    );
}

RegionShareMark.displayName = "RegionShareMark";
