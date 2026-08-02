import { ConciergeClientRow } from "@/components/features/agent/concierge-client-row";
import type { VIPClient } from "@/lib/data/agent-concierge";

export interface ConciergeClientListProps {
    clients: VIPClient[];
}

export function ConciergeClientList({ clients }: ConciergeClientListProps) {
    return (
        <div className="space-y-4">
            <h2 className="text-h6 font-display text-text font-light">
                Active VIP Clients
            </h2>
            {clients.map((client) => (
                <ConciergeClientRow key={client.id} client={client} />
            ))}
        </div>
    );
}

ConciergeClientList.displayName = "ConciergeClientList";
