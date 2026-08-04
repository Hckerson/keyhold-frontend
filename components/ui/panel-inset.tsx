import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface PanelInsetProps {
    children: ReactNode;
    className?: string;
}

export function PanelInset({ children, className }: PanelInsetProps) {
    return (
        <div
            className={cn(
                "bg-background border-border-light mt-2.5 rounded-md border px-3",
                className,
            )}
        >
            {children}
        </div>
    );
}

PanelInset.displayName = "PanelInset";
