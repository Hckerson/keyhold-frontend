"use client";

import { ShieldCheck } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { FilterPills } from "@/components/patterns/filter-pills";
import { VerificationDecisionModal } from "@/components/features/admin/verification-decision-modal";
import { VerificationQueueRail } from "@/components/features/admin/verification-queue-rail";
import { VerificationReviewPane } from "@/components/features/admin/verification-review-pane";
import { useVerificationQueue } from "@/lib/hooks/use-verification-queue";
import { VERIFICATION_FILTERS } from "@/lib/data/admin-verifications";

const TITLE = "Tier Verifications";

export function AdminVerificationConsole() {
    const queue = useVerificationQueue();
    const { counts, active } = queue;

    return (
        <div className="space-y-3">
            <PageHeader
                title={TITLE}
                description={`${counts.pending} pending · ${counts.approved} approved · ${counts.rejected} rejected`}
            />

            <FilterPills
                filters={VERIFICATION_FILTERS}
                active={queue.filter}
                onChange={queue.changeFilter}
                counts={counts}
            />

            <div className="grid items-start gap-3 lg:grid-cols-[20rem_minmax(0,1fr)]">
                <div className="lg:sticky lg:top-0">
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
                        description="No verification requests match this filter."
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
