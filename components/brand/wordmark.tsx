import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { LogoChip } from "@/components/brand/logo-chip";
import { cn } from "@/lib/utils";

export const BRAND_NAME = "Luxury RE";

const wordVariants = cva("font-display leading-none whitespace-nowrap", {
    variants: {
        tone: {
            light: "text-text",
            dark: "text-text-inverse",
        },
        size: {
            sm: "text-base font-normal tracking-[0.005em]",
            md: "text-lg font-light tracking-[0.005em]",
        },
    },
    defaultVariants: {
        tone: "light",
        size: "sm",
    },
});

const suffixVariants = cva("font-light italic", {
    variants: {
        tone: {
            light: "text-highlight-dark",
            dark: "text-highlight",
        },
    },
    defaultVariants: {
        tone: "light",
    },
});

const CHIP_SIZE = {
    sm: "sm",
    md: "md",
} as const;

const GAP = {
    sm: "gap-2",
    md: "gap-3",
} as const;

export interface WordmarkProps extends VariantProps<typeof wordVariants> {
    href?: string | null;
    variant?: "lockup" | "word" | "mark";
    className?: string;
}

export function Wordmark({
    href = "/",
    tone,
    size,
    variant = "lockup",
    className,
}: WordmarkProps) {
    const step = size ?? "sm";
    const showMark = variant !== "word";
    const showWord = variant !== "mark";

    const content = (
        <span className={cn("inline-flex items-center", GAP[step], className)}>
            {showMark && (
                <LogoChip
                    tone={tone}
                    size={CHIP_SIZE[step]}
                    label={showWord ? undefined : BRAND_NAME}
                />
            )}
            {showWord && (
                <span className={wordVariants({ tone, size })}>
                    Luxury <em className={suffixVariants({ tone })}>RE</em>
                </span>
            )}
        </span>
    );

    if (!href) return content;

    return (
        <Link
            href={href}
            aria-label={BRAND_NAME}
            className="ease-smooth focus-visible:ring-accent inline-flex rounded-sm transition-opacity duration-200 hover:opacity-90 focus-visible:ring-2 focus-visible:outline-none"
        >
            {content}
        </Link>
    );
}

Wordmark.displayName = "Wordmark";
