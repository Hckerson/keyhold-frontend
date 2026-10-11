"use client";

import { ConfirmModal } from "@/components/patterns/confirm-modal";
import { FLAG_DECISION_COPY } from "@/lib/config/flag-tones";
import { subjectOf } from "@/lib/data/admin-flags";
import type { FlagReport, FlagSettleMode } from "@/lib/types";

const FAILURE = {
    title: "The decision was not recorded",
    body: "The report is still open. Try again in a moment.",
};

export interface FlagDecisionModalProps {
    mode?: FlagSettleMode;
    report?: FlagReport;
    pending: boolean;
    failed: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function FlagDecisionModal({
    mode,
    report,
    pending,
    failed,
    onClose,
    onConfirm,
}: FlagDecisionModalProps) {
    const copy = FLAG_DECISION_COPY[mode ?? "resolve"];

    return (
        <ConfirmModal
            open={mode !== undefined && report !== undefined}
            title={copy.title}
            subject={report && `${subjectOf(report)} · ${report.reason}`}
            warning={copy.warning}
            failure={FAILURE}
            confirmLabel={copy.submit}
            tone="accent"
            pending={pending}
            failed={failed}
            onClose={onClose}
            onConfirm={onConfirm}
        />
    );
}

FlagDecisionModal.displayName = "FlagDecisionModal";
