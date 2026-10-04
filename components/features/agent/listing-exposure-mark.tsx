import { ToneReading } from "@/components/patterns/tone-reading";
import { exposureTone } from "@/lib/config/listing-tones";

const EXPOSURE_NOUN = "exposure";

export interface ListingExposureMarkProps {
    percent: number;
    className?: string;
}

export function ListingExposureMark({
    percent,
    className,
}: ListingExposureMarkProps) {
    return (
        <ToneReading
            value={`${percent}%`}
            tone={exposureTone(percent)}
            label={`${percent}% ${EXPOSURE_NOUN}`}
            className={className}
        />
    );
}

ListingExposureMark.displayName = "ListingExposureMark";
