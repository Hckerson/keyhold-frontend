export type LeadStage = "pending" | "accepted" | "declined";
export type LeadTemperature = "hot" | "warm" | "cold";

export type LeadStageFilter = LeadStage | "all";

export interface Lead {
    id: string;
    name: string;
    portrait: string;
    email: string;
    phone: string;
    listingPrice: number;
    interests: string[];
    stage: LeadStage;
    lastContact: string;
    lastContactMinutes: number;
    nextAction: string;
    unread: number;
    offers: number;
    viewings: number;
}
