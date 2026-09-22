import { forwardRef, type SVGAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const LOADING_LABEL = "Loading";

const spinnerVariants = cva("shrink-0 animate-spin", {
    variants: {
        size: {
            sm: "size-4",
            md: "size-8",
            lg: "size-12",
        },
        tone: {
            accent: "text-accent",
            current: "text-current",
        },
    },
    defaultVariants: { size: "md", tone: "accent" },
});

interface SpinnerProps
    extends
        Omit<SVGAttributes<SVGSVGElement>, "aria-label">,
        VariantProps<typeof spinnerVariants> {
    label?: string;
}

const Spinner = forwardRef<SVGSVGElement, SpinnerProps>(
    ({ className, size, tone, label = LOADING_LABEL, ...props }, ref) => (
        <svg
            ref={ref}
            role="status"
            aria-label={label}
            className={cn(spinnerVariants({ size, tone }), className)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            {...props}
        >
            <circle
                className="opacity-20"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
            />
            <path
                d="M22 12a10 10 0 0 0-10-10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    ),
);

Spinner.displayName = "Spinner";

export { Spinner, spinnerVariants };
export type { SpinnerProps };
