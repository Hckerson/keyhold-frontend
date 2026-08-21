import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { AnalyticsProductionHero } from "@/components/sections/agent/analytics-production-hero";
import { AnalyticsMonthTable } from "@/components/features/agent/analytics-month-table";
import { monthlyProduction } from "@/lib/data/agent-analytics";

const LEDGER_TITLE = "Monthly Ledger";
const LEDGER_LEDE = "Volume against target, with month-over-month change";

export function AnalyticsMain() {
    return (
        <div className="console-span-2 flex flex-col gap-3">
            <AnalyticsProductionHero />

            <Panel
                title={LEDGER_TITLE}
                description={LEDGER_LEDE}
                count={monthlyProduction.length}
            >
                <PanelInset flush>
                    <AnalyticsMonthTable months={monthlyProduction} />
                </PanelInset>
            </Panel>
        </div>
    );
}

AnalyticsMain.displayName = "AnalyticsMain";
