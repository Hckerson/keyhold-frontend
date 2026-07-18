import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface PanelProps {
    title?: string;
    description?: string;
    action?: ReactNode;
    children: ReactNode;
    className?: string;
    bodyClassName?: string;
}

export function Panel({
    title,
    description,
    action,
    children,
    className,
    bodyClassName,
}: PanelProps) {
    return (
        <section
            className={cn(
                "bg-background-muted border-border-light rounded-xl border p-5 shadow-sm",
                className,
            )}
        >
            {(title || description || action) && (
                <div className="mb-4 flex items-start justify-between gap-3">
                    {(title || description) && (
                        <div className="min-w-0">
                            {title && (
                                <h3 className="text-h6 font-display text-text font-light">
                                    {title}
                                </h3>
                            )}
                            {description && (
                                <p className="text-text-secondary mt-0.5 text-sm">
                                    {description}
                                </p>
                            )}
                        </div>
                    )}
                    {action}
                </div>
            )}
            <div className={bodyClassName}>{children}</div>
        </section>
    );
}

Panel.displayName = "Panel";
