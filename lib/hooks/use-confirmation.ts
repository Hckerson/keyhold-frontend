"use client";

import { useCallback, useState } from "react";

interface ConfirmableMutation<TVariables> {
    isPending: boolean;
    isError: boolean;
    reset: () => void;
    mutate: (
        variables: TVariables,
        options?: { onSuccess?: () => void },
    ) => void;
}

export function useConfirmation<TVariables, TTarget = TVariables>(
    mutation: ConfirmableMutation<TVariables>,
) {
    const [target, setTarget] = useState<TTarget | null>(null);
    const { isPending, isError, reset, mutate } = mutation;

    const request = useCallback(
        (next: TTarget) => {
            if (isPending) return;
            reset();
            setTarget(next);
        },
        [isPending, reset],
    );

    const dismiss = useCallback(() => {
        if (!isPending) setTarget(null);
    }, [isPending]);

    const confirm = useCallback(
        (variables: TVariables, onConfirmed?: () => void) => {
            if (isPending) return;
            mutate(variables, {
                onSuccess: () => {
                    setTarget(null);
                    onConfirmed?.();
                },
            });
        },
        [isPending, mutate],
    );

    return {
        target,
        open: target !== null,
        pending: isPending,
        failed: isError,
        request,
        dismiss,
        confirm,
    };
}
