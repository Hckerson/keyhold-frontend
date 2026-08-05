import { rankTone } from "@/lib/config/report-tones";
import { chartToneText } from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";

export interface RegionRankMarkProps {
    rank: number;
    className?: string;
}

export function RegionRankMark({ rank, className }: RegionRankMarkProps) {
    return (
        <span
            className={cn(
                "font-mono text-xs font-medium tabular-nums",
                chartToneText[rankTone(rank)],
                className,
            )}
        >
            {rank}
        </span>
    );
}

RegionRankMark.displayName = "RegionRankMark";
