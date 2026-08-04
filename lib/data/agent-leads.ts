import { Flame, Gauge, Target, Users, Wallet } from "lucide-react";
import type { ShareDatum } from "@/components/patterns/share-row";
import type { StatDatum } from "@/components/patterns/stat-cell";
import {
    LEAD_SCORES,
    LEAD_SCORE_KEYS,
    LEAD_SOURCES,
    LEAD_SOURCE_KEYS,
    LEAD_STAGES,
    LEAD_STAGE_KEYS,
    type LeadScore,
    type LeadSource,
    type LeadStage,
} from "@/lib/config/lead-tones";
import { clientPortrait } from "@/lib/data/sample-images";
import { averageOf, formatCompactUsd, percentOf, sum } from "@/lib/utils";

export type LeadStageFilter = LeadStage | "all";

export interface Lead {
    id: string;
    name: string;
    portrait: string;
    email: string;
    phone: string;
    source: LeadSource;
    budget: number;
    fit: number;
    touches: number;
    interests: string[];
    score: LeadScore;
    stage: LeadStage;
    lastContact: string;
    nextAction: string;
}

export const initialLeads: Lead[] = [
    {
        id: "johnson",
        name: "Michael Johnson",
        portrait: clientPortrait(0),
        email: "michael@example.com",
        phone: "(310) 555-0100",
        source: "referral",
        budget: 5_000_000,
        fit: 92,
        touches: 7,
        interests: ["Beverly Hills", "Modern", "4+ beds"],
        score: "hot",
        stage: "qualified",
        lastContact: "2 hours ago",
        nextAction: "Schedule showing",
    },
    {
        id: "lang",
        name: "Robert Lang",
        portrait: clientPortrait(1),
        email: "robert@example.com",
        phone: "(310) 555-0104",
        source: "referral",
        budget: 6_200_000,
        fit: 84,
        touches: 3,
        interests: ["Pasadena", "Estate", "5+ beds"],
        score: "hot",
        stage: "new",
        lastContact: "20 minutes ago",
        nextAction: "Send private preview",
    },
    {
        id: "brown",
        name: "Patricia Brown",
        portrait: clientPortrait(2),
        email: "patricia@example.com",
        phone: "(310) 555-0101",
        source: "portal",
        budget: 3_500_000,
        fit: 71,
        touches: 5,
        interests: ["Bel Air", "Traditional", "3 beds"],
        score: "warm",
        stage: "contacted",
        lastContact: "1 day ago",
        nextAction: "Send property list",
    },
    {
        id: "williams",
        name: "David Williams",
        portrait: clientPortrait(3),
        email: "david@example.com",
        phone: "(310) 555-0102",
        source: "open-house",
        budget: 2_500_000,
        fit: 58,
        touches: 2,
        interests: ["West Hollywood", "Condo", "2 beds"],
        score: "warm",
        stage: "new",
        lastContact: "3 days ago",
        nextAction: "Follow-up call",
    },
    {
        id: "okonkwo",
        name: "Ada Okonkwo",
        portrait: clientPortrait(4),
        email: "ada@example.com",
        phone: "(310) 555-0105",
        source: "campaign",
        budget: 4_400_000,
        fit: 66,
        touches: 4,
        interests: ["Santa Monica", "Contemporary", "3 beds"],
        score: "warm",
        stage: "contacted",
        lastContact: "6 hours ago",
        nextAction: "Confirm mortgage broker",
    },
    {
        id: "davis",
        name: "Jennifer Davis",
        portrait: clientPortrait(5),
        email: "jennifer@example.com",
        phone: "(310) 555-0103",
        source: "walk-in",
        budget: 4_000_000,
        fit: 24,
        touches: 1,
        interests: ["Malibu", "Beachfront", "4+ beds"],
        score: "cold",
        stage: "lost",
        lastContact: "1 week ago",
        nextAction: "Nurture campaign",
    },
    {
        id: "petrov",
        name: "Nikolai Petrov",
        portrait: clientPortrait(6),
        email: "nikolai@example.com",
        phone: "(310) 555-0106",
        source: "portal",
        budget: 2_900_000,
        fit: 41,
        touches: 2,
        interests: ["Brentwood", "Mid-century", "3 beds"],
        score: "cold",
        stage: "new",
        lastContact: "5 days ago",
        nextAction: "Qualify financing",
    },
];

