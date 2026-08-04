import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
    icon?: LucideIcon;
    title: string;
    description?: string;
    action?: ReactNode;
    className?: string;
}

export function EmptyState({
    icon: Icon,
    title,
    description,
    action,
    className,
}: EmptyStateProps) {
    return (
        <div
            className={cn(
                "border-border-light bg-background-alt flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed py-8 text-center",
                className,
            )}
        >
            {Icon && (
                <span className="bg-background-muted text-text-muted border-border-light grid size-8 place-items-center rounded-full border">
                    <Icon className="size-4" strokeWidth={1.5} />
                </span>
            )}
            <div className="space-y-0.5">
                <p className="text-text text-xs font-semibold">{title}</p>
                {description && (
                    <p className="text-text-secondary mx-auto max-w-[46ch] text-xs">
                        {description}
                    </p>
                )}
            </div>
            {action && <div className="mt-1">{action}</div>}
        </div>
    );
}

EmptyState.displayName = "EmptyState";
