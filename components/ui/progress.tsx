import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
    value?: number;
    max?: number;
}

export type { ProgressProps };

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
    ({ value = 0, max = 100, className, ...props }, ref) => {
        const percentage = (value / max) * 100;

        return (
            <div
                ref={ref}
                className={cn(
                    "bg-background-muted h-2 w-full overflow-hidden rounded-full",
                    className,
                )}
                {...props}
            >
                <div
                    className="bg-accent ease-smooth h-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        );
    },
);

Progress.displayName = "Progress";

export { Progress };
