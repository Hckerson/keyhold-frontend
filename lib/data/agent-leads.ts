import type { Step } from "@/components/ui/step-list";
import type { BadgeTone } from "@/components/features/shared/contact-row";

export type LeadScore = "hot" | "warm" | "cold";

export type LeadStage = "new" | "contacted" | "qualified" | "lost";

export type LeadStageFilter = LeadStage | "all";

export interface Lead {
    id: string;
    name: string;
    email: string;
    phone: string;
    budget: number;
    interests: string[];
    score: LeadScore;
    stage: LeadStage;
    lastContact: string;
    nextAction: string;
}

export const STAGES: {
    id: LeadStage;
    label: string;
    tone: BadgeTone;
}[] = [
    { id: "new", label: "New", tone: "info" },
    { id: "contacted", label: "Contacted", tone: "warning" },
    { id: "qualified", label: "Qualified", tone: "success" },
    { id: "lost", label: "Lost", tone: "neutral" },
];

export const SCORES: Record<
    LeadScore,
    { label: string; variant: "accent" | "warning" | "default" }
> = {
    hot: { label: "Hot", variant: "accent" },
    warm: { label: "Warm", variant: "warning" },
    cold: { label: "Cold", variant: "default" },
};

export const NEXT_STAGE: Record<LeadStage, { id: LeadStage; label: string }> = {
    new: { id: "contacted", label: "Mark Contacted" },
    contacted: { id: "qualified", label: "Mark Qualified" },
    qualified: { id: "lost", label: "Mark Lost" },
    lost: { id: "new", label: "Reopen" },
};

export const initialLeads: Lead[] = [
    {
        id: "1",
        name: "Michael Johnson",
        email: "michael@example.com",
        phone: "(310) 555-0100",
        budget: 5000000,
        interests: ["Beverly Hills", "Modern", "4+ Beds"],
        score: "hot",
        stage: "qualified",
        lastContact: "2 hours ago",
        nextAction: "Schedule showing tomorrow",
    },
    {
        id: "2",
        name: "Patricia Brown",
        email: "patricia@example.com",
        phone: "(310) 555-0101",
        budget: 3500000,
        interests: ["Bel Air", "Traditional", "3 Beds"],
        score: "warm",
        stage: "contacted",
        lastContact: "1 day ago",
        nextAction: "Send property list",
    },
    {
        id: "3",
        name: "David Williams",
        email: "david@example.com",
        phone: "(310) 555-0102",
        budget: 2500000,
        interests: ["West Hollywood", "Condo", "2 Beds"],
        score: "warm",
        stage: "new",
        lastContact: "3 days ago",
        nextAction: "Follow up call",
    },
    {
        id: "4",
        name: "Jennifer Davis",
        email: "jennifer@example.com",
        phone: "(310) 555-0103",
        budget: 4000000,
        interests: ["Malibu", "Beachfront", "4+ Beds"],
        score: "cold",
        stage: "lost",
        lastContact: "1 week ago",
        nextAction: "Nurture campaign",
    },
    {
        id: "5",
        name: "Robert Lang",
        email: "robert@example.com",
        phone: "(310) 555-0104",
        budget: 6200000,
        interests: ["Pasadena", "Estate", "5+ Beds"],
        score: "hot",
        stage: "new",
        lastContact: "20 minutes ago",
        nextAction: "Send private listing preview",
    },
];

export const leadTips: Step[] = [
    {
        title: "Respond fast to hot leads",
        description:
            "Contact hot leads within 24 hours with personalized property suggestions.",
    },
    {
        title: "Nurture warm leads",
        description:
            "Send warm leads monthly market reports and new listing alerts.",
    },
    {
        title: "Keep cold leads engaged",
        description:
            "Establish a nurture campaign with educational content for cold leads.",
    },
];

export const LEAD_STAGE_FILTERS: { id: LeadStageFilter; label: string }[] = [
    { id: "all", label: "All" },
    ...STAGES.map((stage) => ({ id: stage.id, label: stage.label })),
];

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;
