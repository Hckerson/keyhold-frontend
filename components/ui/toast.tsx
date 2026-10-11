"use client";

import { CheckCircle2, Info, X, XCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/utils";
import type { Toast as ToastEntry, ToastTone } from "@/lib/types/feedback";

const TONE_GLYPH: Record<ToastTone, LucideIcon> = {
    success: CheckCircle2,
    error: XCircle,
    info: Info,
};

const TONE_ACCENT: Record<ToastTone, string> = {
    success: "text-accent",
    error: "text-error",
    info: "text-text-secondary",
};

export interface ToastProps {
    toast: ToastEntry;
    onDismiss: (id: string) => void;
}

export function Toast({ toast, onDismiss }: ToastProps) {
    const Glyph = TONE_GLYPH[toast.tone];

    return (
        <div
            role={toast.tone === "error" ? "alert" : "status"}
            aria-live={toast.tone === "error" ? "assertive" : "polite"}
            className="bg-background-muted border-border pointer-events-auto flex w-full items-start gap-2.5 rounded-lg border p-3 shadow-lg"
        >
            <Glyph
                className={cn("mt-px size-4 shrink-0", TONE_ACCENT[toast.tone])}
                strokeWidth={1.5}
                aria-hidden="true"
            />

            <div className="min-w-0 flex-1">
                <p className="text-text text-xs font-semibold">{toast.title}</p>
                {toast.description && (
                    <p className="text-text-secondary mt-0.5 text-xs">
                        {toast.description}
                    </p>
                )}
            </div>

            <IconButton
                icon={X}
                label="Dismiss"
                onClick={() => onDismiss(toast.id)}
            />
        </div>
    );
}

Toast.displayName = "Toast";
