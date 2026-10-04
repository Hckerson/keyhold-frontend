import { chartToneText } from "@/lib/config/chart-tones";
import { exposureTone } from "@/lib/config/listing-tones";
import { cn } from "@/lib/utils";

export interface ListingExposureMeterProps {
    percent: number;
    className?: string;
}

export function ListingExposureMeter({
    percent,
    className,
}: ListingExposureMeterProps) {
    return (
        <span
            className={cn(
                "text-xs font-medium tabular-nums",
                chartToneText[exposureTone(percent)],
                className,
            )}
        >
            {percent}%
        </span>
    );
}

ListingExposureMeter.displayName = "ListingExposureMeter";
