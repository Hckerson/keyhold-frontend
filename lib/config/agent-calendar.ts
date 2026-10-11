import type { CalendarViewMode } from "@/lib/types";

export const SCHEDULE_ACTION = "Propose a viewing";

export const RESCHEDULE_HINT =
    "The buyer reconfirms once you propose a new slot.";

export const VIEW_MODES: { id: CalendarViewMode; label: string }[] = [
    { id: "month", label: "Day" },
    { id: "week", label: "Week" },
];

export const CREATE_EVENT_COPY = {
    title: "Schedule a viewing",
    hint: "The client is notified and confirms one of the times you propose.",
    client: "Client and property",
    date: "Date",
    slots: "Times to propose",
    mode: "Format",
    cancel: "Not now",
    confirm: "Propose times",
    empty: "You have no active enquiries to schedule against.",
    failed: "That viewing did not reach the client.",
    retry: "Check the details and try once more.",
} as const;
