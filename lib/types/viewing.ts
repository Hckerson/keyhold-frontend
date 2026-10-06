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
    photo: string | null;
    price: number;
    date: string;
    time: string;
    durationMinutes: number;
    mode: ViewingMode;
    status: ViewingStatus;
    agent: string;
    agentPhone: string | null;
    survey?: ViewingSurvey;
}

export interface RescheduleDraft {
    date: string;
    time: string;
}

export type ViewingStatusFilter = ViewingStatus | "all";

export type ViewingModeFilter = ViewingMode | "all";

export interface CalendarMonth {
    year: number;
    month: number;
}

export type ViewingTiming = "today" | "tomorrow" | "later";

export interface OverviewViewing {
    id: string;
    address: string;
    agent: string;
    when: string;
    timing: ViewingTiming;
    status: ViewingStatus;
}
