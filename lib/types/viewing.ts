export type ViewingStatus = "confirmed" | "pending" | "completed" | "cancelled";

export type ViewingMode = "in-person" | "virtual" | "open-house";

export interface ViewingSurvey {
    rating: number;
    interest: string;
    notes: string;
}

export interface Viewing {
    id: string;
    listingId: string;
    address: string;
    locality: string;
    photo: string;
    price: number;
    date: string;
    time: string;
    durationMinutes: number;
    mode: ViewingMode;
    status: ViewingStatus;
    agent: string;
    agentPhone: string;
    survey?: ViewingSurvey;
}

export interface RescheduleDraft {
    date: string;
    time: string;
}
