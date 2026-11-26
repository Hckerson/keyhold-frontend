import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface SpotlightPanelProps extends HTMLAttributes<HTMLElement> {
    as?: "section" | "article";
}

export function SpotlightPanel({
    as: Element = "section",
    className,
    ...props
}: SpotlightPanelProps) {
    return (
        <Element
            className={cn(
                "border-accent/25 bg-background rounded-xl border p-4 shadow-md",
                className,
            )}
            {...props}
        />
    );
}

SpotlightPanel.displayName = "SpotlightPanel";
