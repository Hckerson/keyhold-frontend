"use client";

import { DisputeDecisionBar } from "@/components/features/admin/dispute-decision-bar";
import { DisputeEvidenceList } from "@/components/features/admin/dispute-evidence-list";
import { FactList } from "@/components/patterns/fact-list";
import { ReviewOutcome } from "@/components/patterns/review-outcome";
import { ReviewPaneHeader } from "@/components/patterns/review-pane-header";
import { DISPUTE_STATES } from "@/lib/config/dispute-tones";
import { ADMIN_ROUTES } from "@/lib/constants";
import { DISPUTE_COPY } from "@/lib/data/admin-disputes";
import {
    disputeOutcome,
    partyFacts,
    raisedLine,
    stakeGroups,
} from "@/lib/data/admin-dispute-detail";
import type { DisputeCase, DisputeDecisionMode } from "@/lib/types";

export interface DisputeReviewPaneProps {
    dispute: DisputeCase;
    busy: boolean;
    onAction: (mode: DisputeDecisionMode) => void;
}

export function DisputeReviewPane({
    dispute,
    busy,
    onAction,
}: DisputeReviewPaneProps) {
    return (
        <section className="bg-background border-border @container overflow-hidden rounded-xl border shadow-sm">
            <ReviewPaneHeader
                title={dispute.title}
                caption={raisedLine(dispute)}
                link={{
                    href: ADMIN_ROUTES.user(dispute.initiatorId),
                    label: DISPUTE_COPY.profile,
                }}
            />

            <div className="grid gap-x-6 gap-y-5 p-4 @2xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
                <div className="flex min-w-0 flex-col gap-5">
                    <section>
                        <h3 className="micro-label">
                            {DISPUTE_COPY.claimHeading}
                        </h3>
                        <p className="text-text mt-2 max-w-prose text-xs leading-relaxed">
                            {dispute.claim}
                        </p>
                    </section>
                    <DisputeEvidenceList evidence={dispute.evidence} />
                </div>

                <div className="flex min-w-0 flex-col gap-5">
                    {stakeGroups(dispute).map((group) => (
                        <FactList
                            key={group.id}
                            title={DISPUTE_COPY.stakeHeading}
                            facts={group.facts}
                        />
                    ))}
                    <FactList
                        title={DISPUTE_COPY.partyHeading}
                        facts={partyFacts(dispute)}
                    />
                </div>
            </div>

            {DISPUTE_STATES[dispute.status].open ? (
                <DisputeDecisionBar
                    dispute={dispute}
                    busy={busy}
                    onAction={onAction}
                />
            ) : (
                <ReviewOutcome outcome={disputeOutcome(dispute)} />
            )}
        </section>
    );
}

DisputeReviewPane.displayName = "DisputeReviewPane";
