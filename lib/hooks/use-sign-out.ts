"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authAPI } from "@/lib/api/auth";
import { FEEDBACK } from "@/lib/config/feedback";
import { AUTH_ROUTES } from "@/lib/constants";
import { useAuthStore } from "@/lib/stores/auth-store";
import { isUnauthorized } from "@/lib/utils/api-error";

const endServerSession = async () => {
    try {
        await authAPI.logout();
    } catch (error) {
        if (!isUnauthorized(error)) throw error;
    }
};

export function useSignOut() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const clearAuth = useAuthStore((state) => state.clearAuth);

    const { mutate, isPending } = useMutation({
        meta: FEEDBACK.signOut,
        mutationFn: endServerSession,
        onSuccess: () => {
            clearAuth();
            queryClient.clear();
            router.replace(AUTH_ROUTES.login);
        },
    });

    const signOut = useCallback(() => {
        if (!isPending) mutate();
    }, [isPending, mutate]);

    return { signOut, signingOut: isPending };
}
