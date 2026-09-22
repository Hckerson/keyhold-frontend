"use client";

import { useRef } from "react";

const CLOSE_ATTRIBUTE = "data-dialog-close";

const FIRST_CONTROL = `:is(a[href], button, input, select, textarea, [tabindex]):not([disabled], [tabindex="-1"], [${CLOSE_ATTRIBUTE}])`;

export const DIALOG_CLOSE_MARK = { [CLOSE_ATTRIBUTE]: "" };

export function useDialogFocus() {
    const popupRef = useRef<HTMLDivElement>(null);

    const initialFocus = () =>
        popupRef.current?.querySelector<HTMLElement>(FIRST_CONTROL) ?? true;

    return { popupRef, initialFocus };
}
