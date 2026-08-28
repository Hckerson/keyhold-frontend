import { LineChart } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { AnalyticsProductionHero } from "@/components/sections/agent/analytics-production-hero";
import { AnalyticsMonthTable } from "@/components/features/agent/analytics-month-table";
import type {
    MonthlyProduction,
    ProductionSummary,
} from "@/lib/data/agent-analytics";

const LEDGER_TITLE = "Monthly Ledger";
const LEDGER_LEDE = "Volume closed, with month-over-month change";
const EMPTY_TITLE = "No closed sales yet";
const EMPTY_LEDE = "Monthly production appears once a sale settles.";
const LOADING_TITLE = "Loading your production";
const LOADING_LEDE = "Fetching closed sales and market benchmarks.";

export interface AnalyticsMainProps {
    period: string;
    production?: ProductionSummary;
    months: MonthlyProduction[];
    pending?: boolean;
}

export function AnalyticsMain({
    period,
    production,
    months,
    pending,
}: AnalyticsMainProps) {
    return (
        <div className="console-span-2 flex flex-col gap-3">
            {production && (
                <AnalyticsProductionHero
                    period={period}
                    production={production}
                    months={months}
                />
            )}

            <Panel
                title={LEDGER_TITLE}
                description={LEDGER_LEDE}
                count={months.length}
            >
                {months.length > 0 ? (
                    <PanelInset flush>
                        <AnalyticsMonthTable months={months} />
                    </PanelInset>
                ) : (
                    <EmptyState
                        icon={LineChart}
                        title={pending ? LOADING_TITLE : EMPTY_TITLE}
                        description={pending ? LOADING_LEDE : EMPTY_LEDE}
                    />
                )}
            </Panel>
        </div>
    );
}

AnalyticsMain.displayName = "AnalyticsMain";
