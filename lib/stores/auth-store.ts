"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ACCESS_TOKEN_COOKIE } from "@/lib/constants";
import { deleteCookie } from "@/lib/utils/cookies";
import type { AuthUser } from "@/lib/types/auth";

interface AuthState {
    user: AuthUser | null;
    accessToken: string | null;
    setAuth: (user: AuthUser, accessToken: string) => void;
    setUser: (user: AuthUser) => void;
    clearAuth: () => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            accessToken: null,
            setAuth: (user, accessToken) => set({ user, accessToken }),
            setUser: (user) => set({ user }),
            clearAuth: () => set({ user: null, accessToken: null }),
            logout: () => {
                get().clearAuth();
                deleteCookie(ACCESS_TOKEN_COOKIE);
            },
        }),
        {
            name: "auth-storage",
        },
    ),
);
