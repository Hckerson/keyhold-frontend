"use client";

import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { EmptyState, type EmptyStateProps } from "@/components/ui/empty-state";
import { ReviewQueue } from "@/components/patterns/review-queue";
import type { ReviewQueueItem } from "@/lib/types";

export interface ReviewSplitProps {
    items: ReviewQueueItem[];
    selectedId?: string;
    onSelect: (id: string) => void;
    empty: Pick<EmptyStateProps, "icon" | "title" | "description">;
    children: ReactNode;
}

export function ReviewSplit({
    items,
    selectedId,
    onSelect,
    empty,
    children,
}: ReviewSplitProps) {
    const rail = useRef<HTMLDivElement>(null);
    const pane = useRef<HTMLDivElement>(null);
    const still = useReducedMotion();

    if (!selectedId) return <EmptyState {...empty} />;

    const reveal = () => {
        const queue = rail.current;
        const detail = pane.current;
        if (!queue || !detail || detail.offsetTop <= queue.offsetTop) return;
        detail.scrollIntoView({
            block: "start",
            behavior: still ? "auto" : "smooth",
        });
    };

    return (
        <div className="review-split items-start gap-3">
            <div ref={rail} className="review-rail">
                <ReviewQueue
                    items={items}
                    selectedId={selectedId}
                    onSelect={onSelect}
                    onPick={reveal}
                />
            </div>
            <div ref={pane} className="review-pane">
                {children}
            </div>
        </div>
    );
}

ReviewSplit.displayName = "ReviewSplit";
