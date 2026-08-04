import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { AnalyticsBenchmarkTable } from "@/components/features/agent/analytics-benchmark-table";
import { AnalyticsQuarterList } from "@/components/features/agent/analytics-quarter-list";
import { benchmarks, quarters } from "@/lib/data/agent-analytics";

const BENCHMARK_TITLE = "Market Position";
const BENCHMARK_LEDE = "Your figures against the market average";
const QUARTER_TITLE = "Quarterly Pacing";
const QUARTER_LEDE = "Share of year-to-date volume";

export function AnalyticsRail() {
    return (
        <div className="flex flex-col gap-3">
            <Panel title={BENCHMARK_TITLE} description={BENCHMARK_LEDE}>
                <PanelInset>
                    <AnalyticsBenchmarkTable benchmarks={benchmarks} />
                </PanelInset>
            </Panel>

            <Panel
                title={QUARTER_TITLE}
                description={QUARTER_LEDE}
                count={quarters.length}
            >
                <PanelInset>
                    <AnalyticsQuarterList quarters={quarters} />
                </PanelInset>
            </Panel>
        </div>
    );
}

AnalyticsRail.displayName = "AnalyticsRail";
