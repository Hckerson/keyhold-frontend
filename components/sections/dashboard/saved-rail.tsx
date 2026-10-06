import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { ShareList } from "@/components/patterns/share-list";
import {
    matchShares,
    statusShares,
    watchShares,
} from "@/lib/data/saved-listings-stats";
import type { SavedListing } from "@/lib/types";

const STATUS_TITLE = "Market State";
const STATUS_LEDE = "Where your saved properties stand today";
const MATCH_TITLE = "Match Bands";
const MATCH_LEDE = "How closely each one answers your saved search";
const WATCH_TITLE = "Attention";
const WATCH_LEDE = "How recently you last opened each listing";

export interface SavedRailProps {
    listings: SavedListing[];
}

export function SavedRail({ listings }: SavedRailProps) {
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

            <Panel title={MATCH_TITLE} description={MATCH_LEDE}>
                <PanelInset>
                    <ShareList shares={matchShares(listings)} />
                </PanelInset>
            </Panel>

            <Panel title={WATCH_TITLE} description={WATCH_LEDE}>
                <PanelInset>
                    <ShareList shares={watchShares(listings)} />
                </PanelInset>
            </Panel>
        </div>
    );
}

SavedRail.displayName = "SavedRail";
