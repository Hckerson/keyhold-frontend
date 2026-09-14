"use client";

import { AnimatePresence, m } from "motion/react";
import { PresenceSwap } from "@/components/patterns/presence-swap";
import { DisputeQueueRow } from "@/components/features/admin/dispute-queue-row";
import { LIST_ROW_MOTION } from "@/lib/config/motion";
import type { DisputeCase } from "@/lib/data/admin-disputes";

const RAIL_LABEL = "Queue";
const EMPTY_LEDE = "No disputes in this view.";

export interface DisputeQueueRailProps {
    disputes: DisputeCase[];
    selectedId: string | null;
    onSelect: (id: string) => void;
}

export function DisputeQueueRail({
    disputes,
    selectedId,
    onSelect,
}: DisputeQueueRailProps) {
    return (
        <div className="bg-background-muted border-border-light overflow-hidden rounded-xl border shadow-sm">
            <div className="border-border-light flex items-center justify-between gap-2 border-b px-3 py-2">
                <p className="micro-label">{RAIL_LABEL}</p>
                <span className="text-text-muted font-mono text-[10px] tabular-nums">
                    {disputes.length}
                </span>
            </div>

            <PresenceSwap swapKey={disputes.length === 0 ? "empty" : "queue"}>
                {disputes.length === 0 ? (
                    <p className="text-text-muted px-3 py-10 text-center text-xs">
                        {EMPTY_LEDE}
                    </p>
                ) : (
                    <ul className="divide-border scroll-y max-h-[32rem] divide-y">
                        <AnimatePresence initial={false}>
                            {disputes.map((dispute) => (
                                <m.li
                                    key={dispute.id}
                                    {...LIST_ROW_MOTION}
                                    className="overflow-hidden"
                                >
                                    <DisputeQueueRow
                                        dispute={dispute}
                                        selected={dispute.id === selectedId}
                                        onSelect={onSelect}
                                    />
                                </m.li>
                            ))}
                        </AnimatePresence>
                    </ul>
                )}
            </PresenceSwap>
        </div>
    );
}

DisputeQueueRail.displayName = "DisputeQueueRail";
