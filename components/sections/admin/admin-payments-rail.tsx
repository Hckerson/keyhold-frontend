import { MetricList } from "@/components/patterns/metric-list";
import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { PayoutStageTable } from "@/components/features/admin/payout-stage-table";
import type { MetricItem, PayoutStage } from "@/lib/types";

const PIPELINE_TITLE = "Escrow Pipeline";
const PIPELINE_LEDE = "Value and count held at each escrow stage";
const SETTLEMENT_TITLE = "Settlement";
const SETTLEMENT_LEDE = "What a release clears and what it withholds";

export interface AdminPaymentsRailProps {
    stages: PayoutStage[];
    heldCount: number;
    metrics: MetricItem[];
}

export function AdminPaymentsRail({
    stages,
    heldCount,
    metrics,
}: AdminPaymentsRailProps) {
    return (
        <div className="flex flex-col gap-3">
            <Panel
                title={PIPELINE_TITLE}
                description={PIPELINE_LEDE}
                count={heldCount}
            >
                <PanelInset scroll>
                    <PayoutStageTable stages={stages} />
                </PanelInset>
            </Panel>

            <Panel title={SETTLEMENT_TITLE} description={SETTLEMENT_LEDE}>
                <PanelInset>
                    <MetricList metrics={metrics} />
                </PanelInset>
            </Panel>
        </div>
    );
}

AdminPaymentsRail.displayName = "AdminPaymentsRail";
