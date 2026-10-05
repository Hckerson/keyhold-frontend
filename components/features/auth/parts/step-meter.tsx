import { cn } from "@/lib/utils";
import type { AuthStep } from "@/lib/types";

export type StepMeterProps = AuthStep;

export function StepMeter({ current, total }: StepMeterProps) {
    const marks = Array.from({ length: total }, (_, index) => index + 1);

    return (
        <span
            role="img"
            aria-label={`Step ${current} of ${total}`}
            className="ml-auto flex items-center gap-1"
        >
            {marks.map((mark) => (
                <span
                    key={mark}
                    className={cn(
                        "ease-smooth block h-px w-4 transition-colors duration-300",
                        mark <= current ? "bg-highlight" : "bg-border-dark",
                    )}
                />
            ))}
        </span>
    );
}

StepMeter.displayName = "StepMeter";
