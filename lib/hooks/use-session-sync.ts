"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "@/lib/hooks/use-users";
import { useAuthStore } from "@/lib/stores/auth-store";
import { isUnauthorized } from "@/lib/utils/api-error";

export function useSessionSync() {
    const client = useQueryClient();
    const user = useAuthStore((state) => state.user);
    const clearAuth = useAuthStore((state) => state.clearAuth);
    const { error } = useCurrentUser();

    useEffect(() => {
        if (user && isUnauthorized(error)) clearAuth();
    }, [user, error, clearAuth]);

    useEffect(
        () =>
            useAuthStore.subscribe((state, previous) => {
                if (previous.user && !state.user) client.clear();
            }),
        [client],
    );
}
