import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const errorIdFor = (fieldId: string) => `${fieldId}-error`;

export interface FieldShellProps {
    label: string;
    htmlFor: string;
    hint?: ReactNode;
    error?: string;
    children: ReactNode;
    className?: string;
}

export function FieldShell({
    label,
    htmlFor,
    hint,
    error,
    children,
    className,
}: FieldShellProps) {
    return (
        <div className={cn("flex w-full flex-col gap-1.5", className)}>
            <div className="flex items-baseline justify-between gap-3">
                <label
                    htmlFor={htmlFor}
                    className="text-text-secondary text-xs font-medium"
                >
                    {label}
                </label>
                {hint && (
                    <span className="text-text-muted text-xs">{hint}</span>
                )}
            </div>
            {children}
            {error && (
                <p id={errorIdFor(htmlFor)} className="text-error text-xs">
                    {error}
                </p>
            )}
        </div>
    );
}

FieldShell.displayName = "FieldShell";
