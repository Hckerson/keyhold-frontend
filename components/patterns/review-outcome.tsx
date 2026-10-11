import { StatusBadge } from "@/components/ui/status-badge";
import type { ReviewOutcomeView } from "@/lib/types";

export interface ReviewOutcomeProps {
    outcome: ReviewOutcomeView;
}

export function ReviewOutcome({ outcome }: ReviewOutcomeProps) {
    return (
        <div className="border-border-light bg-background-alt border-t px-4 py-3">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <StatusBadge tone={outcome.tone} size="md">
                    {outcome.label}
                </StatusBadge>
                <span className="text-text-secondary text-xs tabular-nums">
                    {[outcome.date, outcome.detail].filter(Boolean).join(" · ")}
                </span>
            </div>
            {outcome.note && (
                <div className="mt-3">
                    <p className="micro-label">{outcome.noteHeading}</p>
                    <p className="text-text mt-1 max-w-prose text-xs leading-relaxed">
                        {outcome.note}
                    </p>
                </div>
            )}
        </div>
    );
}

ReviewOutcome.displayName = "ReviewOutcome";
