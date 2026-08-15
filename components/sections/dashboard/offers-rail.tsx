import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { ShareList } from "@/components/patterns/share-list";
import { OfferAgentList } from "@/components/features/dashboard/offer-agent-list";
import { agentShares, gapShares, statusShares } from "@/lib/data/offers";
import type { Offer } from "@/lib/types";

const STATUS_TITLE = "Status Mix";
const STATUS_LEDE = "Where every position currently sits";
const GAP_TITLE = "Gap to Ask";
const GAP_LEDE = "How your amounts land against the asking prices";
const AGENT_TITLE = "Representation";
const AGENT_LEDE = "Who is carrying the book and how much they hold";

export interface OffersRailProps {
    offers: Offer[];
}

export function OffersRail({ offers }: OffersRailProps) {
    const agents = agentShares(offers);

    return (
        <div className="flex flex-col gap-3">
            <Panel
                title={STATUS_TITLE}
                description={STATUS_LEDE}
                count={offers.length}
            >
                <PanelInset>
                    <ShareList shares={statusShares(offers)} />
                </PanelInset>
            </Panel>

            <Panel title={GAP_TITLE} description={GAP_LEDE}>
                <PanelInset>
                    <ShareList shares={gapShares(offers)} />
                </PanelInset>
            </Panel>

            <Panel
                title={AGENT_TITLE}
                description={AGENT_LEDE}
                count={agents.length}
            >
                <PanelInset>
                    <OfferAgentList shares={agents} />
                </PanelInset>
            </Panel>
        </div>
    );
}

OffersRail.displayName = "OffersRail";
