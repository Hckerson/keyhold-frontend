import { cn } from "@/lib/utils";
import type { MetricItem } from "@/lib/types";

export interface MetricListProps {
    metrics: MetricItem[];
    className?: string;
}

export function MetricList({ metrics, className }: MetricListProps) {
    return (
        <dl
            className={cn(
                "bg-background-alt divide-border-light divide-y rounded-lg px-3",
                className,
            )}
        >
            {metrics.map((metric) => (
                <div
                    key={metric.label}
                    className="flex items-center justify-between gap-3 py-2"
                >
                    <dt className="text-text-secondary text-xs">
                        {metric.label}
                    </dt>
                    <dd className="text-text text-xs font-semibold tabular-nums">
                        {metric.value}
                    </dd>
                </div>
            ))}
        </dl>
    );
}

MetricList.displayName = "MetricList";
