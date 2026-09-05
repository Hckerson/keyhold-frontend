"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser } from "@/lib/types/auth";

interface AuthState {
    user: AuthUser | null;
    setAuth: (user: AuthUser) => void;
    setUser: (user: AuthUser) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            setAuth: (user) => set({ user }),
            setUser: (user) => set({ user }),
            clearAuth: () => set({ user: null }),
        }),
        {
            name: "auth-storage",
        },
    ),
);
