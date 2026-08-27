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
import { ChoiceChips } from "@/components/patterns/choice-chips";
import { LabelledBlock } from "@/components/patterns/labelled-block";
import {
    DEFAULT_PROMOTION_SPAN,
    PROMOTION_COPY as COPY,
    PROMOTION_SPANS,
    type PromotionSpan,
} from "@/lib/config/listing-promotion";

export interface ListingPromoteModalProps {
    address?: string;
    featuredUntil?: string;
    pending: boolean;
    failed: boolean;
    onClose: () => void;
    onConfirm: (days: number) => void;
}

export function ListingPromoteModal({
    address,
    featuredUntil,
    pending,
    failed,
    onClose,
    onConfirm,
}: ListingPromoteModalProps) {
    const [span, setSpan] = useState<PromotionSpan>(DEFAULT_PROMOTION_SPAN);

    return (
        <Modal
            open={address !== undefined}
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

                {featuredUntil && (
                    <p className="micro-label tabular-nums">
                        {COPY.featuredUntil} {featuredUntil}
                    </p>
                )}

                <LabelledBlock label={COPY.span}>
                    <ChoiceChips
                        label={COPY.span}
                        choices={PROMOTION_SPANS}
                        selected={[span]}
                        onToggle={setSpan}
                    />
                </LabelledBlock>

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
                    onClick={() => onConfirm(Number(span))}
                >
                    {COPY.confirm}
                </Button>
            </ModalFooter>
        </Modal>
    );
}

ListingPromoteModal.displayName = "ListingPromoteModal";
