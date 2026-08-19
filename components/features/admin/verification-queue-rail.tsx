"use client";

import { AnimatePresence, m } from "motion/react";
import { PresenceSwap } from "@/components/patterns/presence-swap";
import { VerificationQueueRow } from "@/components/features/admin/verification-queue-row";
import { LIST_ROW_MOTION } from "@/lib/config/motion";
import type { VerificationRequest } from "@/lib/data/admin-verifications";

export interface VerificationQueueRailProps {
    requests: VerificationRequest[];
    selectedId: string | null;
    onSelect: (id: string) => void;
}

export function VerificationQueueRail({
    requests,
    selectedId,
    onSelect,
}: VerificationQueueRailProps) {
    return (
        <div className="bg-background-muted border-border-light overflow-hidden rounded-xl border shadow-sm">
            <div className="border-border-light flex items-center justify-between gap-2 border-b px-3 py-2">
                <p className="micro-label">Queue</p>
                <span className="text-text-muted font-mono text-[10px] tabular-nums">
                    {requests.length}
                </span>
            </div>

            <PresenceSwap swapKey={requests.length === 0 ? "empty" : "queue"}>
                {requests.length === 0 ? (
                    <p className="text-text-muted px-3 py-10 text-center text-xs">
                        No requests in this view.
                    </p>
                ) : (
                    <ul className="divide-border scroll-y max-h-[32rem] divide-y">
                        <AnimatePresence initial={false}>
                            {requests.map((request) => (
                                <m.li
                                    key={request.id}
                                    {...LIST_ROW_MOTION}
                                    className="overflow-hidden"
                                >
                                    <VerificationQueueRow
                                        request={request}
                                        selected={request.id === selectedId}
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

VerificationQueueRail.displayName = "VerificationQueueRail";
