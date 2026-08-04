import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { ShareList } from "@/components/patterns/share-list";
import {
    playShares,
    sourceShares,
    stageShares,
    type Lead,
} from "@/lib/data/agent-leads";

const STAGE_TITLE = "Stage Mix";
const STAGE_LEDE = "Where the book sits right now";
const SOURCE_TITLE = "Lead Sources";
const SOURCE_LEDE = "Which channels are filling the funnel";
const PLAYBOOK_TITLE = "Nurture Playbook";
const PLAYBOOK_LEDE = "Cadence owed to each temperature band";

export interface LeadsRailProps {
    leads: Lead[];
}

export function LeadsRail({ leads }: LeadsRailProps) {
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

            <Panel title={SOURCE_TITLE} description={SOURCE_LEDE}>
                <PanelInset>
                    <ShareList shares={sourceShares(leads)} />
                </PanelInset>
            </Panel>

            <Panel title={PLAYBOOK_TITLE} description={PLAYBOOK_LEDE}>
                <PanelInset>
                    <ShareList shares={playShares(leads)} />
                </PanelInset>
            </Panel>
        </div>
    );
}

LeadsRail.displayName = "LeadsRail";
