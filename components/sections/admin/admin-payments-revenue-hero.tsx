import { MetricCell } from "@/components/patterns/metric-cell";
import type { MetricItem } from "@/lib/types";
import { formatMillions } from "@/lib/utils";

const HERO_EYEBROW = "Held in escrow · awaiting release";
const HELD_LABEL = "Held";

export interface AdminPaymentsRevenueHeroProps {
    held: number;
    heldLabel: string;
    metrics: MetricItem[];
}

export function AdminPaymentsRevenueHero({
    held,
    heldLabel,
    metrics,
}: AdminPaymentsRevenueHeroProps) {
    return (
        <section className="border-highlight/25 bg-background rounded-xl border p-4 shadow-md">
            <div className="min-w-0">
                <p className="micro-label truncate">{HERO_EYEBROW}</p>
                <div className="mt-1 flex flex-wrap items-baseline gap-2">
                    <p className="text-h4 font-display text-text font-light tabular-nums">
                        {formatMillions(held, 2)}
                    </p>
                    <span className="micro-label">{HELD_LABEL}</span>
                </div>
                <p className="text-text-secondary mt-0.5 truncate text-xs">
                    {heldLabel}
                </p>
            </div>

            <div className="metric-strip bg-background-muted border-border-light mt-3 gap-3 rounded-md border p-3">
                {metrics.map((metric) => (
                    <MetricCell key={metric.label} label={metric.label}>
                        <span className="truncate tabular-nums">
                            {metric.value}
                        </span>
                    </MetricCell>
                ))}
            </div>
        </section>
    );
}

AdminPaymentsRevenueHero.displayName = "AdminPaymentsRevenueHero";
