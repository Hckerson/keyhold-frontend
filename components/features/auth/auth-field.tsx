"use client";

import { useState, type ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AuthFieldGroupProps {
    children: ReactNode;
    className?: string;
}

export function AuthFieldGroup({ children, className }: AuthFieldGroupProps) {
    return (
        <div
            className={cn(
                "border-border divide-border-light bg-background-alt focus-within:border-accent/50 focus-within:ring-accent/10 ease-smooth divide-y overflow-hidden rounded-xl border shadow-sm transition-all focus-within:ring-[3px]",
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
    type?: React.HTMLInputTypeAttribute;
}

export function AuthField({
    label,
    error,
    secure,
    type = "text",
    id,
    className,
    ...props
}: AuthFieldProps) {
    const [visible, setVisible] = useState(false);
    const inputType = secure ? (visible ? "text" : "password") : type;

    return (
        <div className={cn("px-3.5 py-2", error && "bg-error/5")}>
            <div className="flex items-center justify-between gap-2">
                <label
                    htmlFor={id}
                    className="text-text-muted text-caption font-mono tracking-wide uppercase"
                >
                    {label}
                </label>
                {error && (
                    <span className="text-error text-caption font-medium">
                        {error}
                    </span>
                )}
            </div>
            <div className="flex items-center gap-2">
                <input
                    id={id}
                    type={inputType}
                    className={cn(
                        "text-text placeholder:text-text-muted w-full border-0 bg-transparent py-0.5 text-sm outline-none disabled:opacity-50",
                        className,
                    )}
                    {...props}
                />
                {secure && (
                    <button
                        type="button"
                        onClick={() => setVisible((v) => !v)}
                        aria-pressed={visible}
                        aria-label={visible ? "Hide password" : "Show password"}
                        className="text-text-muted hover:text-text ease-smooth shrink-0 transition-colors"
                    >
                        {visible ? (
                            <EyeOff size={15} strokeWidth={1.5} />
                        ) : (
                            <Eye size={15} strokeWidth={1.5} />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}

AuthField.displayName = "AuthField";
