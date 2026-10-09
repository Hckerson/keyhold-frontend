"use client";

import { AnimatePresence, m } from "motion/react";
import { ReviewQueueRow } from "@/components/patterns/review-queue-row";
import { LIST_ROW_MOTION } from "@/lib/config/motion";
import type { ReviewQueueItem } from "@/lib/types";

export interface ReviewQueueProps {
    items: ReviewQueueItem[];
    selectedId: string;
    onSelect: (id: string) => void;
}

export function ReviewQueue({ items, selectedId, onSelect }: ReviewQueueProps) {
    return (
        <ul className="bg-background border-border divide-border-light divide-y overflow-hidden rounded-xl border shadow-sm">
            <AnimatePresence initial={false}>
                {items.map((item) => (
                    <m.li
                        key={item.id}
                        {...LIST_ROW_MOTION}
                        className="overflow-hidden"
                    >
                        <ReviewQueueRow
                            item={item}
                            selected={item.id === selectedId}
                            onSelect={onSelect}
                        />
                    </m.li>
                ))}
            </AnimatePresence>
        </ul>
    );
}

ReviewQueue.displayName = "ReviewQueue";
