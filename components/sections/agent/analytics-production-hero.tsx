import { DeltaChip } from "@/components/ui/delta-chip";
import {
    ColumnChart,
    type ColumnSeries,
} from "@/components/ui/charts/column-chart";
import { formatMillions } from "@/lib/utils";
import type {
    MonthlyProduction,
    ProductionSummary,
} from "@/lib/data/agent-analytics";

const MILLION = 1_000_000;
const CHART_HEIGHT = 172;
const CLOSINGS_LABEL = "closings";

const volumeSeries: ColumnSeries[] = [
    { key: "volume", name: "Volume", tone: "accent" },
];

export interface AnalyticsProductionHeroProps {
    period: string;
    production: ProductionSummary;
    months: MonthlyProduction[];
}

export function AnalyticsProductionHero({
    period,
    production,
    months,
}: AnalyticsProductionHeroProps) {
    const plot = months.map(({ month, volume }) => ({ month, volume }));

    return (
        <section className="border-highlight/25 bg-background rounded-xl border p-4 shadow-md">
            <div className="min-w-0">
                <p className="micro-label">
                    {production.label} · {production.closings} {CLOSINGS_LABEL}{" "}
                    · {period}
                </p>
                <div className="mt-1 flex items-center gap-2">
                    <p className="text-h4 font-display text-text font-light tabular-nums">
                        {formatMillions(production.volume)}
                    </p>
                    <DeltaChip
                        value={production.change}
                        direction={production.trend}
                    />
                </div>
            </div>

            <div className="bg-background-muted border-border-light mt-3 rounded-md border p-3">
                <ColumnChart
                    data={plot}
                    xKey="month"
                    series={volumeSeries}
                    height={CHART_HEIGHT}
                    divideBy={MILLION}
                    fractionDigits={1}
                    valuePrefix="$"
                    valueSuffix="M"
                />
            </div>
        </section>
    );
}

AnalyticsProductionHero.displayName = "AnalyticsProductionHero";
