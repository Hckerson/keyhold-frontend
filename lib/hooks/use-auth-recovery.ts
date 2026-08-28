"use client";

import { useMutation } from "@tanstack/react-query";
import { authAPI } from "@/lib/api/auth";
import { AUTH_FAILURES } from "@/lib/config/auth-recovery";
import { errorMessage } from "@/lib/utils/api-error";
import type {
    NewPasswordInput,
    ResetPasswordInput,
} from "@/lib/validations/auth";

export function useRequestPasswordReset() {
    const mutation = useMutation({
        mutationFn: (input: ResetPasswordInput) =>
            authAPI.forgotPassword(input),
    });

    return {
        submit: mutation.mutateAsync,
        pending: mutation.isPending,
        error: mutation.error
            ? errorMessage(mutation.error, AUTH_FAILURES.request)
            : null,
        clearError: mutation.reset,
    };
}

export function useResetPassword(token: string) {
    const mutation = useMutation({
        mutationFn: (input: NewPasswordInput) =>
            authAPI.resetPassword({ ...input, token }),
    });

    return {
        submit: mutation.mutateAsync,
        pending: mutation.isPending,
        error: mutation.error
            ? errorMessage(mutation.error, AUTH_FAILURES.reset)
            : null,
        clearError: mutation.reset,
    };
}
