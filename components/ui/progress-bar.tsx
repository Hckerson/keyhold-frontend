import { cn } from "@/lib/utils";

export interface ProgressBarProps {
    value: number;
    tone?: "accent" | "success" | "warning" | "info" | "highlight" | "neutral";
    className?: string;
}

const toneFill = {
    accent: "bg-accent",
    success: "bg-success",
    warning: "bg-warning",
    info: "bg-info",
    highlight: "bg-highlight",
    neutral: "bg-text-muted/50",
};

export function ProgressBar({
    value,
    tone = "accent",
    className,
}: ProgressBarProps) {
    const clamped = Math.max(0, Math.min(100, value));
    return (
        <div
            className={cn(
                "bg-background-alt h-1.5 w-full overflow-hidden rounded-full",
                className,
            )}
        >
            <div
                className={cn(
                    "ease-smooth h-full rounded-full transition-all duration-500",
                    toneFill[tone],
                )}
                style={{ width: `${clamped}%` }}
            />
        </div>
    );
}

ProgressBar.displayName = "ProgressBar";
