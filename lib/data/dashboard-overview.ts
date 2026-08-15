import {
    Bell,
    CalendarDays,
    FileText,
    Heart,
    MessageSquare,
} from "lucide-react";
import type { StatDatum } from "@/components/patterns/stat-cell";
import { propertyImage } from "@/lib/data/sample-images";
import type { ActivityEntry, OfferStatus, ViewingStatus } from "@/lib/types";

export const BUYER_FIRST_NAME = "John";
export const OFFER_STRONG_RATIO = 0.97;
export const OFFER_FAIR_RATIO = 0.93;

export interface OfferBook {
    label: string;
    value: number;
    liveCount: number;
    awaitingCount: number;
    href: string;
}

export interface OfferPosition {
    id: string;
    address: string;
    image: string;
    offered: number;
    list: number;
    status: OfferStatus;
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

export type AlertKind = "price-drop" | "new-match" | "under-offer";

export interface MatchAlert {
    id: string;
    address: string;
    kind: AlertKind;
    price: number;
    change?: number;
    when: string;
}

export type TaskState = "done" | "active" | "todo";

export interface JourneyTask {
    id: string;
    label: string;
    href: string;
    state: TaskState;
    due: string;
}

export const alertKindLabel: Record<AlertKind, string> = {
    "price-drop": "Price drop",
    "new-match": "New match",
    "under-offer": "Under offer",
};

export const offerBook: OfferBook = {
    label: "Offers in play",
    value: 7_350_000,
    liveCount: 2,
    awaitingCount: 1,
    href: "/dashboard/offers",
};

export const offerPositions: OfferPosition[] = [
    {
        id: "1",
        address: "456 Oak Avenue, Beverly Hills",
        image: propertyImage(0),
        offered: 3_100_000,
        list: 3_200_000,
        status: "submitted",
    },
    {
        id: "3",
        address: "234 Oak Street, Bel Air",
        image: propertyImage(2),
        offered: 4_250_000,
        list: 4_500_000,
        status: "countered",
    },
];

export const stats: StatDatum[] = [
    {
        id: "saved",
        label: "Saved",
        value: "8",
        icon: Heart,
        href: "/dashboard/saved",
        tone: "neutral",
    },
    {
        id: "offers",
        label: "Live offers",
        value: "2",
        icon: FileText,
        href: "/dashboard/offers",
        tone: "highlight",
    },
    {
        id: "viewings",
        label: "Viewings",
        value: "3",
        icon: CalendarDays,
        href: "/dashboard/viewings",
        tone: "info",
    },
    {
        id: "alerts",
        label: "Alerts",
        value: "3",
        icon: Bell,
        href: "/dashboard/alerts",
        tone: "warning",
    },
    {
        id: "messages",
        label: "Unread",
        value: "1",
        icon: MessageSquare,
        href: "/dashboard/messages",
        tone: "accent",
    },
];

export const upcomingViewings: OverviewViewing[] = [
    {
        id: "1",
        address: "456 Oak Avenue",
        agent: "Sarah Chen",
        when: "3:00 PM",
        timing: "today",
        status: "confirmed",
    },
    {
        id: "2",
        address: "234 Oak Street",
        agent: "Michael Rodriguez",
        when: "10:00 AM",
        timing: "tomorrow",
        status: "confirmed",
    },
    {
        id: "3",
        address: "567 Palm Drive",
        agent: "Jennifer Martinez",
        when: "Fri 2:00",
        timing: "later",
        status: "pending",
    },
];

export const recentActivity: ActivityEntry[] = [
    {
        id: 1,
        type: "viewing",
        title: "Viewing confirmed",
        description: "456 Oak Avenue at 3:00 PM with Sarah Chen",
        time: "2h",
    },
    {
        id: 2,
        type: "offer",
        title: "Seller countered",
        description: "234 Oak Street came back at $4.4M",
        time: "5h",
    },
    {
        id: 3,
        type: "message",
        title: "Concierge replied",
        description: "Michael Rodriguez on the Bel Air counter",
        time: "1d",
    },
    {
        id: 4,
        type: "listing",
        title: "Price drop",
        description: "456 Oak Avenue down $150K since you saved it",
        time: "2d",
    },
    {
        id: 5,
        type: "showing",
        title: "Listing viewed",
        description: "567 Palm Drive, your third visit this month",
        time: "3d",
    },
];

export const matchAlerts: MatchAlert[] = [
    {
        id: "1",
        address: "456 Oak Avenue",
        kind: "price-drop",
        price: 3_200_000,
        change: 150_000,
        when: "2d",
    },
    {
        id: "2",
        address: "678 Elm Street",
        kind: "new-match",
        price: 2_850_000,
        when: "3d",
    },
    {
        id: "3",
        address: "234 Oak Street",
        kind: "under-offer",
        price: 4_500_000,
        when: "5d",
    },
];

export const journeyTasks: JourneyTask[] = [
    {
        id: "pre-approval",
        label: "Mortgage pre-approval",
        href: "/dashboard/settings",
        state: "done",
        due: "Jul 12",
    },
    {
        id: "shortlist",
        label: "Shortlist and tour",
        href: "/dashboard/saved",
        state: "done",
        due: "Jul 28",
    },
    {
        id: "counter",
        label: "Answer the Bel Air counter",
        href: "/dashboard/offers/3",
        state: "active",
        due: "Aug 06",
    },
    {
        id: "inspection",
        label: "Book the inspection",
        href: "/dashboard/viewings",
        state: "todo",
        due: "Aug 14",
    },
    {
        id: "escrow",
        label: "Open escrow",
        href: "/dashboard/offers",
        state: "todo",
        due: "Sep 01",
    },
];
