"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authAPI } from "@/lib/api/auth";
import { queryKeys } from "@/lib/hooks/query-keys";
import { FEEDBACK } from "@/lib/config/feedback";

export function useVerifyEmail() {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.verifyEmail,
        mutationFn: (code: string) => authAPI.verifyEmail(code),
        onSuccess: () =>
            client.invalidateQueries({ queryKey: queryKeys.users.me }),
    });
}

export function useResendVerification() {
    return useMutation({
        meta: FEEDBACK.resendVerification,
        mutationFn: () => authAPI.resendVerification(),
    });
}
