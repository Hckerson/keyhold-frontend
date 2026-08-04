import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { ShareList } from "@/components/patterns/share-list";
import {
    ageShares,
    demandShares,
    statusShares,
} from "@/lib/data/agent-listings";
import type { ManagedListing } from "@/lib/types";

const STATUS_TITLE = "Status Mix";
const STATUS_LEDE = "Where the book sits right now";
const DEMAND_TITLE = "Demand Bands";
const DEMAND_LEDE = "Save rate against views, listing by listing";
const AGE_TITLE = "Time on Market";
const AGE_LEDE = "How long each property has been live";

export interface ListingsRailProps {
    listings: ManagedListing[];
}

export function ListingsRail({ listings }: ListingsRailProps) {
    return (
        <div className="flex flex-col gap-3">
            <Panel
                title={STATUS_TITLE}
                description={STATUS_LEDE}
                count={listings.length}
            >
                <PanelInset>
                    <ShareList shares={statusShares(listings)} />
                </PanelInset>
            </Panel>

            <Panel title={DEMAND_TITLE} description={DEMAND_LEDE}>
                <PanelInset>
                    <ShareList shares={demandShares(listings)} />
                </PanelInset>
            </Panel>

            <Panel title={AGE_TITLE} description={AGE_LEDE}>
                <PanelInset>
                    <ShareList shares={ageShares(listings)} />
                </PanelInset>
            </Panel>
        </div>
    );
}

ListingsRail.displayName = "ListingsRail";
