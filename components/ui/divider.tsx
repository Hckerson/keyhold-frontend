import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
    orientation?: "horizontal" | "vertical";
}

const Divider = forwardRef<HTMLDivElement, DividerProps>(
    ({ className, orientation = "horizontal", ...props }, ref) => (
        <div
            ref={ref}
            role="separator"
            aria-orientation={orientation}
            className={cn(
                "bg-border-light shrink-0",
                orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
                className,
            )}
            {...props}
        />
    ),
);

Divider.displayName = "Divider";

export { Divider };
export type { DividerProps };
