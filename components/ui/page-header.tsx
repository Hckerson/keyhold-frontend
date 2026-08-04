import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface PageHeaderProps {
    title: string;
    description?: string;
    action?: ReactNode;
    className?: string;
}

export function PageHeader({
    title,
    description,
    action,
    className,
}: PageHeaderProps) {
    return (
        <div
            className={cn(
                "flex flex-wrap items-start justify-between gap-4",
                className,
            )}
        >
            <div className="space-y-1">
                <h1 className="text-h4 font-display text-text font-light">
                    {title}
                </h1>
                {description && (
                    <p className="text-text-secondary text-xs">{description}</p>
                )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
        </div>
    );
}

PageHeader.displayName = "PageHeader";
