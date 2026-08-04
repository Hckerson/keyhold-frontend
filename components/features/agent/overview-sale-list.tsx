import { OverviewSaleRow } from "@/components/features/agent/overview-sale-row";
import type { ClosedSale } from "@/lib/data/agent-overview";

export interface OverviewSaleListProps {
    sales: ClosedSale[];
}

export function OverviewSaleList({ sales }: OverviewSaleListProps) {
    return (
        <ul className="divide-border divide-y">
            {sales.map((sale) => (
                <OverviewSaleRow key={sale.id} sale={sale} />
            ))}
        </ul>
    );
}

OverviewSaleList.displayName = "OverviewSaleList";
