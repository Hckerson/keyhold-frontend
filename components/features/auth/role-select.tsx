"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RoleOption<T extends string> {
    value: T;
    label: string;
    description?: string;
}

export interface RoleSelectProps<T extends string> {
    label?: string;
    value: T;
    options: readonly RoleOption<T>[];
    onChange: (value: T) => void;
    error?: string;
    disabled?: boolean;
}

export function RoleSelect<T extends string>({
    label,
    value,
    options,
    onChange,
    error,
    disabled,
}: RoleSelectProps<T>) {
    return (
        <fieldset disabled={disabled}>
            {label && (
                <legend className="text-text mb-2 text-sm font-medium">
                    {label}
                </legend>
            )}
            <div
                role="radiogroup"
                aria-label={label}
                className="grid grid-cols-2 gap-2"
            >
                {options.map((option) => {
                    const selected = value === option.value;
                    return (
                        <button
                            key={option.value}
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            onClick={() => onChange(option.value)}
                            className={cn(
                                "ease-smooth rounded-lg border px-3 py-2.5 text-left transition-colors disabled:opacity-50",
                                selected
                                    ? "border-accent bg-accent-light"
                                    : "border-border bg-background hover:border-accent/40",
                            )}
                        >
                            <span className="flex items-center justify-between gap-2">
                                <span
                                    className={cn(
                                        "text-sm font-medium",
                                        selected ? "text-accent" : "text-text",
                                    )}
                                >
                                    {option.label}
                                </span>
                                {selected && (
                                    <Check
                                        size={16}
                                        strokeWidth={1.5}
                                        className="text-accent shrink-0"
                                    />
                                )}
                            </span>
                            {option.description && (
                                <span
                                    className={cn(
                                        "mt-0.5 block text-xs",
                                        selected
                                            ? "text-accent/80"
                                            : "text-text-muted",
                                    )}
                                >
                                    {option.description}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
            {error && <p className="text-error mt-1 text-xs">{error}</p>}
        </fieldset>
    );
}

RoleSelect.displayName = "RoleSelect";
