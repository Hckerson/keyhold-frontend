"use client";

import { ConfirmModal } from "@/components/patterns/confirm-modal";

const TITLE = "Approve verification";
const CONFIRM = "Approve identity";
const WARNING = {
    title: "The agent is verified immediately",
    body: "The submission is closed as verified and leaves the pending queue. This decision is final.",
};
const FAILURE = {
    title: "The approval was not recorded",
    body: "The submission is still pending. Try again in a moment.",
};

export interface VerificationApproveModalProps {
    open: boolean;
    applicantName: string;
    pending: boolean;
    failed: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function VerificationApproveModal({
    open,
    applicantName,
    pending,
    failed,
    onClose,
    onConfirm,
}: VerificationApproveModalProps) {
    return (
        <ConfirmModal
            open={open}
            title={TITLE}
            subject={applicantName}
            warning={WARNING}
            failure={FAILURE}
            confirmLabel={CONFIRM}
            tone="accent"
            pending={pending}
            failed={failed}
            onClose={onClose}
            onConfirm={onConfirm}
        />
    );
}

VerificationApproveModal.displayName = "VerificationApproveModal";
