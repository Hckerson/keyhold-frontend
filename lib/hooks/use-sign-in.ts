"use client";

import { useCallback } from "react";
import { authAPI } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/stores/auth-store";
import type { AuthUser } from "@/lib/types/auth";
import type { LoginInput } from "@/lib/validations/auth";

export function useSignIn() {
    const setAuth = useAuthStore((state) => state.setAuth);

    return useCallback(
        async (input: LoginInput, remember = true): Promise<AuthUser> => {
            const { user } = await authAPI.login({ ...input, remember });

            setAuth(user);

            return user;
        },
        [setAuth],
    );
}
