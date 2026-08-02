export type ViewingStatus = "confirmed" | "pending" | "cancelled";

export interface Viewing {
    id: string;
    address: string;
    date: string;
    time: string;
    agent: string;
    agentPhone: string;
    status: ViewingStatus;
}
