"use client";

import {
    forwardRef,
    useEffect,
    type HTMLAttributes,
    type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

const ESCAPE_KEY = "Escape";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children: ReactNode;
}

interface ModalContentProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

interface ModalTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    children: ReactNode;
}

interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
    ({ open = false, onOpenChange, className, children, ...props }, ref) => {
        useEffect(() => {
            if (!open) return;

            const closeOnEscape = (event: KeyboardEvent) => {
                if (event.key === ESCAPE_KEY) onOpenChange?.(false);
            };

            const restoreOverflow = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            document.addEventListener("keydown", closeOnEscape);

            return () => {
                document.body.style.overflow = restoreOverflow;
                document.removeEventListener("keydown", closeOnEscape);
            };
        }, [open, onOpenChange]);

        if (!open) return null;

        return (
            <>
                <div
                    aria-hidden="true"
                    onClick={() => onOpenChange?.(false)}
                    className="bg-overlay animate-in fade-in z-modal-backdrop fixed inset-0"
                />
                <div className="z-modal pointer-events-none fixed inset-0 flex items-center justify-center p-4">
                    <div
                        ref={ref}
                        role="dialog"
                        aria-modal="true"
                        className={cn(
                            "bg-background-muted border-border animate-in fade-in zoom-in-95 pointer-events-auto flex max-h-full w-full max-w-md flex-col overflow-hidden rounded-xl border shadow-2xl",
                            className,
                        )}
                        {...props}
                    >
                        {children}
                    </div>
                </div>
            </>
        );
    },
);

Modal.displayName = "Modal";

const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn("", className)} {...props} />
    ),
);

ModalContent.displayName = "ModalContent";

const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "border-border-light shrink-0 border-b p-6",
                className,
            )}
            {...props}
        />
    ),
);

ModalHeader.displayName = "ModalHeader";

const ModalTitle = forwardRef<HTMLHeadingElement, ModalTitleProps>(
    ({ className, ...props }, ref) => (
        <h2
            ref={ref}
            className={cn(
                "text-h6 font-display text-text font-light",
                className,
            )}
            {...props}
        />
    ),
);

ModalTitle.displayName = "ModalTitle";

const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn("min-h-0 flex-1 overflow-y-auto p-6", className)}
            {...props}
        />
    ),
);

ModalBody.displayName = "ModalBody";

const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "border-border-light flex shrink-0 justify-end gap-4 border-t p-6",
                className,
            )}
            {...props}
        />
    ),
);

ModalFooter.displayName = "ModalFooter";

export { Modal, ModalContent, ModalHeader, ModalTitle, ModalBody, ModalFooter };
