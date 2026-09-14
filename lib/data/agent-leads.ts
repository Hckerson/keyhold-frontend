import { CalendarClock, Handshake, Inbox, Users, Wallet } from "lucide-react";
import type { ShareDatum } from "@/components/patterns/share-row";
import type { StatDatum } from "@/components/patterns/stat-cell";
import {
    LEAD_STAGES,
    LEAD_STAGE_KEYS,
    LEAD_TEMPERATURES,
    LEAD_TEMPERATURE_KEYS,
} from "@/lib/config/lead-tones";
import type { SelectOption } from "@/components/ui/forms/select";
import type { Property } from "@/lib/validations/property";
import type { Lead, LeadStageFilter, LeadTemperature } from "@/lib/types/lead";
import { formatCompactUsd, percentOf, sum } from "@/lib/utils";

export const LEAD_STAGE_FILTERS: { id: LeadStageFilter; label: string }[] = [
    { id: "all", label: "All" },
    ...LEAD_STAGE_KEYS.map((id) => ({ id, label: LEAD_STAGES[id].label })),
];

export const toListingOptions = (
    properties: Property[],
): SelectOption<string>[] =>
    properties.map((property) => ({
        value: property.id,
        label: `${property.address}, ${property.locality}`,
    }));

export const OFFER_WEIGHT = 40;
export const VIEWING_WEIGHT = 15;
export const UNREAD_WEIGHT = 10;
export const VIEWING_CAP = 30;
export const UNREAD_CAP = 20;

const RECENCY_BANDS: { withinMinutes: number; points: number }[] = [
    { withinMinutes: 2_880, points: 10 },
    { withinMinutes: 10_080, points: 5 },
];

const MAX_SCORE = 100;

const recencyPoints = (minutes: number) =>
    RECENCY_BANDS.find((band) => minutes < band.withinMinutes)?.points ?? 0;

export const leadScore = (lead: Lead) => {
    if (lead.stage === "declined") return 0;

    const offers = Math.min(lead.offers * OFFER_WEIGHT, OFFER_WEIGHT);
    const viewings = Math.min(lead.viewings * VIEWING_WEIGHT, VIEWING_CAP);
    const unread = Math.min(lead.unread * UNREAD_WEIGHT, UNREAD_CAP);

    return Math.min(
        offers + viewings + unread + recencyPoints(lead.lastContactMinutes),
        MAX_SCORE,
    );
};

export const temperatureOf = (lead: Lead): LeadTemperature => {
    const score = leadScore(lead);
    return (
        LEAD_TEMPERATURE_KEYS.find(
            (id) => score >= LEAD_TEMPERATURES[id].floor,
        ) ?? "cold"
    );
};

export const countByTemperature = (leads: Lead[]) => {
    const counts: Record<LeadTemperature, number> = {
        hot: 0,
        warm: 0,
        cold: 0,
    };
    for (const lead of leads) counts[temperatureOf(lead)] += 1;
    return counts;
};

export const temperatureShares = (leads: Lead[]): ShareDatum[] => {
    const counts = countByTemperature(leads);
    return LEAD_TEMPERATURE_KEYS.map((id) => ({
        id,
        icon: LEAD_TEMPERATURES[id].icon,
        label: LEAD_TEMPERATURES[id].label,
        value: `${counts[id]}`,
        percent: percentOf(counts[id], leads.length),
        tone: LEAD_TEMPERATURES[id].chartTone,
    }));
};

export const rankLeads = (leads: Lead[]) =>
    [...leads].sort(
        (a, b) =>
            leadScore(b) - leadScore(a) ||
            LEAD_STAGES[b.stage].rank - LEAD_STAGES[a.stage].rank ||
            b.unread - a.unread ||
            b.listingPrice - a.listingPrice,
    );

export const countByStage = (leads: Lead[]) => {
    const counts: Record<LeadStageFilter, number> = {
        all: leads.length,
        pending: 0,
        accepted: 0,
        declined: 0,
    };
    for (const lead of leads) counts[lead.stage] += 1;
    return counts;
};

const openLeads = (leads: Lead[]) =>
    leads.filter((lead) => lead.stage !== "declined");

export const openValue = (leads: Lead[]) =>
    sum(openLeads(leads).map((lead) => lead.listingPrice));

export const leadStats = (leads: Lead[]): StatDatum[] => {
    const counts = countByStage(leads);

    return [
        {
            id: "total",
            icon: Users,
            label: "Enquiries",
            value: `${leads.length}`,
            tone: "accent",
        },
        {
            id: "pending",
            icon: Inbox,
            label: "Awaiting reply",
            value: `${counts.pending}`,
            tone: "warning",
        },
        {
            id: "value",
            icon: Wallet,
            label: "Open value",
            value: formatCompactUsd(openValue(leads)),
            tone: "info",
        },
        {
            id: "viewings",
            icon: CalendarClock,
            label: "Viewings",
            value: `${sum(leads.map((lead) => lead.viewings))}`,
            tone: "highlight",
        },
        {
            id: "offers",
            icon: Handshake,
            label: "Offers",
            value: `${sum(leads.map((lead) => lead.offers))}`,
            tone: "success",
        },
    ];
};

export const stageShares = (leads: Lead[]): ShareDatum[] => {
    const counts = countByStage(leads);
    return LEAD_STAGE_KEYS.map((id) => ({
        id,
        icon: LEAD_STAGES[id].icon,
        label: LEAD_STAGES[id].label,
        value: `${counts[id]}`,
        percent: percentOf(counts[id], leads.length),
        tone: LEAD_STAGES[id].chartTone,
    }));
};

export const leadsSummary = (leads: Lead[]) =>
    `${countByStage(leads).pending} awaiting reply · ${formatCompactUsd(
        openValue(leads),
    )} open`;
