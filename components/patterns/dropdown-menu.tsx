"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

interface DropdownMenuTriggerProps extends HTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

interface DropdownMenuContentProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

interface DropdownMenuItemProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn("group relative inline-block", className)}
            {...props}
        />
    ),
);

DropdownMenu.displayName = "DropdownMenu";

const DropdownMenuTrigger = forwardRef<
    HTMLButtonElement,
    DropdownMenuTriggerProps
>(({ className, ...props }, ref) => (
    <button
        ref={ref}
        className={cn(
            "bg-background-muted border-border text-text hover:border-accent inline-flex items-center justify-center rounded-sm border px-4 py-2 transition-colors",
            className,
        )}
        {...props}
    />
));

DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

const DropdownMenuContent = forwardRef<
    HTMLDivElement,
    DropdownMenuContentProps
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "bg-background-muted border-border absolute right-0 z-50 mt-2 hidden w-48 rounded-sm border py-1 shadow-lg group-hover:block",
            className,
        )}
        {...props}
    />
));

DropdownMenuContent.displayName = "DropdownMenuContent";

const DropdownMenuItem = forwardRef<HTMLDivElement, DropdownMenuItemProps>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "text-text hover:bg-background flex h-8 cursor-pointer items-center px-3 text-xs transition-colors",
                className,
            )}
            {...props}
        />
    ),
);

DropdownMenuItem.displayName = "DropdownMenuItem";

export {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
};
