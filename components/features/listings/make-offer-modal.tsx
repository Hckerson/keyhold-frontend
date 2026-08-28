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
import { StatusDot } from "@/components/patterns/status-dot";
import { OFFER_REQUEST_COPY as COPY } from "@/lib/config/offer-request";
import { GAP_BANDS, gapBandOf } from "@/lib/config/offer-tones";
import { OFFER_WINDOW_DAYS } from "@/lib/constants";
import { askGapPercent, offerExpiry } from "@/lib/data/offer-request";
import { formatUsd, toDigits } from "@/lib/utils";
import type { CreateOfferInput } from "@/lib/validations/offer";

type OfferDraft = Omit<CreateOfferInput, "connectionId">;

export interface MakeOfferModalProps {
    open: boolean;
    address: string;
    listPrice: number;
    pending: boolean;
    failed: boolean;
    onClose: () => void;
    onSubmit: (draft: OfferDraft) => void;
}

export function MakeOfferModal({
    open,
    address,
    listPrice,
    pending,
    failed,
    onClose,
    onSubmit,
}: MakeOfferModalProps) {
    const [amount, setAmount] = useState("");
    const [terms, setTerms] = useState("");

    const offeredPrice = Number(toDigits(amount));
    const band = GAP_BANDS[gapBandOf(askGapPercent(listPrice, offeredPrice))];
    const ready = offeredPrice > 0 && terms.trim().length > 0;

    return (
        <Modal
            open={open}
            onOpenChange={(next) => {
                if (!next) onClose();
            }}
        >
            <ModalHeader className="p-4">
                <ModalTitle>{COPY.title}</ModalTitle>
            </ModalHeader>

            <ModalBody className="space-y-3 p-4">
                <div>
                    <p className="text-text text-xs font-semibold">{address}</p>
                    <p className="text-text-secondary mt-0.5 text-xs">
                        {COPY.hint}
                    </p>
                </div>

                <FormField
                    name="offer-amount"
                    label={COPY.price}
                    variant="numeric"
                    inputMode="numeric"
                    value={amount && formatUsd(offeredPrice)}
                    placeholder={formatUsd(listPrice)}
                    onChange={(event) => setAmount(event.target.value)}
                    hint={`${COPY.ask} ${formatUsd(listPrice)}`}
                />

                {offeredPrice > 0 && (
                    <p className="text-text-secondary flex items-center gap-1.5 text-xs">
                        <StatusDot tone="neutral" />
                        {band.label}
                    </p>
                )}

                <TextareaField
                    name="offer-terms"
                    label={COPY.terms}
                    rows={3}
                    value={terms}
                    placeholder={COPY.termsPlaceholder}
                    onChange={(event) => setTerms(event.target.value)}
                    hint={COPY.expiry(OFFER_WINDOW_DAYS)}
                />

                {failed && (
                    <Callout
                        variant="error"
                        title={COPY.failed}
                        description={COPY.retry}
                    />
                )}
            </ModalBody>

            <ModalFooter className="p-4">
                <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={onClose}
                >
                    {COPY.cancel}
                </Button>
                <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    isLoading={pending}
                    disabled={!ready}
                    onClick={() =>
                        onSubmit({
                            offeredPrice,
                            offeredTerms: terms.trim(),
                            expiresAt: offerExpiry(),
                        })
                    }
                >
                    {COPY.confirm}
                </Button>
            </ModalFooter>
        </Modal>
    );
}

MakeOfferModal.displayName = "MakeOfferModal";
