import React from "react";
import { cn } from "@/lib/utils";

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "bg-background-muted animate-pulse rounded",
                className,
            )}
            {...props}
        />
    ),
);

Skeleton.displayName = "Skeleton";

export { Skeleton };
