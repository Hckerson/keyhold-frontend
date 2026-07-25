"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SignupFieldSpec } from "@/components/features/auth/join/signup-fields";

export interface CredentialSlatProps {
    spec: SignupFieldSpec;
    value: string;
    valid: boolean;
    error?: string;
    secureVisible: boolean;
    disabled: boolean;
    autoFocus?: boolean;
    onChange: (value: string) => void;
    onBlur: () => void;
}

export function CredentialSlat({
    spec,
    value,
    valid,
    error,
    secureVisible,
    disabled,
    autoFocus,
    onChange,
    onBlur,
}: CredentialSlatProps) {
    const inputType = spec.secure
        ? secureVisible
            ? "text"
            : "password"
        : (spec.type ?? "text");

    return (
        <div className="group flex flex-col gap-1">
            <label
                htmlFor={spec.id}
                className={cn(
                    "ease-smooth font-mono text-[10px] tracking-[0.14em] uppercase transition-colors duration-200 select-none",
                    error
                        ? "text-error-light"
                        : "text-sidebar-text group-focus-within:text-highlight-light",
                )}
            >
                {spec.label}
            </label>

            <div className="relative flex items-center gap-2 pb-2">
                <input
                    id={spec.id}
                    name={spec.id}
                    type={inputType}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    onBlur={onBlur}
                    autoComplete={spec.autoComplete}
                    placeholder={spec.placeholder}
                    autoFocus={autoFocus}
                    disabled={disabled}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? `${spec.id}-error` : undefined}
                    className="field-on-glass text-text-inverse placeholder:text-sidebar-text focus-visible:ring-highlight w-full min-w-0 rounded-xs border-0 bg-transparent py-1.5 text-xs outline-none focus-visible:ring-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-transparent disabled:opacity-50"
                />

                <Check
                    size={12}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className={cn(
                        "ease-smooth text-success shrink-0 transition-opacity duration-200",
                        valid ? "opacity-100" : "opacity-0",
                    )}
                />

                <span
                    aria-hidden="true"
                    className="bg-sidebar-border absolute inset-x-0 bottom-0 h-px"
                />
                <span
                    aria-hidden="true"
                    className={cn(
                        "ease-smooth absolute inset-x-0 bottom-0 h-px transition-all duration-300",
                        error
                            ? "bg-error w-full"
                            : valid
                              ? "bg-success w-full"
                              : "bg-highlight w-0 group-focus-within:w-full",
                    )}
                />
            </div>

            {error && (
                <p
                    id={`${spec.id}-error`}
                    className="text-error-light text-xs leading-[1.5]"
                >
                    {error}
                </p>
            )}
        </div>
    );
}

CredentialSlat.displayName = "CredentialSlat";
