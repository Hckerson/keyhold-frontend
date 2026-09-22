"use client";

import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
} from "@/components/ui/modal";
import type { MaintenanceAction } from "@/lib/data/admin-settings";

const CANCEL_LABEL = "Cancel";
const CALLOUT_TITLE = "This cannot be undone";

export interface MaintenanceConfirmModalProps {
    action: MaintenanceAction | null;
    pending: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function MaintenanceConfirmModal({
    action,
    pending,
    onClose,
    onConfirm,
}: MaintenanceConfirmModalProps) {
    return (
        <Modal
            open={action !== null}
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
            aria-labelledby="maintenance-confirm-title"
        >
            {action && (
                <ModalContent>
                    <ModalHeader>
                        <ModalTitle id="maintenance-confirm-title">
                            {action.confirmTitle}
                        </ModalTitle>
                    </ModalHeader>
                    <ModalBody className="space-y-3">
                        <p className="text-text-secondary text-xs">
                            {action.confirmLede}
                        </p>
                        <Callout
                            variant={action.danger ? "error" : "warning"}
                            title={CALLOUT_TITLE}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            type="button"
                            emphasis="quiet"
                            onClick={onClose}
                            disabled={pending}
                        >
                            {CANCEL_LABEL}
                        </Button>
                        <Button
                            type="button"
                            emphasis="solid"
                            tone={action.danger ? "error" : "accent"}
                            isLoading={pending}
                            onClick={onConfirm}
                        >
                            {action.label}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            )}
        </Modal>
    );
}

MaintenanceConfirmModal.displayName = "MaintenanceConfirmModal";
