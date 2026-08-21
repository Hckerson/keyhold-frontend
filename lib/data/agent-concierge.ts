import {
    Banknote,
    Castle,
    CheckCircle2,
    ConciergeBell,
    Gauge,
    Plane,
    Sparkles,
    Users,
    Wallet,
    type LucideIcon,
} from "lucide-react";
import type { ChartTone } from "@/lib/config/chart-tones";
import type { StatDatum } from "@/components/patterns/stat-cell";
import {
    CONCIERGE_TIERS,
    type ConciergeStatus,
    type ConciergeTier,
} from "@/lib/config/concierge-tones";
import { clientPortrait } from "@/lib/data/sample-images";
import { formatMillions, percentOf, sum } from "@/lib/utils";

export interface VIPClient {
    id: string;
    name: string;
    portrait: string;
    tier: ConciergeTier;
    status: ConciergeStatus;
    budget: number;
    allocated: number;
    deals: number;
    clientSince: number;
    lastContact: string;
    nextAction: string;
}

export interface ConciergeService {
    id: string;
    icon: LucideIcon;
    label: string;
    tone: ChartTone;
    openRequests: number;
    capacity: number;
}

export interface ConciergePractice {
    id: string;
    label: string;
    cadence: string;
    covered: number;
}

export const vipClients: VIPClient[] = [
    {
        id: "astor",
        name: "Robert Astor",
        portrait: clientPortrait(0),
        tier: "platinum",
        status: "acquiring",
        budget: 50_000_000,
        allocated: 32_000_000,
        deals: 3,
        clientSince: 2016,
        lastContact: "Today, 9:00 AM",
        nextAction: "Portfolio review",
    },
    {
        id: "laurent",
        name: "Sophia Laurent",
        portrait: clientPortrait(1),
        tier: "platinum",
        status: "divesting",
        budget: 35_000_000,
        allocated: 21_500_000,
        deals: 2,
        clientSince: 2018,
        lastContact: "Yesterday",
        nextAction: "Appraisal booking",
    },
    {
        id: "sterling",
        name: "Marcus Sterling",
        portrait: clientPortrait(2),
        tier: "vip",
        status: "under-contract",
        budget: 15_000_000,
        allocated: 14_200_000,
        deals: 1,
        clientSince: 2021,
        lastContact: "2 days ago",
        nextAction: "Closing coordination",
    },
    {
        id: "vasquez",
        name: "Elena Vasquez",
        portrait: clientPortrait(3),
        tier: "vip",
        status: "acquiring",
        budget: 12_000_000,
        allocated: 4_800_000,
        deals: 2,
        clientSince: 2020,
        lastContact: "3 days ago",
        nextAction: "Off-market tour",
    },
    {
        id: "okoye",
        name: "Amara Okoye",
        portrait: clientPortrait(4),
        tier: "premium",
        status: "acquiring",
        budget: 7_500_000,
        allocated: 3_100_000,
        deals: 2,
        clientSince: 2022,
        lastContact: "5 days ago",
        nextAction: "Financing intro",
    },
    {
        id: "reyes",
        name: "Julian Reyes",
        portrait: clientPortrait(5),
        tier: "premium",
        status: "dormant",
        budget: 9_000_000,
        allocated: 0,
        deals: 1,
        clientSince: 2019,
        lastContact: "3 weeks ago",
        nextAction: "Re-engagement call",
    },
];

export const conciergeServices: ConciergeService[] = [
    {
        id: "relocation",
        icon: Plane,
        label: "International Relocation",
        tone: "info",
        openRequests: 3,
        capacity: 6,
    },
    {
        id: "estate",
        icon: Castle,
        label: "Estate Management",
        tone: "accent",
        openRequests: 2,
        capacity: 4,
    },
    {
        id: "support",
        icon: Sparkles,
        label: "24/7 White-Glove",
        tone: "highlight",
        openRequests: 5,
        capacity: 8,
    },
    {
        id: "advisory",
        icon: Banknote,
        label: "Investment Advisory",
        tone: "success",
        openRequests: 1,
        capacity: 5,
    },
];

export const conciergePractices: ConciergePractice[] = [
    {
        id: "check-in",
        label: "Monthly portfolio check-in",
        cadence: "Monthly",
        covered: 4,
    },
    {
        id: "off-market",
        label: "Off-market first look",
        cadence: "On listing",
        covered: 5,
    },
    {
        id: "staging",
        label: "Staging & photography desk",
        cadence: "Per mandate",
        covered: 3,
    },
    {
        id: "specialists",
        label: "Specialist introductions",
        cadence: "On request",
        covered: 6,
    },
];

export const allocationPct = (client: VIPClient) =>
    percentOf(client.allocated, client.budget);

export const rankedClients = [...vipClients].sort(
    (a, b) =>
        CONCIERGE_TIERS[b.tier].rank - CONCIERGE_TIERS[a.tier].rank ||
        b.budget - a.budget,
);

export const topClient = rankedClients[0];

export const peerClients = rankedClients.slice(1);

export const bookValue = sum(vipClients.map((client) => client.budget));

export const openRequests = sum(
    conciergeServices.map((service) => service.openRequests),
);

export const conciergeStats: StatDatum[] = [
    {
        id: "clients",
        icon: Users,
        label: "Relationships",
        value: `${vipClients.length}`,
        tone: "accent",
    },
    {
        id: "book",
        icon: Wallet,
        label: "Under mandate",
        value: formatMillions(bookValue),
        tone: "highlight",
    },
    {
        id: "allocated",
        icon: Gauge,
        label: "Allocated",
        value: `${percentOf(
            sum(vipClients.map((client) => client.allocated)),
            bookValue,
        )}%`,
        tone: "info",
    },
    {
        id: "requests",
        icon: ConciergeBell,
        label: "Open requests",
        value: `${openRequests}`,
        tone: "warning",
    },
    {
        id: "closed",
        icon: CheckCircle2,
        label: "Closed to date",
        value: `${sum(vipClients.map((client) => client.deals))}`,
        tone: "success",
    },
];

export const conciergeSummary = `${vipClients.length} relationships · ${formatMillions(
    bookValue,
)} under mandate`;
