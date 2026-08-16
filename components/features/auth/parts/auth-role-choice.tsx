"use client";

import { AnimatePresence, m } from "motion/react";
import type { UserRole } from "@/lib/types/auth";
import { authLabelVariants } from "@/components/features/auth/parts/auth-label";
import { AUTH_COLLAPSE_MOTION } from "@/lib/config/auth-motion";
import { cn } from "@/lib/utils";

export type SignupRole = Extract<UserRole, "BUYER" | "SELLER">;

const ROLE_OPTIONS: {
    value: SignupRole;
    label: string;
    description: string;
}[] = [
    {
        value: "BUYER",
        label: "Buying",
        description: "Seeking a residence",
    },
    {
        value: "SELLER",
        label: "Listing",
        description: "Offering a property",
    },
];

export interface AuthRoleChoiceProps {
    name: string;
    index: string;
    legend: string;
    value: SignupRole | null;
    error?: string;
    onChange: (role: SignupRole) => void;
}

export function AuthRoleChoice({
    name,
    index,
    legend,
    value,
    error,
    onChange,
}: AuthRoleChoiceProps) {
    const errorId = error ? `${name}-error` : undefined;
    const selectedIndex = ROLE_OPTIONS.findIndex(
        (option) => option.value === value,
    );

    return (
        <fieldset
            className={cn(
                "ease-smooth flex flex-col gap-1.5 border-l py-2 pl-3 transition-colors duration-200 first:pt-0",
                error
                    ? "border-l-error"
                    : "border-l-border focus-within:border-l-highlight",
            )}
            aria-invalid={error ? true : undefined}
            aria-describedby={errorId}
        >
            <legend className="flex items-baseline gap-2">
                <span
                    aria-hidden="true"
                    className="text-text-muted font-mono text-[10px]"
                >
                    {index}
                </span>
                <span
                    className={cn(
                        authLabelVariants({ tier: "label" }),
                        error ? "text-error" : "text-text-secondary",
                    )}
                >
                    {legend}
                </span>
            </legend>

            <div className="border-border-dark bg-background relative grid grid-cols-2 rounded-xs border">
                <span
                    aria-hidden="true"
                    className={cn(
                        "bg-highlight ease-smooth absolute top-0 left-0 h-px w-1/2 transition-all duration-300",
                        selectedIndex < 0 && "opacity-0",
                        selectedIndex > 0 && "translate-x-full",
                    )}
                />
                {ROLE_OPTIONS.map((option, position) => {
                    const selected = value === option.value;

                    return (
                        <label
                            key={option.value}
                            className={cn(
                                "ease-smooth has-focus-visible:ring-accent flex cursor-pointer flex-col gap-0.5 px-3 py-2 transition-colors duration-200 has-focus-visible:ring-2",
                                position > 0 && "border-border border-l",
                                selected
                                    ? "bg-accent-light"
                                    : "hover:bg-background-muted",
                            )}
                        >
                            <input
                                type="radio"
                                name={name}
                                value={option.value}
                                checked={selected}
                                onChange={() => onChange(option.value)}
                                className="sr-only"
                            />
                            <span
                                className={cn(
                                    authLabelVariants({ tier: "label" }),
                                    selected ? "text-accent" : "text-text",
                                )}
                            >
                                {option.label}
                            </span>
                            <span className="text-text-secondary text-xs">
                                {option.description}
                            </span>
                        </label>
                    );
                })}
            </div>

            <AnimatePresence initial={false}>
                {error && (
                    <m.div
                        key="error"
                        {...AUTH_COLLAPSE_MOTION}
                        className="overflow-hidden"
                    >
                        <p id={errorId} className="text-error text-xs">
                            {error}
                        </p>
                    </m.div>
                )}
            </AnimatePresence>
        </fieldset>
    );
}

AuthRoleChoice.displayName = "AuthRoleChoice";
