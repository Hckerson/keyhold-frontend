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
                link={{
                    href: ADMIN_ROUTES.user(request.userId),
                    label: VERIFICATION_COPY.profile,
                }}
                lead={
                    <Avatar
                        size="sm"
                        tone="accent"
                        elevated={false}
                        initials={initialsOf(request.name)}
                    />
                }
            />

            <div className="grid gap-x-6 gap-y-5 p-4 @2xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
                <VerificationEvidence request={request} />
                <div className="flex min-w-0 flex-col gap-5">
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
