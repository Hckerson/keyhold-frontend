"use client";

import { Plus } from "lucide-react";

export interface SuggestionChipsProps {
    label: string;
    options: readonly string[];
    held: readonly string[];
    onAdd: (value: string) => void;
}

export function SuggestionChips({
    label,
    options,
    held,
    onAdd,
}: SuggestionChipsProps) {
    const offered = options.filter(
        (option) =>
            !held.some((value) => value.toLowerCase() === option.toLowerCase()),
    );

    if (offered.length === 0) return null;

    return (
        <div className="flex flex-wrap items-center gap-1.5">
            <span className="micro-label">{label}</span>
            {offered.map((option) => (
                <button
                    key={option}
                    type="button"
                    onClick={() => onAdd(option)}
                    className="border-border text-text-secondary hover:border-accent hover:text-accent focus-visible:ring-accent ease-smooth inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                >
                    <Plus size={10} strokeWidth={1.5} aria-hidden="true" />
                    {option}
                </button>
            ))}
        </div>
    );
}

SuggestionChips.displayName = "SuggestionChips";
