"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { SummaryRow } from "@/components/ui/summary-row";
import { StatusBadge } from "@/components/ui/status-badge";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import { SurveyResult } from "@/components/features/dashboard/survey-result";
import { formatViewingDate } from "@/components/features/dashboard/viewing-row";
import { cn } from "@/lib/utils";
import type { PastViewing } from "@/lib/data/viewings";

export interface PastViewingsAccordionProps {
    viewings: PastViewing[];
}

export function PastViewingsAccordion({
    viewings,
}: PastViewingsAccordionProps) {
    const [openPastId, setOpenPastId] = useState<string | null>(null);

    return (
        <Panel title="Past Viewings" count={viewings.length}>
            <Accordion>
                {viewings.map((past) => {
                    const isOpen = openPastId === past.id;
                    return (
                        <AccordionItem key={past.id} value={past.id}>
                            <AccordionTrigger
                                aria-expanded={isOpen}
                                className="px-3 py-2 text-xs"
                                onClick={() =>
                                    setOpenPastId(isOpen ? null : past.id)
                                }
                            >
                                <span className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
                                    <span className="text-text truncate text-xs font-medium">
                                        {past.address}
                                    </span>
                                    <span className="text-text-muted text-xs tabular-nums">
                                        {formatViewingDate(past.date)} at{" "}
                                        {past.time}
                                    </span>
                                    <StatusBadge
                                        tone={
                                            past.survey ? "success" : "neutral"
                                        }
                                    >
                                        {past.survey
                                            ? "Survey submitted"
                                            : "No survey"}
                                    </StatusBadge>
                                </span>
                                <ChevronDown
                                    size={12}
                                    strokeWidth={1.5}
                                    className={cn(
                                        "text-text-muted ease-smooth ml-2 shrink-0 transition-transform duration-200",
                                        isOpen && "rotate-180",
                                    )}
                                />
                            </AccordionTrigger>
                            {isOpen && (
                                <AccordionContent className="px-3 py-2">
                                    <div className="space-y-2">
                                        <SummaryRow
                                            label="Agent"
                                            value={past.agent}
                                        />
                                        {past.survey ? (
                                            <SurveyResult
                                                survey={past.survey}
                                            />
                                        ) : (
                                            <p className="text-text-secondary text-xs">
                                                You have not submitted a survey
                                                for this viewing yet.
                                            </p>
                                        )}
                                        <div className="flex gap-2 pt-1">
                                            <Link href="/dashboard/messages">
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                >
                                                    Message agent
                                                </Button>
                                            </Link>
                                            <Link href="/search">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                >
                                                    Book again
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </AccordionContent>
                            )}
                        </AccordionItem>
                    );
                })}
            </Accordion>
        </Panel>
    );
}

PastViewingsAccordion.displayName = "PastViewingsAccordion";
