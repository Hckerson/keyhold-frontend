import { Users } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { PanelLink } from "@/components/features/shared/panel-link";
import { ConciergeTopClientHero } from "@/components/sections/agent/concierge-top-client-hero";
import { ConciergeClientTable } from "@/components/features/agent/concierge-client-table";
import type { VIPClient } from "@/lib/data/agent-concierge";

const CLIENTS_TITLE = "Active VIP Clients";
const CLIENTS_LEDE = "Mandate, allocation and the next white-glove touch";
const CLIENTS_ACTION = "View pipeline";
const EMPTY_TITLE = "No VIP clients yet";
const EMPTY_LEDE = "Add a client to the concierge book to start tracking them.";
const LOADING_TITLE = "Loading your book";
const LOADING_LEDE = "Fetching mandates and allocations.";

export interface ConciergeMainProps {
    top?: VIPClient;
    peers: VIPClient[];
    pending?: boolean;
}

export function ConciergeMain({ top, peers, pending }: ConciergeMainProps) {
    return (
        <div className="console-span-2 flex flex-col gap-3">
            {top && <ConciergeTopClientHero client={top} />}

            <Panel
                title={CLIENTS_TITLE}
                description={CLIENTS_LEDE}
                count={peers.length}
                action={
                    <PanelLink href="/agent/pipeline" label={CLIENTS_ACTION} />
                }
            >
                {peers.length > 0 ? (
                    <PanelInset scroll>
                        <ConciergeClientTable clients={peers} />
                    </PanelInset>
                ) : (
                    <EmptyState
                        icon={Users}
                        title={pending ? LOADING_TITLE : EMPTY_TITLE}
                        description={pending ? LOADING_LEDE : EMPTY_LEDE}
                    />
                )}
            </Panel>
        </div>
    );
}

ConciergeMain.displayName = "ConciergeMain";
