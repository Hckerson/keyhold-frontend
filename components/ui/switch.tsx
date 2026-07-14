import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
    ({ className, ...props }, ref) => (
        <div className="relative inline-flex">
            <input ref={ref} type="checkbox" className="hidden" {...props} />
            <div
                className={cn(
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200",
                    props.checked ? "bg-accent" : "bg-border",
                )}
            >
                <span
                    className={cn(
                        "bg-background inline-block h-4 w-4 transform rounded-full transition-transform duration-200",
                        props.checked ? "translate-x-6" : "translate-x-1",
                    )}
                />
            </div>
        </div>
    ),
);

Switch.displayName = "Switch";

export { Switch };
