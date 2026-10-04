"use client";

import { Scale } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { PortalHeader } from "@/components/patterns/portal-header";
import { FilterPills } from "@/components/patterns/filter-pills";
import { DisputeDecisionModal } from "@/components/features/admin/dispute-decision-modal";
import { DisputeQueueRail } from "@/components/features/admin/dispute-queue-rail";
import { DisputeReviewPane } from "@/components/features/admin/dispute-review-pane";
import { ConsoleSkeleton } from "@/components/patterns/console-skeleton";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import { DISPUTE_FILTERS } from "@/lib/data/admin-disputes";
import { useDisputeQueue } from "@/lib/hooks/use-dispute-queue";

const TITLE = "Disputes";
const EMPTY_TITLE = "Queue clear";
const EMPTY_LEDE = "No disputes match this filter.";

export function AdminDisputesConsole() {
    const queue = useDisputeQueue();
    const { counts, active } = queue;

    if (queue.failed)
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.adminDisputes}
                onRetry={() => void queue.refetch()}
            />
        );

    if (queue.pending) return <ConsoleSkeleton variant="review" />;

    return (
        <div className="space-y-3">
            <PortalHeader
                title={TITLE}
                lede={`${counts.OPEN} open · ${counts.PENDING_REVIEW} in review · ${counts.RESOLVED} resolved`}
            />

            <FilterPills
                filters={DISPUTE_FILTERS}
                active={queue.filter}
                onChange={queue.changeFilter}
                counts={counts}
            />

            <div className="review-split items-start gap-3">
                <div className="review-rail">
                    <DisputeQueueRail
                        disputes={queue.visible}
                        selectedId={active?.id ?? null}
                        onSelect={queue.setSelectedId}
                    />
                </div>

                {active ? (
                    <DisputeReviewPane
                        dispute={active}
                        busy={queue.settling}
                        onAction={(mode) => queue.openDecision(mode, active.id)}
                    />
                ) : (
                    <EmptyState
                        icon={Scale}
                        title={EMPTY_TITLE}
                        description={EMPTY_LEDE}
                    />
                )}
            </div>

            <DisputeDecisionModal
                decision={queue.decision}
                subjectTitle={queue.subjectTitle}
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
