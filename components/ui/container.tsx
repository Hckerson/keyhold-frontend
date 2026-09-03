import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    size?: "sm" | "md" | "lg" | "full";
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
    ({ className, size = "lg", ...props }, ref) => {
        const sizes = {
            sm: "max-w-2xl",
            md: "max-w-4xl",
            lg: "max-w-7xl",
            full: "max-w-full",
        };

        return (
            <div
                ref={ref}
                className={cn(
                    "gutter-x relative mx-auto flex w-full",
                    sizes[size],
                    className,
                )}
                {...props}
            />
        );
    },
);

Container.displayName = "Container";

export { Container };
