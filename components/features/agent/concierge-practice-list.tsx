import { ConciergePracticeRow } from "@/components/features/agent/concierge-practice-row";
import type { ConciergePractice } from "@/lib/data/agent-concierge";

export interface ConciergePracticeListProps {
    practices: ConciergePractice[];
    total: number;
}

export function ConciergePracticeList({
    practices,
    total,
}: ConciergePracticeListProps) {
    return (
        <ul className="divide-border divide-y">
            {practices.map((practice) => (
                <ConciergePracticeRow
                    key={practice.id}
                    practice={practice}
                    total={total}
                />
            ))}
        </ul>
    );
}

ConciergePracticeList.displayName = "ConciergePracticeList";
