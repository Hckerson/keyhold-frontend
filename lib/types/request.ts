import type { ViewingMode } from "./viewing";

export type AgentRequestKind = "viewing" | "offer";

export interface AgentRequestBase {
    id: string;
    connectionId: string;
    buyerName: string;
    buyerAvatar: string | null;
    address: string;
    locality: string;
    listPrice: number;
    minutesAgo: number;
}

export interface ViewingRequestItem extends AgentRequestBase {
    kind: "viewing";
    mode: ViewingMode;
    durationMinutes: number;
    proposedTimes: string[];
}

export interface OfferRequestItem extends AgentRequestBase {
    kind: "offer";
    offeredPrice: number;
    offeredTerms: string;
    expiresAt: string;
}

export type AgentRequest = ViewingRequestItem | OfferRequestItem;

export interface RequestBook {
    viewings: ViewingRequestItem[];
    offers: OfferRequestItem[];
}
