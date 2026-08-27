export type InterestStatus = "pending" | "connected" | "declined";

export interface Interest {
    id: string;
    listingId: string;
    address: string;
    locality: string;
    photo: string | null;
    agent: string;
    agentPortrait: string | null;
    agency: string | null;
    listPrice: number;
    status: InterestStatus;
    minutesAgo: number;
    messages: number;
    viewings: number;
    offers: number;
}
