import { ShareMeter } from "@/components/patterns/share-meter";
import { reachTone } from "@/lib/config/settings-tones";

export interface PolicyReachMeterProps {
    reach: number;
    enabled: boolean;
    label: string;
}

export function PolicyReachMeter({
    reach,
    enabled,
    label,
}: PolicyReachMeterProps) {
    return (
        <ShareMeter
            percent={reach}
            tone={enabled ? reachTone(reach) : "neutral"}
            label={`${label} reaches ${reach}% of the marketplace`}
        />
    );
}

PolicyReachMeter.displayName = "PolicyReachMeter";
