import { ProgressBar } from "@/components/ui/progress-bar";
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
        <span className={cn("flex items-center gap-1.5", className)}>
            <ProgressBar
                value={percent}
                tone={exposureTone(percent)}
                className="w-10 shrink-0"
            />
            <span className="text-text-secondary w-8 shrink-0 text-right text-xs tabular-nums">
                {percent}%
            </span>
        </span>
    );
}

ListingExposureMeter.displayName = "ListingExposureMeter";
