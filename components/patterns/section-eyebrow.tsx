import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const sectionEyebrowClass =
    "font-mono text-[10px] tracking-[0.18em] uppercase";

export interface SectionEyebrowProps {
    children: ReactNode;
    tone?: "brass" | "muted";
}

export function SectionEyebrow({
    children,
    tone = "brass",
}: SectionEyebrowProps) {
    return (
        <p
            className={cn(
                sectionEyebrowClass,
                tone === "brass" ? "text-highlight-dark" : "text-text-muted",
            )}
        >
            {children}
        </p>
    );
}

SectionEyebrow.displayName = "SectionEyebrow";
