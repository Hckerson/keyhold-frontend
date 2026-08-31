"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ACCESS_TOKEN_COOKIE } from "@/lib/constants";
import { deleteCookie } from "@/lib/utils/cookies";
import type { AuthUser } from "@/lib/types/auth";

interface AuthState {
    user: AuthUser | null;
    setAuth: (user: AuthUser) => void;
    setUser: (user: AuthUser) => void;
    clearAuth: () => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            setAuth: (user) => set({ user }),
            setUser: (user) => set({ user }),
            clearAuth: () => set({ user: null }),
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
