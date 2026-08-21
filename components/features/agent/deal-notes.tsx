"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { COLLAPSE_MOTION } from "@/lib/config/motion";
import { cn } from "@/lib/utils";

const NEXT_PREFIX = "Next: ";

export interface DealNotesProps {
    notes: string;
    nextStep: string;
}

export function DealNotes({ notes, nextStep }: DealNotesProps) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="border-border border-t pt-3">
            <button
                type="button"
                aria-expanded={expanded}
                onClick={() => setExpanded((prev) => !prev)}
                className="group ease-smooth focus-visible:ring-accent flex w-full items-start gap-1.5 rounded-md text-left transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
            >
                <ChevronDown
                    size={12}
                    strokeWidth={1.5}
                    className={cn(
                        "text-text-muted ease-smooth mt-0.5 shrink-0 transition-transform duration-200",
                        expanded && "rotate-180",
                    )}
                />
                <span
                    className={cn(
                        "text-text-secondary group-hover:text-text text-xs",
                        !expanded && "truncate",
                    )}
                >
                    {notes}
                </span>
            </button>

            <AnimatePresence initial={false}>
                {expanded && (
                    <m.div
                        key="next"
                        {...COLLAPSE_MOTION}
                        className="overflow-hidden"
                    >
                        <p className="text-text mt-2 text-xs">
                            <span className="text-text-secondary">
                                {NEXT_PREFIX}
                            </span>
                            <span className="font-medium">{nextStep}</span>
                        </p>
                    </m.div>
                )}
            </AnimatePresence>
        </div>
    );
}

DealNotes.displayName = "DealNotes";
