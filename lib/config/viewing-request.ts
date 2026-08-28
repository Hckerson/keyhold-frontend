import type { ViewingMode } from "@/lib/types";

export interface ViewingSlot {
    id: string;
    label: string;
    caption: string;
    hour: number;
}

export const VIEWING_SLOTS: ViewingSlot[] = [
    { id: "morning", label: "Morning", caption: "10:00", hour: 10 },
    { id: "midday", label: "Midday", caption: "13:00", hour: 13 },
    { id: "afternoon", label: "Afternoon", caption: "16:00", hour: 16 },
];

export const REQUESTABLE_MODES: ViewingMode[] = ["in-person", "virtual"];

export const VIEWING_DURATION_MINUTES = 45;

export const VIEWING_REQUEST_COPY = {
    title: "Request a private viewing",
    hint: "Propose the times that suit you. The listing office confirms one of them.",
    date: "Preferred date",
    slots: "Times that suit you",
    mode: "How you would like to view",
    cancel: "Not now",
    confirm: "Send request",
    failed: "That request did not reach the listing office.",
    retry: "Check the details and try once more.",
} as const;
