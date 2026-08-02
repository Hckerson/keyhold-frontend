"use client";

import { useState, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { authLabelVariants } from "@/components/features/auth/parts/auth-label";

export interface AuthFieldProps extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type"
> {
    label: string;
    name: string;
    index: string;
    error?: string;
    hint?: ReactNode;
    type?: "text" | "email" | "password";
}

export function AuthField({
    label,
    name,
    index,
    error,
    hint,
    type = "text",
    id,
    className,
    ...props
}: AuthFieldProps) {
    const [revealed, setRevealed] = useState(false);

    const fieldId = id ?? name;
    const errorId = error ? `${fieldId}-error` : undefined;
    const isPassword = type === "password";

    return (
        <div
            className={cn(
                "ease-smooth border-l py-2 pl-3 transition-colors duration-200 first:pt-0 last:pb-0",
                error
                    ? "border-l-error"
                    : "border-l-border focus-within:border-l-highlight",
                className,
            )}
        >
            <div className="flex items-baseline gap-2">
                <span
                    aria-hidden="true"
                    className="text-text-muted font-mono text-[10px]"
                >
                    {index}
                </span>
                <label
                    htmlFor={fieldId}
                    className={cn(
                        authLabelVariants({ tier: "label" }),
                        error ? "text-error" : "text-text-secondary",
                    )}
                >
                    {label}
                </label>
                {hint && <span className="ml-auto">{hint}</span>}
            </div>

            <div className="relative mt-1">
                <input
                    id={fieldId}
                    name={name}
                    type={isPassword && revealed ? "text" : type}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={errorId}
                    className={cn(
                        "peer text-text placeholder:text-text-muted ease-smooth w-full border-b bg-transparent pb-1.5 text-xs transition-colors duration-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                        error ? "border-b-error" : "border-b-border-dark",
                        isPassword && "pr-12",
                    )}
                    {...props}
                />
                <span
                    aria-hidden="true"
                    className={cn(
                        "ease-smooth absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 peer-focus-visible:scale-x-100",
                        error ? "bg-error" : "bg-accent",
                    )}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setRevealed((current) => !current)}
                        aria-pressed={revealed}
                        className={cn(
                            authLabelVariants({ tier: "label" }),
                            "text-text-muted hover:text-accent focus-visible:ring-accent ease-smooth absolute right-0 bottom-1.5 rounded-xs transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none",
                        )}
                    >
                        {revealed ? "Hide" : "Show"}
                    </button>
                )}
            </div>

            {error && (
                <p id={errorId} className="text-error mt-1.5 text-xs">
                    {error}
                </p>
            )}
        </div>
    );
}

AuthField.displayName = "AuthField";
