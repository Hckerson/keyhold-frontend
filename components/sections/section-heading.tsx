import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionEyebrow({
    children,
    tone = "brass",
}: {
    children: ReactNode;
    tone?: "brass" | "muted";
}) {
    return (
        <p
            className={cn(
                "font-mono text-[10px] tracking-[0.18em] uppercase",
                tone === "brass" ? "text-highlight-dark" : "text-text-muted",
            )}
        >
            {children}
        </p>
    );
}

SectionEyebrow.displayName = "SectionEyebrow";

export function SectionHeading({
    eyebrow,
    title,
    tone,
    className,
}: {
    eyebrow: string;
    title: ReactNode;
    tone?: "brass" | "muted";
    className?: string;
}) {
    return (
        <div className={cn("flex flex-col gap-2.5", className)}>
            <SectionEyebrow tone={tone}>{eyebrow}</SectionEyebrow>
            <h2 className="font-display text-text text-h4 leading-[1.12] font-light tracking-tight">
                {title}
            </h2>
        </div>
    );
}

SectionHeading.displayName = "SectionHeading";
