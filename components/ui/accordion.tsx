import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
    value: string;
    children: ReactNode;
}

interface AccordionTriggerProps extends HTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn("space-y-2", className)} {...props} />
    ),
);

Accordion.displayName = "Accordion";

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
    ({ value, className, ...props }, ref) => (
        <div
            ref={ref}
            data-value={value}
            className={cn(
                "border-border overflow-hidden rounded-sm border",
                className,
            )}
            {...props}
        />
    ),
);

AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
    ({ className, ...props }, ref) => (
        <button
            ref={ref}
            className={cn(
                "text-text hover:bg-background-muted flex w-full items-center justify-between px-4 py-3 text-left font-medium transition-colors",
                className,
            )}
            {...props}
        />
    ),
);

AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "bg-background-alt text-text-secondary px-4 py-3",
                className,
            )}
            {...props}
        />
    ),
);

AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
