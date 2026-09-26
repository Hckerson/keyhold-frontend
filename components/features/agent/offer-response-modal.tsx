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
    const open = action !== null && request !== undefined;
    const [wasOpen, setWasOpen] = useState(open);
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");

    if (open !== wasOpen) {
        setWasOpen(open);
        if (open) {
            setAmount("");
            setNote("");
        }
    }

    const copy = action ? OFFER_RESPONSE_COPY[action] : null;
    const lede = copy && request ? copy.lede(request.address) : undefined;
    const counterValue = Number(toDigits(amount));
    const ready = action !== "counter" || counterValue > 0;

    return (
        <Modal
            open={open}
            locked={pending}
            onOpenChange={(next) => {
                if (!next) onClose();
            }}
        >
            <ModalHeader>
                <ModalTitle>{copy?.title}</ModalTitle>
                {request && (
                    <p className="text-text-secondary mt-1 truncate text-xs">
                        {request.address}, {request.locality}
                    </p>
                )}
            </ModalHeader>

            <ModalBody className="space-y-3">
                <p className="text-text text-xs font-semibold">
                    {request?.buyerName} ·{" "}
                    {formatUsd(request?.offeredPrice ?? 0)}
                </p>

                {failed ? (
                    <Callout
                        variant="error"
                        title={FIELDS.failed}
                        description={FIELDS.retry}
                    />
                ) : copy?.final ? (
                    <Callout
                        variant="warning"
                        title={copy.final}
                        description={lede}
                    />
                ) : (
                    <p className="text-text-secondary text-xs">{lede}</p>
                )}

                {action === "counter" && (
                    <FormField
                        name="counter-amount"
                        label={FIELDS.price}
                        variant="numeric"
                        inputMode="numeric"
                        value={amount && formatUsd(counterValue)}
                        placeholder={formatUsd(request?.listPrice ?? 0)}
                        disabled={pending}
                        onChange={(event) => setAmount(event.target.value)}
                    />
                )}

                <TextareaField
                    name="response-note"
                    label={FIELDS.note}
                    rows={3}
                    value={note}
                    placeholder={FIELDS.notePlaceholder}
                    disabled={pending}
                    onChange={(event) => setNote(event.target.value)}
                />
            </ModalBody>

            <ModalFooter>
                <Button type="button" disabled={pending} onClick={onClose}>
                    {FIELDS.cancel}
                </Button>
                <Button
                    type="button"
                    emphasis="solid"
                    tone={action === "counter" ? "accent" : "error"}
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
