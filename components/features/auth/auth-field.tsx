"use client";

import { useState, type ReactNode } from "react";
import { Eye, EyeOff, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AuthFieldGroupProps {
    children: ReactNode;
    className?: string;
}

export function AuthFieldGroup({ children, className }: AuthFieldGroupProps) {
    return (
        <div
            className={cn(
                "border-border divide-border bg-background-alt divide-y overflow-hidden rounded-xl border",
                className,
            )}
        >
            {children}
        </div>
    );
}

AuthFieldGroup.displayName = "AuthFieldGroup";

export interface AuthFieldProps extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type"
> {
    label: string;
    error?: string;
    secure?: boolean;
    valid?: boolean;
    status?: ReactNode;
    type?: React.HTMLInputTypeAttribute;
}

export function AuthField({
    label,
    error,
    secure,
    valid,
    status,
    type = "text",
    id,
    className,
    ...props
}: AuthFieldProps) {
    const [visible, setVisible] = useState(false);
    const inputType = secure ? (visible ? "text" : "password") : type;

    return (
        <div
            className={cn(
                "ease-smooth focus-within:bg-accent-light/40 focus-within:ring-accent grid grid-cols-[76px_1fr_auto] items-center gap-2 px-3 py-2 transition-colors duration-200 focus-within:ring-1 focus-within:ring-inset",
                error && "bg-error/5",
            )}
        >
            <label
                htmlFor={id}
                className="text-text-muted truncate font-mono text-[10px] tracking-[0.1em] uppercase select-none"
            >
                {label}
            </label>

            <input
                id={id}
                type={inputType}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${id}-error` : undefined}
                className={cn(
                    "text-text placeholder:text-text-muted w-full min-w-0 border-0 bg-transparent text-xs outline-none disabled:opacity-50",
                    className,
                )}
                {...props}
            />

            <span className="flex items-center gap-2 justify-self-end">
                {error ? (
                    <span
                        id={`${id}-error`}
                        className="text-error max-w-32 truncate text-[10px]"
                    >
                        {error}
                    </span>
                ) : (
                    (status ??
                    (valid && (
                        <Check
                            size={12}
                            strokeWidth={1.5}
                            className="animate-in fade-in text-success"
                        />
                    )))
                )}

                {secure && (
                    <button
                        type="button"
                        onClick={() => setVisible((v) => !v)}
                        aria-pressed={visible}
                        aria-label={visible ? "Hide password" : "Show password"}
                        className="text-text-muted hover:text-text focus-visible:ring-accent ease-smooth shrink-0 rounded-xs transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                    >
                        {visible ? (
                            <EyeOff size={13} strokeWidth={1.5} />
                        ) : (
                            <Eye size={13} strokeWidth={1.5} />
                        )}
                    </button>
                )}
            </span>
        </div>
    );
}

AuthField.displayName = "AuthField";
