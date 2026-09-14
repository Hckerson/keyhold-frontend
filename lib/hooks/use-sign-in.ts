"use client";

import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { authAPI } from "@/lib/api/auth";
import { queryKeys } from "@/lib/hooks/query-keys";
import { useAuthStore } from "@/lib/stores/auth-store";
import type { AuthUser } from "@/lib/types/auth";
import type { LoginInput } from "@/lib/validations/auth";

export function useSignIn() {
    const queryClient = useQueryClient();
    const setAuth = useAuthStore((state) => state.setAuth);

    return useCallback(
        async (input: LoginInput, remember = true): Promise<AuthUser> => {
            const { user } = await authAPI.login({ ...input, remember });

            setAuth(user);
            await queryClient.resetQueries({ queryKey: queryKeys.users.me });

            return user;
        },
        [setAuth, queryClient],
    );
}
