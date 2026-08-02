import type { Step } from "@/components/ui/step-list";
import type { ViewingSurvey } from "@/components/features/dashboard/survey-result";
import type { RescheduleDraft } from "@/components/features/dashboard/reschedule-viewing-modal";
import { parseLocalDate } from "@/lib/utils";
import type { Viewing } from "@/lib/types";

export type PastViewing = Pick<
    Viewing,
    "id" | "address" | "date" | "time" | "agent"
> & {
    survey?: ViewingSurvey;
};

export const TODAY = { year: 2026, month: 6, day: 26 };

export const initialViewings: Viewing[] = [
    {
        id: "1",
        address: "456 Oak Avenue, Beverly Hills, CA",
        date: "2026-07-28",
        time: "3:00 PM",
        agent: "Sarah Chen",
        agentPhone: "(310) 555-0123",
        status: "confirmed",
    },
    {
        id: "2",
        address: "234 Oak Street, Bel Air, CA",
        date: "2026-07-30",
        time: "10:00 AM",
        agent: "Michael Rodriguez",
        agentPhone: "(310) 555-0456",
        status: "confirmed",
    },
    {
        id: "3",
        address: "567 Palm Drive, Malibu, CA",
        date: "2026-08-03",
        time: "2:00 PM",
        agent: "Jennifer Martinez",
        agentPhone: "(310) 555-0789",
        status: "pending",
    },
];

export const pastViewings: PastViewing[] = [
    {
        id: "p1",
        address: "789 Sunset Blvd, West Hollywood, CA",
        date: "2026-07-18",
        time: "11:00 AM",
        agent: "Sarah Chen",
        survey: {
            rating: 5,
            interest: "Preparing an offer",
            notes: "Light in the main living space is exceptional and the kitchen was renovated last year.",
        },
    },
    {
        id: "p2",
        address: "1220 Canyon Road, Bel Air, CA",
        date: "2026-07-11",
        time: "4:30 PM",
        agent: "Michael Rodriguez",
        survey: {
            rating: 3,
            interest: "Still considering",
            notes: "Great lot, but the primary suite is smaller than the listing photos suggest.",
        },
    },
    {
        id: "p3",
        address: "88 Marine Terrace, Santa Monica, CA",
        date: "2026-07-02",
        time: "9:00 AM",
        agent: "Jennifer Martinez",
    },
];

export const howItWorks: Step[] = [
    {
        title: "Browse Properties",
        description: "Find properties you want to see",
    },
    {
        title: "Request a Viewing",
        description: "Select a time that works for you",
    },
    {
        title: "Get Confirmation",
        description: "Your agent confirms the appointment",
    },
];

export interface CalendarMonth {
    year: number;
    month: number;
}

const isInMonth = (date: string, calendar: CalendarMonth) => {
    const parsed = parseLocalDate(date);
    return (
        parsed.getFullYear() === calendar.year &&
        parsed.getMonth() === calendar.month
    );
};

export const markedDaysInMonth = (
    viewings: Viewing[],
    calendar: CalendarMonth,
) =>
    viewings
        .filter(
            (viewing) =>
                viewing.status !== "cancelled" &&
                isInMonth(viewing.date, calendar),
        )
        .map((viewing) => parseLocalDate(viewing.date).getDate());

export const viewingsOnDate = (
    viewings: Viewing[],
    calendar: CalendarMonth,
    day: number | null,
) =>
    day === null
        ? []
        : viewings.filter(
              (viewing) =>
                  isInMonth(viewing.date, calendar) &&
                  parseLocalDate(viewing.date).getDate() === day,
          );

export const rescheduleViewing = (
    viewings: Viewing[],
    id: string,
    draft: RescheduleDraft,
): Viewing[] =>
    viewings.map((viewing) =>
        viewing.id === id
            ? {
                  ...viewing,
                  date: draft.date || viewing.date,
                  time: draft.time || viewing.time,
                  status: "pending",
              }
            : viewing,
    );

export const cancelViewingById = (viewings: Viewing[], id: string): Viewing[] =>
    viewings.map((viewing) =>
        viewing.id === id ? { ...viewing, status: "cancelled" } : viewing,
    );
