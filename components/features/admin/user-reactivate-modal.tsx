"use client";

import { ConfirmModal } from "@/components/patterns/confirm-modal";
import type { ManagedUser } from "@/lib/types";

const TITLE = "Reactivate account";
const CONFIRM = "Reactivate account";
const WARNING = {
    title: "The suspension is lifted now",
    body: "The account can list, bid and transact again straight away. The suspension stays on its record.",
};
const FAILURE = {
    title: "The account was not reactivated",
    body: "It is still suspended. Try again in a moment.",
};

export interface UserReactivateModalProps {
    user?: ManagedUser;
    pending: boolean;
    failed: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function UserReactivateModal({
    user,
    pending,
    failed,
    onClose,
    onConfirm,
}: UserReactivateModalProps) {
    return (
        <ConfirmModal
            open={user !== undefined}
            title={TITLE}
            subject={user && `${user.name} · ${user.email}`}
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

UserReactivateModal.displayName = "UserReactivateModal";
