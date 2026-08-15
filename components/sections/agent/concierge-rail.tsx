import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { ConciergeServiceList } from "@/components/features/agent/concierge-service-list";
import { ConciergePracticeList } from "@/components/features/agent/concierge-practice-list";
import {
    conciergePractices,
    conciergeServices,
    openRequests,
    vipClients,
} from "@/lib/data/agent-concierge";

const SERVICE_TITLE = "Service Desk";
const SERVICE_LEDE = "Open requests against desk capacity";
const PLAYBOOK_TITLE = "Retention Playbook";
const PLAYBOOK_LEDE = "Coverage of each practice across the VIP book";

export function ConciergeRail() {
    return (
        <div className="flex flex-col gap-3">
            <Panel
                title={SERVICE_TITLE}
                description={SERVICE_LEDE}
                count={openRequests}
            >
                <PanelInset>
                    <ConciergeServiceList services={conciergeServices} />
                </PanelInset>
            </Panel>

            <Panel title={PLAYBOOK_TITLE} description={PLAYBOOK_LEDE}>
                <PanelInset>
                    <ConciergePracticeList
                        practices={conciergePractices}
                        total={vipClients.length}
                    />
                </PanelInset>
            </Panel>
        </div>
    );
}

ConciergeRail.displayName = "ConciergeRail";
