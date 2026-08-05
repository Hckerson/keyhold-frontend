"use client";

import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
} from "@/components/ui/modal";
import { MetricCell } from "@/components/patterns/metric-cell";
import { AgeMark } from "@/components/features/admin/age-mark";
import { ComplianceCheckList } from "@/components/features/admin/compliance-check-list";
import { ComplianceMeter } from "@/components/features/admin/compliance-meter";
import { ModerationAgentContact } from "@/components/features/admin/moderation-agent-contact";
import { ModerationPhotoStrip } from "@/components/features/admin/moderation-photo-strip";
import { ModerationStatusMark } from "@/components/features/admin/moderation-status-mark";
import { ReportCountMark } from "@/components/features/admin/report-count-mark";
import { MODERATION_STATUSES } from "@/lib/config/moderation-tones";
import {
    CHECK_COUNT_LABEL,
    complianceScore,
    submittedAt,
} from "@/lib/data/admin-listings";
import { formatMillions } from "@/lib/utils";
import type { DecisionMode, ModerationListing } from "@/lib/types";

const SUBMITTED_FORMAT = "MMM d · h:mm a";
const ASK_LABEL = "Asking";
const COMPLIANCE_LABEL = "Compliance";
const REPORTS_LABEL = "Reports";
const QUEUE_LABEL = "In queue";
const SUBMITTED_LABEL = "Submitted";
const PHOTOS_LABEL = "Photos";
const DESCRIPTION_LABEL = "Description";
const CHECKS_LABEL = "Compliance checks";
const AGENT_LABEL = "Submitting agent";
const APPROVE_ACTION = "Approve";
const CHANGES_ACTION = "Request Changes";
const REJECT_ACTION = "Reject";
const CLOSE_ACTION = "Close";

export interface ModerationReviewModalProps {
    listing?: ModerationListing;
    onClose: () => void;
    onApprove: (id: string) => void;
    onDecide: (mode: DecisionMode, id: string) => void;
}

export function ModerationReviewModal({
    listing,
    onClose,
    onApprove,
    onDecide,
}: ModerationReviewModalProps) {
    return (
        <Modal
            open={listing !== undefined}
            onOpenChange={(next) => {
                if (!next) onClose();
            }}
            className="max-w-2xl"
        >
            {listing && (
                <>
                    <ModalHeader className="p-4">
                        <ModalTitle>
                            {listing.address}, {listing.locality}
                        </ModalTitle>
                        <div className="mt-1 flex items-center gap-2">
                            <ModerationStatusMark status={listing.status} />
                            <span className="micro-label">
                                {CHECK_COUNT_LABEL}
                            </span>
                        </div>
                    </ModalHeader>

                    <ModalBody className="scroll-y max-h-[60vh] space-y-4 p-4">
                        <div className="bg-background border-border-light grid grid-cols-2 gap-3 rounded-md border p-3 sm:grid-cols-5">
                            <MetricCell label={ASK_LABEL}>
                                <span className="tabular-nums">
                                    {formatMillions(listing.price, 2)}
                                </span>
                            </MetricCell>
                            <MetricCell label={COMPLIANCE_LABEL}>
                                <ComplianceMeter
                                    score={complianceScore(listing)}
                                    label={listing.address}
                                    className="justify-start"
                                />
                            </MetricCell>
                            <MetricCell label={REPORTS_LABEL}>
                                <ReportCountMark reports={listing.reports} />
                            </MetricCell>
                            <MetricCell label={QUEUE_LABEL}>
                                <AgeMark minutes={listing.queuedMinutes} />
                            </MetricCell>
                            <MetricCell label={SUBMITTED_LABEL}>
                                <span className="truncate tabular-nums">
                                    {format(
                                        submittedAt(listing),
                                        SUBMITTED_FORMAT,
                                    )}
                                </span>
                            </MetricCell>
                        </div>

                        {listing.note && (
                            <Callout
                                variant={
                                    MODERATION_STATUSES[listing.status].noteTone
                                }
                                title={
                                    MODERATION_STATUSES[listing.status]
                                        .noteTitle
                                }
                                description={listing.note}
                            />
                        )}

                        <div>
                            <p className="micro-label">
                                {PHOTOS_LABEL} · {listing.photos.length}
                            </p>
                            <div className="mt-1.5">
                                <ModerationPhotoStrip
                                    photos={listing.photos}
                                    address={listing.address}
                                />
                            </div>
                        </div>

                        <div>
                            <p className="micro-label">{DESCRIPTION_LABEL}</p>
                            <p className="text-text-secondary mt-1.5 text-xs leading-relaxed">
                                {listing.description}
                            </p>
                        </div>

                        <div>
                            <p className="micro-label">{CHECKS_LABEL}</p>
                            <div className="mt-1.5">
                                <ComplianceCheckList
                                    compliance={listing.compliance}
                                />
                            </div>
                        </div>

                        <div>
                            <p className="micro-label">{AGENT_LABEL}</p>
                            <div className="mt-1.5">
                                <ModerationAgentContact agent={listing.agent} />
                            </div>
                        </div>
                    </ModalBody>

                    <ModalFooter className="gap-2 p-4">
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={onClose}
                        >
                            {CLOSE_ACTION}
                        </Button>
                        {listing.status !== "rejected" && (
                            <Button
                                type="button"
                                variant="outline-danger"
                                size="sm"
                                onClick={() => onDecide("reject", listing.id)}
                            >
                                {REJECT_ACTION}
                            </Button>
                        )}
                        <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={() => onDecide("changes", listing.id)}
                        >
                            {CHANGES_ACTION}
                        </Button>
                        {listing.status !== "approved" && (
                            <Button
                                type="button"
                                variant="primary"
                                size="sm"
                                onClick={() => onApprove(listing.id)}
                            >
                                {APPROVE_ACTION}
                            </Button>
                        )}
                    </ModalFooter>
                </>
            )}
        </Modal>
    );
}

ModerationReviewModal.displayName = "ModerationReviewModal";
