import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionShell({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "gutter-x gutter-x--inset mx-auto w-full max-w-[1280px]",
                className,
            )}
        >
            {children}
        </div>
    );
}

SectionShell.displayName = "SectionShell";
