import { cva } from "class-variance-authority";

export const buttonVariants = cva(
    "ease-smooth focus-visible:ring-accent focus-visible:ring-offset-background relative inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md border font-medium whitespace-nowrap transition-colors duration-200 select-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-45",
    {
        variants: {
            emphasis: {
                solid: "text-text-inverse",
                outline: "bg-background",
                quiet: "border-transparent bg-transparent",
            },
            tone: {
                accent: "",
                neutral: "",
                error: "",
                success: "",
            },
            size: {
                sm: "h-8 px-3 text-xs",
                lg: "h-11 gap-2 px-5 text-sm",
            },
            iconOnly: {
                true: "px-0",
                false: "",
            },
        },
        compoundVariants: [
            {
                emphasis: "solid",
                tone: "accent",
                class: "bg-accent border-accent-dark hover:bg-accent-dark",
            },
            {
                emphasis: "solid",
                tone: "neutral",
                class: "bg-text border-text hover:bg-text-secondary",
            },
            {
                emphasis: "solid",
                tone: "error",
                class: "bg-error border-error-dark hover:bg-error-dark",
            },
            {
                emphasis: "solid",
                tone: "success",
                class: "bg-success border-success-dark hover:bg-success-dark",
            },
            {
                emphasis: "outline",
                tone: "accent",
                class: "text-accent border-accent/35 hover:border-accent hover:bg-accent-light",
            },
            {
                emphasis: "outline",
                tone: "neutral",
                class: "text-text border-border hover:border-border-dark hover:bg-background-muted",
            },
            {
                emphasis: "outline",
                tone: "error",
                class: "text-error border-error/35 hover:border-error hover:bg-error-light",
            },
            {
                emphasis: "outline",
                tone: "success",
                class: "text-success border-success/35 hover:border-success hover:bg-success-light",
            },
            {
                emphasis: "quiet",
                tone: "accent",
                class: "text-accent hover:bg-accent-light",
            },
            {
                emphasis: "quiet",
                tone: "neutral",
                class: "text-text-secondary hover:text-text hover:bg-background-muted",
            },
            {
                emphasis: "quiet",
                tone: "error",
                class: "text-error hover:bg-error-light",
            },
            {
                emphasis: "quiet",
                tone: "success",
                class: "text-success hover:bg-success-light",
            },
            { size: "sm", iconOnly: true, class: "w-8" },
            { size: "lg", iconOnly: true, class: "w-11" },
        ],
        defaultVariants: {
            emphasis: "outline",
            tone: "neutral",
            size: "sm",
            iconOnly: false,
        },
    },
);

export const CONTENT_GAP = {
    sm: "gap-1.5",
    lg: "gap-2",
} as const;

export const GLYPH_SIZE = {
    sm: "size-3",
    lg: "size-4",
} as const;
