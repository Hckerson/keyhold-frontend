import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { PanelLink } from "@/components/features/shared/panel-link";
import { ShareList } from "@/components/patterns/share-list";
import { ModerationAgentTable } from "@/components/features/admin/moderation-agent-table";
import {
    CHECK_COUNT_LABEL,
    agentLoads,
    clearedCheckShare,
    complianceShares,
    statusShares,
} from "@/lib/data/admin-listings";
import type { ModerationListing } from "@/lib/types";

const STATUS_TITLE = "Status Mix";
const STATUS_LEDE = "Where every submission on the book currently stands";
const COMPLIANCE_TITLE = "Compliance";
const AGENTS_TITLE = "Submitting Agents";
const AGENTS_LEDE = "Who is filling the queue and who is drawing reports";
const AGENTS_ACTION = "Users";

export interface ModerationRailProps {
    listings: ModerationListing[];
}

export function ModerationRail({ listings }: ModerationRailProps) {
    const loads = agentLoads(listings);

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

            <Panel
                title={COMPLIANCE_TITLE}
                description={`${clearedCheckShare(listings)}% clear across ${CHECK_COUNT_LABEL} per listing`}
            >
                <PanelInset>
                    <ShareList shares={complianceShares(listings)} />
                </PanelInset>
            </Panel>

            <Panel
                title={AGENTS_TITLE}
                description={AGENTS_LEDE}
                count={loads.length}
                action={<PanelLink href="/admin/users" label={AGENTS_ACTION} />}
            >
                <PanelInset scroll>
                    <ModerationAgentTable loads={loads} />
                </PanelInset>
            </Panel>
        </div>
    );
}

ModerationRail.displayName = "ModerationRail";
