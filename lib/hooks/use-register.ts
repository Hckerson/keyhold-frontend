"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authAPI } from "@/lib/api/auth";
import { AUTH_FAILURES } from "@/lib/config/auth-recovery";
import { queryKeys } from "@/lib/hooks/query-keys";
import { useAuthStore } from "@/lib/stores/auth-store";
import { errorMessage } from "@/lib/utils/api-error";
import type { AuthUser } from "@/lib/types/auth";
import type { SignupInput } from "@/lib/validations/auth";
import { FEEDBACK } from "@/lib/config/feedback";

type RegisterInput = Omit<SignupInput, "confirmPassword" | "acceptedTerms">;

export function useRegister() {
    const queryClient = useQueryClient();
    const setAuth = useAuthStore((state) => state.setAuth);

    const mutation = useMutation({
        meta: FEEDBACK.register,
        mutationFn: async (input: RegisterInput): Promise<AuthUser> => {
            const { user } = await authAPI.register(input);

            setAuth(user);
            await queryClient.resetQueries({ queryKey: queryKeys.users.me });

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
