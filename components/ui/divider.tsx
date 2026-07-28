import React from "react";
import { cn } from "@/lib/utils";

interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
    orientation?: "horizontal" | "vertical";
}

const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
    ({ className, orientation = "horizontal", ...props }, ref) => (
        <hr
            ref={ref}
            className={cn(
                "border-0",
                orientation === "horizontal" &&
                    "via-border h-px w-full bg-linear-to-r from-transparent to-transparent",
                orientation === "vertical" &&
                    "via-border h-full w-px bg-linear-to-b from-transparent to-transparent",
                className,
            )}
            {...props}
        />
    ),
);

Divider.displayName = "Divider";

export { Divider };
export type { DividerProps };
