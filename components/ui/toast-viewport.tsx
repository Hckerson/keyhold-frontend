"use client";

import { createPortal } from "react-dom";
import { AnimatePresence, m } from "motion/react";
import { Toast } from "@/components/ui/toast";
import { TOAST_MOTION } from "@/lib/config/motion";
import { useMounted } from "@/lib/hooks/use-mounted";
import { useToastStore } from "@/lib/stores/toast-store";

export function ToastViewport() {
    const mounted = useMounted();
    const toasts = useToastStore((state) => state.toasts);
    const dismiss = useToastStore((state) => state.dismiss);

    if (!mounted) return null;

    return createPortal(
        <div className="toast-rail">
            <AnimatePresence initial={false}>
                {toasts.map((toast) => (
                    <m.div
                        key={toast.id}
                        layout
                        {...TOAST_MOTION}
                        className="w-full"
                    >
                        <Toast toast={toast} onDismiss={dismiss} />
                    </m.div>
                ))}
            </AnimatePresence>
        </div>,
        document.body,
    );
}

ToastViewport.displayName = "ToastViewport";
