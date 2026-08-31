import type { BadgeTone } from "./ui";

export type ToastTone = Extract<BadgeTone, "success" | "error" | "info">;

export interface Toast {
    id: string;
    tone: ToastTone;
    title: string;
    description?: string;
}

export type ToastDraft = Omit<Toast, "id">;
