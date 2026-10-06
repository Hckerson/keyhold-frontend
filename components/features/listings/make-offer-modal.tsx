"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
} from "@/components/ui/modal";
import { MetricList } from "@/components/patterns/metric-list";
import { LabelledBlock } from "@/components/patterns/labelled-block";
import { OfferDraftFields } from "@/components/features/listings/offer-draft-fields";
import { OFFER_REQUEST_COPY as COPY } from "@/lib/config/offer-request";
import { offerReviewRows } from "@/lib/data/offer-request";
import { useOfferDraft } from "@/lib/hooks/use-offer-draft";
import type { OfferDraft } from "@/lib/validations/offer";

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
    const [reviewing, setReviewing] = useState(false);
    const offer = useOfferDraft();

    const close = () => {
        setReviewing(false);
        onClose();
    };

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
                                offeredPrice: offer.offeredPrice,
                                moveInDate: offer.moveIn,
                                earnestMoney: offer.earnestMoney,
                                contingencies: offer.contingencies,
                            })}
                        />
                        <LabelledBlock label={COPY.terms}>
                            <p className="text-text-secondary text-xs leading-relaxed">
                                {offer.terms.trim()}
                            </p>
                        </LabelledBlock>
                    </>
                ) : (
                    <OfferDraftFields offer={offer} listPrice={listPrice} />
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
                    disabled={!offer.ready}
                    onClick={
                        reviewing
                            ? () => onSubmit(offer.toDraft())
                            : () => setReviewing(true)
                    }
                >
                    {reviewing ? COPY.confirm : COPY.review}
                </Button>
            </ModalFooter>
        </Modal>
    );
}

MakeOfferModal.displayName = "MakeOfferModal";
