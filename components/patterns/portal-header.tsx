import type { ReactNode } from "react";

export interface PortalHeaderProps {
    title: string;
    lede: string;
    summary?: string;
    action?: ReactNode;
}

export function PortalHeader({
    title,
    lede,
    summary,
    action,
}: PortalHeaderProps) {
    return (
        <header className="flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
                <h1 className="text-h4 font-display text-text font-light">
                    {title}
                </h1>
                <p className="text-text-secondary mt-0.5 text-xs">{lede}</p>
            </div>
            {(summary || action) && (
                <div className="flex min-w-0 flex-auto items-center justify-end gap-x-6 gap-y-2">
                    {summary && (
                        <p className="micro-label max-w-60 min-w-0 leading-relaxed text-pretty">
                            {summary}
                        </p>
                    )}
                    {action && (
                        <div className="flex shrink-0 items-center gap-2">
                            {action}
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}

PortalHeader.displayName = "PortalHeader";
