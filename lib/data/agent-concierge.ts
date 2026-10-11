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
import {
    CONCIERGE_TIERS,
    type ConciergeStatus,
    type ConciergeTier,
} from "@/lib/config/concierge-tones";
import type {
    ConciergeOverview,
    ConciergePractice as ApiConciergePractice,
    ConciergeServiceEntry,
} from "@/lib/validations/concierge";
import { formatMillions, percentOf } from "@/lib/utils";
import type { StatDatum } from "@/lib/types";

export interface VIPClient {
    id: string;
    name: string;
    portrait: string | null;
    tier: ConciergeTier;
    status: ConciergeStatus;
    budget: number;
    allocated: number;
    clientSince: number;
    openRequests: number;
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

const SERVICE_STYLES: { icon: LucideIcon; tone: ChartTone }[] = [
    { icon: Plane, tone: "neutral" },
    { icon: Castle, tone: "accent" },
    { icon: Sparkles, tone: "neutral" },
    { icon: Banknote, tone: "accent" },
    { icon: ConciergeBell, tone: "neutral" },
];

const styleFor = (index: number) =>
    SERVICE_STYLES[index % SERVICE_STYLES.length];

export const allocationPct = (client: VIPClient) =>
    percentOf(client.allocated, client.budget);

export const rankClients = (clients: VIPClient[]) =>
    [...clients].sort(
        (a, b) =>
            CONCIERGE_TIERS[b.tier].rank - CONCIERGE_TIERS[a.tier].rank ||
            b.budget - a.budget,
    );

export const toServiceDesk = (
    services: ConciergeServiceEntry[],
): ConciergeService[] =>
    services.map((service, index) => ({
        id: service.id,
        label: service.label,
        icon: styleFor(index).icon,
        tone: styleFor(index).tone,
        openRequests: service.openRequests,
        capacity: service.capacity,
    }));

export const toPlaybook = (
    practices: ApiConciergePractice[],
): ConciergePractice[] =>
    practices.map((practice) => ({
        id: practice.id,
        label: practice.label,
        cadence: practice.cadence,
        covered: practice.covered,
    }));

export const conciergeStats = (overview: ConciergeOverview): StatDatum[] => [
    {
        id: "clients",
        icon: Users,
        label: "Relationships",
        value: `${overview.relationships}`,
        tone: "accent",
    },
    {
        id: "book",
        icon: Wallet,
        label: "Under mandate",
        value: formatMillions(overview.bookValue),
        tone: "neutral",
    },
    {
        id: "allocated",
        icon: Gauge,
        label: "Allocated",
        value: `${overview.allocatedPercent}%`,
        tone: "neutral",
    },
    {
        id: "requests",
        icon: ConciergeBell,
        label: "Open requests",
        value: `${overview.openRequests}`,
        tone: "neutral",
    },
    {
        id: "closed",
        icon: CheckCircle2,
        label: "Closed to date",
        value: `${overview.closedDeals}`,
        tone: "accent",
    },
];

export const conciergeSummary = (overview: ConciergeOverview) =>
    `${overview.relationships} relationships · ${formatMillions(
        overview.bookValue,
    )} under mandate`;
