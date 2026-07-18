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
                "border-border-light flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed py-12 text-center",
                className,
            )}
        >
            {Icon && (
                <span className="bg-background-muted text-text-muted grid size-11 place-items-center rounded-full">
                    <Icon size={20} strokeWidth={1.5} />
                </span>
            )}
            <div className="space-y-1">
                <p className="text-text text-sm font-medium">{title}</p>
                {description && (
                    <p className="text-text-secondary mx-auto max-w-sm text-sm">
                        {description}
                    </p>
                )}
            </div>
            {action && <div className="mt-1">{action}</div>}
        </div>
    );
}

EmptyState.displayName = "EmptyState";
