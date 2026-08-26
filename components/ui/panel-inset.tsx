import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface PanelInsetProps {
    children: ReactNode;
    flush?: boolean;
    scroll?: boolean;
    className?: string;
}

export function PanelInset({
    children,
    flush,
    scroll,
    className,
}: PanelInsetProps) {
    return (
        <div
            className={cn(
                "bg-background border-border-light rounded-md border",
                scroll ? "scroll-x" : flush ? "overflow-hidden" : "px-3",
                className,
            )}
        >
            {children}
        </div>
    );
}

PanelInset.displayName = "PanelInset";
