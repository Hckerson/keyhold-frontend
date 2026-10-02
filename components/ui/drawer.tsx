"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import {
    DIALOG_CLOSE_MARK,
    useDialogFocus,
} from "@/lib/hooks/use-dialog-focus";
import { useSettledContent } from "@/lib/hooks/use-settled-content";
import { cn, composeRefs } from "@/lib/utils";

const CLOSE_LABEL = "Close panel";

const drawerVariants = cva(
    "bg-background-muted border-border-dark ease-smooth z-modal fixed inset-y-0 right-0 flex w-full flex-col border-l shadow-2xl outline-none transition-[translate] duration-300 data-ending-style:translate-x-full data-starting-style:translate-x-full",
    {
        variants: {
            size: {
                sm: "drawer-panel--sm",
                md: "drawer-panel--md",
                lg: "drawer-panel--lg",
            },
        },
        defaultVariants: { size: "md" },
    },
);

export interface DrawerProps
    extends
        HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof drawerVariants> {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    label: string;
    children: ReactNode;
}

const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
    (
        { open, onOpenChange, label, size, className, children, ...props },
        ref,
    ) => {
        const content = useSettledContent(open, children);
        const { popupRef, initialFocus } = useDialogFocus();

        return (
            <Dialog.Root
                open={open}
                onOpenChange={(next) => onOpenChange(next)}
            >
                <Dialog.Portal>
                    <Dialog.Backdrop className="bg-overlay z-modal-backdrop ease-smooth fixed inset-0 transition-opacity duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0" />
                    <Dialog.Popup
                        ref={composeRefs(ref, popupRef)}
                        initialFocus={initialFocus}
                        aria-label={label}
                        className={cn(drawerVariants({ size }), className)}
                        {...props}
                    >
                        {content}
                    </Dialog.Popup>
                </Dialog.Portal>
            </Dialog.Root>
        );
    },
);

Drawer.displayName = "Drawer";

const DrawerHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, children, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "border-border-dark flex items-start justify-between gap-3 border-b px-4 py-3",
                className,
            )}
            {...props}
        >
            <div className="min-w-0">{children}</div>
            <Dialog.Close
                {...DIALOG_CLOSE_MARK}
                aria-label={CLOSE_LABEL}
                className="text-text-muted hover:text-text hover:bg-background-alt focus-visible:ring-accent ease-smooth grid size-6 shrink-0 place-items-center rounded-md transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
            >
                <X className="size-3" strokeWidth={1.5} aria-hidden="true" />
            </Dialog.Close>
        </div>
    ),
);

DrawerHeader.displayName = "DrawerHeader";

const DrawerTitle = forwardRef<
    HTMLHeadingElement,
    HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <Dialog.Title
        ref={ref}
        className={cn("text-text truncate text-xs font-medium", className)}
        {...props}
    />
));

DrawerTitle.displayName = "DrawerTitle";

const DrawerBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn("scroll-y flex-1 px-4 py-3", className)}
            {...props}
        />
    ),
);

DrawerBody.displayName = "DrawerBody";

const DrawerFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "border-border-dark bg-background-alt flex flex-wrap items-center gap-2 border-t px-4 py-3",
                className,
            )}
            {...props}
        />
    ),
);

DrawerFooter.displayName = "DrawerFooter";

export { Drawer, DrawerHeader, DrawerTitle, DrawerBody, DrawerFooter };
