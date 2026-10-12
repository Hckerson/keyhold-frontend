"use client";

import { Select as BaseSelect } from "@base-ui/react/select";
import { Check, ChevronDown, type LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import {
    FLOATING_ITEM,
    FLOATING_POSITIONER,
    FLOATING_SIDE_OFFSET,
    FLOATING_SURFACE,
} from "@/lib/config/floating";
import { cn } from "@/lib/utils";
import type { SelectOption } from "@/lib/types";

const triggerVariants = cva(
    "text-text focus-visible:ring-accent/40 ease-smooth flex w-full items-center gap-2 text-left transition-colors duration-200 select-none focus-visible:ring-2 focus-visible:outline-none data-disabled:cursor-not-allowed data-disabled:opacity-50",
    {
        variants: {
            size: {
                sm: "h-8 px-2.5 text-xs",
                lg: "h-11 px-3 text-sm",
            },
            variant: {
                boxed: "border-border bg-background-alt hover:border-border-dark focus-visible:border-accent data-popup-open:border-accent rounded-md border",
                bare: "text-text-secondary hover:text-text data-popup-open:text-text h-auto rounded-sm bg-transparent px-0 text-xs",
            },
        },
        defaultVariants: { size: "sm", variant: "boxed" },
    },
);

const optionVariants = cva(
    "text-text-secondary data-selected:text-text data-selected:font-medium justify-between",
    {
        variants: {
            size: {
                sm: "text-xs",
                lg: "h-9 px-2.5 text-sm",
            },
        },
        defaultVariants: { size: "sm" },
    },
);

export interface SelectProps<T extends string> extends VariantProps<
    typeof triggerVariants
> {
    options: readonly SelectOption<T>[];
    value: T;
    onChange: (next: T) => void;
    label: string;
    id?: string;
    icon?: LucideIcon;
    align?: "start" | "end";
    disabled?: boolean;
    className?: string;
}

export function Select<T extends string>({
    options,
    value,
    onChange,
    label,
    id,
    icon: Icon,
    align = "start",
    disabled,
    size,
    variant,
    className,
}: SelectProps<T>) {
    return (
        <div className={cn("relative shrink-0", className)}>
            <BaseSelect.Root
                items={options}
                value={value}
                disabled={disabled}
                onValueChange={(next) => {
                    if (next !== null) onChange(next);
                }}
            >
                <BaseSelect.Trigger
                    id={id}
                    aria-label={label}
                    className={cn(triggerVariants({ size, variant }))}
                >
                    {Icon && (
                        <Icon
                            className="text-text-muted size-3 shrink-0"
                            strokeWidth={1.5}
                            aria-hidden="true"
                        />
                    )}
                    <BaseSelect.Value className="flex-1 truncate" />
                    <BaseSelect.Icon className="text-text-muted ease-smooth shrink-0 transition-transform duration-200 data-popup-open:rotate-180">
                        <ChevronDown
                            className="size-3"
                            strokeWidth={1.5}
                            aria-hidden="true"
                        />
                    </BaseSelect.Icon>
                </BaseSelect.Trigger>

                <BaseSelect.Portal>
                    <BaseSelect.Positioner
                        align={align}
                        sideOffset={FLOATING_SIDE_OFFSET}
                        alignItemWithTrigger={false}
                        className={FLOATING_POSITIONER}
                    >
                        <BaseSelect.Popup
                            className={cn(
                                FLOATING_SURFACE,
                                "max-w-64 min-w-(--anchor-width)",
                            )}
                        >
                            <BaseSelect.List className="max-h-[min(16rem,var(--available-height))] overflow-y-auto p-1">
                                {options.map((option) => (
                                    <BaseSelect.Item
                                        key={option.value}
                                        value={option.value}
                                        className={cn(
                                            FLOATING_ITEM,
                                            optionVariants({ size }),
                                        )}
                                    >
                                        <BaseSelect.ItemText className="truncate">
                                            {option.label}
                                        </BaseSelect.ItemText>
                                        <BaseSelect.ItemIndicator className="text-accent shrink-0">
                                            <Check
                                                className="size-3"
                                                strokeWidth={1.5}
                                                aria-hidden="true"
                                            />
                                        </BaseSelect.ItemIndicator>
                                    </BaseSelect.Item>
                                ))}
                            </BaseSelect.List>
                        </BaseSelect.Popup>
                    </BaseSelect.Positioner>
                </BaseSelect.Portal>
            </BaseSelect.Root>
        </div>
    );
}

Select.displayName = "Select";
