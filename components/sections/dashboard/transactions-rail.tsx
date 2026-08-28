import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { ShareList } from "@/components/patterns/share-list";
import { escrowShares, stageShares } from "@/lib/utils/purchases";
import type { Purchase } from "@/lib/types";

const ESCROW_TITLE = "Escrow Mix";
const ESCROW_LEDE = "Where the money sits across your purchases";
const STAGE_TITLE = "Sale Stage";
const STAGE_LEDE = "How far each purchase has progressed";

export interface TransactionsRailProps {
    purchases: Purchase[];
}

export function TransactionsRail({ purchases }: TransactionsRailProps) {
    return (
        <div className="flex flex-col gap-3">
            <Panel
                title={ESCROW_TITLE}
                description={ESCROW_LEDE}
                count={purchases.length}
            >
                <PanelInset>
                    <ShareList shares={escrowShares(purchases)} />
                </PanelInset>
            </Panel>

            <Panel title={STAGE_TITLE} description={STAGE_LEDE}>
                <PanelInset>
                    <ShareList shares={stageShares(purchases)} />
                </PanelInset>
            </Panel>
        </div>
    );
}

TransactionsRail.displayName = "TransactionsRail";
