"use client";

import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
} from "@/components/ui/modal";
import { LISTING_FORM_COPY as COPY } from "@/lib/config/listing-form-copy";

export interface ListingDeleteModalProps {
    address?: string;
    pending: boolean;
    failed: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function ListingDeleteModal({
    address,
    pending,
    failed,
    onClose,
    onConfirm,
}: ListingDeleteModalProps) {
    return (
        <Modal
            open={address !== undefined}
            onOpenChange={(next) => {
                if (!next) onClose();
            }}
        >
            <ModalHeader className="p-4">
                <ModalTitle>{COPY.removeConfirm}</ModalTitle>
            </ModalHeader>

            <ModalBody className="space-y-3 p-4">
                <div>
                    <p className="text-text text-xs font-semibold">{address}</p>
                    <p className="text-text-secondary mt-0.5 text-xs">
                        {COPY.removeConfirmLede}
                    </p>
                </div>

                {failed && (
                    <Callout
                        variant="error"
                        title={COPY.removeFailed}
                        description={COPY.removeFailedLede}
                    />
                )}
            </ModalBody>

            <ModalFooter className="p-4">
                <Button type="button" onClick={onClose}>
                    {COPY.cancel}
                </Button>
                <Button
                    type="button"
                    emphasis="solid"
                    tone="error"
                    isLoading={pending}
                    onClick={onConfirm}
                >
                    {COPY.remove}
                </Button>
            </ModalFooter>
        </Modal>
    );
}

ListingDeleteModal.displayName = "ListingDeleteModal";
