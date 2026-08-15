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
