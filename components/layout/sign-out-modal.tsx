"use client";

import { ConfirmModal } from "@/components/patterns/confirm-modal";
import type { useConfirmation } from "@/lib/hooks/use-confirmation";

const TITLE = "Log out";
const CONFIRM = "Log out";
const CANCEL = "Stay signed in";
const SUBJECT = "Unsaved changes on this page are lost.";
const FAILURE = {
    title: "You are still signed in",
    body: "The session could not be ended. Try again in a moment.",
};

export interface SignOutModalProps {
    confirmation: ReturnType<typeof useConfirmation<void, true>>;
}

export function SignOutModal({ confirmation }: SignOutModalProps) {
    return (
        <ConfirmModal
            open={confirmation.open}
            title={TITLE}
            subject={SUBJECT}
            failure={FAILURE}
            cancelLabel={CANCEL}
            confirmLabel={CONFIRM}
            tone="accent"
            pending={confirmation.pending}
            failed={confirmation.failed}
            onClose={confirmation.dismiss}
            onConfirm={() => confirmation.confirm()}
        />
    );
}

SignOutModal.displayName = "SignOutModal";
