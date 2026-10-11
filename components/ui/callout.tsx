import type { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { StatusTone } from "@/lib/types";

const calloutVariants = cva("rounded-lg border p-3", {
    variants: {
        variant: {
            neutral: "bg-background-muted border-border-light",
            success: "bg-accent-light border-accent/20",
            info: "bg-background-muted border-border-dark",
            warning: "bg-background-muted border-border-dark",
            error: "bg-error-light border-error/20",
        } satisfies Record<StatusTone, string>,
    },
    defaultVariants: { variant: "neutral" },
});

const titleColor: Record<StatusTone, string> = {
    neutral: "text-text",
    success: "text-accent",
    info: "text-text-secondary",
    warning: "text-text-secondary",
    error: "text-error",
};

export interface CalloutProps extends VariantProps<typeof calloutVariants> {
    title: string;
    description?: string;
    action?: ReactNode;
    className?: string;
}

export function Callout({
    title,
    description,
    action,
    variant = "neutral",
    className,
}: CalloutProps) {
    const tone = variant ?? "neutral";

    return (
        <div
            role={tone === "error" ? "alert" : "status"}
            className={cn(
                calloutVariants({ variant: tone }),
                "flex items-center justify-between gap-3",
                className,
            )}
        >
            <div className="min-w-0">
                <p className={cn("text-xs font-medium", titleColor[tone])}>
                    {title}
                </p>
                {description && (
                    <p className="text-text-secondary mt-0.5 text-xs">
                        {description}
                    </p>
                )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
        </div>
    );
}

Callout.displayName = "Callout";
