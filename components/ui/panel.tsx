import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface PanelProps {
    title?: string;
    action?: ReactNode;
    children: ReactNode;
    className?: string;
    bodyClassName?: string;
}

export function Panel({
    title,
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
            {(title || action) && (
                <div className="mb-4 flex items-center justify-between gap-3">
                    {title && (
                        <h3 className="text-h6 font-display text-text font-light">
                            {title}
                        </h3>
                    )}
                    {action}
                </div>
            )}
            <div className={bodyClassName}>{children}</div>
        </section>
    );
}

Panel.displayName = "Panel";
