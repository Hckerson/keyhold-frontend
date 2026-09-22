import { forwardRef, type InputHTMLAttributes } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

export type SwitchSize = "sm" | "md";

interface SwitchProps extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "size" | "type"
> {
    size?: SwitchSize;
}

const trackVariants = cva(
    "bg-border peer-checked:bg-accent peer-focus-visible:ring-accent/40 peer-focus-visible:ring-offset-background peer-disabled:opacity-50 ease-smooth pointer-events-none inline-flex items-center rounded-full transition-colors duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2",
    {
        variants: {
            size: {
                sm: "h-4 w-7 peer-checked:[&>span]:translate-x-3.5",
                md: "h-6 w-11 peer-checked:[&>span]:translate-x-6",
            },
        },
        defaultVariants: { size: "md" },
    },
);

const thumbVariants = cva(
    "bg-background ease-smooth inline-block rounded-full shadow-sm transition-transform duration-200",
    {
        variants: {
            size: {
                sm: "size-3 translate-x-0.5",
                md: "size-4 translate-x-1",
            },
        },
        defaultVariants: { size: "md" },
    },
);

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
    ({ className, size = "md", ...props }, ref) => (
        <span className={cn("relative inline-flex shrink-0", className)}>
            <input
                ref={ref}
                type="checkbox"
                role="switch"
                className="peer absolute inset-0 z-10 m-0 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
                {...props}
            />
            <span aria-hidden="true" className={trackVariants({ size })}>
                <span className={thumbVariants({ size })} />
            </span>
        </span>
    ),
);

Switch.displayName = "Switch";

export { Switch };
