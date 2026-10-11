import { TrendingDown, TrendingUp } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { Trend } from "@/lib/types";

const deltaChipVariants = cva(
    "inline-flex shrink-0 items-center gap-0.5 rounded-md font-medium tabular-nums",
    {
        variants: {
            tone: {
                success: "bg-accent/10 text-accent",
                error: "bg-error/10 text-error",
            },
            size: {
                sm: "px-1.5 py-0.5 font-mono text-[10px] leading-none",
                md: "px-1.5 py-0.5 text-xs",
            },
        },
        defaultVariants: { tone: "success", size: "md" },
    },
);

export interface DeltaChipProps extends Omit<
    VariantProps<typeof deltaChipVariants>,
    "tone"
> {
    value: string;
    direction?: Trend;
    tone?: NonNullable<VariantProps<typeof deltaChipVariants>["tone"]>;
    className?: string;
}

export function DeltaChip({
    value,
    direction = "up",
    tone,
    size,
    className,
}: DeltaChipProps) {
    const Icon = direction === "down" ? TrendingDown : TrendingUp;
    const resolvedTone = tone ?? (direction === "down" ? "error" : "success");

    return (
        <span
            className={cn(
                deltaChipVariants({ tone: resolvedTone, size }),
                className,
            )}
        >
            <Icon size={12} strokeWidth={1.5} aria-hidden="true" />
            {value}
        </span>
    );
}

DeltaChip.displayName = "DeltaChip";
