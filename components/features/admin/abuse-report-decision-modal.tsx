"use client";

import { ConfirmModal } from "@/components/patterns/confirm-modal";
import {
    FLAG_DECISION_COPY,
    flagTypeMeta,
    type AbuseReport,
    type FlagSettleMode,
} from "@/lib/data/admin-flags";

const WARNING_TITLE = "This decision is final";
const FAILURE = {
    title: "The decision was not recorded",
    body: "The report is still open. Try again in a moment.",
};

export interface AbuseReportDecisionModalProps {
    mode?: FlagSettleMode;
    report?: AbuseReport;
    pending: boolean;
    failed: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function AbuseReportDecisionModal({
    mode,
    report,
    pending,
    failed,
    onClose,
    onConfirm,
}: AbuseReportDecisionModalProps) {
    const copy = FLAG_DECISION_COPY[mode ?? "resolve"];

    return (
        <ConfirmModal
            open={mode !== undefined && report !== undefined}
            title={copy.title}
            subject={
                report &&
                `${flagTypeMeta[report.type].label} · ${report.subject} · ${report.reason}`
            }
            warning={{ title: WARNING_TITLE, body: copy.effect }}
            failure={FAILURE}
            confirmLabel={copy.submit}
            tone={copy.tone}
            pending={pending}
            failed={failed}
            onClose={onClose}
            onConfirm={onConfirm}
        />
    );
}

AbuseReportDecisionModal.displayName = "AbuseReportDecisionModal";
