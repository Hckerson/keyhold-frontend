"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { authAPI } from "@/lib/api/auth";
import { AUTH_ROUTES } from "@/lib/constants";
import { useAuthStore } from "@/lib/stores/auth-store";

export function useSignOut() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const clearAuth = useAuthStore((state) => state.clearAuth);

    return useCallback(async () => {
        clearAuth();
        await authAPI.logout().catch(() => null);
        queryClient.clear();
        router.replace(AUTH_ROUTES.login);
    }, [clearAuth, queryClient, router]);
}
