import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const calloutVariants = cva("rounded-lg border p-3", {
    variants: {
        variant: {
            neutral: "bg-background-muted border-border-light",
            success: "bg-success/10 border-success/20",
            info: "bg-info/10 border-info/20",
            warning: "bg-warning/10 border-warning/20",
            error: "bg-error/10 border-error/20",
        },
    },
    defaultVariants: { variant: "neutral" },
});

const titleColor: Record<string, string> = {
    neutral: "text-text",
    success: "text-success",
    info: "text-info",
    warning: "text-warning",
    error: "text-error",
};

export interface CalloutProps extends VariantProps<typeof calloutVariants> {
    title: string;
    description?: string;
    className?: string;
}

export function Callout({
    title,
    description,
    variant = "neutral",
    className,
}: CalloutProps) {
    return (
        <div className={cn(calloutVariants({ variant }), className)}>
            <p
                className={cn(
                    "text-xs font-medium",
                    titleColor[variant ?? "neutral"],
                )}
            >
                {title}
            </p>
            {description && (
                <p className="text-text-secondary mt-1 text-xs">
                    {description}
                </p>
            )}
        </div>
    );
}

Callout.displayName = "Callout";
