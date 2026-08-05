import { MetricList } from "@/components/patterns/metric-list";
import { ShareList } from "@/components/patterns/share-list";
import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { PayoutStageTable } from "@/components/features/admin/payout-stage-table";
import {
    HELD_PAYOUT_COUNT,
    PAYOUT_METHOD_SHARES,
    PAYOUT_STAGES,
    SETTLEMENT_METRICS,
} from "@/lib/data/admin-payments";

const PIPELINE_TITLE = "Release Pipeline";
const PIPELINE_LEDE = "Where commission sits between approval and the bank";
const SETTLEMENT_TITLE = "Settlement";
const SETTLEMENT_LEDE = "What the next run clears and what it withholds";
const RAILS_TITLE = "Rail Mix";
const RAILS_LEDE = "Share of held value by payment rail";

export function AdminPaymentsRail() {
    return (
        <div className="flex flex-col gap-3">
            <Panel
                title={PIPELINE_TITLE}
                description={PIPELINE_LEDE}
                count={HELD_PAYOUT_COUNT}
            >
                <PanelInset flush>
                    <PayoutStageTable stages={PAYOUT_STAGES} />
                </PanelInset>
            </Panel>

            <Panel title={SETTLEMENT_TITLE} description={SETTLEMENT_LEDE}>
                <PanelInset>
                    <MetricList metrics={SETTLEMENT_METRICS} />
                </PanelInset>
            </Panel>

            <Panel title={RAILS_TITLE} description={RAILS_LEDE}>
                <PanelInset>
                    <ShareList shares={PAYOUT_METHOD_SHARES} />
                </PanelInset>
            </Panel>
        </div>
    );
}

AdminPaymentsRail.displayName = "AdminPaymentsRail";
