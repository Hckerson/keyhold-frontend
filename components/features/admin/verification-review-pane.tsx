"use client";

import { Avatar } from "@/components/ui/avatar";
import { VerificationDecisionBar } from "@/components/features/admin/verification-decision-bar";
import { VerificationEvidence } from "@/components/features/admin/verification-evidence";
import { FactList } from "@/components/patterns/fact-list";
import { ReviewPaneHeader } from "@/components/patterns/review-pane-header";
import { ReviewOutcome } from "@/components/patterns/review-outcome";
import { ADMIN_ROUTES } from "@/lib/constants";
import {
    VERIFICATION_COPY,
    applicantFacts,
    applicantLine,
    documentFacts,
    verificationOutcome,
} from "@/lib/data/admin-verifications";
import { initialsOf } from "@/lib/utils";
import type { VerificationActionMode, VerificationRequest } from "@/lib/types";

export interface VerificationReviewPaneProps {
    request: VerificationRequest;
    approving: boolean;
    busy: boolean;
    onAction: (mode: VerificationActionMode) => void;
}

export function VerificationReviewPane({
    request,
    approving,
    busy,
    onAction,
}: VerificationReviewPaneProps) {
    return (
        <section className="bg-background border-border @container overflow-hidden rounded-xl border shadow-sm">
            <ReviewPaneHeader
                title={request.name}
                caption={applicantLine(request)}
                href={ADMIN_ROUTES.user(request.userId)}
                linkLabel={VERIFICATION_COPY.profile}
                lead={
                    <Avatar
                        size="sm"
                        tone="accent"
                        elevated={false}
                        initials={initialsOf(request.name)}
                    />
                }
            />

            <div className="flex flex-col gap-5 p-4">
                <VerificationEvidence request={request} />
                <div className="grid gap-x-8 gap-y-5 @xl:grid-cols-2">
                    <FactList
                        title={VERIFICATION_COPY.documentHeading}
                        facts={documentFacts(request)}
                    />
                    <FactList
                        title={VERIFICATION_COPY.applicantHeading}
                        facts={applicantFacts(request)}
                    />
                </div>
            </div>

            {request.status === "PENDING" ? (
                <VerificationDecisionBar
                    request={request}
                    approving={approving}
                    busy={busy}
                    onAction={onAction}
                />
            ) : (
                <ReviewOutcome outcome={verificationOutcome(request)} />
            )}
        </section>
    );
}

VerificationReviewPane.displayName = "VerificationReviewPane";
