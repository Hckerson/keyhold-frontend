export type DealStage = "leads" | "offers" | "pending" | "closed";

export interface Deal {
    id: string;
    property: string;
    buyer: string;
    price: number;
    stage: DealStage;
    daysInStage: number;
    lastActivity: string;
    notes: string;
    openOfferId: string | null;
}
