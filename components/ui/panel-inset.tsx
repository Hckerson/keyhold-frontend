import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface PanelInsetProps {
    children: ReactNode;
    flush?: boolean;
    className?: string;
}

export function PanelInset({ children, flush, className }: PanelInsetProps) {
    return (
        <div
            className={cn(
                "bg-background border-border-light mt-2.5 rounded-md border",
                flush ? "overflow-hidden" : "px-3",
                className,
            )}
        >
            {children}
        </div>
    );
}

PanelInset.displayName = "PanelInset";
