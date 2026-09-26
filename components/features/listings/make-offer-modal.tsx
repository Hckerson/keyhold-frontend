"use client";

import { useMemo, useState } from "react";
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
import { MetricList } from "@/components/patterns/metric-list";
import { LabelledBlock } from "@/components/patterns/labelled-block";
import { OfferContingencyList } from "@/components/features/listings/offer-contingency-list";
import { OFFER_REQUEST_COPY as COPY } from "@/lib/config/offer-request";
import { GAP_BANDS, gapBandOf } from "@/lib/config/offer-tones";
import { OFFER_WINDOW_DAYS } from "@/lib/constants";
import {
    askGapPercent,
    offerExpiry,
    offerReviewRows,
} from "@/lib/data/offer-request";
import { toDateInput } from "@/lib/data/viewing-request";
import type { Contingency } from "@/lib/enums/enums";
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
    const today = useMemo(() => toDateInput(new Date()), []);
    const [reviewing, setReviewing] = useState(false);
    const [amount, setAmount] = useState("");
    const [terms, setTerms] = useState("");
    const [moveIn, setMoveIn] = useState("");
    const [earnest, setEarnest] = useState("");
    const [contingencies, setContingencies] = useState<Contingency[]>([]);

    const offeredPrice = Number(toDigits(amount));
    const earnestMoney = Number(toDigits(earnest));
    const band = GAP_BANDS[gapBandOf(askGapPercent(listPrice, offeredPrice))];
    const ready = offeredPrice > 0 && terms.trim().length > 0;

    const toggle = (id: Contingency) =>
        setContingencies((current) =>
            current.includes(id)
                ? current.filter((entry) => entry !== id)
                : [...current, id],
        );

    const close = () => {
        setReviewing(false);
        onClose();
    };

    const submit = () =>
        onSubmit({
            offeredPrice,
            offeredTerms: terms.trim(),
            expiresAt: offerExpiry(),
            moveInDate: moveIn
                ? new Date(`${moveIn}T00:00:00`).toISOString()
                : undefined,
            earnestMoney: earnestMoney > 0 ? earnestMoney : undefined,
            contingencies: contingencies.length > 0 ? contingencies : undefined,
        });

    return (
        <Modal
            open={open}
            locked={pending}
            onOpenChange={(next) => {
                if (!next) close();
            }}
        >
            <ModalHeader>
                <ModalTitle>
                    {reviewing ? COPY.reviewTitle : COPY.title}
                </ModalTitle>
            </ModalHeader>

            <ModalBody className="scroll-y max-h-[60vh] space-y-3">
                <div>
                    <p className="text-text text-xs font-semibold">{address}</p>
                    <p className="text-text-secondary mt-0.5 text-xs">
                        {reviewing ? COPY.reviewHint : COPY.hint}
                    </p>
                </div>

                {reviewing ? (
                    <>
                        <MetricList
                            metrics={offerReviewRows({
                                offeredPrice,
                                moveInDate: moveIn,
                                earnestMoney,
                                contingencies,
                            })}
                        />
                        <LabelledBlock label={COPY.terms}>
                            <p className="text-text-secondary text-xs leading-relaxed">
                                {terms.trim()}
                            </p>
                        </LabelledBlock>
                    </>
                ) : (
                    <>
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

                        <FormField
                            name="offer-move-in"
                            label={COPY.moveIn}
                            type="date"
                            variant="numeric"
                            min={today}
                            value={moveIn}
                            onChange={(event) => setMoveIn(event.target.value)}
                            hint={COPY.moveInHint}
                        />

                        <FormField
                            name="offer-earnest"
                            label={COPY.earnest}
                            variant="numeric"
                            inputMode="numeric"
                            value={earnest && formatUsd(earnestMoney)}
                            onChange={(event) => setEarnest(event.target.value)}
                            hint={COPY.earnestHint}
                        />

                        <LabelledBlock label={COPY.contingencies}>
                            <OfferContingencyList
                                selected={contingencies}
                                onToggle={toggle}
                            />
                            <p className="text-text-muted mt-1.5 text-xs">
                                {COPY.contingenciesHint}
                            </p>
                        </LabelledBlock>

                        <TextareaField
                            name="offer-terms"
                            label={COPY.terms}
                            rows={3}
                            value={terms}
                            placeholder={COPY.termsPlaceholder}
                            onChange={(event) => setTerms(event.target.value)}
                            hint={COPY.expiry(OFFER_WINDOW_DAYS)}
                        />
                    </>
                )}

                {failed && (
                    <Callout
                        variant="error"
                        title={COPY.failed}
                        description={COPY.retry}
                    />
                )}
            </ModalBody>

            <ModalFooter>
                <Button
                    type="button"
                    disabled={pending}
                    onClick={reviewing ? () => setReviewing(false) : close}
                >
                    {reviewing ? COPY.back : COPY.cancel}
                </Button>
                <Button
                    type="button"
                    emphasis="solid"
                    tone="accent"
                    isLoading={pending}
                    disabled={!ready}
                    onClick={reviewing ? submit : () => setReviewing(true)}
                >
                    {reviewing ? COPY.confirm : COPY.review}
                </Button>
            </ModalFooter>
        </Modal>
    );
}

MakeOfferModal.displayName = "MakeOfferModal";
