"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authAPI } from "@/lib/api/auth";
import { FEEDBACK } from "@/lib/config/feedback";
import { AUTH_ROUTES } from "@/lib/constants";
import { useConfirmation } from "@/lib/hooks/use-confirmation";
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

    const mutation = useMutation({
        meta: FEEDBACK.signOut,
        mutationFn: endServerSession,
        onSuccess: () => {
            clearAuth();
            queryClient.clear();
            router.replace(AUTH_ROUTES.login);
        },
    });

    const confirmation = useConfirmation<void, true>(mutation);
    const { request } = confirmation;

    const signOut = useCallback(() => request(true), [request]);

    return { signOut, signingOut: confirmation.pending, confirmation };
}
