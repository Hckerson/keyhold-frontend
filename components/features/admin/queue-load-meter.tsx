import { ShareMeter } from "@/components/patterns/share-meter";
import { loadTone } from "@/lib/config/admin-tones";

export interface QueueLoadMeterProps {
    share: number;
    label: string;
}

export function QueueLoadMeter({ share, label }: QueueLoadMeterProps) {
    return (
        <ShareMeter
            percent={share}
            tone={loadTone(share)}
            label={`${label} at ${share}% of capacity`}
        />
    );
}

QueueLoadMeter.displayName = "QueueLoadMeter";
