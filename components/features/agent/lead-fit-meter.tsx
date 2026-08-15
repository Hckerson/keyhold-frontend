import { ProgressBar } from "@/components/ui/progress-bar";
import { fitTone } from "@/lib/config/lead-tones";
import { cn } from "@/lib/utils";

export interface LeadFitMeterProps {
    percent: number;
    className?: string;
}

export function LeadFitMeter({ percent, className }: LeadFitMeterProps) {
    return (
        <span className={cn("flex items-center gap-1.5", className)}>
            <ProgressBar
                value={percent}
                tone={fitTone(percent)}
                className="w-10 shrink-0"
            />
            <span className="text-text-secondary w-8 shrink-0 text-right text-xs tabular-nums">
                {percent}%
            </span>
        </span>
    );
}

LeadFitMeter.displayName = "LeadFitMeter";
