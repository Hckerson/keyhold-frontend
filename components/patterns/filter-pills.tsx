"use client";

import { useId } from "react";
import { m } from "motion/react";
import { FAST } from "@/lib/config/motion";
import { cn } from "@/lib/utils";

export interface FilterPill<T extends string> {
    id: T;
    label: string;
}

export interface FilterPillsProps<T extends string> {
    filters: readonly FilterPill<T>[];
    active: T;
    onChange: (id: T) => void;
    counts?: Partial<Record<T, number>>;
    className?: string;
}

export function FilterPills<T extends string>({
    filters,
    active,
    onChange,
    counts,
    className,
}: FilterPillsProps<T>) {
    const groupId = useId();

    return (
        <div className={cn("flex flex-wrap items-center gap-2", className)}>
            {filters.map((filter) => {
                const selected = active === filter.id;
                const count = counts?.[filter.id];
                return (
                    <button
                        key={filter.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => onChange(filter.id)}
                        className={cn(
                            "ease-smooth focus-visible:ring-accent relative inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none",
                            selected
                                ? "text-accent border-transparent"
                                : "border-border bg-background text-text-secondary hover:text-text hover:border-border-dark",
                        )}
                    >
                        {selected && (
                            <m.span
                                layoutId={`${groupId}-pill`}
                                transition={FAST}
                                aria-hidden="true"
                                className="border-accent bg-accent-light absolute -inset-px rounded-lg border"
                            />
                        )}
                        <span className="relative inline-flex items-center gap-1.5">
                            {filter.label}
                            {count !== undefined && (
                                <span className="tabular-nums opacity-70">
                                    {count}
                                </span>
                            )}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
