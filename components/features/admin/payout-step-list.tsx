import { Circle, CircleCheck, Clock, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PayoutStep, PayoutStepState } from "@/lib/types";

const TITLE = "Escrow timeline";

const STEP_MARKS: Record<
    PayoutStepState,
    { icon: typeof Circle; className: string }
> = {
    done: { icon: CircleCheck, className: "text-success" },
    current: { icon: Clock, className: "text-warning" },
    waiting: { icon: Circle, className: "text-border-dark" },
    blocked: { icon: ShieldAlert, className: "text-error" },
};

export interface PayoutStepListProps {
    steps: PayoutStep[];
}

export function PayoutStepList({ steps }: PayoutStepListProps) {
    return (
        <section aria-label={TITLE} className="flex flex-col gap-3">
            <h3 className="micro-label">{TITLE}</h3>
            <ol className="flex flex-col">
                {steps.map((step, index) => {
                    const { icon: Icon, className } = STEP_MARKS[step.state];
                    const last = index === steps.length - 1;

                    return (
                        <li key={step.id} className="flex gap-3">
                            <span className="flex flex-col items-center">
                                <Icon
                                    aria-hidden="true"
                                    strokeWidth={1.5}
                                    className={cn("size-4 shrink-0", className)}
                                />
                                {!last && (
                                    <span
                                        aria-hidden="true"
                                        className="bg-border-light my-1 w-px flex-1"
                                    />
                                )}
                            </span>
                            <span
                                className={cn(
                                    "flex min-w-0 flex-col gap-0.5 text-xs",
                                    !last && "pb-4",
                                )}
                            >
                                <span
                                    className={cn(
                                        "font-medium",
                                        step.state === "waiting"
                                            ? "text-text-muted"
                                            : "text-text",
                                    )}
                                >
                                    {step.label}
                                </span>
                                <span
                                    className={cn(
                                        step.state === "blocked"
                                            ? "text-error"
                                            : "text-text-secondary",
                                    )}
                                >
                                    {step.detail}
                                </span>
                            </span>
                        </li>
                    );
                })}
            </ol>
        </section>
    );
}

PayoutStepList.displayName = "PayoutStepList";
