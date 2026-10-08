import { chartToneVar } from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";
import type { ChartLegendItem } from "@/lib/types";

export interface ChartLegendProps {
    items: ChartLegendItem[];
    className?: string;
}

export function ChartLegend({ items, className }: ChartLegendProps) {
    return (
        <ul className={cn("divide-border-light min-w-0 divide-y", className)}>
            {items.map((item) => (
                <li
                    key={item.name}
                    className="flex h-7 items-center gap-2 text-xs"
                >
                    <span
                        aria-hidden="true"
                        className="size-2 shrink-0 rounded-xs"
                        style={{ background: chartToneVar[item.tone] }}
                    />
                    <span
                        className={cn(
                            "min-w-0 flex-1 truncate",
                            item.quiet
                                ? "text-text-muted"
                                : "text-text-secondary",
                        )}
                    >
                        {item.name}
                    </span>
                    <span
                        className={cn(
                            "font-medium tabular-nums",
                            item.quiet ? "text-text-muted" : "text-text",
                        )}
                    >
                        {item.value}
                    </span>
                    <span className="text-text-muted w-10 shrink-0 text-right tabular-nums">
                        {item.detail}
                    </span>
                </li>
            ))}
        </ul>
    );
}

ChartLegend.displayName = "ChartLegend";
