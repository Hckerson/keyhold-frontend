export type ChartTone =
    | "accent"
    | "info"
    | "highlight"
    | "neutral"
    | "success"
    | "warning"
    | "error";

export const chartToneVar: Record<ChartTone, string> = {
    accent: "var(--color-accent)",
    info: "var(--color-info)",
    highlight: "var(--color-highlight)",
    neutral: "var(--color-text-muted)",
    success: "var(--color-success)",
    warning: "var(--color-warning)",
    error: "var(--color-error)",
};

export const chartToneText: Record<ChartTone, string> = {
    accent: "text-accent",
    info: "text-info",
    highlight: "text-highlight-dark",
    neutral: "text-text-muted",
    success: "text-success",
    warning: "text-warning",
    error: "text-error",
};

export const moveTone = (percent: number): ChartTone => {
    if (percent === 0) return "neutral";
    return percent < 0 ? "success" : "error";
};

export const chartToneSoft: Record<ChartTone, string> = {
    accent: "bg-accent-light text-accent",
    info: "bg-info-light text-info",
    highlight: "bg-highlight-light text-highlight-dark",
    neutral: "bg-background-alt text-text-secondary",
    success: "bg-success-light text-success",
    warning: "bg-warning-light text-warning",
    error: "bg-error-light text-error",
};
