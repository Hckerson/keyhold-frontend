import { Check } from "lucide-react";
import type { CompletionMilestone } from "@/lib/data/home-concierge";
import { cn } from "@/lib/utils";

export interface CompletionLedgerProps {
    milestones: CompletionMilestone[];
}

export function CompletionLedger({ milestones }: CompletionLedgerProps) {
    return (
        <ul className="flex flex-col gap-2.5">
            {milestones.map((milestone) => (
                <li key={milestone.label} className="flex items-center gap-2.5">
                    {milestone.done ? (
                        <Check
                            size={12}
                            strokeWidth={1.5}
                            className="text-accent shrink-0"
                        />
                    ) : (
                        <span className="border-highlight-dark size-3 shrink-0 rounded-full border" />
                    )}
                    <span
                        className={cn(
                            "text-xs",
                            milestone.done
                                ? "text-text-secondary"
                                : "text-text font-semibold",
                        )}
                    >
                        {milestone.label}
                    </span>
                </li>
            ))}
        </ul>
    );
}
