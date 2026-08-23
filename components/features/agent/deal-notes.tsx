"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DealNotesProps {
    notes: string;
}

export function DealNotes({ notes }: DealNotesProps) {
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
        </div>
    );
}

DealNotes.displayName = "DealNotes";
