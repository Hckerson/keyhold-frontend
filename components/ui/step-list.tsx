import { cn } from "@/lib/utils";

export interface Step {
    title: string;
    description: string;
}

export function StepList({
    steps,
    className,
}: {
    steps: Step[];
    className?: string;
}) {
    return (
        <ol className={cn("space-y-4", className)}>
            {steps.map((step, index) => (
                <li key={step.title} className="flex gap-3">
                    <span className="bg-accent-light text-accent grid size-7 shrink-0 place-items-center rounded-full text-xs font-semibold">
                        {index + 1}
                    </span>
                    <div className="min-w-0">
                        <p className="text-text text-sm font-medium">
                            {step.title}
                        </p>
                        <p className="text-text-secondary mt-0.5 text-sm">
                            {step.description}
                        </p>
                    </div>
                </li>
            ))}
        </ol>
    );
}

StepList.displayName = "StepList";
