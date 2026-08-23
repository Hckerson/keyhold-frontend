import { MetricList } from "@/components/patterns/metric-list";
import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { PanelLink } from "@/components/features/shared/panel-link";
import { TransactionStageTable } from "@/components/features/admin/transaction-stage-table";
import type { MetricItem, TransactionStage } from "@/lib/types";

const PIPELINE_TITLE = "Deal Pipeline";
const PIPELINE_LEDE =
    "Where marketplace volume sits between offer and settlement";
const COMMISSION_TITLE = "Commission";
const COMMISSION_LEDE = "What the ledger has earned and what is still exposed";
const COMMISSION_ACTION = "Payments";

export interface AdminTransactionsRailProps {
    stages: TransactionStage[];
    openCount: number;
    metrics: MetricItem[];
}

export function AdminTransactionsRail({
    stages,
    openCount,
    metrics,
}: AdminTransactionsRailProps) {
    return (
        <div className="flex flex-col gap-3">
            <Panel
                title={PIPELINE_TITLE}
                description={PIPELINE_LEDE}
                count={openCount}
            >
                <PanelInset scroll>
                    <TransactionStageTable stages={stages} />
                </PanelInset>
            </Panel>

            <Panel
                title={COMMISSION_TITLE}
                description={COMMISSION_LEDE}
                action={
                    <PanelLink
                        href="/admin/payments"
                        label={COMMISSION_ACTION}
                    />
                }
            >
                <PanelInset>
                    <MetricList metrics={metrics} />
                </PanelInset>
            </Panel>
        </div>
    );
}

AdminTransactionsRail.displayName = "AdminTransactionsRail";
