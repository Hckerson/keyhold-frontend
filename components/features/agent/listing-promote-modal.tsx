"use client";

import { useState } from "react";
import { ConfirmModal } from "@/components/patterns/confirm-modal";
import { ChoiceChips } from "@/components/patterns/choice-chips";
import { LabelledBlock } from "@/components/patterns/labelled-block";
import {
    DEFAULT_PROMOTION_SPAN,
    PROMOTION_COPY as COPY,
    PROMOTION_SPANS,
    type PromotionSpan,
} from "@/lib/config/listing-promotion";

const FAILURE = { title: COPY.failed, body: COPY.retry };

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
        <ConfirmModal
            open={address !== undefined}
            title={COPY.title}
            subject={address}
            failure={FAILURE}
            tone="accent"
            cancelLabel={COPY.cancel}
            confirmLabel={COPY.confirm}
            pending={pending}
            failed={failed}
            onClose={onClose}
            onConfirm={() => onConfirm(Number(span))}
        >
            <p className="text-text-secondary text-xs">{COPY.hint}</p>

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
        </ConfirmModal>
    );
}

ListingPromoteModal.displayName = "ListingPromoteModal";
