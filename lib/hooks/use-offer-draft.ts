"use client";

import { useState } from "react";
import { offerExpiry } from "@/lib/data/offer-request";
import type { Contingency } from "@/lib/enums/enums";
import { toDigits } from "@/lib/utils";
import type { OfferDraft } from "@/lib/validations/offer";

export function useOfferDraft() {
    const [amount, setAmount] = useState("");
    const [terms, setTerms] = useState("");
    const [moveIn, setMoveIn] = useState("");
    const [earnest, setEarnest] = useState("");
    const [contingencies, setContingencies] = useState<Contingency[]>([]);

    const offeredPrice = Number(toDigits(amount));
    const earnestMoney = Number(toDigits(earnest));

    const toggle = (id: Contingency) =>
        setContingencies((current) =>
            current.includes(id)
                ? current.filter((entry) => entry !== id)
                : [...current, id],
        );

    const toDraft = (): OfferDraft => ({
        offeredPrice,
        offeredTerms: terms.trim(),
        expiresAt: offerExpiry(),
        moveInDate: moveIn
            ? new Date(`${moveIn}T00:00:00`).toISOString()
            : undefined,
        earnestMoney: earnestMoney > 0 ? earnestMoney : undefined,
        contingencies: contingencies.length > 0 ? contingencies : undefined,
    });

    return {
        amount,
        setAmount,
        terms,
        setTerms,
        moveIn,
        setMoveIn,
        earnest,
        setEarnest,
        contingencies,
        toggle,
        offeredPrice,
        earnestMoney,
        ready: offeredPrice > 0 && terms.trim().length > 0,
        toDraft,
    };
}

export type OfferDraftState = ReturnType<typeof useOfferDraft>;
