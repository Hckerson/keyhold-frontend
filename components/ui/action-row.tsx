import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ActionRowProps {
    title: string;
    description?: string;
    action: ReactNode;
    danger?: boolean;
    className?: string;
}

export function ActionRow({
    title,
    description,
    action,
    danger,
    className,
}: ActionRowProps) {
    return (
        <div
            className={cn(
                "flex items-center justify-between gap-4 rounded-lg border p-3",
                danger
                    ? "border-error/20 bg-error/5"
                    : "border-border-light bg-background",
                className,
            )}
        >
            <div className="min-w-0">
                <p
                    className={cn(
                        "text-sm font-medium",
                        danger ? "text-error" : "text-text",
                    )}
                >
                    {title}
                </p>
                {description && (
                    <p
                        className={cn(
                            "mt-0.5 text-xs",
                            danger ? "text-error/70" : "text-text-secondary",
                        )}
                    >
                        {description}
                    </p>
                )}
            </div>
            <div className="shrink-0">{action}</div>
        </div>
    );
}

ActionRow.displayName = "ActionRow";
