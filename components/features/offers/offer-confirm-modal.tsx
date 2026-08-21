"use client";

import { Button } from "@/components/ui/button";
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
} from "@/components/ui/modal";
import { formatUsd } from "@/lib/utils";

export type OfferConfirmAction = "counter" | "accept";

export interface OfferConfirmModalProps {
    action: OfferConfirmAction | null;
    address: string;
    counterPrice?: number;
    counterValue: number;
    onClose: () => void;
    onAccept: () => void;
    onCounter: () => void;
}

export function OfferConfirmModal({
    action,
    address,
    counterPrice,
    counterValue,
    onClose,
    onAccept,
    onCounter,
}: OfferConfirmModalProps) {
    return (
        <Modal
            open={action !== null}
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
        >
            <ModalHeader>
                <ModalTitle>
                    {action === "accept" && "Accept counter offer"}
                    {action === "counter" && "Submit counter offer"}
                </ModalTitle>
            </ModalHeader>
            <ModalBody>
                <p className="text-text-secondary text-xs">
                    {action === "accept" &&
                        counterPrice !== undefined &&
                        `You are accepting the seller's counter of ${formatUsd(counterPrice)} for ${address}.`}
                    {action === "counter" &&
                        `You are countering at ${formatUsd(counterValue)} for ${address}.`}
                </p>
            </ModalBody>
            <ModalFooter>
                <Button variant="secondary" size="sm" onClick={onClose}>
                    Cancel
                </Button>
                {action === "accept" && (
                    <Button variant="primary" size="sm" onClick={onAccept}>
                        Accept Counter
                    </Button>
                )}
                {action === "counter" && (
                    <Button variant="primary" size="sm" onClick={onCounter}>
                        Send Counter
                    </Button>
                )}
            </ModalFooter>
        </Modal>
    );
}
