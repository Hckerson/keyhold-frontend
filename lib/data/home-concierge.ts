import {
    FileText,
    Search,
    CalendarDays,
    KeyRound,
    type LucideIcon,
} from "lucide-react";

export interface BriefLine {
    label: string;
    value: string;
}

export interface ShortlistItem {
    address: string;
    note: string;
    imageSeed: number;
}

export interface ItinerarySlot {
    when: string;
    address: string;
    state: string;
    tone: "settled" | "pending";
}

export interface CompletionMilestone {
    label: string;
    done: boolean;
}

export type ConciergeArtifact =
    | { kind: "brief"; lines: BriefLine[] }
    | { kind: "shortlist"; items: ShortlistItem[] }
    | { kind: "itinerary"; slots: ItinerarySlot[] }
    | { kind: "completion"; milestones: CompletionMilestone[] };

export interface ConciergeStep {
    idx: string;
    icon: LucideIcon;
    title: string;
    description: string;
    focal: string;
    focalLabel: string;
    artifact: ConciergeArtifact;
}

export const CONCIERGE_STEPS: ConciergeStep[] = [
    {
        idx: "01",
        icon: FileText,
        title: "A saved brief",
        description:
            "Save the search you keep running — place, price, bedrooms — and come back to it in one click.",
        focal: "1 click",
        focalLabel: "Back to your search",
        artifact: {
            kind: "brief",
            lines: [
                { label: "Locale", value: "Montecito or Bel Air" },
                { label: "Price", value: "$5M and above" },
                { label: "Bedrooms", value: "4 or more" },
            ],
        },
    },
    {
        idx: "02",
        icon: Search,
        title: "A shortlist you keep",
        description:
            "Save the homes worth a second look and compare them side by side in one table.",
        focal: "Saved",
        focalLabel: "On every device you sign in from",
        artifact: {
            kind: "shortlist",
            items: [
                {
                    address: "Estate · Montecito",
                    note: "6 bd · 11 acres",
                    imageSeed: 2,
                },
                {
                    address: "Villa · Bel Air",
                    note: "4 bd · canyon aspect",
                    imageSeed: 5,
                },
                {
                    address: "House · Napa",
                    note: "5 bd · vineyard parcel",
                    imageSeed: 7,
                },
            ],
        },
    },
    {
        idx: "03",
        icon: CalendarDays,
        title: "Private viewings",
        description:
            "Request a time and the agent confirms or proposes another. Calls run through our number, so neither side sees the other's.",
        focal: "Bridged",
        focalLabel: "Calls, never direct numbers",
        artifact: {
            kind: "itinerary",
            slots: [
                {
                    when: "Thu 18:30",
                    address: "Estate · Montecito",
                    state: "Confirmed",
                    tone: "settled",
                },
                {
                    when: "Sat 09:00",
                    address: "House · Napa",
                    state: "Confirmed",
                    tone: "settled",
                },
                {
                    when: "Sun 11:00",
                    address: "Villa · Bel Air",
                    state: "Requested",
                    tone: "pending",
                },
            ],
        },
    },
    {
        idx: "04",
        icon: KeyRound,
        title: "To the keys",
        description:
            "An accepted offer opens a checklist with a date for each milestone, and your funds stay in escrow until release.",
        focal: "4",
        focalLabel: "Milestones to closing",
        artifact: {
            kind: "completion",
            milestones: [
                { label: "Inspection", done: true },
                { label: "Appraisal", done: true },
                { label: "Financing", done: true },
                { label: "Closing — keys released", done: false },
            ],
        },
    },
];
