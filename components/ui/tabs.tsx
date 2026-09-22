"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { cn } from "@/lib/utils";

interface TabsProps extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "defaultValue"
> {
    defaultValue: string;
    value?: string;
    onValueChange?: (value: string) => void;
    children: ReactNode;
}

interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
    value: string;
    children: ReactNode;
}

interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
    value: string;
    children: ReactNode;
}

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
    ({ defaultValue, value, onValueChange, className, ...props }, ref) => (
        <BaseTabs.Root
            ref={ref}
            defaultValue={defaultValue}
            value={value}
            onValueChange={(next) => {
                if (typeof next === "string") onValueChange?.(next);
            }}
            className={cn("flex flex-col", className)}
            {...props}
        />
    ),
);

Tabs.displayName = "Tabs";

const TabsList = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, children, ...props }, ref) => (
        <BaseTabs.List
            ref={ref}
            className={cn(
                "border-border relative flex gap-1 border-b select-none",
                className,
            )}
            {...props}
        >
            {children}
            <BaseTabs.Indicator className="bg-accent ease-smooth absolute bottom-0 left-(--active-tab-left) h-0.5 w-(--active-tab-width) translate-y-px transition-[left,width] duration-200" />
        </BaseTabs.List>
    ),
);

TabsList.displayName = "TabsList";

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
    ({ className, ...props }, ref) => (
        <BaseTabs.Tab
            ref={ref}
            className={cn(
                "text-text-secondary hover:text-text data-active:text-text focus-visible:ring-accent ease-smooth px-3 py-2 text-xs font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none",
                className,
            )}
            {...props}
        />
    ),
);

TabsTrigger.displayName = "TabsTrigger";

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
    ({ className, ...props }, ref) => (
        <BaseTabs.Panel
            ref={ref}
            className={cn(
                "ease-smooth pt-4 transition-opacity duration-200 outline-none data-starting-style:opacity-0",
                className,
            )}
            {...props}
        />
    ),
);

TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
