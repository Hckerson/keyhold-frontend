"use client";

import { Check } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { AUTH_COLLAPSE_MOTION } from "@/lib/config/auth-motion";
import { cn } from "@/lib/utils";

export interface AuthCheckProps extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type"
> {
    id: string;
    label: ReactNode;
    error?: string;
}

export function AuthCheck({
    id,
    label,
    error,
    className,
    ...props
}: AuthCheckProps) {
    const errorId = error ? `${id}-error` : undefined;

    return (
        <div className={cn("flex flex-col gap-1", className)}>
            <div className="flex items-start gap-2">
                <span className="relative mt-px inline-flex size-4 shrink-0">
                    <input
                        type="checkbox"
                        id={id}
                        aria-invalid={error ? true : undefined}
                        aria-describedby={errorId}
                        className="peer absolute inset-0 z-10 cursor-pointer opacity-0 disabled:cursor-not-allowed"
                        {...props}
                    />
                    <span
                        aria-hidden="true"
                        className={cn(
                            "ease-smooth peer-focus-visible:ring-accent grid size-4 place-items-center rounded-xs border transition-colors duration-200 peer-focus-visible:ring-2 peer-checked:[&_svg]:scale-100",
                            error
                                ? "border-error bg-background"
                                : "border-border-dark bg-background peer-checked:border-highlight peer-checked:bg-highlight-light",
                        )}
                    >
                        <Check
                            strokeWidth={1.5}
                            className="text-highlight-dark ease-smooth size-3 scale-0 transition-transform duration-200"
                        />
                    </span>
                </span>
                <label
                    htmlFor={id}
                    className="text-text-secondary cursor-pointer text-xs"
                >
                    {label}
                </label>
            </div>
            <AnimatePresence initial={false}>
                {error && (
                    <m.div
                        key="error"
                        {...AUTH_COLLAPSE_MOTION}
                        className="overflow-hidden"
                    >
                        <p id={errorId} className="text-error pl-6 text-xs">
                            {error}
                        </p>
                    </m.div>
                )}
            </AnimatePresence>
        </div>
    );
}

AuthCheck.displayName = "AuthCheck";
