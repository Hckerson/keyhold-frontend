"use client";

import { useCallback, useMemo } from "react";
import {
    useSavedPropertyIds,
    useToggleSavedProperty,
    useTogglingPropertyIds,
} from "@/lib/hooks/use-saved-properties";
import { useSignInGate } from "@/lib/hooks/use-sign-in-gate";

export function useSavedToggle() {
    const { signedIn, resolving, requireSignIn } = useSignInGate();
    const { data, isPending } = useSavedPropertyIds(signedIn);
    const toggleSaved = useToggleSavedProperty();
    const togglingIds = useTogglingPropertyIds();

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

    const isToggling = useCallback(
        (propertyId: string) => togglingIds.includes(propertyId),
        [togglingIds],
    );

    return {
        savedIds,
        isSaved,
        isToggling,
        toggle,
        pending: toggleSaved.isPending,
        settling: resolving || (signedIn && isPending),
        signedIn,
        requireSignIn,
    };
}
