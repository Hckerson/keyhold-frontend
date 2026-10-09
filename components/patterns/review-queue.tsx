"use client";

import type { KeyboardEvent } from "react";
import { AnimatePresence, m } from "motion/react";
import { ReviewQueueRow } from "@/components/patterns/review-queue-row";
import { LIST_ROW_MOTION } from "@/lib/config/motion";
import { ARROW_STEPS, rovingIndex } from "@/lib/utils/roving";
import type { ReviewQueueItem } from "@/lib/types";

export interface ReviewQueueProps {
    items: ReviewQueueItem[];
    selectedId: string;
    onSelect: (id: string) => void;
}

export function ReviewQueue({ items, selectedId, onSelect }: ReviewQueueProps) {
    const step = (event: KeyboardEvent<HTMLUListElement>) => {
        const delta = ARROW_STEPS[event.key];
        if (delta === undefined) return;
        event.preventDefault();
        const current = items.findIndex((item) => item.id === selectedId);
        const next = rovingIndex(current, delta, items.length);
        onSelect(items[next].id);
        const buttons =
            event.currentTarget.querySelectorAll<HTMLButtonElement>("button");
        buttons[next]?.focus();
    };

    return (
        <ul
            onKeyDown={step}
            className="bg-background border-border divide-border-light divide-y overflow-hidden rounded-xl border shadow-sm"
        >
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
