import { MetricList } from "@/components/patterns/metric-list";
import { ShareList } from "@/components/patterns/share-list";
import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { PanelLink } from "@/components/features/shared/panel-link";
import { TransactionStageTable } from "@/components/features/admin/transaction-stage-table";
import {
    COMMISSION_METRICS,
    FINANCING_SHARES,
    OPEN_COUNT,
    TRANSACTION_STAGES,
} from "@/lib/data/admin-transactions";

const PIPELINE_TITLE = "Deal Pipeline";
const PIPELINE_LEDE = "Where marketplace volume sits between offer and closing";
const COMMISSION_TITLE = "Commission";
const COMMISSION_LEDE = "What the ledger has earned and what is still exposed";
const COMMISSION_ACTION = "Payments";
const FINANCING_TITLE = "Financing Mix";
const FINANCING_LEDE = "Share of deal volume by how the buyer is funding it";

export function AdminTransactionsRail() {
    return (
        <div className="flex flex-col gap-3">
            <Panel
                title={PIPELINE_TITLE}
                description={PIPELINE_LEDE}
                count={OPEN_COUNT}
            >
                <PanelInset flush>
                    <TransactionStageTable stages={TRANSACTION_STAGES} />
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
                    <MetricList metrics={COMMISSION_METRICS} />
                </PanelInset>
            </Panel>

            <Panel title={FINANCING_TITLE} description={FINANCING_LEDE}>
                <PanelInset>
                    <ShareList shares={FINANCING_SHARES} />
                </PanelInset>
            </Panel>
        </div>
    );
}

AdminTransactionsRail.displayName = "AdminTransactionsRail";
