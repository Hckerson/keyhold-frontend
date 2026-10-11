"use client";

import { Scale } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { DisputeDecisionModal } from "@/components/features/admin/dispute-decision-modal";
import { DisputeReviewPane } from "@/components/features/admin/dispute-review-pane";
import { ConsoleSkeleton } from "@/components/patterns/console-skeleton";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { ReviewQueue } from "@/components/patterns/review-queue";
import { AdminDisputesHeader } from "@/components/sections/admin/admin-disputes-header";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import {
    DISPUTE_COPY,
    disputeQueueItems,
    disputeReading,
} from "@/lib/data/admin-disputes";
import { useDisputeQueue } from "@/lib/hooks/use-dispute-queue";

export function AdminDisputesConsole() {
    const queue = useDisputeQueue();
    const { active } = queue;

    if (queue.failed)
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.adminDisputes}
                onRetry={() => void queue.refetch()}
            />
        );

    if (queue.pending) return <ConsoleSkeleton variant="casework" />;

    return (
        <div className="space-y-4">
            <AdminDisputesHeader
                reading={disputeReading(queue.disputes)}
                filter={queue.filter}
                counts={queue.counts}
                onFilterChange={queue.changeFilter}
            />

            {active ? (
                <div className="review-split review-split--slim items-start gap-3">
                    <div className="review-rail">
                        <ReviewQueue
                            items={disputeQueueItems(
                                queue.visible,
                                queue.filter === "all",
                            )}
                            selectedId={active.id}
                            onSelect={queue.setSelectedId}
                        />
                    </div>
                    <div className="review-pane">
                        <DisputeReviewPane
                            dispute={active}
                            busy={queue.settling}
                            onAction={(mode) =>
                                queue.openDecision(mode, active.id)
                            }
                        />
                    </div>
                </div>
            ) : (
                <EmptyState
                    icon={Scale}
                    title={DISPUTE_COPY.emptyTitle}
                    description={DISPUTE_COPY.emptyLede}
                />
            )}

            <DisputeDecisionModal
                decision={queue.decision}
                dispute={queue.subject}
                note={queue.note}
                pending={queue.settling}
                failed={queue.settleFailed}
                onNoteChange={queue.setNote}
                onClose={queue.closeDecision}
                onSubmit={queue.submitDecision}
            />
        </div>
    );
}

AdminDisputesConsole.displayName = "AdminDisputesConsole";
