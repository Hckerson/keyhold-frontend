"use client";

import { useEffect } from "react";

const CONFIRM_MESSAGE =
    "You have unsaved changes. Leave this page and discard them?";

export function useUnsavedChangesWarning(enabled: boolean) {
    useEffect(() => {
        if (!enabled) return;

        const warnOnUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault();
            event.returnValue = "";
        };

        const warnOnNavigate = (event: MouseEvent) => {
            if (event.defaultPrevented || event.button !== 0) return;
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
                return;

            const target = event.target;
            if (!(target instanceof Element)) return;

            const anchor = target.closest("a");
            if (!anchor || anchor.target === "_blank") return;

            const href = anchor.getAttribute("href");
            if (!href || href.startsWith("#")) return;

            if (!window.confirm(CONFIRM_MESSAGE)) {
                event.preventDefault();
                event.stopPropagation();
            }
        };

        window.addEventListener("beforeunload", warnOnUnload);
        document.addEventListener("click", warnOnNavigate, true);

        return () => {
            window.removeEventListener("beforeunload", warnOnUnload);
            document.removeEventListener("click", warnOnNavigate, true);
        };
    }, [enabled]);
}
