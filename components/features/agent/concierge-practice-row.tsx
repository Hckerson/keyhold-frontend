import { ProgressBar } from "@/components/ui/progress-bar";
import { coverageTone } from "@/lib/config/concierge-tones";
import { percentOf, type ConciergePractice } from "@/lib/data/agent-concierge";

export interface ConciergePracticeRowProps {
    practice: ConciergePractice;
    total: number;
}

export function ConciergePracticeRow({
    practice,
    total,
}: ConciergePracticeRowProps) {
    const coverage = percentOf(practice.covered, total);

    return (
        <li className="flex h-9 items-center gap-2">
            <span className="micro-label w-16 shrink-0 truncate">
                {practice.cadence}
            </span>
            <span className="text-text min-w-0 flex-1 truncate text-xs">
                {practice.label}
            </span>
            <ProgressBar
                value={coverage}
                tone={coverageTone(coverage)}
                className="w-10 shrink-0"
            />
            <span className="text-text-secondary w-8 shrink-0 text-right text-xs tabular-nums">
                {practice.covered}/{total}
            </span>
        </li>
    );
}

ConciergePracticeRow.displayName = "ConciergePracticeRow";
