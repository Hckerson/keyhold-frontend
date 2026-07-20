import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

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
        if (!open) return null;

        return (
            <>
                <div
                    className="fixed inset-0 z-40 bg-black/50"
                    onClick={() => onOpenChange?.(false)}
                />
                <div
                    ref={ref}
                    className={cn(
                        "bg-background-muted border-border fixed top-1/2 left-1/2 z-50 mx-4 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-sm border shadow-2xl",
                        className,
                    )}
                    {...props}
                >
                    {children}
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
            className={cn("border-border-light border-b p-6", className)}
            {...props}
        />
    ),
);

ModalHeader.displayName = "ModalHeader";

const ModalTitle = forwardRef<HTMLHeadingElement, ModalTitleProps>(
    ({ className, ...props }, ref) => (
        <h2
            ref={ref}
            className={cn("text-h4 font-body font-normal", className)}
            {...props}
        />
    ),
);

ModalTitle.displayName = "ModalTitle";

const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn("p-6", className)} {...props} />
    ),
);

ModalBody.displayName = "ModalBody";

const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "border-border-light flex justify-end gap-4 border-t p-6",
                className,
            )}
            {...props}
        />
    ),
);

ModalFooter.displayName = "ModalFooter";

export { Modal, ModalContent, ModalHeader, ModalTitle, ModalBody, ModalFooter };
