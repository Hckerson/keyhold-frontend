export type DealStage = "leads" | "offers" | "pending" | "closed";

export interface Deal {
    id: string;
    property: string;
    buyer: string;
    price: number;
    stage: DealStage;
    daysInStage: number;
    daysToClose: number;
    lastActivity: string;
    nextStep: string;
    notes: string;
}
