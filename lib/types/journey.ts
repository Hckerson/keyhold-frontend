import type { LucideIcon } from "lucide-react";

export type JourneyStationState = "complete" | "active" | "pending";

export interface JourneyStation {
    label: string;
    icon: LucideIcon;
    description: string;
    state: JourneyStationState;
    href?: string;
    count?: number;
}

export interface JourneyStatus {
    title: string;
    detail: string;
}

export interface BuyerJourney {
    label: string;
    stations: JourneyStation[];
    status: JourneyStatus;
}

export interface JourneyCounts {
    saved: number;
    interests: number;
    viewings: number;
    offers: number;
    closings: number;
}

export type TaskState = "done" | "active" | "todo";

export interface JourneyTask {
    id: string;
    label: string;
    href: string;
    state: TaskState;
}

export type PropertyStage =
    | "browsing"
    | "requested"
    | "declined"
    | "connected"
    | "viewing"
    | "offered"
    | "countered"
    | "closing"
    | "owned";

export type PropertyActionKind =
    | "interest"
    | "viewing"
    | "offer"
    | "track"
    | "none";

export interface StageAction {
    kind: PropertyActionKind;
    label: string;
}

export interface PropertyAction extends StageAction {
    href: string | null;
}

export interface PropertyJourney {
    stage: PropertyStage;
    connectionId: string | null;
    offerId: string | null;
    transactionId: string | null;
    saved: boolean;
}
