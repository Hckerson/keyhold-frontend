import { TRACTIONS, type Traction } from "@/lib/config/interest-tones";
import { chartToneSoft } from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";

export interface InterestTractionChipProps {
    traction: Traction;
    className?: string;
}

export function InterestTractionChip({
    traction,
    className,
}: InterestTractionChipProps) {
    const { icon: Icon, short, label, tone } = TRACTIONS[traction];

    return (
        <span
            title={label}
            className={cn(
                "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-medium",
                chartToneSoft[tone],
                className,
            )}
        >
            <Icon className="size-3" strokeWidth={1.5} aria-hidden="true" />
            {short}
        </span>
    );
}

InterestTractionChip.displayName = "InterestTractionChip";
