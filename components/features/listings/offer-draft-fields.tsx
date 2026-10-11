"use client";

import { useMemo } from "react";
import { FormField } from "@/components/ui/forms/form-field";
import { TextareaField } from "@/components/ui/forms/textarea-field";
import { StatusDot } from "@/components/patterns/status-dot";
import { LabelledBlock } from "@/components/patterns/labelled-block";
import { OfferContingencyList } from "@/components/features/listings/offer-contingency-list";
import { OFFER_REQUEST_COPY as COPY } from "@/lib/config/offer-request";
import { GAP_BANDS, gapBandOf } from "@/lib/config/offer-tones";
import { OFFER_WINDOW_DAYS } from "@/lib/constants";
import { askGapPercent } from "@/lib/data/offer-request";
import { toDateInput } from "@/lib/data/viewing-request";
import type { OfferDraftState } from "@/lib/hooks/use-offer-draft";
import { formatUsd } from "@/lib/utils";

export interface OfferDraftFieldsProps {
    offer: OfferDraftState;
    listPrice: number;
}

export function OfferDraftFields({ offer, listPrice }: OfferDraftFieldsProps) {
    const today = useMemo(() => toDateInput(new Date()), []);
    const band =
        GAP_BANDS[gapBandOf(askGapPercent(listPrice, offer.offeredPrice))];

    return (
        <>
            <FormField
                name="offer-amount"
                label={COPY.price}
                variant="numeric"
                inputMode="numeric"
                value={offer.amount && formatUsd(offer.offeredPrice)}
                placeholder={formatUsd(listPrice)}
                onChange={(event) => offer.setAmount(event.target.value)}
                hint={`${COPY.ask} ${formatUsd(listPrice)}`}
            />

            {offer.offeredPrice > 0 && (
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
                value={offer.moveIn}
                onChange={(event) => offer.setMoveIn(event.target.value)}
                hint={COPY.moveInHint}
            />

            <FormField
                name="offer-earnest"
                label={COPY.earnest}
                variant="numeric"
                inputMode="numeric"
                value={offer.earnest && formatUsd(offer.earnestMoney)}
                onChange={(event) => offer.setEarnest(event.target.value)}
                hint={COPY.earnestHint}
            />

            <LabelledBlock label={COPY.contingencies}>
                <OfferContingencyList
                    selected={offer.contingencies}
                    onToggle={offer.toggle}
                />
                <p className="text-text-muted mt-1.5 text-xs">
                    {COPY.contingenciesHint}
                </p>
            </LabelledBlock>

            <TextareaField
                name="offer-terms"
                label={COPY.terms}
                rows={3}
                value={offer.terms}
                placeholder={COPY.termsPlaceholder}
                onChange={(event) => offer.setTerms(event.target.value)}
                hint={COPY.expiry(OFFER_WINDOW_DAYS)}
            />
        </>
    );
}

OfferDraftFields.displayName = "OfferDraftFields";
