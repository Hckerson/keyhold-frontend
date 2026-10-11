"use client";

import { useRef, type KeyboardEvent, type MouseEvent } from "react";

const INTERACTIVE = "a, button, input, label, select, textarea";

interface RevealNavigationInput {
    revealing: boolean;
    currentOpen: string | null;
    setOpen: (key: string | null) => void;
    toggleOpen: (key: string) => void;
}

export function useRevealNavigation({
    revealing,
    currentOpen,
    setOpen,
    toggleOpen,
}: RevealNavigationInput) {
    const tableRef = useRef<HTMLTableElement | null>(null);

    const onRowClick = (
        event: MouseEvent<HTMLTableRowElement>,
        key: string,
    ) => {
        if (!revealing) return;
        const target = event.target;
        if (target instanceof Element && target.closest(INTERACTIVE)) return;
        toggleOpen(key);
    };

    const onTableKeyDown = (event: KeyboardEvent<HTMLTableElement>) => {
        if (!revealing) return;

        if (event.key === "Escape" && currentOpen !== null) {
            setOpen(null);
            return;
        }
        if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;

        const element = tableRef.current;
        const active = document.activeElement;
        if (!element || !(active instanceof HTMLButtonElement)) return;

        const triggers = Array.from(
            element.querySelectorAll<HTMLButtonElement>("[data-reveal-row]"),
        );
        const index = triggers.indexOf(active);
        if (index === -1) return;

        event.preventDefault();
        const next =
            event.key === "ArrowDown"
                ? Math.min(index + 1, triggers.length - 1)
                : Math.max(index - 1, 0);
        triggers[next]?.focus();
    };

    return { tableRef, onRowClick, onTableKeyDown };
}
