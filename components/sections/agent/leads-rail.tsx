import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { ShareList } from "@/components/patterns/share-list";
import { MetricList } from "@/components/patterns/metric-list";
import { stageShares } from "@/lib/data/agent-leads";
import type { Lead } from "@/lib/types/lead";
import type { MetricItem } from "@/lib/types";
import { formatCount, sum } from "@/lib/utils";

const STAGE_TITLE = "Stage Mix";
const STAGE_LEDE = "Where the book sits right now";
const ENGAGEMENT_TITLE = "Engagement";
const ENGAGEMENT_LEDE = "What these enquiries have generated so far";

export interface LeadsRailProps {
    leads: Lead[];
}

export function LeadsRail({ leads }: LeadsRailProps) {
    const engagement: MetricItem[] = [
        {
            label: "Unread messages",
            value: formatCount(sum(leads.map((lead) => lead.unread))),
        },
        {
            label: "Viewings booked",
            value: formatCount(sum(leads.map((lead) => lead.viewings))),
        },
        {
            label: "Offers received",
            value: formatCount(sum(leads.map((lead) => lead.offers))),
        },
    ];

    return (
        <div className="flex flex-col gap-3">
            <Panel
                title={STAGE_TITLE}
                description={STAGE_LEDE}
                count={leads.length}
            >
                <PanelInset>
                    <ShareList shares={stageShares(leads)} />
                </PanelInset>
            </Panel>

            <Panel title={ENGAGEMENT_TITLE} description={ENGAGEMENT_LEDE}>
                <PanelInset>
                    <MetricList metrics={engagement} />
                </PanelInset>
            </Panel>
        </div>
    );
}

LeadsRail.displayName = "LeadsRail";
