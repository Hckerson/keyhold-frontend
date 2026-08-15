import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type SwitchProps = InputHTMLAttributes<HTMLInputElement>;

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
    ({ className, checked, onChange, ...props }, ref) => (
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
                    "peer-focus-visible:ring-accent/40 peer-focus-visible:ring-offset-background relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2",
                    checked ? "bg-accent" : "bg-border",
                )}
            >
                <span
                    className={cn(
                        "bg-background inline-block h-4 w-4 transform rounded-full transition-transform duration-200",
                        checked ? "translate-x-6" : "translate-x-1",
                    )}
                />
            </div>
        </div>
    ),
);

Switch.displayName = "Switch";

export { Switch };
