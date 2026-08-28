"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { FormField } from "@/components/ui/forms/form-field";
import { TextareaField } from "@/components/ui/forms/textarea-field";
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
} from "@/components/ui/modal";
import {
    OFFER_RESPONSE_COPY,
    OFFER_RESPONSE_FIELDS as FIELDS,
    type OfferResponseAction,
} from "@/lib/config/offer-response";
import type { OfferRequestItem } from "@/lib/types";
import { formatUsd, toDigits } from "@/lib/utils";

export interface OfferResponse {
    responsePrice?: number;
    responseFeedback?: string;
}

export interface OfferResponseModalProps {
    action: OfferResponseAction | null;
    request?: OfferRequestItem;
    pending: boolean;
    failed: boolean;
    onClose: () => void;
    onSubmit: (response: OfferResponse) => void;
}

export function OfferResponseModal({
    action,
    request,
    pending,
    failed,
    onClose,
    onSubmit,
}: OfferResponseModalProps) {
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");

    const copy = action ? OFFER_RESPONSE_COPY[action] : null;
    const counterValue = Number(toDigits(amount));
    const ready = action !== "counter" || counterValue > 0;

    const close = () => {
        setAmount("");
        setNote("");
        onClose();
    };

    return (
        <Modal
            open={action !== null && request !== undefined}
            onOpenChange={(next) => {
                if (!next) close();
            }}
        >
            <ModalHeader className="p-4">
                <ModalTitle>{copy?.title}</ModalTitle>
            </ModalHeader>

            <ModalBody className="space-y-3 p-4">
                <div>
                    <p className="text-text text-xs font-semibold">
                        {request?.buyerName} ·{" "}
                        {formatUsd(request?.offeredPrice ?? 0)}
                    </p>
                    <p className="text-text-secondary mt-0.5 text-xs">
                        {copy?.lede}
                    </p>
                </div>

                {action === "counter" && (
                    <FormField
                        name="counter-amount"
                        label={FIELDS.price}
                        variant="numeric"
                        inputMode="numeric"
                        value={amount && formatUsd(counterValue)}
                        placeholder={formatUsd(request?.listPrice ?? 0)}
                        onChange={(event) => setAmount(event.target.value)}
                    />
                )}

                <TextareaField
                    name="response-note"
                    label={FIELDS.note}
                    rows={3}
                    value={note}
                    placeholder={FIELDS.notePlaceholder}
                    onChange={(event) => setNote(event.target.value)}
                />

                {failed && (
                    <Callout
                        variant="error"
                        title={FIELDS.failed}
                        description={FIELDS.retry}
                    />
                )}
            </ModalBody>

            <ModalFooter className="p-4">
                <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={close}
                >
                    {FIELDS.cancel}
                </Button>
                <Button
                    type="button"
                    variant={action === "decline" ? "danger" : "primary"}
                    size="sm"
                    isLoading={pending}
                    disabled={!ready}
                    onClick={() =>
                        onSubmit({
                            responsePrice:
                                action === "counter" ? counterValue : undefined,
                            responseFeedback: note.trim() || undefined,
                        })
                    }
                >
                    {copy?.confirm}
                </Button>
            </ModalFooter>
        </Modal>
    );
}

OfferResponseModal.displayName = "OfferResponseModal";
