import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface PanelProps {
    title?: string;
    description?: string;
    count?: number | string;
    action?: ReactNode;
    children: ReactNode;
    className?: string;
    bodyClassName?: string;
}

export function Panel({
    title,
    description,
    count,
    action,
    children,
    className,
    bodyClassName,
}: PanelProps) {
    const hasHeader = title || description || action;

    return (
        <section
            className={cn(
                "bg-background-muted border-border-light rounded-xl border p-5 shadow-sm",
                className,
            )}
        >
            {hasHeader && (
                <div className="border-border-light -mx-5 -mt-5 mb-5 flex items-center justify-between gap-3 border-b px-5 py-3.5">
                    {(title || description) && (
                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                {title && (
                                    <h3 className="text-h6 font-display text-text font-light">
                                        {title}
                                    </h3>
                                )}
                                {count !== undefined && (
                                    <span className="bg-background-alt text-text-secondary rounded-full px-2 py-0.5 text-xs font-medium tabular-nums">
                                        {count}
                                    </span>
                                )}
                            </div>
                            {description && (
                                <p className="text-text-secondary mt-0.5 text-sm">
                                    {description}
                                </p>
                            )}
                        </div>
                    )}
                    {action && <div className="shrink-0">{action}</div>}
                </div>
            )}
            <div className={bodyClassName}>{children}</div>
        </section>
    );
}

Panel.displayName = "Panel";
