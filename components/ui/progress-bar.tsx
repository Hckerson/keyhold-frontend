import { cn } from "@/lib/utils";
import type { ChartTone } from "@/lib/config/chart-tones";

export interface ProgressBarProps {
    value: number;
    tone?: ChartTone;
    label?: string;
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
    label,
    className,
}: ProgressBarProps) {
    const clamped = Number.isFinite(value)
        ? Math.max(0, Math.min(100, value))
        : 0;
    return (
        <div
            role={label ? "progressbar" : undefined}
            aria-label={label}
            aria-valuenow={label ? clamped : undefined}
            aria-valuemin={label ? 0 : undefined}
            aria-valuemax={label ? 100 : undefined}
            className={cn(
                "bg-background-alt h-1.5 w-full overflow-hidden rounded-full",
                className,
            )}
        >
            <div
                className={cn(
                    "ease-smooth h-full rounded-full transition-[width] duration-300",
                    toneFill[tone],
                )}
                style={{ width: `${clamped}%` }}
            />
        </div>
    );
}

ProgressBar.displayName = "ProgressBar";
