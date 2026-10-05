import { cn } from "@/lib/utils";
import { authLabelVariants } from "@/components/features/auth/parts/auth-label";
import type { AuthStep } from "@/lib/types";

export interface AuthFormHeaderProps {
    kicker: string;
    title: string;
    description?: string;
    step?: AuthStep;
}

function StepMeter({ current, total }: AuthStep) {
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

export function AuthFormHeader({
    kicker,
    title,
    description,
    step,
}: AuthFormHeaderProps) {
    return (
        <header className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <span aria-hidden="true" className="bg-highlight h-px w-4" />
                <p
                    className={cn(
                        authLabelVariants({ tier: "marker" }),
                        "text-text-muted",
                    )}
                >
                    {kicker}
                </p>
                {step && <StepMeter {...step} />}
            </div>
            <h1 className="font-display text-h5 text-text font-light">
                {title}
            </h1>
            {description && (
                <p className="text-text-secondary max-w-[46ch] text-xs">
                    {description}
                </p>
            )}
        </header>
    );
}

AuthFormHeader.displayName = "AuthFormHeader";
