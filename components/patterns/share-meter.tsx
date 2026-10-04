import { chartToneText, type ChartTone } from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";

export interface ShareMeterProps {
    percent: number;
    tone: ChartTone;
    label: string;
    className?: string;
}

export function ShareMeter({
    percent,
    tone,
    label,
    className,
}: ShareMeterProps) {
    return (
        <span
            className={cn(
                "shrink-0 text-xs font-medium tabular-nums",
                chartToneText[tone],
                className,
            )}
        >
            <span aria-hidden="true">{percent}%</span>
            <span className="sr-only">{label}</span>
        </span>
    );
}

ShareMeter.displayName = "ShareMeter";
