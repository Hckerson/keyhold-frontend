"use client";

import { useCallback } from "react";
import { authAPI } from "@/lib/api/auth";
import { ACCESS_TOKEN_COOKIE, SESSION_DAYS } from "@/lib/constants";
import { useAuthStore } from "@/lib/stores/auth-store";
import { setCookie } from "@/lib/utils/cookies";
import type { AuthUser } from "@/lib/types/auth";
import type { LoginInput } from "@/lib/validations/auth";

export function useSignIn() {
    const setAuth = useAuthStore((state) => state.setAuth);

    return useCallback(
        async (input: LoginInput, remember = true): Promise<AuthUser> => {
            const { user, accessToken } = await authAPI.login(input);

            setAuth(user, accessToken);
            setCookie(
                ACCESS_TOKEN_COOKIE,
                accessToken,
                remember ? SESSION_DAYS : null,
            );

            return user;
        },
        [setAuth],
    );
}
