import { cn } from "@/lib/utils";
import { chartToneSoft, type ChartTone } from "@/lib/config/chart-tones";

const AT_ASK_LABEL = "At ask";

export interface OverAskChipProps {
    percent: number;
}

export function OverAskChip({ percent }: OverAskChipProps) {
    const tone: ChartTone = percent > 0 ? "success" : "neutral";

    return (
        <span
            className={cn(
                "shrink-0 rounded-md px-1.5 py-0.5 font-mono text-[10px] font-medium tabular-nums",
                chartToneSoft[tone],
            )}
        >
            {percent > 0 ? `+${percent.toFixed(1)}%` : AT_ASK_LABEL}
        </span>
    );
}

OverAskChip.displayName = "OverAskChip";
