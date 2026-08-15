import { cn } from "@/lib/utils";
import type { ChartTone } from "@/lib/config/chart-tones";

export interface ProgressBarProps {
    value: number;
    tone?: ChartTone;
    className?: string;
}

const toneFill: Record<ChartTone, string> = {
    accent: "bg-accent",
    success: "bg-success",
    warning: "bg-warning",
    error: "bg-error",
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
