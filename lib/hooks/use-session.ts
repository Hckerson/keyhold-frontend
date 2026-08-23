"use client";

import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { authAPI } from "@/lib/api/auth";
import type { ResetPasswordInput } from "@/lib/validations/auth";
import { useCurrentUser } from "@/lib/hooks/use-users";
import { useAuthStore } from "@/lib/stores/auth-store";

export function useSession() {
    const user = useAuthStore((state) => state.user);
    const accessToken = useAuthStore((state) => state.accessToken);
    const setUser = useAuthStore((state) => state.setUser);
    const logout = useAuthStore((state) => state.logout);

    const { data, isLoading, isError } = useCurrentUser();

    useEffect(() => {
        if (!data) return;
        setUser({
            id: data.id,
            name: data.fullName,
            email: data.email ?? "",
            role: data.role,
        });
    }, [data, setUser]);

    return {
        user,
        isAuthenticated: Boolean(accessToken),
        isLoading: Boolean(accessToken) && isLoading,
        isError,
        logout,
    };
}

export function useRequestPasswordReset() {
    return useMutation({
        mutationFn: (input: ResetPasswordInput) =>
            authAPI.forgotPassword(input),
    });
}
