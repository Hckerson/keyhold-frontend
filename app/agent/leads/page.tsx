"use client";

import { useMemo, useState } from "react";
import { UserSearch } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Panel } from "@/components/ui/panel";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { StepList, type Step } from "@/components/ui/step-list";
import { ContactRow, type BadgeTone } from "@/components/dashboard/contact-row";
import { cn } from "@/lib/utils";

type LeadScore = "hot" | "warm" | "cold";

type LeadStage = "new" | "contacted" | "qualified" | "lost";

interface Lead {
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

const STAGES: {
    id: LeadStage;
    label: string;
    tone: BadgeTone;
}[] = [
    { id: "new", label: "New", tone: "info" },
    { id: "contacted", label: "Contacted", tone: "warning" },
    { id: "qualified", label: "Qualified", tone: "success" },
    { id: "lost", label: "Lost", tone: "neutral" },
];

const SCORES: Record<
    LeadScore,
    { label: string; variant: "accent" | "warning" | "default" }
> = {
    hot: { label: "Hot", variant: "accent" },
    warm: { label: "Warm", variant: "warning" },
    cold: { label: "Cold", variant: "default" },
};

const NEXT_STAGE: Record<LeadStage, { id: LeadStage; label: string }> = {
    new: { id: "contacted", label: "Mark Contacted" },
    contacted: { id: "qualified", label: "Mark Qualified" },
    qualified: { id: "lost", label: "Mark Lost" },
    lost: { id: "new", label: "Reopen" },
};

const initialLeads: Lead[] = [
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

const tips: Step[] = [
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

const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export default function AgentLeadsPage() {
    const [leads, setLeads] = useState(initialLeads);
    const [stageFilter, setStageFilter] = useState<LeadStage | "all">("all");

    const counts = useMemo(() => {
        const map = { all: leads.length } as Record<LeadStage | "all", number>;
        for (const stage of STAGES) {
            map[stage.id] = leads.filter(
                (lead) => lead.stage === stage.id,
            ).length;
        }
        return map;
    }, [leads]);

    const visible = useMemo(
        () =>
            stageFilter === "all"
                ? leads
                : leads.filter((lead) => lead.stage === stageFilter),
        [leads, stageFilter],
    );

    const score = (value: LeadScore) =>
        leads.filter((lead) => lead.score === value).length;

    const advance = (id: string) =>
        setLeads((prev) =>
            prev.map((lead) =>
                lead.id === id
                    ? { ...lead, stage: NEXT_STAGE[lead.stage].id }
                    : lead,
            ),
        );

    const filters: { id: LeadStage | "all"; label: string }[] = [
        { id: "all", label: "All" },
        ...STAGES.map((stage) => ({ id: stage.id, label: stage.label })),
    ];

    return (
        <div className="space-y-6">
            <PageHeader
                title="Lead Pipeline"
                description={`${score("hot")} hot · ${score("warm")} warm · ${score("cold")} cold`}
                action={
                    <Button variant="primary" size="sm">
                        Add Lead
                    </Button>
                }
            />

            <div className="flex flex-wrap items-center gap-2">
                {filters.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        aria-pressed={stageFilter === item.id}
                        onClick={() => setStageFilter(item.id)}
                        className={cn(
                            "ease-smooth focus-visible:ring-accent inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none",
                            stageFilter === item.id
                                ? "border-accent bg-accent-light text-accent"
                                : "border-border bg-background text-text-secondary hover:text-text hover:border-border-dark",
                        )}
                    >
                        {item.label}
                        <span className="tabular-nums opacity-70">
                            {counts[item.id]}
                        </span>
                    </button>
                ))}
            </div>

            {visible.length > 0 ? (
                <div className="space-y-3">
                    {visible.map((lead) => {
                        const stage = STAGES.find(
                            (item) => item.id === lead.stage,
                        );
                        const nextStage = NEXT_STAGE[lead.stage];
                        return (
                            <ContactRow
                                key={lead.id}
                                contact={{
                                    name: lead.name,
                                    subtitle: `${lead.email} · ${lead.phone}`,
                                    badge: {
                                        label: stage?.label ?? "New",
                                        tone: stage?.tone ?? "info",
                                    },
                                    fields: [
                                        {
                                            label: "Budget",
                                            value: (
                                                <span className="text-xs tabular-nums">
                                                    $
                                                    {(
                                                        lead.budget / 1_000_000
                                                    ).toFixed(2)}
                                                    M
                                                </span>
                                            ),
                                        },
                                        {
                                            label: "Score",
                                            value: (
                                                <Badge
                                                    size="sm"
                                                    variant={
                                                        SCORES[lead.score]
                                                            .variant
                                                    }
                                                >
                                                    {SCORES[lead.score].label}
                                                </Badge>
                                            ),
                                        },
                                        {
                                            label: "Interests",
                                            value: (
                                                <div className="flex flex-wrap gap-1">
                                                    {lead.interests.map(
                                                        (interest) => (
                                                            <span
                                                                key={interest}
                                                                className="bg-accent-light text-accent rounded px-2 py-0.5 text-xs font-normal"
                                                            >
                                                                {interest}
                                                            </span>
                                                        ),
                                                    )}
                                                </div>
                                            ),
                                        },
                                        {
                                            label: "Last Contact",
                                            value: (
                                                <span className="text-xs">
                                                    {lead.lastContact}
                                                </span>
                                            ),
                                        },
                                    ],
                                    nextAction: lead.nextAction,
                                }}
                                actions={
                                    <>
                                        <a
                                            href={telHref(lead.phone)}
                                            className={cn(
                                                buttonVariants({
                                                    variant: "secondary",
                                                    size: "sm",
                                                }),
                                                "w-full sm:w-24",
                                            )}
                                        >
                                            Call
                                        </a>
                                        <a
                                            href={`mailto:${lead.email}`}
                                            className={cn(
                                                buttonVariants({
                                                    variant: "secondary",
                                                    size: "sm",
                                                }),
                                                "w-full sm:w-24",
                                            )}
                                        >
                                            Email
                                        </a>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="w-full sm:w-28"
                                            onClick={() => advance(lead.id)}
                                        >
                                            {nextStage.label}
                                        </Button>
                                    </>
                                }
                            />
                        );
                    })}
                </div>
            ) : (
                <EmptyState
                    icon={UserSearch}
                    title="No leads in this stage"
                    description="Change the filter or capture a new prospect."
                    action={
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => setStageFilter("all")}
                        >
                            Show all leads
                        </Button>
                    }
                />
            )}

            <Panel
                title="Lead Management Tips"
                description="Best practices for converting leads to sales"
            >
                <StepList steps={tips} />
            </Panel>
        </div>
    );
}
