import type { ReactNode } from "react";
import {
    SectionEyebrow,
    type SectionEyebrowProps,
} from "@/components/patterns/section-eyebrow";
import { cn } from "@/lib/utils";

export function SectionHeading({
    eyebrow,
    title,
    tone,
    className,
}: {
    eyebrow: string;
    title: ReactNode;
    tone?: SectionEyebrowProps["tone"];
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
