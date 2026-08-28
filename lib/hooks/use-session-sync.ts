"use client";

import { useEffect } from "react";
import { ACCESS_TOKEN_COOKIE } from "@/lib/constants";
import { useAuthStore } from "@/lib/stores/auth-store";
import { getCookie } from "@/lib/utils/cookies";

export function useSessionSync() {
    const accessToken = useAuthStore((state) => state.accessToken);
    const user = useAuthStore((state) => state.user);
    const clearAuth = useAuthStore((state) => state.clearAuth);

    useEffect(() => {
        if (!accessToken && !user) return;
        if (getCookie(ACCESS_TOKEN_COOKIE)) return;
        clearAuth();
    }, [accessToken, user, clearAuth]);
}
