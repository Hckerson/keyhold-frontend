import { useId, type ReactNode } from "react";

export interface DeckPanelProps {
    title: string;
    summary?: string;
    action?: ReactNode;
    pending?: boolean;
    children: ReactNode;
}

export function DeckPanel({
    title,
    summary,
    action,
    pending,
    children,
}: DeckPanelProps) {
    const headingId = useId();

    return (
        <section
            aria-labelledby={headingId}
            aria-busy={pending || undefined}
            className="border-border bg-background flex h-full min-w-0 flex-col overflow-hidden rounded-xl border shadow-sm"
        >
            <header className="bg-background-alt border-border-light flex h-11 shrink-0 items-center gap-3 border-b pr-1 pl-3">
                <h2 id={headingId} className="micro-label shrink-0">
                    {title}
                </h2>
                {summary && (
                    <p className="text-text-secondary min-w-0 flex-1 truncate text-xs">
                        {summary}
                    </p>
                )}
                {action && <div className="ml-auto shrink-0">{action}</div>}
            </header>
            <div className="flex flex-1 flex-col gap-3 p-3">{children}</div>
        </section>
    );
}

DeckPanel.displayName = "DeckPanel";
