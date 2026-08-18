"use client";

import { useEffect } from "react";
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
