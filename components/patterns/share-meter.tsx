import { ProgressBar } from "@/components/ui/progress-bar";
import { chartToneText, type ChartTone } from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";

export interface ShareMeterProps {
    percent: number;
    tone: ChartTone;
    label: string;
    barClassName?: string;
    className?: string;
}

export function ShareMeter({
    percent,
    tone,
    label,
    barClassName,
    className,
}: ShareMeterProps) {
    return (
        <span
            className={cn("flex items-center justify-end gap-1.5", className)}
            aria-label={label}
        >
            <ProgressBar
                value={percent}
                tone={tone}
                className={cn("w-10", barClassName)}
            />
            <span
                className={cn(
                    "w-8 shrink-0 text-right text-xs font-medium tabular-nums",
                    chartToneText[tone],
                )}
            >
                {percent}%
            </span>
        </span>
    );
}

ShareMeter.displayName = "ShareMeter";
