import { ArrowDown, ArrowUp, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type DeltaDirection = "below" | "above";

const DELTA_TONE: Record<DeltaDirection, string> = {
    below: "bg-accent-light text-accent",
    above: "bg-background-muted text-text-secondary",
};

const DELTA_ICON: Record<DeltaDirection, LucideIcon> = {
    below: ArrowDown,
    above: ArrowUp,
};

const DELTA_LABEL: Record<DeltaDirection, string> = {
    below: "below this home",
    above: "above this home",
};

export interface DeltaChipProps {
    percent: number;
    className?: string;
}

export function DeltaChip({ percent, className }: DeltaChipProps) {
    const direction: DeltaDirection = percent < 0 ? "below" : "above";
    const Icon = DELTA_ICON[direction];

    return (
        <span
            className={cn(
                "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-mono text-[10px] font-medium tabular-nums",
                DELTA_TONE[direction],
                className,
            )}
        >
            <Icon className="size-3 shrink-0" strokeWidth={1.5} />
            {Math.abs(percent)}%
            <span className="sr-only">{DELTA_LABEL[direction]}</span>
        </span>
    );
}

DeltaChip.displayName = "DeltaChip";
