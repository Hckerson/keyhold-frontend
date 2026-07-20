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