export const LEAD_STAGE_FILTERS: { id: LeadStageFilter; label: string }[] = [
    { id: "all", label: "All" },
    ...LEAD_STAGE_KEYS.map((id) => ({ id, label: LEAD_STAGES[id].label })),
];

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export const mailHref = (email: string) => `mailto:${email}`;

export const rankLeads = (leads: Lead[]) =>
    [...leads].sort(
        (a, b) =>
            LEAD_SCORES[b.score].rank - LEAD_SCORES[a.score].rank ||
            LEAD_STAGES[b.stage].rank - LEAD_STAGES[a.stage].rank ||
            b.budget - a.budget,
    );

export const advanceStage = (leads: Lead[], id: string) =>
    leads.map((lead) =>
        lead.id === id
            ? { ...lead, stage: LEAD_STAGES[lead.stage].next.id }
            : lead,
    );

export const countByStage = (leads: Lead[]) => {
    const counts: Record<LeadStageFilter, number> = {
        all: leads.length,
        new: 0,
        contacted: 0,
        qualified: 0,
        lost: 0,
    };
    for (const lead of leads) counts[lead.stage] += 1;
    return counts;
};

const openLeads = (leads: Lead[]) =>
    leads.filter((lead) => lead.stage !== "lost");

const countByScore = (leads: Lead[], score: LeadScore) =>
    leads.filter((lead) => lead.score === score).length;

export const openValue = (leads: Lead[]) =>
    sum(openLeads(leads).map((lead) => lead.budget));

export const leadStats = (leads: Lead[]): StatDatum[] => [
    {
        id: "total",
        icon: Users,
        label: "Prospects",
        value: `${leads.length}`,
        tone: "accent",
    },
    {
        id: "hot",
        icon: Flame,
        label: "Hot",
        value: `${countByScore(leads, "hot")}`,
        tone: "highlight",
    },
    {
        id: "value",
        icon: Wallet,
        label: "Open value",
        value: formatCompactUsd(openValue(leads)),
        tone: "info",
    },
    {
        id: "fit",
        icon: Gauge,
        label: "Average fit",
        value: `${averageOf(openLeads(leads).map((lead) => lead.fit))}%`,
        tone: "warning",
    },
    {
        id: "qualified",
        icon: Target,
        label: "Qualified",
        value: `${countByStage(leads).qualified}`,
        tone: "success",
    },
];

export const stageShares = (leads: Lead[]): ShareDatum[] => {
    const counts = countByStage(leads);
    return LEAD_STAGE_KEYS.map((id) => {
        const count = counts[id];
        return {
            id,
            icon: LEAD_STAGES[id].icon,
            label: LEAD_STAGES[id].label,
            value: `${count}`,
            percent: percentOf(count, leads.length),
            tone: LEAD_STAGES[id].tone,
        };
    });
};

export const sourceShares = (leads: Lead[]): ShareDatum[] =>
    LEAD_SOURCE_KEYS.map((id) => {
        const count = leads.filter((lead) => lead.source === id).length;
        return {
            id,
            icon: LEAD_SOURCES[id].icon,
            label: LEAD_SOURCES[id].label,
            value: `${count}`,
            percent: percentOf(count, leads.length),
            tone: LEAD_SOURCES[id].tone,
        };
    });

export const playShares = (leads: Lead[]): ShareDatum[] =>
    LEAD_SCORE_KEYS.map((id) => {
        const count = countByScore(leads, id);
        return {
            id,
            icon: LEAD_SCORES[id].icon,
            label: LEAD_SCORES[id].play,
            value: `${count}/${leads.length}`,
            percent: percentOf(count, leads.length),
            tone: LEAD_SCORES[id].tone,
        };
    });

export const leadsSummary = (leads: Lead[]) =>
    `${countByScore(leads, "hot")} hot · ${formatCompactUsd(openValue(leads))} open`;
