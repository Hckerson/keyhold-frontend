"use client";

import { useMutation } from "@tanstack/react-query";
import { authAPI } from "@/lib/api/auth";
import { ACCESS_TOKEN_COOKIE, SESSION_DAYS } from "@/lib/constants";
import { AUTH_FAILURES } from "@/lib/config/auth-recovery";
import { useAuthStore } from "@/lib/stores/auth-store";
import { errorMessage } from "@/lib/utils/api-error";
import { setCookie } from "@/lib/utils/cookies";
import type { AuthUser } from "@/lib/types/auth";
import type { SignupInput } from "@/lib/validations/auth";

type RegisterInput = Omit<SignupInput, "confirmPassword" | "acceptedTerms">;

export function useRegister() {
    const setAuth = useAuthStore((state) => state.setAuth);

    const mutation = useMutation({
        mutationFn: async (input: RegisterInput): Promise<AuthUser> => {
            const { user, accessToken } = await authAPI.register(input);

            setAuth(user, accessToken);
            setCookie(ACCESS_TOKEN_COOKIE, accessToken, SESSION_DAYS);

            return user;
        },
    });

    return {
        submit: mutation.mutateAsync,
        pending: mutation.isPending,
        error: mutation.error
            ? errorMessage(mutation.error, AUTH_FAILURES.register)
            : null,
        clearError: mutation.reset,
    };
}
