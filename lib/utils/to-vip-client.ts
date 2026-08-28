import type { VIPClient } from "@/lib/data/agent-concierge";
import type { ConciergeClient } from "@/lib/validations/concierge";
import {
    CONCIERGE_STATUS_BY_API,
    CONCIERGE_TIER_BY_API,
} from "@/lib/utils/status-maps";

const NO_CONTACT = "No contact logged";
const NO_ACTION = "No action set";

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
};

export const toVipClient = (client: ConciergeClient): VIPClient => ({
    id: client.id,
    name: client.name,
    portrait: client.portrait,
    tier: CONCIERGE_TIER_BY_API[client.tier],
    status: CONCIERGE_STATUS_BY_API[client.status],
    budget: client.budget,
    allocated: client.allocated,
    clientSince: client.clientSince,
    openRequests: client.openRequests,
    lastContact: client.lastContact
        ? new Date(client.lastContact).toLocaleDateString("en-US", DATE_FORMAT)
        : NO_CONTACT,
    nextAction: client.nextAction ?? NO_ACTION,
});

export const toVipClients = (clients: ConciergeClient[]): VIPClient[] =>
    clients.map(toVipClient);
