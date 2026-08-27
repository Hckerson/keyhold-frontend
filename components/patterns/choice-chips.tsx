"use client";

import { cn } from "@/lib/utils";

export interface Choice<T extends string> {
    id: T;
    label: string;
    caption?: string;
}

export interface ChoiceChipsProps<T extends string> {
    choices: readonly Choice<T>[];
    selected: readonly T[];
    onToggle: (id: T) => void;
    label: string;
    className?: string;
}

export function ChoiceChips<T extends string>({
    choices,
    selected,
    onToggle,
    label,
    className,
}: ChoiceChipsProps<T>) {
    return (
        <div
            role="group"
            aria-label={label}
            className={cn("grid grid-cols-3 gap-2", className)}
        >
            {choices.map((choice) => {
                const active = selected.includes(choice.id);
                return (
                    <button
                        key={choice.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => onToggle(choice.id)}
                        className={cn(
                            "ease-smooth focus-visible:ring-accent flex flex-col items-start gap-0.5 rounded-lg border px-2.5 py-2 text-left transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none",
                            active
                                ? "border-accent bg-accent-light text-accent"
                                : "border-border bg-background text-text-secondary hover:border-border-dark hover:text-text",
                        )}
                    >
                        <span className="text-xs font-medium">
                            {choice.label}
                        </span>
                        {choice.caption && (
                            <span className="text-text-muted text-[10px] tabular-nums">
                                {choice.caption}
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}

ChoiceChips.displayName = "ChoiceChips";
