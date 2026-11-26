"use client";

import type { ReactNode } from "react";
import { Dialog, type DialogPopupProps } from "@base-ui/react/dialog";
import { useDialogFocus } from "@/lib/hooks/use-dialog-focus";
import {
    SIDEBAR_DIALOG_LABEL,
    SIDEBAR_DRAWER_ID,
    SIDEBAR_PANEL,
} from "@/lib/config/sidebar";
import { cn } from "@/lib/utils";

export interface SidebarDrawerProps {
    open: boolean;
    onClose?: () => void;
    finalFocus?: DialogPopupProps["finalFocus"];
    children: ReactNode;
}

export function SidebarDrawer({
    open,
    onClose,
    finalFocus,
    children,
}: SidebarDrawerProps) {
    const { popupRef, initialFocus } = useDialogFocus();

    return (
        <Dialog.Root open={open} onOpenChange={(next) => !next && onClose?.()}>
            <Dialog.Portal>
                <Dialog.Backdrop className="bg-text/50 ease-smooth z-modal-backdrop fixed inset-0 backdrop-blur-[2px] transition-opacity duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0" />
                <Dialog.Popup
                    ref={popupRef}
                    id={SIDEBAR_DRAWER_ID}
                    initialFocus={initialFocus}
                    finalFocus={finalFocus}
                    aria-label={SIDEBAR_DIALOG_LABEL}
                    className={cn(
                        SIDEBAR_PANEL,
                        "z-modal transition-[translate] data-ending-style:-translate-x-full data-starting-style:-translate-x-full",
                    )}
                >
                    {children}
                </Dialog.Popup>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

SidebarDrawer.displayName = "SidebarDrawer";
