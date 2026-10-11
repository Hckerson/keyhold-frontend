import { ToneReading } from "@/components/patterns/tone-reading";
import { reachTone } from "@/lib/config/settings-tones";

export interface PolicyReachMarkProps {
    reach: number;
    enabled: boolean;
    label: string;
}

export function PolicyReachMark({
    reach,
    enabled,
    label,
}: PolicyReachMarkProps) {
    return (
        <ToneReading
            value={`${reach}%`}
            tone={enabled ? reachTone(reach) : "neutral"}
            label={`${label} reaches ${reach}% of the marketplace`}
        />
    );
}

PolicyReachMark.displayName = "PolicyReachMark";
