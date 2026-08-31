"use client";

import { useEffect } from "react";
import { useCurrentUser } from "@/lib/hooks/use-users";
import { useAuthStore } from "@/lib/stores/auth-store";

export function useSessionSync() {
    const user = useAuthStore((state) => state.user);
    const clearAuth = useAuthStore((state) => state.clearAuth);
    const { isError } = useCurrentUser();

    useEffect(() => {
        if (user && isError) clearAuth();
    }, [user, isError, clearAuth]);
}
