"use client";

import {
    createContext,
    forwardRef,
    useContext,
    type HTMLAttributes,
    type ReactNode,
} from "react";
import { Dialog, type DialogPopupProps } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import {
    DIALOG_CLOSE_MARK,
    useDialogFocus,
} from "@/lib/hooks/use-dialog-focus";
import { useSettledContent } from "@/lib/hooks/use-settled-content";
import { cn, composeRefs } from "@/lib/utils";

const CLOSE_LABEL = "Close dialog";

const ModalLockContext = createContext(false);

interface ModalProps extends Omit<DialogPopupProps, "className" | "ref"> {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    locked?: boolean;
    className?: string;
    children: ReactNode;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
    (
        {
            open = false,
            onOpenChange,
            locked = false,
            className,
            children,
            ...props
        },
        ref,
    ) => {
        const content = useSettledContent(open, children);
        const { popupRef, initialFocus } = useDialogFocus();

        return (
            <Dialog.Root
                open={open}
                onOpenChange={(next) => {
                    if (!next && locked) return;
                    onOpenChange?.(next);
                }}
            >
                <Dialog.Portal>
                    <Dialog.Backdrop className="bg-overlay z-modal-backdrop ease-smooth fixed inset-0 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
                    <Dialog.Viewport className="z-modal fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Popup
                            ref={composeRefs(ref, popupRef)}
                            initialFocus={initialFocus}
                            className={cn(
                                "bg-background-muted border-border ease-smooth flex max-h-full w-full max-w-md flex-col overflow-hidden rounded-xl border shadow-2xl transition-[opacity,scale,translate] duration-200 outline-none data-ending-style:translate-y-2 data-ending-style:scale-96 data-ending-style:opacity-0 data-starting-style:translate-y-2 data-starting-style:scale-96 data-starting-style:opacity-0",
                                className,
                            )}
                            {...props}
                        >
                            <ModalLockContext.Provider value={locked}>
                                {content}
                            </ModalLockContext.Provider>
                        </Dialog.Popup>
                    </Dialog.Viewport>
                </Dialog.Portal>
            </Dialog.Root>
        );
    },
);

Modal.displayName = "Modal";

const ModalContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn("flex min-h-0 flex-1 flex-col", className)}
            {...props}
        />
    ),
);

ModalContent.displayName = "ModalContent";

const ModalHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, children, ...props }, ref) => {
        const locked = useContext(ModalLockContext);

        return (
            <div
                ref={ref}
                className={cn(
                    "border-border-light flex shrink-0 items-start justify-between gap-3 border-b p-4",
                    className,
                )}
                {...props}
            >
                <div className="min-w-0 flex-1">{children}</div>
                <Dialog.Close
                    {...DIALOG_CLOSE_MARK}
                    aria-label={CLOSE_LABEL}
                    disabled={locked}
                    className="text-text-muted hover:text-text hover:bg-background-alt focus-visible:ring-accent ease-smooth -mt-0.5 -mr-1 grid size-6 shrink-0 place-items-center rounded-md transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-45"
                >
                    <X
                        className="size-3"
                        strokeWidth={1.5}
                        aria-hidden="true"
                    />
                </Dialog.Close>
            </div>
        );
    },
);

ModalHeader.displayName = "ModalHeader";

const ModalTitle = forwardRef<
    HTMLHeadingElement,
    HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <Dialog.Title
        ref={ref}
        className={cn("text-h6 font-display text-text font-light", className)}
        {...props}
    />
));

ModalTitle.displayName = "ModalTitle";

const ModalBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn("min-h-0 flex-1 overflow-y-auto p-4", className)}
            {...props}
        />
    ),
);

ModalBody.displayName = "ModalBody";

const ModalFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "border-border-light flex shrink-0 justify-end gap-2 border-t p-4",
                className,
            )}
            {...props}
        />
    ),
);

ModalFooter.displayName = "ModalFooter";

export { Modal, ModalContent, ModalHeader, ModalTitle, ModalBody, ModalFooter };
