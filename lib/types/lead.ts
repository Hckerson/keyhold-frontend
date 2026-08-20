export type LeadStage = "pending" | "accepted" | "declined";

export type LeadStageFilter = LeadStage | "all";

export interface Lead {
    id: string;
    name: string;
    portrait: string;
    email: string;
    phone: string;
    budget: number;
    interests: string[];
    stage: LeadStage;
    lastContact: string;
    nextAction: string;
    unread: number;
    offers: number;
    viewings: number;
}
