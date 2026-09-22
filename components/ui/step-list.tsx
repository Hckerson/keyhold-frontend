import { cn } from "@/lib/utils";

export interface Step {
    title: string;
    description?: string;
}

export function StepList({
    steps,
    className,
}: {
    steps: Step[];
    className?: string;
}) {
    return (
        <ol className={cn("space-y-3", className)}>
            {steps.map((step, index) => (
                <li key={step.title} className="flex gap-2.5">
                    <span className="bg-accent-light text-accent grid size-6 shrink-0 place-items-center rounded-full text-[10px] font-semibold tabular-nums">
                        {index + 1}
                    </span>
                    <div className="min-w-0">
                        <p className="text-text text-xs font-semibold">
                            {step.title}
                        </p>
                        {step.description && (
                            <p className="text-text-secondary mt-0.5 text-xs">
                                {step.description}
                            </p>
                        )}
                    </div>
                </li>
            ))}
        </ol>
    );
}

StepList.displayName = "StepList";
