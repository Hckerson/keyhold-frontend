import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type SwitchSize = "sm" | "md";

interface SwitchProps extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "size"
> {
    size?: SwitchSize;
}

const trackSize: Record<SwitchSize, string> = {
    sm: "h-4 w-7",
    md: "h-6 w-11",
};

const thumbSize: Record<SwitchSize, string> = {
    sm: "size-3",
    md: "size-4",
};

const thumbOff: Record<SwitchSize, string> = {
    sm: "translate-x-0.5",
    md: "translate-x-1",
};

const thumbOn: Record<SwitchSize, string> = {
    sm: "translate-x-3.5",
    md: "translate-x-6",
};

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
    ({ className, checked, onChange, size = "md", ...props }, ref) => (
        <div className={cn("relative inline-flex", className)}>
            <input
                ref={ref}
                type="checkbox"
                role="switch"
                className="peer sr-only"
                checked={checked ?? false}
                onChange={onChange ?? (() => {})}
                {...props}
            />
            <div
                className={cn(
                    "peer-focus-visible:ring-accent/40 peer-focus-visible:ring-offset-background ease-smooth relative inline-flex items-center rounded-full transition-colors duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2",
                    trackSize[size],
                    checked ? "bg-accent" : "bg-border",
                )}
            >
                <span
                    className={cn(
                        "bg-background ease-smooth inline-block transform rounded-full transition-transform duration-200",
                        thumbSize[size],
                        checked ? thumbOn[size] : thumbOff[size],
                    )}
                />
            </div>
        </div>
    ),
);

Switch.displayName = "Switch";

export { Switch };
