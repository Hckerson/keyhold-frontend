"use client";

import { cn, formatCount } from "@/lib/utils";
import type { SegmentOption } from "@/lib/types";

export interface SegmentedFilterProps<T extends string> {
    label: string;
    options: SegmentOption<T>[];
    active: T;
    onChange: (next: T) => void;
    className?: string;
}

export function SegmentedFilter<T extends string>({
    label,
    options,
    active,
    onChange,
    className,
}: SegmentedFilterProps<T>) {
    return (
        <div
            role="group"
            aria-label={label}
            className={cn(
                "border-border bg-background-muted flex h-8 max-w-full shrink-0 gap-0.5 overflow-x-auto rounded-lg border p-0.5",
                className,
            )}
        >
            {options.map((option) => {
                const pressed = option.id === active;

                return (
                    <button
                        key={option.id}
                        type="button"
                        aria-pressed={pressed}
                        onClick={() => onChange(option.id)}
                        className={cn(
                            "focus-visible:ring-accent ease-smooth flex shrink-0 items-center gap-1.5 rounded-md px-2 text-xs font-medium whitespace-nowrap transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none",
                            pressed
                                ? "bg-background text-text shadow-sm"
                                : "text-text-secondary hover:text-text",
                        )}
                    >
                        {option.label}
                        <span
                            className={cn(
                                "tabular-nums",
                                pressed ? "text-accent" : "text-text-muted",
                            )}
                        >
                            {formatCount(option.count)}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}

SegmentedFilter.displayName = "SegmentedFilter";
