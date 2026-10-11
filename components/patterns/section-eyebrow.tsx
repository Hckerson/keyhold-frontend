import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const sectionEyebrowClass =
    "font-mono text-[10px] tracking-[0.18em] uppercase";

export interface SectionEyebrowProps {
    children: ReactNode;
    tone?: "accent" | "muted";
}

export function SectionEyebrow({
    children,
    tone = "accent",
}: SectionEyebrowProps) {
    return (
        <p
            className={cn(
                sectionEyebrowClass,
                tone === "accent" ? "text-accent" : "text-text-muted",
            )}
        >
            {children}
        </p>
    );
}

SectionEyebrow.displayName = "SectionEyebrow";
