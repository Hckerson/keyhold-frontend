import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Trend } from "@/lib/types";

export interface ReportDeltaProps {
    change: string;
    trend: Trend;
    className?: string;
}

export function ReportDelta({ change, trend, className }: ReportDeltaProps) {
    const rising = trend === "up";
    const Icon = rising ? TrendingUp : TrendingDown;

    return (
        <span
            className={cn(
                "inline-flex shrink-0 items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-medium tabular-nums",
                rising ? "bg-success/10 text-success" : "bg-error/10 text-error",
                className,
            )}
        >
            <Icon className="size-3" strokeWidth={1.5} aria-hidden="true" />
            {change}
        </span>
    );
}

ReportDelta.displayName = "ReportDelta";
