import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type SkeletonProps = HTMLAttributes<HTMLDivElement>;

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            aria-hidden="true"
            className={cn(
                "bg-background-muted animate-pulse rounded-md",
                className,
            )}
            {...props}
        />
    ),
);

Skeleton.displayName = "Skeleton";

export { Skeleton };
