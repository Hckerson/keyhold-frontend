import { chartToneText } from "@/lib/config/chart-tones";
import { coverageTone } from "@/lib/config/concierge-tones";
import type { ConciergePractice } from "@/lib/data/agent-concierge";
import { cn, percentOf } from "@/lib/utils";

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
            <span
                className={cn(
                    "w-8 shrink-0 text-right text-xs font-medium tabular-nums",
                    chartToneText[coverageTone(coverage)],
                )}
            >
                {practice.covered}/{total}
            </span>
        </li>
    );
}

ConciergePracticeRow.displayName = "ConciergePracticeRow";
