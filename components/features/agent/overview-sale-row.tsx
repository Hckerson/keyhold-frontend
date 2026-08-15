import { ProgressBar } from "@/components/ui/progress-bar";
import { cn, formatCompactUsd } from "@/lib/utils";
import { chartToneSoft, type ChartTone } from "@/lib/config/chart-tones";
import {
    DAYS_ON_MARKET_BENCHMARK,
    FAST_SALE_DAYS,
    SLOW_SALE_DAYS,
    type ClosedSale,
} from "@/lib/data/agent-overview";

const AT_ASK_LABEL = "At ask";

function speedTone(days: number): ChartTone {
    if (days <= FAST_SALE_DAYS) return "success";
    if (days <= SLOW_SALE_DAYS) return "warning";
    return "error";
}

function OverAskChip({ percent }: { percent: number }) {
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
            <span className="flex w-20 shrink-0 items-center gap-1.5">
                <ProgressBar
                    value={(sale.days / DAYS_ON_MARKET_BENCHMARK) * 100}
                    tone={speedTone(sale.days)}
                    className="w-12"
                />
                <span className="text-text-secondary text-xs tabular-nums">
                    {sale.days}d
                </span>
            </span>
            <span className="text-text w-16 shrink-0 text-right text-xs font-semibold tabular-nums">
                {formatCompactUsd(sale.price)}
            </span>
            <OverAskChip percent={sale.overAskPct} />
        </li>
    );
}

OverviewSaleRow.displayName = "OverviewSaleRow";
