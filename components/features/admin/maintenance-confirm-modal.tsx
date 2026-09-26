"use client";

import { ConfirmModal } from "@/components/patterns/confirm-modal";
import type { MaintenanceAction } from "@/lib/data/admin-settings";

const WARNING_TITLE = "This cannot be undone";
const FAILURE_BODY = "Nothing was changed. Try again in a moment.";

export interface MaintenanceConfirmModalProps {
    action: MaintenanceAction | null;
    pending: boolean;
    failed: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function MaintenanceConfirmModal({
    action,
    pending,
    failed,
    onClose,
    onConfirm,
}: MaintenanceConfirmModalProps) {
    return (
        <ConfirmModal
            open={action !== null}
            title={action?.confirmTitle ?? ""}
            warning={{ title: WARNING_TITLE, body: action?.confirmLede }}
            failure={{ title: action?.failure ?? "", body: FAILURE_BODY }}
            confirmLabel={action?.label ?? ""}
            tone={action?.danger ? "error" : "accent"}
            pending={pending}
            failed={failed}
            onClose={onClose}
            onConfirm={onConfirm}
        />
    );
}

MaintenanceConfirmModal.displayName = "MaintenanceConfirmModal";
