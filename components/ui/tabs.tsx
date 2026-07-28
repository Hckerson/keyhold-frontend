"use client";

import {
    createContext,
    forwardRef,
    useContext,
    useId,
    useState,
    type HTMLAttributes,
    type KeyboardEvent,
    type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

interface TabsContextValue {
    value: string;
    setValue: (next: string) => void;
    baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(consumer: string) {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error(`${consumer} must be rendered inside <Tabs>`);
    }
    return context;
}

interface TabsProps extends HTMLAttributes<HTMLDivElement> {
    defaultValue: string;
    value?: string;
    onValueChange?: (value: string) => void;
    children: ReactNode;
}

interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
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
    (
        { defaultValue, value, onValueChange, className, children, ...props },
        ref,
    ) => {
        const [internal, setInternal] = useState(defaultValue);
        const baseId = useId();
        const current = value ?? internal;

        const setValue = (next: string) => {
            onValueChange?.(next);
            if (value === undefined) setInternal(next);
        };

        return (
            <TabsContext.Provider value={{ value: current, setValue, baseId }}>
                <div
                    ref={ref}
                    className={cn("flex flex-col", className)}
                    {...props}
                >
                    {children}
                </div>
            </TabsContext.Provider>
        );
    },
);

Tabs.displayName = "Tabs";

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
    ({ className, onKeyDown, ...props }, ref) => {
        const { setValue } = useTabsContext("TabsList");

        const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
            onKeyDown?.(event);
            const step =
                event.key === "ArrowRight"
                    ? 1
                    : event.key === "ArrowLeft"
                      ? -1
                      : 0;
            if (step === 0) return;

            event.preventDefault();
            const tabs = Array.from(
                event.currentTarget.querySelectorAll<HTMLButtonElement>(
                    '[role="tab"]',
                ),
            );
            const active = tabs.findIndex(
                (tab) => tab === document.activeElement,
            );
            const next = tabs[(active + step + tabs.length) % tabs.length];
            if (!next?.dataset.value) return;

            setValue(next.dataset.value);
            next.focus();
        };

        return (
            <div
                ref={ref}
                role="tablist"
                onKeyDown={handleKeyDown}
                className={cn(
                    "border-border flex gap-1 border-b select-none",
                    className,
                )}
                {...props}
            />
        );
    },
);

TabsList.displayName = "TabsList";

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
    ({ value, className, onClick, ...props }, ref) => {
        const {
            value: current,
            setValue,
            baseId,
        } = useTabsContext("TabsTrigger");
        const active = current === value;

        return (
            <button
                ref={ref}
                type="button"
                role="tab"
                id={`${baseId}-tab-${value}`}
                data-value={value}
                aria-selected={active}
                aria-controls={`${baseId}-panel-${value}`}
                tabIndex={active ? 0 : -1}
                onClick={(event) => {
                    onClick?.(event);
                    setValue(value);
                }}
                className={cn(
                    "ease-smooth focus-visible:ring-accent -mb-px border-b-2 px-3 py-2 text-xs font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none",
                    active
                        ? "border-accent text-text"
                        : "text-text-secondary hover:text-text border-transparent",
                    className,
                )}
                {...props}
            />
        );
    },
);

TabsTrigger.displayName = "TabsTrigger";

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
    ({ value, className, ...props }, ref) => {
        const { value: current, baseId } = useTabsContext("TabsContent");
        if (current !== value) return null;

        return (
            <div
                ref={ref}
                role="tabpanel"
                id={`${baseId}-panel-${value}`}
                aria-labelledby={`${baseId}-tab-${value}`}
                className={cn("pt-4", className)}
                {...props}
            />
        );
    },
);

TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
