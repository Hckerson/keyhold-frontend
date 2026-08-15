import { REVENUE_STREAMS } from "@/lib/config/admin-tones";
import { chartToneSoft } from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";
import type { RevenueStreamId } from "@/lib/types";

export interface RevenueStreamMarkProps {
    id: RevenueStreamId;
    className?: string;
}

export function RevenueStreamMark({ id, className }: RevenueStreamMarkProps) {
    const { icon: Icon, label, tone } = REVENUE_STREAMS[id];

    return (
        <span className={cn("flex min-w-0 items-center gap-2", className)}>
            <span
                className={cn(
                    "grid size-6 shrink-0 place-items-center rounded-md",
                    chartToneSoft[tone],
                )}
            >
                <Icon className="size-3" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <span className="text-text min-w-0 truncate text-xs font-medium">
                {label}
            </span>
        </span>
    );
}

RevenueStreamMark.displayName = "RevenueStreamMark";
