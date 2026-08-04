import { Sparkline } from "@/components/ui/charts/sparkline";
import { ReportDelta } from "@/components/features/admin/report-delta";
import type { ReportHeadline } from "@/lib/data/admin-reports";

const SPARKLINE_HEIGHT = 52;

export interface ReportHeadlineCardProps {
    headline: ReportHeadline;
}

export function ReportHeadlineCard({ headline }: ReportHeadlineCardProps) {
    return (
        <section className="bg-background-alt border-border-light flex h-full flex-col rounded-xl border p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
                <p className="micro-label">{headline.label}</p>
                <ReportDelta change={headline.change} trend={headline.trend} />
            </div>

            <p className="font-display text-text text-h4 mt-2 leading-none font-light tabular-nums">
                {headline.value}
            </p>
            <p className="text-text-secondary mt-1.5 text-xs">
                {headline.caption}
            </p>

            <Sparkline
                data={headline.series}
                height={SPARKLINE_HEIGHT}
                className="mt-3"
            />

            <dl className="bg-background-muted mt-3 grid grid-cols-3 gap-3 rounded-lg px-3 py-2.5">
                {headline.metrics.map((metric) => (
                    <div key={metric.label} className="min-w-0">
                        <dt className="micro-label truncate">{metric.label}</dt>
                        <dd className="text-text mt-0.5 truncate text-xs font-semibold tabular-nums">
                            {metric.value}
                        </dd>
                    </div>
                ))}
            </dl>
        </section>
    );
}

ReportHeadlineCard.displayName = "ReportHeadlineCard";
