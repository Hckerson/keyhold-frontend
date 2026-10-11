import { CircleAlert, CircleCheck, type LucideIcon } from "lucide-react";

export type ChartTone =
    | "accent-dark"
    | "accent"
    | "accent-mid"
    | "accent-soft"
    | "neutral"
    | "error";

export const chartToneVar: Record<ChartTone, string> = {
    "accent-dark": "var(--color-accent-dark)",
    accent: "var(--color-accent)",
    "accent-mid": "var(--color-accent-mid)",
    "accent-soft": "var(--color-accent-soft)",
    neutral: "var(--color-quiet)",
    error: "var(--color-error)",
};

export const chartToneWash: Record<ChartTone, string> = {
    "accent-dark": "var(--color-accent-light)",
    accent: "var(--color-accent-light)",
    "accent-mid": "var(--color-accent-light)",
    "accent-soft": "var(--color-accent-light)",
    neutral: "var(--color-background-muted)",
    error: "var(--color-error-light)",
};

export const chartToneText: Record<ChartTone, string> = {
    "accent-dark": "text-accent-dark",
    accent: "text-accent",
    "accent-mid": "text-accent-mid",
    "accent-soft": "text-accent",
    neutral: "text-text-muted",
    error: "text-error",
};

export const moveTone = (percent: number): ChartTone => {
    if (percent === 0) return "neutral";
    return percent < 0 ? "accent" : "error";
};

export const chartToneSoft: Record<ChartTone, string> = {
    "accent-dark": "bg-accent-light text-accent-dark",
    accent: "bg-accent-light text-accent",
    "accent-mid": "bg-accent-light text-accent",
    "accent-soft": "bg-accent-light text-accent",
    neutral: "bg-background-alt text-text-secondary",
    error: "bg-error-light text-error-dark",
};

export const chartToneFill: Record<ChartTone, string> = {
    "accent-dark": "bg-accent-dark",
    accent: "bg-accent",
    "accent-mid": "bg-accent-mid",
    "accent-soft": "bg-accent-soft",
    neutral: "bg-quiet",
    error: "bg-error",
};

export const chartToneGlyph: Partial<Record<ChartTone, LucideIcon>> = {
    accent: CircleCheck,
    error: CircleAlert,
};
