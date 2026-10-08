import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ConsoleGroupProps {
    label: string;
    dimmed?: boolean;
    children: ReactNode;
}

export function ConsoleGroup({ label, dimmed, children }: ConsoleGroupProps) {
    const headingId = useId();

    return (
        <section
            aria-labelledby={headingId}
            aria-busy={dimmed || undefined}
            className={cn(
                "ease-smooth flex flex-col gap-2 transition-opacity duration-300",
                dimmed && "opacity-60",
            )}
        >
            <h2 id={headingId} className="micro-label">
                {label}
            </h2>
            {children}
        </section>
    );
}

ConsoleGroup.displayName = "ConsoleGroup";
