"use client";

import { AnimatePresence, m } from "motion/react";
import { ENTRY_MOTION } from "@/lib/config/motion";
import { cn, formatUsd } from "@/lib/utils";
import type { TimelineEntry, TimelineTone } from "@/lib/types";

const dotTone: Record<TimelineTone, string> = {
    neutral: "bg-border-dark",
    success: "bg-accent",
    warning: "bg-quiet",
    info: "bg-quiet",
    error: "bg-error",
};

export interface TimelineListProps {
    entries: TimelineEntry[];
}

export function TimelineList({ entries }: TimelineListProps) {
    return (
        <ol className="space-y-3">
            <AnimatePresence initial={false}>
                {entries.map((entry, index) => (
                    <m.li
                        key={entry.id}
                        {...ENTRY_MOTION}
                        className="group flex gap-3"
                    >
                        <span className="relative flex flex-col items-center">
                            <span
                                className={cn(
                                    "mt-1 size-2 shrink-0 rounded-full",
                                    dotTone[entry.tone],
                                )}
                            />
                            {index < entries.length - 1 && (
                                <span className="bg-border-light mt-1 w-px flex-1" />
                            )}
                        </span>
                        <div className="min-w-0 flex-1 pb-1">
                            <p className="text-text text-xs font-medium">
                                {entry.label}
                            </p>
                            <p className="text-text-muted text-xs tabular-nums opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                {entry.date} · {entry.time}
                            </p>
                            {entry.amount !== undefined && (
                                <p className="text-text mt-0.5 text-xs font-medium tabular-nums">
                                    {formatUsd(entry.amount)}
                                </p>
                            )}
                            {entry.note && (
                                <p className="text-text-secondary mt-0.5 text-xs">
                                    {entry.note}
                                </p>
                            )}
                        </div>
                    </m.li>
                ))}
            </AnimatePresence>
        </ol>
    );
}
