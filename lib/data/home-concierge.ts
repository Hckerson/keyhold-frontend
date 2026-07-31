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
    offMarket: boolean;
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
        title: "A private brief",
        description:
            "We begin with a conversation — your life, your patterns, and what home should feel like.",
        focal: "90 min",
        focalLabel: "The first conversation",
        artifact: {
            kind: "brief",
            lines: [
                {
                    label: "Locale",
                    value: "Coastal Montecito — or quiet Bel-Air",
                },
                {
                    label: "Timeline",
                    value: "Unhurried. Fall at the earliest.",
                },
                {
                    label: "Non-negotiable",
                    value: "A walled garden, and no through road",
                },
            ],
        },
    },
    {
        idx: "02",
        icon: Search,
        title: "A curated shortlist",
        description:
            "A tailored selection, including off-market properties you won't find elsewhere.",
        focal: "4 of 9",
        focalLabel: "Never publicly listed",
        artifact: {
            kind: "shortlist",
            items: [
                {
                    address: "Cypress Point, Montecito",
                    note: "6 bd · 11 acres",
                    imageSeed: 2,
                    offMarket: true,
                },
                {
                    address: "The Lantern, Bel-Air",
                    note: "4 bd · canyon aspect",
                    imageSeed: 5,
                    offMarket: false,
                },
                {
                    address: "Stone Fold, Napa",
                    note: "5 bd · vineyard parcel",
                    imageSeed: 7,
                    offMarket: true,
                },
            ],
        },
    },
    {
        idx: "03",
        icon: CalendarDays,
        title: "Private viewings",
        description:
            "Discreet, unhurried tours arranged around your schedule and privacy.",
        focal: "21:00",
        focalLabel: "Latest viewing arranged",
        artifact: {
            kind: "itinerary",
            slots: [
                {
                    when: "Thu 18:30",
                    address: "Cypress Point",
                    state: "Confirmed",
                    tone: "settled",
                },
                {
                    when: "Sat 09:00",
                    address: "Stone Fold",
                    state: "Confirmed",
                    tone: "settled",
                },
                {
                    when: "Sun 21:00",
                    address: "The Lantern",
                    state: "Held",
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
            "Negotiation, closing, and handover — managed end to end, seamlessly.",
        focal: "31 days",
        focalLabel: "Median brief to keys",
        artifact: {
            kind: "completion",
            milestones: [
                { label: "Offer accepted, under ask", done: true },
                { label: "Survey and title cleared", done: true },
                { label: "Contracts exchanged", done: true },
                { label: "Keys released — Cypress Point", done: false },
            ],
        },
    },
];
