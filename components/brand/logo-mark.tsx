import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const KEYSTONE_PATH =
    "M4 3.5H20L17.25 20.5H6.75ZM9.5 20.5V15A2.5 2.5 0 0 1 14.5 15V20.5Z";

const markVariants = cva("shrink-0", {
    variants: {
        size: {
            xs: "size-3",
            sm: "size-4",
            md: "size-5",
            lg: "size-6",
        },
    },
    defaultVariants: {
        size: "sm",
    },
});

export interface LogoMarkProps
    extends Omit<React.SVGAttributes<SVGSVGElement>, "color">,
        VariantProps<typeof markVariants> {
    label?: string;
}

export const LogoMark = forwardRef<SVGSVGElement, LogoMarkProps>(
    ({ className, size, label, ...props }, ref) => (
        <svg
            ref={ref}
            viewBox="0 0 24 24"
            fill="none"
            focusable="false"
            role={label ? "img" : undefined}
            aria-label={label}
            aria-hidden={label ? undefined : true}
            className={cn(markVariants({ size }), className)}
            {...props}
        >
            <path
                d={KEYSTONE_PATH}
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
            />
        </svg>
    ),
);

LogoMark.displayName = "LogoMark";
