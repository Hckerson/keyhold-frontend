import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const MONOGRAM_PATH =
    "M5 3.6H13V5.4H10.6V18.2H17V16.2H19V20.6H5V18.2H7.4V5.4H5Z";

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
    extends
        Omit<React.SVGAttributes<SVGSVGElement>, "color">,
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
                d={MONOGRAM_PATH}
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
            />
        </svg>
    ),
);

LogoMark.displayName = "LogoMark";
