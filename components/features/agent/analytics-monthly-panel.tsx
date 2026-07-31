import { Panel } from "@/components/ui/panel";
import {
    ColumnChart,
    type ColumnSeries,
} from "@/components/ui/charts/column-chart";
import type { MonthlySales } from "@/lib/data/agent-analytics";

export interface AnalyticsMonthlyPanelProps {
    data: MonthlySales[];
}

const volumeSeries: ColumnSeries[] = [
    { key: "volume", name: "Volume", tone: "accent" },
];

const salesSeries: ColumnSeries[] = [
    { key: "sales", name: "Sales", tone: "info" },
];

export function AnalyticsMonthlyPanel({ data }: AnalyticsMonthlyPanelProps) {
    const rows = data.map((entry) => ({ ...entry }));

    return (
        <Panel title="Sales by Month" description="2024 performance overview">
            <div className="space-y-5">
                <figure>
                    <figcaption className="text-text-muted text-caption mb-2 font-mono tracking-wide uppercase">
                        Volume
                    </figcaption>
                    <ColumnChart
                        data={rows}
                        xKey="month"
                        series={volumeSeries}
                        height={168}
                        fractionDigits={1}
                        valuePrefix="$"
                        valueSuffix="M"
                    />
                </figure>

                <figure>
                    <figcaption className="text-text-muted text-caption mb-2 font-mono tracking-wide uppercase">
                        Closed Sales
                    </figcaption>
                    <ColumnChart
                        data={rows}
                        xKey="month"
                        series={salesSeries}
                        height={116}
                    />
                </figure>
            </div>
        </Panel>
    );
}

AnalyticsMonthlyPanel.displayName = "AnalyticsMonthlyPanel";
