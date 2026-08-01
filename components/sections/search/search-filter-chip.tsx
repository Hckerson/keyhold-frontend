"use client";

import { cn } from "@/lib/utils";

export interface SearchFilterChipProps {
    label: string;
    count: number;
    active: boolean;
    onToggle: () => void;
}

const chipBase =
    "ease-smooth focus-visible:ring-accent inline-flex h-6 shrink-0 items-center gap-1.5 rounded-md border py-0 pr-1 pl-2 text-xs transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40";

const countBase =
    "rounded-xs px-1 font-mono text-[10px] leading-4 tabular-nums";

export function SearchFilterChip({
    label,
    count,
    active,
    onToggle,
}: SearchFilterChipProps) {
    const exhausted = count === 0;

    return (
        <button
            type="button"
            onClick={onToggle}
            aria-pressed={active}
            disabled={exhausted}
            className={cn(
                chipBase,
                active
                    ? "border-accent bg-accent-light text-accent font-medium"
                    : "border-border bg-background text-text-secondary hover:border-border-dark hover:text-text",
            )}
        >
            {label}
            <span
                className={cn(
                    countBase,
                    active
                        ? "bg-accent text-text-inverse"
                        : "bg-background-alt text-text-muted",
                )}
            >
                {count}
            </span>
        </button>
    );
}

SearchFilterChip.displayName = "SearchFilterChip";
