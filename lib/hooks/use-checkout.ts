"use client";

import { useCallback, useState } from "react";
import {
    useConfirmPayment,
    useCreateTransaction,
} from "@/lib/hooks/use-transactions";
import { STRIPE_COPY } from "@/lib/config/stripe";
import { errorMessage } from "@/lib/utils/api-error";
import type {
    CreateTransactionInput,
    CreateTransactionResult,
} from "@/lib/validations/transaction";

export function useCheckout() {
    const createTransaction = useCreateTransaction();
    const confirmPayment = useConfirmPayment();

    const [active, setActive] = useState(false);
    const [session, setSession] = useState<CreateTransactionResult>();
    const [settled, setSettled] = useState(false);
    const [error, setError] = useState<string>();

    const open = useCallback(
        async (input: CreateTransactionInput) => {
            setActive(true);
            setError(undefined);
            setSettled(false);
            try {
                setSession(await createTransaction.mutateAsync(input));
            } catch (cause) {
                setError(errorMessage(cause, STRIPE_COPY.genericFailure));
            }
        },
        [createTransaction],
    );

    const settle = useCallback(
        async (paymentIntentId: string) => {
            if (!session) return;
            setError(undefined);
            try {
                await confirmPayment.mutateAsync({
                    id: session.transaction.id,
                    paymentIntentId,
                });
                setSettled(true);
            } catch (cause) {
                setError(errorMessage(cause, STRIPE_COPY.settleFailure));
            }
        },
        [confirmPayment, session],
    );

    const close = useCallback(() => {
        setActive(false);
        setSession(undefined);
        setSettled(false);
        setError(undefined);
    }, []);

    return {
        active,
        session,
        settled,
        error,
        preparing: createTransaction.isPending,
        settling: confirmPayment.isPending,
        open,
        settle,
        close,
        fail: setError,
    };
}
