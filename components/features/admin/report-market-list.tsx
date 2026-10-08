import { marketLine } from "@/lib/data/admin-reports-audience";
import { formatCompactUsd } from "@/lib/utils";
import type { ReportMarket } from "@/lib/types";

const SHARE_NOUN = "of volume";

export interface ReportMarketListProps {
    markets: ReportMarket[];
}

export function ReportMarketList({ markets }: ReportMarketListProps) {
    return (
        <ul className="divide-border-light -my-1 divide-y">
            {markets.map((market) => (
                <li
                    key={market.region}
                    className="flex items-center justify-between gap-3 py-2.5 text-xs"
                >
                    <span className="flex min-w-0 flex-col gap-0.5">
                        <span className="text-text truncate font-medium">
                            {market.region}
                        </span>
                        <span className="text-text-muted truncate tabular-nums">
                            {marketLine(market)}
                        </span>
                    </span>
                    <span className="flex shrink-0 flex-col items-end gap-0.5 tabular-nums">
                        <span className="text-text">
                            {formatCompactUsd(market.volume)}
                        </span>
                        <span className="text-text-muted">
                            {market.share}% {SHARE_NOUN}
                        </span>
                    </span>
                </li>
            ))}
        </ul>
    );
}

ReportMarketList.displayName = "ReportMarketList";
