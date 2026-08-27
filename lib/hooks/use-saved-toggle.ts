"use client";

import { useCallback, useMemo } from "react";
import {
    useSavedPropertyIds,
    useToggleSavedProperty,
} from "@/lib/hooks/use-saved-properties";
import { useSignInGate } from "@/lib/hooks/use-sign-in-gate";

export function useSavedToggle() {
    const { mounted, signedIn, requireSignIn } = useSignInGate();
    const { data, isPending } = useSavedPropertyIds(signedIn);
    const toggleSaved = useToggleSavedProperty();

    const savedIds = useMemo(() => data ?? [], [data]);

    const isSaved = useCallback(
        (propertyId: string) => savedIds.includes(propertyId),
        [savedIds],
    );

    const toggle = useCallback(
        (propertyId: string) => {
            if (!requireSignIn()) return;
            toggleSaved.mutate({ propertyId, saved: isSaved(propertyId) });
        },
        [requireSignIn, toggleSaved, isSaved],
    );

    return {
        savedIds,
        isSaved,
        toggle,
        pending: toggleSaved.isPending,
        settling: !mounted || (signedIn && isPending),
        signedIn,
        requireSignIn,
    };
}
