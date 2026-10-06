import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { ShareList } from "@/components/patterns/share-list";
import { statusShares, timingShares } from "@/lib/data/viewings-stats";
import type { Viewing } from "@/lib/types";

const STATUS_TITLE = "Status Mix";
const STATUS_LEDE = "Where every tour on the book currently stands";
const CADENCE_TITLE = "Cadence";
const CADENCE_LEDE = "How the schedule spreads across the days ahead";

export interface ViewingsSharesProps {
    viewings: Viewing[];
}

export function ViewingsShares({ viewings }: ViewingsSharesProps) {
    return (
        <div className="panel-pair gap-3">
            <Panel
                title={STATUS_TITLE}
                description={STATUS_LEDE}
                count={viewings.length}
            >
                <PanelInset>
                    <ShareList shares={statusShares(viewings)} />
                </PanelInset>
            </Panel>

            <Panel title={CADENCE_TITLE} description={CADENCE_LEDE}>
                <PanelInset>
                    <ShareList shares={timingShares(viewings)} />
                </PanelInset>
            </Panel>
        </div>
    );
}

ViewingsShares.displayName = "ViewingsShares";
