"use client";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { ContactRow } from "@/components/features/shared/contact-row";
import {
    NEXT_STAGE,
    SCORES,
    STAGES,
    telHref,
    type Lead,
} from "@/lib/data/agent-leads";
import { cn, formatCompactUsd } from "@/lib/utils";

export interface LeadCardProps {
    lead: Lead;
    onAdvance: (id: string) => void;
    className?: string;
}

export function LeadCard({ lead, onAdvance, className }: LeadCardProps) {
    const stage = STAGES.find((item) => item.id === lead.stage);
    const score = SCORES[lead.score];
    const nextStage = NEXT_STAGE[lead.stage];

    return (
        <ContactRow
            className={className}
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
                                {formatCompactUsd(lead.budget)}
                            </span>
                        ),
                    },
                    {
                        label: "Score",
                        value: (
                            <Badge size="sm" variant={score.variant}>
                                {score.label}
                            </Badge>
                        ),
                    },
                    {
                        label: "Interests",
                        value: (
                            <div className="flex flex-wrap gap-1">
                                {lead.interests.map((interest) => (
                                    <span
                                        key={interest}
                                        className="bg-accent-light text-accent rounded px-2 py-0.5 text-xs font-normal"
                                    >
                                        {interest}
                                    </span>
                                ))}
                            </div>
                        ),
                    },
                    {
                        label: "Last Contact",
                        value: (
                            <span className="text-xs">{lead.lastContact}</span>
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
                        onClick={() => onAdvance(lead.id)}
                    >
                        {nextStage.label}
                    </Button>
                </>
            }
        />
    );
}

LeadCard.displayName = "LeadCard";
