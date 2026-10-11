"use client";

import { ShieldCheck } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { VerificationApproveModal } from "@/components/features/admin/verification-approve-modal";
import { VerificationDecisionModal } from "@/components/features/admin/verification-decision-modal";
import { VerificationReviewPane } from "@/components/features/admin/verification-review-pane";
import { ConsoleSkeleton } from "@/components/patterns/console-skeleton";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { ReviewQueue } from "@/components/patterns/review-queue";
import { AdminVerificationHeader } from "@/components/sections/admin/admin-verification-header";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import {
    VERIFICATION_COPY,
    verificationQueueItems,
    verificationReading,
} from "@/lib/data/admin-verifications";
import { useVerificationQueue } from "@/lib/hooks/use-verification-queue";

export function AdminVerificationConsole() {
    const queue = useVerificationQueue();
    const { active } = queue;

    if (queue.failed)
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.adminVerifications}
                onRetry={() => void queue.refetch()}
            />
        );

    if (queue.pending) return <ConsoleSkeleton variant="casework" />;

    return (
        <div className="space-y-4">
            <AdminVerificationHeader
                reading={verificationReading(queue.items)}
                filter={queue.filter}
                counts={queue.counts}
                onFilterChange={queue.changeFilter}
            />

            {active ? (
                <div className="review-split review-split--slim items-start gap-3">
                    <div className="review-rail">
                        <ReviewQueue
                            items={verificationQueueItems(
                                queue.visible,
                                queue.filter === "all",
                            )}
                            selectedId={active.id}
                            onSelect={queue.setSelectedId}
                        />
                    </div>
                    <div className="review-pane">
                        <VerificationReviewPane
                            request={active}
                            approving={queue.approvingId === active.id}
                            busy={queue.busy}
                            onAction={(mode) =>
                                queue.runAction(mode, active.id)
                            }
                        />
                    </div>
                </div>
            ) : (
                <EmptyState
                    icon={ShieldCheck}
                    title={VERIFICATION_COPY.emptyTitle}
                    description={VERIFICATION_COPY.emptyLede}
                />
            )}

            <VerificationApproveModal
                open={queue.approval.open}
                applicantName={queue.approvalName}
                pending={queue.approval.pending}
                failed={queue.approval.failed}
                onClose={queue.approval.dismiss}
                onConfirm={queue.submitApproval}
            />

            <VerificationDecisionModal
                decision={queue.decision}
                applicantName={queue.applicantName}
                note={queue.note}
                pending={queue.deciding}
                failed={queue.decisionFailed}
                onNoteChange={queue.setNote}
                onClose={queue.closeDecision}
                onSubmit={queue.submitDecision}
            />
        </div>
    );
}

AdminVerificationConsole.displayName = "AdminVerificationConsole";
