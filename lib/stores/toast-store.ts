"use client";

import { create } from "zustand";
import { nanoid } from "nanoid";
import {
    TOAST_DURATION,
    TOAST_ERROR_DURATION,
    TOAST_STACK_LIMIT,
} from "@/lib/constants";
import type { Toast, ToastDraft } from "@/lib/types/feedback";

interface ToastState {
    toasts: Toast[];
    push: (draft: ToastDraft) => string;
    dismiss: (id: string) => void;
    clear: () => void;
}

const timers = new Map<string, ReturnType<typeof setTimeout>>();

const clearTimer = (id: string) => {
    const timer = timers.get(id);
    if (!timer) return;
    clearTimeout(timer);
    timers.delete(id);
};

export const useToastStore = create<ToastState>()((set, get) => ({
    toasts: [],
    push: (draft) => {
        const id = nanoid();

        set((state) => {
            const next = [...state.toasts, { ...draft, id }];
            const overflow = next.slice(0, -TOAST_STACK_LIMIT);
            overflow.forEach((toast) => clearTimer(toast.id));
            return { toasts: next.slice(-TOAST_STACK_LIMIT) };
        });

        const lifespan =
            draft.tone === "error" ? TOAST_ERROR_DURATION : TOAST_DURATION;

        timers.set(
            id,
            setTimeout(() => get().dismiss(id), lifespan),
        );

        return id;
    },
    dismiss: (id) => {
        clearTimer(id);
        set((state) => ({
            toasts: state.toasts.filter((toast) => toast.id !== id),
        }));
    },
    clear: () => {
        timers.forEach((timer) => clearTimeout(timer));
        timers.clear();
        set({ toasts: [] });
    },
}));

export const notify = (draft: ToastDraft) =>
    useToastStore.getState().push(draft);
