import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "bg-background border-border-light ease-smooth hover:border-border rounded-lg border p-4 shadow-sm transition-colors duration-200",
                className,
            )}
            {...props}
        />
    ),
);

Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, CardProps>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn("mb-3", className)} {...props} />
    ),
);

CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<HTMLHeadingElement, CardProps>(
    ({ className, ...props }, ref) => (
        <h3
            ref={ref}
            className={cn("text-text text-xs font-semibold", className)}
            {...props}
        />
    ),
);

CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<HTMLParagraphElement, CardProps>(
    ({ className, ...props }, ref) => (
        <p
            ref={ref}
            className={cn("text-text-secondary text-xs", className)}
            {...props}
        />
    ),
);

CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<HTMLDivElement, CardProps>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn("", className)} {...props} />
    ),
);

CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, CardProps>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn("mt-4 flex gap-2", className)}
            {...props}
        />
    ),
);

CardFooter.displayName = "CardFooter";

export {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
};
