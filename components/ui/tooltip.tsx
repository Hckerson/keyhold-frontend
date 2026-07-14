import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
    content: string;
    side?: "top" | "right" | "bottom" | "left";
    children: ReactNode;
}

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
    ({ content, side = "top", className, children, ...props }, ref) => {
        const positionClasses = {
            top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
            right: "left-full ml-2 top-1/2 -translate-y-1/2",
            bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
            left: "right-full mr-2 top-1/2 -translate-y-1/2",
        };

        return (
            <div ref={ref} className="group relative inline-block" {...props}>
                {children}
                <div
                    className={cn(
                        "bg-text text-background-alt absolute z-50 hidden rounded-sm px-2 py-1 text-xs whitespace-nowrap group-hover:block",
                        positionClasses[side],
                        className,
                    )}
                >
                    {content}
                </div>
            </div>
        );
    },
);

Tooltip.displayName = "Tooltip";

export { Tooltip };
