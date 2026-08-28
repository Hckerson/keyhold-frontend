import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface PanelProps {
    title?: string;
    description?: string;
    count?: number | string;
    countQuiet?: boolean;
    action?: ReactNode;
    toolbar?: ReactNode;
    children: ReactNode;
    className?: string;
    bodyClassName?: string;
}

export function Panel({
    title,
    description,
    count,
    countQuiet,
    action,
    toolbar,
    children,
    className,
    bodyClassName,
}: PanelProps) {
    const hasHeader = title || description || action || toolbar;

    return (
        <section
            className={cn(
                "bg-background-muted border-border-light rounded-xl border p-4 pt-3 shadow-sm",
                className,
            )}
        >
            {hasHeader && (
                <header className="border-border-light bg-background-alt -mx-4 -mt-3 rounded-t-xl border-b px-4">
                    <div className="flex min-h-11 items-center justify-between gap-3 py-2">
                        {(title || description) && (
                            <div className="min-w-0">
                                <div className="flex items-baseline gap-2">
                                    {title && (
                                        <h3 className="text-h6 font-display text-text truncate font-light">
                                            {title}
                                        </h3>
                                    )}
                                    {count !== undefined && (
                                        <span
                                            className={cn(
                                                "border-border-light bg-background shrink-0 rounded-md border px-1.5 py-px font-mono text-[10px] tabular-nums",
                                                countQuiet
                                                    ? "text-text-muted"
                                                    : "text-text-secondary",
                                            )}
                                        >
                                            {count}
                                        </span>
                                    )}
                                </div>
                                {description && (
                                    <p className="text-text-secondary truncate text-xs">
                                        {description}
                                    </p>
                                )}
                            </div>
                        )}
                        {action && (
                            <div className="ml-auto shrink-0">{action}</div>
                        )}
                    </div>
                    {toolbar && (
                        <div className="border-border-light -mx-4 flex min-h-10 flex-wrap items-center justify-between gap-2 border-t px-4 py-1">
                            {toolbar}
                        </div>
                    )}
                </header>
            )}
            <div
                className={cn(hasHeader && "space-y-2.5 pt-2.5", bodyClassName)}
            >
                {children}
            </div>
        </section>
    );
}

Panel.displayName = "Panel";
