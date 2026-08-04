import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { LogoMark } from "@/components/brand/logo-mark";
import { cn } from "@/lib/utils";

const chipVariants = cva(
    "grid shrink-0 place-items-center rounded-sm select-none",
    {
        variants: {
            tone: {
                light: "bg-accent text-highlight",
                dark: "border-highlight/35 text-highlight border bg-transparent",
            },
            size: {
                sm: "size-7",
                md: "size-9",
            },
        },
        defaultVariants: {
            tone: "light",
            size: "sm",
        },
    },
);

const GLYPH_SIZE = {
    sm: "sm",
    md: "md",
} as const;

export interface LogoChipProps
    extends
        React.HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof chipVariants> {
    label?: string;
}

export const LogoChip = forwardRef<HTMLSpanElement, LogoChipProps>(
    ({ className, tone, size, label, ...props }, ref) => (
        <span
            ref={ref}
            className={cn(chipVariants({ tone, size }), className)}
            {...props}
        >
            <LogoMark size={GLYPH_SIZE[size ?? "sm"]} label={label} />
        </span>
    ),
);

LogoChip.displayName = "LogoChip";
