"use client";

import { useMutation } from "@tanstack/react-query";
import { authAPI } from "@/lib/api/auth";
import { AUTH_FAILURES } from "@/lib/config/auth-recovery";
import { errorMessage } from "@/lib/utils/api-error";
import type {
    NewPasswordInput,
    ResetPasswordInput,
} from "@/lib/validations/auth";
import { FEEDBACK } from "@/lib/config/feedback";

export function useRequestPasswordReset() {
    const mutation = useMutation({
        meta: FEEDBACK.requestPasswordReset,
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
        meta: FEEDBACK.resetPassword,
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
