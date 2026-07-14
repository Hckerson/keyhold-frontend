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
                "border-border",
                orientation === "horizontal" && "w-full border-t",
                orientation === "vertical" && "h-full border-l",
                className,
            )}
            {...props}
        />
    ),
);

Divider.displayName = "Divider";

export { Divider };
export type { DividerProps };
