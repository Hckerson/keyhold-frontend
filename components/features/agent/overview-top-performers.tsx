import { DetailRow } from "@/components/features/shared/detail-row";
import { formatCompactUsd } from "@/lib/utils";
import type { TopPerformer } from "@/lib/data/agent-overview";

export interface OverviewTopPerformersProps {
    sales: TopPerformer[];
}

export function OverviewTopPerformers({ sales }: OverviewTopPerformersProps) {
    return (
        <div className="divide-border divide-y">
            {sales.map((sale) => (
                <DetailRow
                    key={sale.id}
                    primary={sale.address}
                    secondary={`Closed ${sale.closedOn} · ${sale.days} days on market`}
                    secondaryClassName="tabular-nums"
                    value={
                        <div className="shrink-0 text-right">
                            <p className="text-text text-xs font-medium tabular-nums">
                                {formatCompactUsd(sale.price)}
                            </p>
                            <p className="text-success mt-0.5 text-xs">
                                {sale.overAsk}
                            </p>
                        </div>
                    }
                />
            ))}
        </div>
    );
}

OverviewTopPerformers.displayName = "OverviewTopPerformers";
