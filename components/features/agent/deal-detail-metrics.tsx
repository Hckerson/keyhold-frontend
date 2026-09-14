import { MetricCell } from "@/components/patterns/metric-cell";
import { formatMillions } from "@/lib/utils";
import type { Deal } from "@/lib/types/deal";

const VALUE_LABEL = "Value";
const DAYS_LABEL = "Days in stage";
const ACTIVITY_LABEL = "Last activity";

export interface DealDetailMetricsProps {
    deal: Deal;
}

export function DealDetailMetrics({ deal }: DealDetailMetricsProps) {
    return (
        <div className="metric-strip bg-background border-border-light gap-3 rounded-md border p-3">
            <MetricCell label={VALUE_LABEL}>
                {formatMillions(deal.price, 2)}
            </MetricCell>
            <MetricCell label={DAYS_LABEL}>{deal.daysInStage}</MetricCell>
            <MetricCell label={ACTIVITY_LABEL}>{deal.lastActivity}</MetricCell>
        </div>
    );
}

DealDetailMetrics.displayName = "DealDetailMetrics";
