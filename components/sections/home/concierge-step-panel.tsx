import type { Ref } from "react";
import type { ConciergeStep } from "@/lib/data/home-concierge";
import { ConciergeArtifact } from "@/components/sections/home/concierge-artifact";
import { cn } from "@/lib/utils";

export function ConciergeStepPanel({
    step,
    active,
    ref,
}: {
    step: ConciergeStep;
    active: boolean;
    ref?: Ref<HTMLLIElement>;
}) {
    return (
        <li
            ref={ref}
            aria-current={active ? "step" : undefined}
            className={cn(
                "ease-smooth flex flex-col gap-5 rounded-lg border p-4 transition duration-500",
                "lg:grid lg:min-h-[62vh] lg:grid-cols-[minmax(0,1fr)_minmax(0,19rem)] lg:items-center lg:gap-10 lg:px-8 lg:py-10",
                active
                    ? "border-border bg-background shadow-md"
                    : "border-border-light bg-background-alt shadow-none lg:opacity-70",
            )}
        >
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                    <span
                        className={cn(
                            "ease-smooth grid size-6 shrink-0 place-items-center rounded-full border transition-colors duration-500",
                            active
                                ? "border-accent text-accent"
                                : "border-border text-text-muted",
                        )}
                    >
                        <step.icon size={12} strokeWidth={1.5} />
                    </span>
                    <h3
                        className={cn(
                            "ease-smooth text-xs font-semibold transition-colors duration-500",
                            active ? "text-text" : "text-text-secondary",
                        )}
                    >
                        {step.title}
                    </h3>
                    <span className="desk-hidden text-text-muted ml-auto font-mono text-[10px] tracking-[0.18em] tabular-nums">
                        {step.idx}
                    </span>
                </div>

                <p
                    className={cn(
                        "ease-smooth max-w-[46ch] text-xs leading-[1.8] transition-colors duration-500",
                        active ? "text-text-secondary" : "text-text-muted",
                    )}
                >
                    {step.description}
                </p>

                <div className="flex flex-col gap-1 pt-1">
                    <span className="text-text-muted font-mono text-[10px] tracking-[0.14em] uppercase">
                        {step.focalLabel}
                    </span>
                    <span
                        className={cn(
                            "font-display ease-smooth text-h5 leading-none font-light tabular-nums transition-colors duration-500",
                            active ? "text-highlight-dark" : "text-text-muted",
                        )}
                    >
                        {step.focal}
                    </span>
                </div>

                <span
                    aria-hidden="true"
                    className={cn(
                        "desk-only bg-accent ease-smooth h-px w-16 origin-left transition-transform duration-500",
                        active ? "scale-x-100" : "scale-x-0",
                    )}
                />
            </div>

            <ConciergeArtifact artifact={step.artifact} />
        </li>
    );
}

ConciergeStepPanel.displayName = "ConciergeStepPanel";
