import { Equal, TrendingDown, TrendingUp } from "lucide-react";
import { gapTone } from "@/lib/config/offer-tones";
import { chartToneSoft } from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";

const AT_ASK = "At ask";

export interface OfferGapChipProps {
    percent: number;
    className?: string;
}

export function OfferGapChip({ percent, className }: OfferGapChipProps) {
    const Icon =
        percent === 0 ? Equal : percent < 0 ? TrendingDown : TrendingUp;

    return (
        <span
            className={cn(
                "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-medium tabular-nums",
                chartToneSoft[gapTone(Math.max(-percent, 0))],
                className,
            )}
        >
            <Icon className="size-3" strokeWidth={1.5} aria-hidden="true" />
            {percent === 0 ? AT_ASK : `${Math.abs(percent)}%`}
        </span>
    );
}

OfferGapChip.displayName = "OfferGapChip";
