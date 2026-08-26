"use client";

import { ShieldCheck } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { PortalHeader } from "@/components/patterns/portal-header";
import { FilterPills } from "@/components/patterns/filter-pills";
import { VerificationDecisionModal } from "@/components/features/admin/verification-decision-modal";
import { VerificationQueueRail } from "@/components/features/admin/verification-queue-rail";
import { VerificationReviewPane } from "@/components/features/admin/verification-review-pane";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import { useVerificationQueue } from "@/lib/hooks/use-verification-queue";
import { VERIFICATION_FILTERS } from "@/lib/data/admin-verifications";

const TITLE = "Identity Verifications";

export function AdminVerificationConsole() {
    const queue = useVerificationQueue();
    const { counts, active } = queue;

    if (queue.failed)
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.adminVerifications}
                onRetry={() => void queue.refetch()}
            />
        );

    return (
        <div className="space-y-3">
            <PortalHeader
                title={TITLE}
                lede={`${counts.PENDING} pending · ${counts.VERIFIED} verified · ${counts.REJECTED} rejected`}
            />

            <FilterPills
                filters={VERIFICATION_FILTERS}
                active={queue.filter}
                onChange={queue.changeFilter}
                counts={counts}
            />

            <div className="review-split items-start gap-3">
                <div className="review-rail">
                    <VerificationQueueRail
                        requests={queue.visible}
                        selectedId={active?.id ?? null}
                        onSelect={queue.setSelectedId}
                    />
                </div>

                {active ? (
                    <VerificationReviewPane
                        request={active}
                        onAction={(mode) => queue.runAction(mode, active.id)}
                    />
                ) : (
                    <EmptyState
                        icon={ShieldCheck}
                        title="Queue clear"
                        description="No identity documents match this filter."
                    />
                )}
            </div>

            <VerificationDecisionModal
                decision={queue.decision}
                applicantName={queue.applicantName}
                note={queue.note}
                onNoteChange={queue.setNote}
                onClose={queue.closeDecision}
                onSubmit={queue.submitDecision}
            />
        </div>
    );
}

AdminVerificationConsole.displayName = "AdminVerificationConsole";
