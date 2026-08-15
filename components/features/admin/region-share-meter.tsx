import { ProgressBar } from "@/components/ui/progress-bar";
import { rankTone } from "@/lib/config/report-tones";
import { chartToneText } from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";

export interface RegionShareMeterProps {
    share: number;
    rank: number;
    label: string;
    className?: string;
}

export function RegionShareMeter({
    share,
    rank,
    label,
    className,
}: RegionShareMeterProps) {
    const tone = rankTone(rank);

    return (
        <span
            className={cn("flex items-center gap-1.5", className)}
            aria-label={`${label} holds ${share}% of regional volume`}
        >
            <ProgressBar value={share} tone={tone} className="w-14" />
            <span
                className={cn(
                    "w-8 shrink-0 text-right text-xs font-medium tabular-nums",
                    chartToneText[tone],
                )}
            >
                {share}%
            </span>
        </span>
    );
}

RegionShareMeter.displayName = "RegionShareMeter";
