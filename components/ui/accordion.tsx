"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionProps extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "defaultValue"
> {
    defaultValue?: string[];
    value?: string[];
    onValueChange?: (value: string[]) => void;
    multiple?: boolean;
    children: ReactNode;
}

interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
    value: string;
    children: ReactNode;
}

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
    ({ onValueChange, className, ...props }, ref) => (
        <BaseAccordion.Root
            ref={ref}
            onValueChange={(next) =>
                onValueChange?.(
                    next.filter(
                        (entry): entry is string => typeof entry === "string",
                    ),
                )
            }
            className={cn("flex flex-col gap-2", className)}
            {...props}
        />
    ),
);

Accordion.displayName = "Accordion";

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
    ({ className, ...props }, ref) => (
        <BaseAccordion.Item
            ref={ref}
            className={cn(
                "border-border-light bg-background overflow-hidden rounded-lg border",
                className,
            )}
            {...props}
        />
    ),
);

AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = forwardRef<
    HTMLButtonElement,
    HTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
    <BaseAccordion.Header className="m-0">
        <BaseAccordion.Trigger
            ref={ref}
            className={cn(
                "text-text hover:bg-background-muted focus-visible:ring-accent ease-smooth group flex h-9 w-full items-center justify-between gap-2 px-3 text-left text-xs font-semibold transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset",
                className,
            )}
            {...props}
        >
            <span className="truncate">{children}</span>
            <ChevronDown
                className="text-text-muted ease-smooth size-3 shrink-0 transition-transform duration-200 group-data-panel-open:rotate-180"
                strokeWidth={1.5}
                aria-hidden="true"
            />
        </BaseAccordion.Trigger>
    </BaseAccordion.Header>
));

AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
    <BaseAccordion.Panel
        ref={ref}
        className="ease-smooth h-(--accordion-panel-height) overflow-hidden transition-[height] duration-300 data-ending-style:h-0 data-starting-style:h-0"
        {...props}
    >
        <div
            className={cn(
                "border-border-light bg-background-alt text-text-secondary border-t px-3 py-2 text-xs",
                className,
            )}
        >
            {children}
        </div>
    </BaseAccordion.Panel>
));

AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
