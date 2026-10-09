import type { ReactNode } from "react";

export interface ReviewActionsProps {
    lede: string;
    children: ReactNode;
}

export function ReviewActions({ lede, children }: ReviewActionsProps) {
    return (
        <div className="border-border-light bg-background-alt flex flex-wrap items-center justify-between gap-3 border-t px-4 py-3">
            <p className="text-text-secondary text-xs tabular-nums">{lede}</p>
            <div className="flex flex-wrap items-center gap-2">{children}</div>
        </div>
    );
}

ReviewActions.displayName = "ReviewActions";
