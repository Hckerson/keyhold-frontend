import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { PanelLink } from "@/components/features/shared/panel-link";
import { ConciergeTopClientHero } from "@/components/sections/agent/concierge-top-client-hero";
import { ConciergeClientTable } from "@/components/features/agent/concierge-client-table";
import { peerClients, topClient } from "@/lib/data/agent-concierge";

const CLIENTS_TITLE = "Active VIP Clients";
const CLIENTS_LEDE = "Mandate, allocation and the next white-glove touch";
const CLIENTS_ACTION = "View pipeline";

export function ConciergeMain() {
    return (
        <div className="flex flex-col gap-3 lg:col-span-2">
            <ConciergeTopClientHero client={topClient} />

            <Panel
                title={CLIENTS_TITLE}
                description={CLIENTS_LEDE}
                count={peerClients.length}
                action={
                    <PanelLink href="/agent/pipeline" label={CLIENTS_ACTION} />
                }
            >
                <PanelInset flush>
                    <ConciergeClientTable clients={peerClients} />
                </PanelInset>
            </Panel>
        </div>
    );
}

ConciergeMain.displayName = "ConciergeMain";
