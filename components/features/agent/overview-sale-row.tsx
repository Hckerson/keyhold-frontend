import { OverAskChip } from "@/components/features/agent/over-ask-chip";
import { cn, formatCompactUsd } from "@/lib/utils";
import { chartToneText, type ChartTone } from "@/lib/config/chart-tones";
import { FAST_SALE_DAYS, SLOW_SALE_DAYS } from "@/lib/data/agent-overview-feed";
import type { ClosedSale } from "@/lib/types";

function speedTone(days: number): ChartTone {
    if (days <= FAST_SALE_DAYS) return "accent";
    if (days <= SLOW_SALE_DAYS) return "neutral";
    return "error";
}

export interface OverviewSaleRowProps {
    sale: ClosedSale;
}

export function OverviewSaleRow({ sale }: OverviewSaleRowProps) {
    return (
        <li className="flex h-9 items-center gap-3">
            <span className="text-text min-w-0 flex-1 truncate text-xs font-medium">
                {sale.address}
            </span>
            <span className="text-text-muted w-12 shrink-0 text-xs tabular-nums">
                {sale.closedOn}
            </span>
            <span
                className={cn(
                    "w-10 shrink-0 text-right text-xs font-medium tabular-nums",
                    chartToneText[speedTone(sale.days)],
                )}
            >
                {sale.days}d
            </span>
            <span className="text-text w-16 shrink-0 text-right text-xs font-semibold tabular-nums">
                {formatCompactUsd(sale.price)}
            </span>
            <OverAskChip percent={sale.overAskPct} />
        </li>
    );
}

OverviewSaleRow.displayName = "OverviewSaleRow";
