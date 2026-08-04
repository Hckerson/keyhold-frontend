import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { AnalyticsProductionHero } from "@/components/sections/agent/analytics-production-hero";
import { AnalyticsMonthTable } from "@/components/features/agent/analytics-month-table";
import { monthlyProduction } from "@/lib/data/agent-analytics";

const LEDGER_TITLE = "Monthly Ledger";
const LEDGER_LEDE = "Volume against target, with month-over-month change";

export function AnalyticsMain() {
    return (
        <div className="flex flex-col gap-3 lg:col-span-2">
            <AnalyticsProductionHero />

            <Panel
                title={LEDGER_TITLE}
                description={LEDGER_LEDE}
                count={monthlyProduction.length}
            >
                <PanelInset>
                    <AnalyticsMonthTable months={monthlyProduction} />
                </PanelInset>
            </Panel>
        </div>
    );
}

AnalyticsMain.displayName = "AnalyticsMain";
